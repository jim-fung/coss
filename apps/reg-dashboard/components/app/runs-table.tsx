"use client";

import { Badge } from "@coss/ui/components/badge";
import { Button } from "@coss/ui/components/button";
import {
  DataTable,
  DataTableColumnHeader,
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
import { NotRecorded } from "@/components/not-recorded";
import {
  DecisionBadge,
  ExecutionBadge,
  ValidationBadge,
} from "@/components/status-badge";
import { formatDateTime, formatDuration, shortId } from "@/lib/format";
import type { AgentRun } from "@/lib/types";

const columns: ColumnDef<AgentRun>[] = [
  {
    accessorKey: "runId",
    header: ({ column }): React.ReactElement => (
      <DataTableColumnHeader column={column} title="Run" />
    ),
    cell: ({ row }): React.ReactElement => (
      <Link
        className="font-mono text-xs underline underline-offset-2 hover:text-foreground"
        href={`/runs/${row.original.runId}`}
      >
        {shortId(row.original.runId)}
        {row.original.sourceKind === "replay" ? " (replay)" : ""}
      </Link>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "startedAt",
    header: ({ column }): React.ReactElement => (
      <DataTableColumnHeader column={column} title="Started" />
    ),
    cell: ({ row }): React.ReactElement => (
      <span className="whitespace-nowrap text-xs">
        {formatDateTime(row.original.startedAt)}
      </span>
    ),
  },
  {
    accessorKey: "sourceKind",
    header: "Source",
    cell: ({ row }): React.ReactElement => (
      <Badge variant="outline">{row.original.sourceKind}</Badge>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "executionStatus",
    header: "Execution",
    cell: ({ row }): React.ReactElement => (
      <ExecutionBadge value={row.original.executionStatus} />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "businessDecision",
    header: "Decision",
    cell: ({ row }): React.ReactElement => (
      <DecisionBadge value={row.original.businessDecision} />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "validationStatus",
    header: "Validation",
    cell: ({ row }): React.ReactElement => (
      <ValidationBadge value={row.original.validationStatus} />
    ),
    enableSorting: false,
  },
  {
    id: "duration",
    header: "Duration",
    cell: ({ row }): React.ReactElement => (
      <span className="whitespace-nowrap text-xs">
        {formatDuration(row.original.startedAt, row.original.endedAt)}
      </span>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "traceId",
    header: "Trace",
    cell: ({ row }): React.ReactElement =>
      row.original.traceId ? (
        <span className="font-mono text-xs">
          {shortId(row.original.traceId, 10)}
        </span>
      ) : (
        <NotRecorded />
      ),
    enableSorting: false,
  },
];

const executionOptions = [
  "succeeded",
  "failed",
  "retried",
  "running",
  "timed_out",
] as const;
const decisionOptions = [
  "registered",
  "asked",
  "ignored",
  "observed",
  "expired",
  "undecided",
] as const;

export function RunsTable({ runs }: { runs: AgentRun[] }): React.ReactElement {
  const [execution, setExecution] = React.useState<string>("all");
  const [decision, setDecision] = React.useState<string>("all");

  const filtered = React.useMemo(
    () =>
      runs.filter(
        (run) =>
          (execution === "all" || run.executionStatus === execution) &&
          (decision === "all" || run.businessDecision === decision),
      ),
    [runs, execution, decision],
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <Select
          aria-label="Filter by execution status"
          onValueChange={(value: string | null): void =>
            setExecution(value ?? "all")
          }
          value={execution}
        >
          <SelectTrigger className="w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectPopup>
            <SelectItem value="all">Execution: all</SelectItem>
            {executionOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option.replace("_", " ")}
              </SelectItem>
            ))}
          </SelectPopup>
        </Select>
        <Select
          aria-label="Filter by business decision"
          onValueChange={(value: string | null): void =>
            setDecision(value ?? "all")
          }
          value={decision}
        >
          <SelectTrigger className="w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectPopup>
            <SelectItem value="all">Decision: all</SelectItem>
            {decisionOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectPopup>
        </Select>
        {(execution !== "all" || decision !== "all") && (
          <Button
            onClick={() => {
              setExecution("all");
              setDecision("all");
            }}
            size="sm"
            variant="ghost"
          >
            Clear filters
          </Button>
        )}
        <p aria-live="polite" className="ms-auto text-muted-foreground text-xs">
          {filtered.length} of {runs.length} runs · data-as-of Sep 3, 09:15 CEST
        </p>
      </div>
      <DataTable columns={columns} data={filtered} pageSize={10}>
        <DataTableContent />
        <DataTablePagination />
      </DataTable>
    </div>
  );
}
