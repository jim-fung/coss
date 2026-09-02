"use client";

import { RotateCcwIcon } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/default/ui/table";

type RunStatus = "succeeded" | "running" | "failed" | "timed_out" | "retried";

interface AgentRun {
  id: number;
  runId: string;
  attempt?: number;
  status: RunStatus;
  latencyP50: string;
  latencyP95: string;
  p95Ms: number;
  tokensIn: string;
  tokensOut: string;
  cost: string;
}

const statusVariants: Record<
  RunStatus,
  "success" | "info" | "destructive" | "warning" | "secondary"
> = {
  succeeded: "success",
  running: "info",
  failed: "destructive",
  timed_out: "warning",
  retried: "secondary",
};

const statusOptions = [
  { label: "All statuses", value: "all" },
  { label: "Running", value: "running" },
  { label: "Succeeded", value: "succeeded" },
  { label: "Failed", value: "failed" },
  { label: "Timed out", value: "timed_out" },
  { label: "Retried", value: "retried" },
];

const agentRuns: AgentRun[] = [
  {
    id: 1,
    runId: "run_7c1e9a4b",
    status: "succeeded",
    latencyP50: "1.2s",
    latencyP95: "3.4s",
    p95Ms: 3400,
    tokensIn: "12.4k",
    tokensOut: "3.1k",
    cost: "€0.042",
  },
  {
    id: 2,
    runId: "run_a3f08d12",
    status: "running",
    latencyP50: "0.8s",
    latencyP95: "2.6s",
    p95Ms: 2600,
    tokensIn: "8.1k",
    tokensOut: "1.9k",
    cost: "€0.027",
  },
  {
    id: 3,
    runId: "run_e49b77c0",
    status: "failed",
    latencyP50: "1.4s",
    latencyP95: "4.2s",
    p95Ms: 4200,
    tokensIn: "9.6k",
    tokensOut: "0.4k",
    cost: "€0.026",
  },
  {
    id: 4,
    runId: "run_5d2c8ef1",
    status: "timed_out",
    latencyP50: "1.1s",
    latencyP95: "30.0s",
    p95Ms: 30000,
    tokensIn: "21.7k",
    tokensOut: "2.2k",
    cost: "€0.061",
  },
  {
    id: 5,
    runId: "run_b90a3f6e",
    attempt: 2,
    status: "retried",
    latencyP50: "1.3s",
    latencyP95: "3.9s",
    p95Ms: 3900,
    tokensIn: "14.8k",
    tokensOut: "3.4k",
    cost: "€0.049",
  },
  {
    id: 6,
    runId: "run_12fa4c8d",
    status: "succeeded",
    latencyP50: "1.0s",
    latencyP95: "2.8s",
    p95Ms: 2800,
    tokensIn: "10.2k",
    tokensOut: "2.7k",
    cost: "€0.035",
  },
];

function latencyBarWidth(p95Ms: number): string {
  return `${Math.min(100, Math.round((p95Ms / 30000) * 100))}%`;
}

function latencyBarColor(p95Ms: number): string {
  if (p95Ms > 20000) {
    return "bg-destructive";
  }
  if (p95Ms > 10000) {
    return "bg-warning";
  }
  return "bg-success";
}

export default function Particle() {
  const [statusFilter, setStatusFilter] = useState("all");
  const visibleRuns =
    statusFilter === "all"
      ? agentRuns
      : agentRuns.filter((run) => run.status === statusFilter);

  return (
    <div className="grid gap-4">
      <Card className="w-full overflow-hidden">
        <CardHeader className="border-b">
          <CardTitle>Agent runs</CardTitle>
          <CardDescription>
            Processing runs, last 24 hours{" "}
            <span className="inline-flex items-center gap-1.5">
              <span className="size-1.5 animate-pulse rounded-full bg-success" />
              <span className="text-muted-foreground">
                live · polled 5s ago
              </span>
            </span>
          </CardDescription>
          <CardAction>
            <Select
              aria-label="Filter by status"
              items={statusOptions}
              onValueChange={(value) => setStatusFilter(value ?? "all")}
              value={statusFilter}
            >
              <SelectTrigger className="w-36" size="sm">
                <SelectValue />
              </SelectTrigger>
              <SelectPopup>
                {statusOptions.map(({ label, value }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectPopup>
            </Select>
          </CardAction>
        </CardHeader>
        <Table variant="card">
          <TableHeader>
            <TableRow>
              <TableHead>Run</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Latency</TableHead>
              <TableHead>Tokens</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead className="text-right">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visibleRuns.map((run) => (
              <TableRow key={run.id}>
                <TableCell>
                  <div className="font-mono text-muted-foreground text-xs">
                    {run.runId}
                  </div>
                  {run.attempt ? (
                    <div className="text-muted-foreground text-xs">
                      attempt {run.attempt}
                    </div>
                  ) : null}
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariants[run.status]}>
                    {run.status}
                  </Badge>
                </TableCell>
                <TableCell className="tabular-nums">
                  <div className="text-sm">p50 {run.latencyP50}</div>
                  <div className="text-muted-foreground text-xs">
                    p95 {run.latencyP95}
                  </div>
                  <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full ${latencyBarColor(run.p95Ms)}`}
                      style={{ width: latencyBarWidth(run.p95Ms) }}
                    />
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap tabular-nums">
                  {run.tokensIn} in / {run.tokensOut} out
                </TableCell>
                <TableCell className="tabular-nums">{run.cost}</TableCell>
                <TableCell className="text-right">
                  {run.status === "failed" || run.status === "timed_out" ? (
                    <Button size="sm" variant="outline">
                      <RotateCcwIcon />
                      Retry
                    </Button>
                  ) : (
                    <Button size="sm" variant="ghost">
                      Trace
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className="text-muted-foreground">
                {agentRuns.length} runs
              </TableCell>
              <TableCell className="text-muted-foreground">—</TableCell>
              <TableCell className="text-muted-foreground">
                avg p95 8.2s
              </TableCell>
              <TableCell className="whitespace-nowrap text-muted-foreground">
                69.8k in / 13.6k out
              </TableCell>
              <TableCell className="text-muted-foreground">€0.240</TableCell>
              <TableCell className="text-right text-muted-foreground">
                —
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Card>
    </div>
  );
}
