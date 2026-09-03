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
import { DecisionBadge } from "@/components/status-badge";
import { formatDateTime, shortId } from "@/lib/format";
import type { AgentRun, RegistrationMessage } from "@/lib/types";

const decisionOptions = [
  "registered",
  "asked",
  "ignored",
  "observed",
  "expired",
  "undecided",
] as const;

function RunLink({
  runs,
  messageId,
}: {
  runs: AgentRun[];
  messageId: number;
}): React.ReactElement {
  const run = runs.find((candidate) => candidate.messageId === messageId);
  return run ? (
    <div className="flex flex-col">
      <Link
        className="font-mono text-xs underline underline-offset-2 hover:text-foreground"
        href={`/runs/${run.runId}`}
      >
        {shortId(run.runId)}
      </Link>
      <span className="text-muted-foreground text-xs">
        retention {run.retentionClass}
      </span>
    </div>
  ) : (
    <NotRecorded label="unlinked" />
  );
}

const columns = (runs: AgentRun[]): ColumnDef<RegistrationMessage>[] => [
  {
    accessorKey: "id",
    header: "Message",
    cell: ({ row }): React.ReactElement => (
      <span className="font-mono text-xs">msg-{row.original.id}</span>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "direction",
    header: "Direction",
    cell: ({ row }): React.ReactElement => (
      <Badge
        variant={row.original.direction === "in" ? "outline" : "secondary"}
      >
        {row.original.direction}
      </Badge>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "sentAt",
    header: ({ column }): React.ReactElement => (
      <DataTableColumnHeader column={column} title="Sent" />
    ),
    cell: ({ row }): React.ReactElement => (
      <span className="whitespace-nowrap text-xs">
        {formatDateTime(row.original.sentAt)}
      </span>
    ),
  },
  {
    accessorKey: "reporterId",
    header: "Reporter",
    cell: ({ row }): React.ReactElement => (
      <span className="font-mono text-xs">{row.original.reporterId}</span>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "text",
    header: "Source text",
    cell: ({ row }): React.ReactElement => (
      <p className="max-w-96 truncate text-sm" title={row.original.text}>
        {row.original.text}
      </p>
    ),
    enableSorting: false,
  },
  {
    id: "decision",
    accessorFn: (message) => message.metadata.decision ?? "undecided",
    header: "Decision",
    cell: ({ row }): React.ReactElement => (
      <DecisionBadge value={row.original.metadata.decision} />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "identityState",
    header: "Identity",
    cell: ({ row }): React.ReactElement => (
      <Badge
        variant={
          row.original.identityState === "mapped" ? "secondary" : "warning"
        }
      >
        {row.original.identityState}
      </Badge>
    ),
    enableSorting: false,
  },
  {
    id: "run",
    header: "Run",
    cell: ({ row }): React.ReactElement => (
      <RunLink messageId={row.original.id} runs={runs} />
    ),
    enableSorting: false,
  },
];

export function MessagesTable({
  messages,
  runs,
}: {
  messages: RegistrationMessage[];
  runs: AgentRun[];
}): React.ReactElement {
  const [decision, setDecision] = React.useState<string>("all");
  const [direction, setDirection] = React.useState<string>("all");
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    const needle = query.trim().toLowerCase();
    return messages.filter(
      (message) =>
        (decision === "all" ||
          (message.metadata.decision ?? "undecided") === decision) &&
        (direction === "all" || message.direction === direction) &&
        (needle === "" ||
          message.text.toLowerCase().includes(needle) ||
          message.reporterId.toLowerCase().includes(needle)),
    );
  }, [messages, decision, direction, query]);

  const filtersActive =
    decision !== "all" || direction !== "all" || query.trim() !== "";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <Input
          aria-label="Search message text or reporter"
          className="w-64"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search text or reporter…"
          type="search"
          value={query}
        />
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
        <Select
          aria-label="Filter by direction"
          onValueChange={(value: string | null): void =>
            setDirection(value ?? "all")
          }
          value={direction}
        >
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectPopup>
            <SelectItem value="all">Direction: all</SelectItem>
            <SelectItem value="in">in (farmer)</SelectItem>
            <SelectItem value="out">out (agent)</SelectItem>
          </SelectPopup>
        </Select>
        {filtersActive && (
          <Button
            onClick={() => {
              setDecision("all");
              setDirection("all");
              setQuery("");
            }}
            size="sm"
            variant="ghost"
          >
            Clear filters
          </Button>
        )}
        <p aria-live="polite" className="ms-auto text-muted-foreground text-xs">
          {filtered.length} of {messages.length} messages · data-as-of Sep 3,
          09:15 CEST
        </p>
      </div>
      <DataTable columns={columns(runs)} data={filtered} pageSize={10}>
        <DataTableContent />
        <DataTablePagination />
      </DataTable>
    </div>
  );
}
