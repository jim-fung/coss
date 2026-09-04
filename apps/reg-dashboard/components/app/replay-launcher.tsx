"use client";

import { Button } from "@coss/ui/components/button";
import { Checkbox } from "@coss/ui/components/checkbox";
import { Label } from "@coss/ui/components/label";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@coss/ui/components/select";
import { InfoIcon } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import {
  ReplayAuthorizationBadge,
  ReplayOutcomeBadge,
} from "@/components/status-badge";
import { shortId } from "@/lib/format";
import type { ReplayAction } from "@/lib/types";

const sourceKindOptions = ["case", "run", "replay_key"] as const;

interface LaunchResult {
  action: ReplayAction | undefined;
  blocked: boolean;
}

/** Stable source identity — the documented selection key (WB-6 T1). */
function sourceId(source: ReplayAction["source"]): string {
  switch (source.kind) {
    case "case":
      return `case:${source.caseId}@${source.evalRunId}`;
    case "run":
      return `run:${source.runId}`;
    case "replay_key":
      return `key:${source.replayKey}`;
  }
}

function sourceLabel(source: ReplayAction["source"]): string {
  switch (source.kind) {
    case "case":
      return `${source.caseId} @ ${shortId(source.evalRunId)}`;
    case "run":
      return shortId(source.runId);
    case "replay_key":
      // T1 AC: an unmapped intake item is selected only by its replay_key.
      return source.replayKey;
  }
}

function ResultCard({ result }: { result: LaunchResult }): React.ReactElement {
  if (result.blocked) {
    return (
      <div className="flex flex-col gap-1.5 rounded-md border border-destructive/40 p-3">
        <p className="font-medium text-destructive text-sm">
          blocked — live call not authorized (E_LIVE_CALL_NOT_AUTHORIZED)
        </p>
        <p className="text-muted-foreground text-xs">
          The attempted live call is visible as blocked, never as a pass (T2).
        </p>
        {result.action ? (
          <Link
            className="w-fit font-mono text-xs underline underline-offset-2 hover:text-foreground"
            href={`/runs/${result.action.replayRunId}`}
          >
            recorded denial · {shortId(result.action.replayRunId)}
          </Link>
        ) : (
          <span className="text-muted-foreground/70 text-xs italic">
            no recorded denial run for this source
          </span>
        )}
      </div>
    );
  }
  if (!result.action) {
    return (
      <div className="flex items-start gap-2 rounded-md border border-dashed p-3 text-muted-foreground text-sm">
        <InfoIcon aria-hidden className="mt-0.5 size-4 shrink-0" />
        <p>
          No matching replay action is recorded in the reviewed-fixture registry
          for this source and mode — nothing is invented here (T4).
        </p>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-1.5 rounded-md border p-3">
      <div className="flex flex-wrap items-center gap-2">
        <ReplayOutcomeBadge value={result.action.outcome} />
        <ReplayAuthorizationBadge value={result.action.authorization} />
        <Link
          className="font-mono text-xs underline underline-offset-2 hover:text-foreground"
          href={`/runs/${result.action.replayRunId}`}
          title="new run"
        >
          {shortId(result.action.replayRunId)}
        </Link>
        {result.action.reasonCode && (
          <span className="font-mono text-muted-foreground text-xs">
            {result.action.reasonCode}
          </span>
        )}
      </div>
      <p className="text-muted-foreground text-xs">
        Fixture-backed result from the reviewed-fixture registry: a fresh run_id
        in a disposable environment; original and replay runs are linked
        explicitly (T1). The QA harness owns execution.
      </p>
    </div>
  );
}

/**
 * WB-6 T1/T2 selection flow, fixture-backed: the workbench starts and
 * inspects replays, but the QA harness owns execution — selecting a source
 * looks up the recorded replay action, it never issues a live call.
 */
/** First recorded source of a kind, or "none" when the registry has no data. */
function firstSourceOf(actions: ReplayAction[], kind: string): string {
  const first = actions.find((action) => action.source.kind === kind);
  return first ? sourceId(first.source) : "none";
}

export function ReplayLauncher({
  actions,
}: {
  actions: ReplayAction[];
}): React.ReactElement {
  const [sourceKind, setSourceKind] = React.useState<string>("case");
  const [sourceRef, setSourceRef] = React.useState<string>(() =>
    firstSourceOf(actions, "case"),
  );
  const [mode, setMode] = React.useState<string>("deterministic");
  const [liveAuthorized, setLiveAuthorized] = React.useState<boolean>(false);
  const [result, setResult] = React.useState<LaunchResult | null>(null);

  const sourceOptions = React.useMemo(() => {
    const options: string[] = [];
    const seen = new Set<string>();
    for (const action of actions) {
      if (action.source.kind !== sourceKind) {
        continue;
      }
      const id = sourceId(action.source);
      if (!seen.has(id)) {
        seen.add(id);
        options.push(id);
      }
    }
    return options;
  }, [actions, sourceKind]);

  const labelFor = (id: string): string => {
    const action = actions.find(
      (candidate) => sourceId(candidate.source) === id,
    );
    return action ? sourceLabel(action.source) : id;
  };

  const handleKindChange = (value: string | null): void => {
    const kind = value ?? "case";
    setSourceKind(kind);
    setResult(null);
    setSourceRef(firstSourceOf(actions, kind));
  };

  const startReplay = (): void => {
    const withSource = actions.filter(
      (action) => sourceId(action.source) === sourceRef,
    );
    if (mode === "deterministic") {
      setResult({
        action: withSource.find(
          (action) => action.authorization === "deterministic",
        ),
        blocked: false,
      });
      return;
    }
    if (!liveAuthorized) {
      // T2: the unauthorized live attempt resolves to the recorded
      // live_denied action — visible as blocked, never as a pass.
      setResult({
        action: withSource.find(
          (action) => action.authorization === "live_denied",
        ),
        blocked: true,
      });
      return;
    }
    setResult({
      action: withSource.find(
        (action) => action.authorization === "live_authorized",
      ),
      blocked: false,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start gap-2 rounded-md border border-dashed p-3 text-muted-foreground text-sm">
        <InfoIcon aria-hidden className="mt-0.5 size-4 shrink-0" />
        <p>
          Fixture-backed: outcomes come from the reviewed-fixture replay
          registry. The workbench starts and inspects replays; the QA harness
          owns execution. No network calls are made from this page.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Select
          aria-label="Select source kind"
          onValueChange={handleKindChange}
          value={sourceKind}
        >
          <SelectTrigger className="w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectPopup>
            {sourceKindOptions.map((option) => (
              <SelectItem key={option} value={option}>
                Source kind: {option}
              </SelectItem>
            ))}
          </SelectPopup>
        </Select>
        <Select
          aria-label="Select source"
          onValueChange={(value: string | null): void => {
            setSourceRef(value ?? "none");
            setResult(null);
          }}
          value={sourceRef}
        >
          <SelectTrigger className="w-72">
            <SelectValue />
          </SelectTrigger>
          <SelectPopup>
            {sourceOptions.length === 0 ? (
              <SelectItem disabled value="none">
                no recorded sources
              </SelectItem>
            ) : (
              sourceOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {labelFor(option)}
                </SelectItem>
              ))
            )}
          </SelectPopup>
        </Select>
        <Select
          aria-label="Select execution mode"
          onValueChange={(value: string | null): void => {
            setMode(value ?? "deterministic");
            setResult(null);
          }}
          value={mode}
        >
          <SelectTrigger className="w-52">
            <SelectValue />
          </SelectTrigger>
          <SelectPopup>
            <SelectItem value="deterministic">
              Mode: deterministic (default)
            </SelectItem>
            <SelectItem value="live">Mode: live</SelectItem>
          </SelectPopup>
        </Select>
        <Button
          disabled={sourceRef === "none"}
          onClick={startReplay}
          size="sm"
          variant="outline"
        >
          Start replay
        </Button>
      </div>
      {sourceKind === "replay_key" && (
        <p className="text-muted-foreground text-xs">
          Unmapped intake is selected only by its{" "}
          <span className="font-mono">replay_key</span> — promoted through
          verified synthetic scope before a new run is created (T1).
        </p>
      )}
      {mode === "live" && (
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={liveAuthorized}
              id="replay-live-authorization"
              onCheckedChange={(checked): void => setLiveAuthorized(checked)}
            />
            <Label
              className="font-normal text-sm"
              htmlFor="replay-live-authorization"
            >
              Authorize live model calls
            </Label>
          </div>
          <p className="text-muted-foreground text-xs">
            Live model calls require explicit authorization (T2). Without it,
            the attempted call is recorded as blocked — never as a pass.
          </p>
        </div>
      )}
      {result && <ResultCard result={result} />}
    </div>
  );
}
