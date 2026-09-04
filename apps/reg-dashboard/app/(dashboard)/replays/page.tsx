import { Badge } from "@coss/ui/components/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@coss/ui/components/table";
import Link from "next/link";
import type * as React from "react";
import {
  AppHeader,
  AppHeaderActions,
  AppHeaderContent,
  AppHeaderDescription,
} from "@/components/app/app-header";
import { Panel } from "@/components/app/panel";
import { ReplayActionsTable } from "@/components/app/replay-actions-table";
import { ReplayLauncher } from "@/components/app/replay-launcher";
import { ContentClassTag } from "@/components/content-class-tag";
import { shortId } from "@/lib/format";
import { replayActions } from "@/lib/mock/replays";
import type { ReplayAction, ReplayFault } from "@/lib/types";

const faultMatrix: {
  fault: ReplayFault;
  expected: string;
  recovery: string;
}[] = [
  {
    fault: "provider_429",
    expected: "retried → undecided (backoff)",
    recovery:
      "Farmer-safe: the request backs off and retries; the business decision stays undecided — no partial registration is shown.",
  },
  {
    fault: "provider_timeout",
    expected: "timed_out (E_TIMEOUT)",
    recovery:
      "Farmer-safe: the attempt terminates with a reason code and the flow resumes on retry; no false success is displayed.",
  },
  {
    fault: "malformed_tool_result",
    expected: "failed (E_TOOL_RESULT_MALFORMED)",
    recovery:
      "Farmer-safe: the structured tool boundary rejects the result; invalid data never reaches the domain validation.",
  },
  {
    fault: "invariant_rejection",
    expected: "validation invariant_failed",
    recovery:
      "Farmer-safe: the failed rule is named and returned as a clarification request — never a silent drop or guess.",
  },
  {
    fault: "database_failure",
    expected: "failed (E_DB_UNAVAILABLE)",
    recovery:
      "Farmer-safe: the transaction rolls back and nothing is written; the run retries once the database is reachable.",
  },
  {
    fault: "duplicate_update",
    expected: "validation rejected — idempotent, no orphaned rows",
    recovery:
      "Farmer-safe: the repeated replay is idempotent in the disposable database — no orphaned authoritative rows or misleading success.",
  },
  {
    fault: "restart_recovery",
    expected: "recovered after retry (resumed from checkpoint)",
    recovery:
      "Farmer-safe: the worker resumes from the checkpointed event in order, without duplicating records or replies.",
  },
];

/** Fault cell links to the recorded replay run exercising this fault (T3). */
function FaultCell({ fault }: { fault: ReplayFault }): React.ReactElement {
  const action = replayActions.find(
    (candidate: ReplayAction) => candidate.injectedFault === fault,
  );
  if (!action) {
    return (
      <span className="flex items-center gap-2">
        <span className="font-mono text-xs">{fault}</span>
        <span
          className="text-muted-foreground/70 text-xs italic"
          title="not exercised"
        >
          not exercised
        </span>
      </span>
    );
  }
  return (
    <span className="flex items-center gap-2">
      <Link
        className="font-mono text-xs underline underline-offset-2 hover:text-foreground"
        href={`/runs/${action.replayRunId}`}
        title="Open replay run exercising this fault"
      >
        {fault}
      </Link>
      <span className="font-mono text-muted-foreground text-xs">
        {shortId(action.replayRunId)}
      </span>
    </span>
  );
}

export default function ReplaysPage() {
  return (
    <>
      <AppHeader>
        <AppHeaderContent title="Replays">
          <AppHeaderDescription>
            Reproduce a failing synthetic case and inject bounded failures
            without writing to pilot data (WB-6).
          </AppHeaderDescription>
        </AppHeaderContent>
        <AppHeaderActions>
          <Badge variant="secondary">{replayActions.length} actions</Badge>
        </AppHeaderActions>
      </AppHeader>

      <Panel
        description="Audit of every replay action (T4): actor, purpose, source, environment, authorization and cleanup outcome — no source text or secrets; searchable by run id and replay key."
        title={
          <span className="flex items-center gap-2">
            <ContentClassTag value="evaluation" /> Replay actions
          </span>
        }
      >
        <ReplayActionsTable actions={replayActions} />
      </Panel>

      <Panel
        className="mt-6"
        description="Replays run in a disposable environment (T1): a fresh run_id, the same declared versions and a repository-owned disposable database; original and replay runs are linked explicitly."
        title="Launch replay"
      >
        <ReplayLauncher actions={replayActions} />
      </Panel>

      <Panel
        className="mt-6 mb-4"
        description="Each injected fault must produce the correct execution/reason status, retry/terminal event and farmer-safe recovery result (T3, from OPS-5/QA-5). A fault without a recorded action is marked not exercised — never assumed."
        title="Fault injection matrix (T3)"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fault</TableHead>
              <TableHead>Expected status</TableHead>
              <TableHead>Recovery</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {faultMatrix.map((row) => (
              <TableRow key={row.fault}>
                <TableCell>
                  <FaultCell fault={row.fault} />
                </TableCell>
                <TableCell className="text-xs">{row.expected}</TableCell>
                <TableCell className="max-w-96 whitespace-normal text-muted-foreground text-xs">
                  {row.recovery}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>
    </>
  );
}
