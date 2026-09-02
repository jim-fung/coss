import { RotateCcwIcon } from "lucide-react";
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
];

const agentRuns: AgentRun[] = [
  {
    id: 1,
    runId: "run_7c1e9a4b",
    status: "succeeded",
    latencyP50: "1.2s",
    latencyP95: "3.4s",
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
    tokensIn: "10.2k",
    tokensOut: "2.7k",
    cost: "€0.035",
  },
];

export default function Particle() {
  return (
    <div className="grid gap-4">
      <Card className="w-full overflow-hidden">
        <CardHeader className="border-b">
          <CardTitle>Agent runs</CardTitle>
          <CardDescription>Processing runs, last 24 hours</CardDescription>
          <CardAction>
            <Select
              aria-label="Filter by status"
              defaultValue="all"
              items={statusOptions}
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
            {agentRuns.map((run) => (
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
        </Table>
      </Card>
    </div>
  );
}
