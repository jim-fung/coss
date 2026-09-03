"use client";

import { Badge } from "@coss/ui/components/badge";
import { Button } from "@coss/ui/components/button";
import {
  DataTable,
  DataTableColumnHeader,
  DataTableContent,
  DataTablePagination,
} from "@coss/ui/components/data-table";
import { Input } from "@coss/ui/components/input";
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
import type { AgentRun, Farm } from "@/lib/types";

function columns(farms: Farm[]): ColumnDef<AgentRun>[] {
  const farmName = (farmId: string): string =>
    farms.find((farm) => farm.farmId === farmId)?.name ?? farmId;

  return [
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
      id: "scope",
      header: "Scope",
      cell: ({ row }): React.ReactElement => (
        <div className="flex flex-col gap-0.5">
          <Badge variant="secondary">{row.original.environment}</Badge>
          <span className="text-muted-foreground text-xs">
            {farmName(row.original.farmId)}
          </span>
        </div>
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
}

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
const environmentOptions = ["staging", "pilot", "ci"] as const;
const sourceKindOptions = ["telegram", "import", "replay"] as const;

/** Stable-identifier lookup only — the documented safe filter set (WB-4 T2). */
function matchesIdentifier(run: AgentRun, needle: string): boolean {
  return [run.runId, run.entryId, run.traceId, run.conversationId].some(
    (identifier) =>
      identifier?.toLowerCase().includes(needle.toLowerCase()) ?? false,
  );
}

export function RunsTable({
  farms,
  runs,
}: {
  farms: Farm[];
  runs: AgentRun[];
}): React.ReactElement {
  const [execution, setExecution] = React.useState<string>("all");
  const [decision, setDecision] = React.useState<string>("all");
  const [environment, setEnvironment] = React.useState<string>("all");
  const [sourceKind, setSourceKind] = React.useState<string>("all");
  const [farmId, setFarmId] = React.useState<string>("all");
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    const needle = query.trim();
    return runs.filter(
      (run) =>
        (execution === "all" || run.executionStatus === execution) &&
        (decision === "all" ||
          (run.businessDecision ?? "undecided") === decision) &&
        (environment === "all" || run.environment === environment) &&
        (sourceKind === "all" || run.sourceKind === sourceKind) &&
        (farmId === "all" || run.farmId === farmId) &&
        (needle === "" || matchesIdentifier(run, needle)),
    );
  }, [runs, execution, decision, environment, sourceKind, farmId, query]);

  const filtersActive =
    execution !== "all" ||
    decision !== "all" ||
    environment !== "all" ||
    sourceKind !== "all" ||
    farmId !== "all" ||
    query.trim() !== "";

  const clearFilters = (): void => {
    setExecution("all");
    setDecision("all");
    setEnvironment("all");
    setSourceKind("all");
    setFarmId("all");
    setQuery("");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <Input
          aria-label="Look up run_id, entry_id, trace_id or conversation_id"
          className="w-72"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="run_id, entry_id, trace_id…"
          type="search"
          value={query}
        />
        <Select
          aria-label="Filter by environment"
          onValueChange={(value: string | null): void =>
            setEnvironment(value ?? "all")
          }
          value={environment}
        >
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectPopup>
            <SelectItem value="all">Environment: all</SelectItem>
            {environmentOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectPopup>
        </Select>
        <Select
          aria-label="Filter by source kind"
          onValueChange={(value: string | null): void =>
            setSourceKind(value ?? "all")
          }
          value={sourceKind}
        >
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectPopup>
            <SelectItem value="all">Source: all</SelectItem>
            {sourceKindOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectPopup>
        </Select>
        <Select
          aria-label="Filter by farm scope"
          onValueChange={(value: string | null): void =>
            setFarmId(value ?? "all")
          }
          value={farmId}
        >
          <SelectTrigger className="w-52">
            <SelectValue />
          </SelectTrigger>
          <SelectPopup>
            <SelectItem value="all">Farm scope: all</SelectItem>
            {farms.map((farm) => (
              <SelectItem key={farm.farmId} value={farm.farmId}>
                {farm.name}
              </SelectItem>
            ))}
          </SelectPopup>
        </Select>
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
        {filtersActive && (
          <Button onClick={clearFilters} size="sm" variant="ghost">
            Clear filters
          </Button>
        )}
        <p aria-live="polite" className="ms-auto text-muted-foreground text-xs">
          {filtered.length} of {runs.length} runs · data-as-of Sep 3, 09:15 CEST
        </p>
      </div>
      <DataTable columns={columns(farms)} data={filtered} pageSize={10}>
        <DataTableContent />
        <DataTablePagination />
      </DataTable>
    </div>
  );
}
