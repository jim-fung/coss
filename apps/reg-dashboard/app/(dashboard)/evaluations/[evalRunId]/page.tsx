import { Badge } from "@coss/ui/components/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@coss/ui/components/table";
import {
  AlertTriangleIcon,
  ArrowLeftIcon,
  CheckIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type * as React from "react";
import { AppHeader, AppHeaderContent } from "@/components/app/app-header";
import { Panel } from "@/components/app/panel";
import { NotRecorded } from "@/components/not-recorded";
import { VerdictBadge } from "@/components/status-badge";
import { formatCost, formatDateTime, formatDurationMs } from "@/lib/format";
import { getEvalCases, getEvalRun } from "@/lib/mock-data";

function DiffValue({ value }: { value: string }): React.ReactElement {
  return <span className="font-mono text-xs">{value}</span>;
}

export default async function EvalRunDetailPage({
  params,
}: {
  params: Promise<{ evalRunId: string }>;
}) {
  const { evalRunId } = await params;
  const evalRun = getEvalRun(evalRunId);
  if (!evalRun) {
    notFound();
  }

  const cases = getEvalCases(evalRun.evalRunId);
  const passed = cases.filter((result) => result.verdict === "pass").length;
  const failed = cases.filter((result) => result.verdict === "fail").length;
  const flaky = cases.filter((result) => result.verdict === "flaky").length;
  const notRun = cases.filter((result) => result.verdict === "not_run").length;
  const hasGateFailure = failed > 0;

  return (
    <>
      <AppHeader>
        <AppHeaderContent title={evalRun.evalRunId}>
          <Link
            className="flex items-center gap-1 text-muted-foreground text-sm underline underline-offset-2 hover:text-foreground"
            href="/evaluations"
          >
            <ArrowLeftIcon className="size-3.5" /> Back to evaluations
          </Link>
        </AppHeaderContent>
      </AppHeader>

      <Panel
        description="Expected-vs-actual over the golden set with denominators beside every rate (WB-7 T2/T3)."
        title="Run envelope"
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <span>
            Fixture:{" "}
            <span className="font-mono text-xs">
              {evalRun.fixtureReference}
            </span>{" "}
            <Badge className="ms-1" variant="outline">
              {evalRun.fixtureRedactionState}
            </Badge>
          </span>
          <span>
            Versions:{" "}
            <span className="font-mono text-xs">
              {evalRun.baselineVersion} → {evalRun.candidateVersion}
            </span>
          </span>
          <span>
            Schema:{" "}
            <span className="font-mono text-xs">{evalRun.schemaVersion}</span>
          </span>
          <span>
            Mode: <Badge variant="outline">{evalRun.executionMode}</Badge>
          </span>
          <span className="text-muted-foreground text-xs">
            {formatDateTime(evalRun.startedAt)} →{" "}
            {evalRun.endedAt ? formatDateTime(evalRun.endedAt) : "in flight"}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <VerdictBadge value={evalRun.verdict} />
          <span className="text-muted-foreground text-xs">
            denominator {cases.length} cases · {passed} pass · {failed} fail ·{" "}
            {flaky} flaky{notRun > 0 && ` · ${notRun} not run`}
          </span>
        </div>

        {hasGateFailure && (
          <div className="mt-4 flex items-start gap-2 rounded-md border border-destructive/40 bg-destructive/8 p-3 text-sm">
            <AlertTriangleIcon
              aria-hidden
              className="mt-0.5 size-4 shrink-0 text-destructive"
            />
            <p>
              <span className="font-medium text-destructive">
                Regression gate failed.
              </span>{" "}
              A protected golden moved pass → fail; the candidate cannot ship
              without a reviewed ADR/spec note (QA-8). Intentionally breaking a
              prompt is visible here, never silent.
            </p>
          </div>
        )}
      </Panel>

      <Panel className="mt-6 mb-4" title="Case results">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Case</TableHead>
              <TableHead>Verdict</TableHead>
              <TableHead>Expected vs actual</TableHead>
              <TableHead>Invariants</TableHead>
              <TableHead>Retries</TableHead>
              <TableHead>Latency</TableHead>
              <TableHead>Tokens</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead>Run link</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cases.map((result) => (
              <TableRow key={result.id}>
                <TableCell className="font-mono text-xs">
                  {result.caseId}
                </TableCell>
                <TableCell>
                  <VerdictBadge value={result.verdict} />
                </TableCell>
                <TableCell>
                  {Object.keys(result.fieldDiff).length ? (
                    <div className="flex flex-col gap-1">
                      {Object.entries(result.fieldDiff).map(([field, diff]) => (
                        <span key={field} className="flex items-center gap-1.5">
                          <XIcon
                            aria-label="mismatch"
                            className="size-3.5 shrink-0 text-destructive"
                          />
                          <span className="font-mono text-muted-foreground text-xs">
                            {field}:
                          </span>
                          <DiffValue value={diff.expected} />
                          <span className="text-muted-foreground text-xs">
                            →
                          </span>
                          <DiffValue value={diff.actual} />
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <CheckIcon
                        aria-label="match"
                        className="size-3.5 text-success"
                      />
                      <span className="text-muted-foreground text-xs">
                        {result.actualOutcome}
                      </span>
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(result.invariantResults).map(
                      ([name, ok]) => (
                        <Badge key={name} variant={ok ? "success" : "error"}>
                          {name}
                          {ok ? "" : " ✗"}
                        </Badge>
                      ),
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-xs">{result.retryCount}</TableCell>
                <TableCell className="text-xs">
                  {formatDurationMs(result.latencyMs)}
                </TableCell>
                <TableCell className="text-xs">{result.tokenCount}</TableCell>
                <TableCell className="text-xs">
                  {formatCost(result.costAmount)}
                </TableCell>
                <TableCell>
                  {result.runId ? (
                    <Link
                      className="font-mono text-xs underline underline-offset-2 hover:text-foreground"
                      href={`/runs/${result.runId}`}
                    >
                      {result.runId.slice(0, 8)}
                    </Link>
                  ) : (
                    <NotRecorded label="not applicable" />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <p className="mt-3 text-muted-foreground text-xs">
          Live evaluation is visibly labelled and authorised; deterministic runs
          execute offline against a disposable database (WB-6 T2).
        </p>
      </Panel>
    </>
  );
}
