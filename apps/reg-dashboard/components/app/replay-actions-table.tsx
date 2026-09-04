"use client";

import { Badge } from "@coss/ui/components/badge";
import { Button } from "@coss/ui/components/button";
import {
  DataTable,
  DataTableContent,
  DataTablePagination,
} from "@coss/ui/components/data-table";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@coss/ui/components/select";
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import * as React from "react";
import {
  ReplayAuthorizationBadge,
  ReplayOutcomeBadge,
} from "@/components/status-badge";
import { shortId } from "@/lib/format";
import type {
  DisposableDatabase,
  ReplayAction,
  ReplayFault,
} from "@/lib/types";

const faultOptions: ReplayFault[] = [
  "provider_429",
  "provider_timeout",
  "malformed_tool_result",
  "invariant_rejection",
  "database_failure",
  "duplicate_update",
  "restart_recovery",
];

const cleanupConfig: Record<
  DisposableDatabase["cleanupOutcome"],
  "success" | "warning" | "outline"
> = {
  dropped: "success",
  retained_for_debug: "warning",
  not_created: "outline",
};

function SourceCell({ action }: { action: ReplayAction }): React.ReactElement {
  const source = action.source;
  if (source.kind === "case") {
    return (
      <div className="flex flex-col gap-0.5">
        <Badge variant="outline">{source.kind}</Badge>
        <Link
          className="font-mono text-xs underline underline-offset-2 hover:text-foreground"
          href={`/evaluations/${source.evalRunId}`}
          title="Open evaluation run"
        >
          {source.caseId} @ {shortId(source.evalRunId)}
        </Link>
      </div>
    );
  }
  if (source.kind === "run") {
    return (
      <div className="flex flex-col gap-0.5">
        <Badge variant="outline">{source.kind}</Badge>
        <Link
          className="font-mono text-xs underline underline-offset-2 hover:text-foreground"
          href={`/runs/${source.runId}`}
          title="Open source run"
        >
          {shortId(source.runId)}
        </Link>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-0.5">
      <Badge variant="outline">{source.kind}</Badge>
      <span className="font-mono text-muted-foreground text-xs">
        {source.replayKey}
      </span>
    </div>
  );
}

const columns: ColumnDef<ReplayAction>[] = [
  {
    accessorKey: "replayRunId",
    header: "Replay",
    cell: ({ row }): React.ReactElement => (
      <div className="flex flex-col gap-0.5">
        <Link
          className="font-mono text-xs underline underline-offset-2 hover:text-foreground"
          href={`/runs/${row.original.replayRunId}`}
          title="new run"
        >
          {shortId(row.original.replayRunId)}
        </Link>
        {row.original.repeatedOf && (
          <span className="text-muted-foreground text-xs">
            repeats {row.original.repeatedOf}
          </span>
        )}
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "source",
    header: "Source",
    cell: ({ row }): React.ReactElement => <SourceCell action={row.original} />,
    enableSorting: false,
  },
  {
    accessorKey: "actor",
    header: "Actor / Purpose",
    cell: ({ row }): React.ReactElement => (
      <div className="flex flex-col gap-0.5">
        <span className="font-mono text-xs">{row.original.actor}</span>
        <span
          className="max-w-48 truncate text-muted-foreground text-xs"
          title={row.original.purpose}
        >
          {row.original.purpose}
        </span>
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "targetEnvironment",
    header: "Env",
    cell: ({ row }): React.ReactElement => (
      <Badge variant="secondary">{row.original.targetEnvironment}</Badge>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "authorization",
    header: "Authorization",
    cell: ({ row }): React.ReactElement => (
      <ReplayAuthorizationBadge value={row.original.authorization} />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "injectedFault",
    header: "Fault",
    cell: ({ row }): React.ReactElement =>
      row.original.injectedFault ? (
        <Badge variant="outline">{row.original.injectedFault}</Badge>
      ) : (
        <span className="text-muted-foreground text-xs">—</span>
      ),
    enableSorting: false,
  },
  {
    accessorKey: "modelCallPermission",
    header: "Model",
    cell: ({ row }): React.ReactElement => (
      <span className="font-mono text-muted-foreground text-xs">
        {row.original.modelCallPermission}
      </span>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "disposableDatabase",
    header: "Cleanup",
    cell: ({ row }): React.ReactElement => (
      <Badge
        size="sm"
        variant={cleanupConfig[row.original.disposableDatabase.cleanupOutcome]}
      >
        {row.original.disposableDatabase.cleanupOutcome}
      </Badge>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "outcome",
    header: "Outcome",
    cell: ({ row }): React.ReactElement => (
      <div className="flex flex-col gap-0.5">
        <ReplayOutcomeBadge value={row.original.outcome} />
        {row.original.reasonCode && (
          <span className="font-mono text-muted-foreground text-xs">
            {row.original.reasonCode}
          </span>
        )}
      </div>
    ),
    enableSorting: false,
  },
];

/**
 * WB-6 T4 replay action audit: actor, purpose, source, environment,
 * authorization and cleanup — no source text; searchable by run id and
 * replay key via the recorded columns below.
 */
export function ReplayActionsTable({
  actions,
}: {
  actions: ReplayAction[];
}): React.ReactElement {
  const [outcome, setOutcome] = React.useState<string>("all");
  const [authorization, setAuthorization] = React.useState<string>("all");
  const [fault, setFault] = React.useState<string>("all");

  const filtered = React.useMemo(
    () =>
      actions.filter(
        (action) =>
          (outcome === "all" || action.outcome === outcome) &&
          (authorization === "all" || action.authorization === authorization) &&
          (fault === "all" ||
            (fault === "none" && action.injectedFault === undefined) ||
            action.injectedFault === fault),
      ),
    [actions, outcome, authorization, fault],
  );

  const filtersActive =
    outcome !== "all" || authorization !== "all" || fault !== "all";

  const clearFilters = (): void => {
    setOutcome("all");
    setAuthorization("all");
    setFault("all");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <Select
          aria-label="Filter by outcome"
          onValueChange={(value: string | null): void =>
            setOutcome(value ?? "all")
          }
          value={outcome}
        >
          <SelectTrigger className="w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectPopup>
            <SelectItem value="all">Outcome: all</SelectItem>
            <SelectItem value="completed">completed</SelectItem>
            <SelectItem value="blocked">blocked</SelectItem>
            <SelectItem value="failed_closed">failed closed</SelectItem>
            <SelectItem value="inconclusive">inconclusive</SelectItem>
          </SelectPopup>
        </Select>
        <Select
          aria-label="Filter by authorization"
          onValueChange={(value: string | null): void =>
            setAuthorization(value ?? "all")
          }
          value={authorization}
        >
          <SelectTrigger className="w-52">
            <SelectValue />
          </SelectTrigger>
          <SelectPopup>
            <SelectItem value="all">Authorization: all</SelectItem>
            <SelectItem value="deterministic">deterministic</SelectItem>
            <SelectItem value="live_authorized">live authorized</SelectItem>
            <SelectItem value="live_denied">live denied</SelectItem>
          </SelectPopup>
        </Select>
        <Select
          aria-label="Filter by injected fault"
          onValueChange={(value: string | null): void =>
            setFault(value ?? "all")
          }
          value={fault}
        >
          <SelectTrigger className="w-52">
            <SelectValue />
          </SelectTrigger>
          <SelectPopup>
            <SelectItem value="all">Fault: all</SelectItem>
            {faultOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
            <SelectItem value="none">none injected</SelectItem>
          </SelectPopup>
        </Select>
        {filtersActive && (
          <Button onClick={clearFilters} size="sm" variant="ghost">
            Clear filters
          </Button>
        )}
        <p aria-live="polite" className="ms-auto text-muted-foreground text-xs">
          {filtered.length} of {actions.length} replay actions · data-as-of Sep
          3, 09:15 CEST
        </p>
      </div>
      <DataTable columns={columns} data={filtered} pageSize={10}>
        <DataTableContent />
        <DataTablePagination />
      </DataTable>
    </div>
  );
}
