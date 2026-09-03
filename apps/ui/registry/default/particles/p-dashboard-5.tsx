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
  p50Ms: number;
  p95Ms: number;
  tokensInK: number;
  tokensOutK: number;
  costEur: number;
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
    p50Ms: 1200,
    p95Ms: 3400,
    tokensInK: 12.4,
    tokensOutK: 3.1,
    costEur: 0.042,
  },
  {
    id: 2,
    runId: "run_a3f08d12",
    status: "running",
    p50Ms: 800,
    p95Ms: 2600,
    tokensInK: 8.1,
    tokensOutK: 1.9,
    costEur: 0.027,
  },
  {
    id: 3,
    runId: "run_e49b77c0",
    status: "failed",
    p50Ms: 1400,
    p95Ms: 4200,
    tokensInK: 9.6,
    tokensOutK: 0.4,
    costEur: 0.026,
  },
  {
    id: 4,
    runId: "run_5d2c8ef1",
    status: "timed_out",
    p50Ms: 1100,
    p95Ms: 30000,
    tokensInK: 21.7,
    tokensOutK: 2.2,
    costEur: 0.061,
  },
  {
    id: 5,
    runId: "run_b90a3f6e",
    attempt: 2,
    status: "retried",
    p50Ms: 1300,
    p95Ms: 3900,
    tokensInK: 14.8,
    tokensOutK: 3.4,
    costEur: 0.049,
  },
  {
    id: 6,
    runId: "run_12fa4c8d",
    status: "succeeded",
    p50Ms: 1000,
    p95Ms: 2800,
    tokensInK: 10.2,
    tokensOutK: 2.7,
    costEur: 0.035,
  },
];

function formatSeconds(ms: number): string {
  return `${(ms / 1000).toFixed(1)}s`;
}

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
  const totalTokensIn = visibleRuns.reduce((sum, r) => sum + r.tokensInK, 0);
  const totalTokensOut = visibleRuns.reduce((sum, r) => sum + r.tokensOutK, 0);
  const totalCost = visibleRuns.reduce((sum, r) => sum + r.costEur, 0);
  const avgP95 = visibleRuns.length
    ? visibleRuns.reduce((sum, r) => sum + r.p95Ms, 0) / visibleRuns.length
    : 0;

  return (
    <div className="grid gap-4">
      <Card className="w-full overflow-hidden">
        <CardHeader className="border-b">
          <CardTitle>Agent runs</CardTitle>
          <CardDescription>
            Processing runs, last 24 hours{" "}
            <span className="inline-flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className="size-1.5 animate-pulse rounded-full bg-success"
              />
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
                  <div className="text-sm">p50 {formatSeconds(run.p50Ms)}</div>
                  <div className="text-muted-foreground text-xs">
                    p95 {formatSeconds(run.p95Ms)}
                  </div>
                  <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full ${latencyBarColor(run.p95Ms)}`}
                      style={{ width: latencyBarWidth(run.p95Ms) }}
                    />
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap tabular-nums">
                  {run.tokensInK.toFixed(1)}k in / {run.tokensOutK.toFixed(1)}k
                  out
                </TableCell>
                <TableCell className="tabular-nums">
                  €{run.costEur.toFixed(3)}
                </TableCell>
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
                {visibleRuns.length} {visibleRuns.length === 1 ? "run" : "runs"}
              </TableCell>
              <TableCell className="text-muted-foreground">—</TableCell>
              <TableCell className="text-muted-foreground">
                avg p95 {formatSeconds(avgP95)}
              </TableCell>
              <TableCell className="whitespace-nowrap text-muted-foreground">
                {totalTokensIn.toFixed(1)}k in / {totalTokensOut.toFixed(1)}k
                out
              </TableCell>
              <TableCell className="text-muted-foreground">
                €{totalCost.toFixed(3)}
              </TableCell>
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
