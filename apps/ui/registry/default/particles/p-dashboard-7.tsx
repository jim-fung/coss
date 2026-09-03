"use client";

import {
  ActivityIcon,
  BrainIcon,
  DatabaseIcon,
  type LucideIcon,
  SendIcon,
} from "lucide-react";
import { Fragment } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Badge } from "@/registry/default/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/registry/default/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/registry/default/ui/chart";
import { Separator } from "@/registry/default/ui/separator";

type TrendVariant = "success" | "destructive";

const stats: {
  id: string;
  label: string;
  value: number;
  trendLabel: string;
  trendVariant: TrendVariant;
}[] = [
  {
    id: "messages",
    label: "Messages received",
    value: 128,
    trendLabel: "+18%",
    trendVariant: "success",
  },
  {
    id: "registered",
    label: "Registered",
    value: 96,
    trendLabel: "+12%",
    trendVariant: "success",
  },
  {
    id: "failed",
    label: "Failed runs",
    value: 3,
    trendLabel: "4 retried",
    trendVariant: "destructive",
  },
];

const flowData = [
  { day: "Mon", received: 16, registered: 12, asked: 3 },
  { day: "Tue", received: 18, registered: 14, asked: 2 },
  { day: "Wed", received: 14, registered: 10, asked: 2 },
  { day: "Thu", received: 24, registered: 18, asked: 3 },
  { day: "Fri", received: 20, registered: 15, asked: 1 },
  { day: "Sat", received: 16, registered: 12, asked: 2 },
  { day: "Sun", received: 20, registered: 15, asked: 1 },
];

const flowConfig = {
  received: { label: "Received", color: "var(--chart-1)" },
  registered: { label: "Registered", color: "var(--chart-2)" },
  asked: { label: "Asked", color: "var(--chart-3)" },
} satisfies ChartConfig;

type HealthStatus = "healthy" | "degraded";

const healthRows: {
  icon: LucideIcon;
  label: string;
  status: HealthStatus;
}[] = [
  { icon: ActivityIcon, label: "Worker heartbeat", status: "healthy" },
  { icon: SendIcon, label: "Telegram polling", status: "healthy" },
  { icon: BrainIcon, label: "Model provider", status: "degraded" },
  { icon: DatabaseIcon, label: "Database", status: "healthy" },
];

const healthVariants: Record<HealthStatus, "success" | "warning"> = {
  healthy: "success",
  degraded: "warning",
};

type QueueStatus = "asked" | "pending";

const queueRows: {
  id: string;
  snippet: string;
  farmer: string;
  status: QueueStatus;
  runId: string;
}[] = [
  {
    id: "queue-1",
    snippet: "vandaag 3 uur gespoten op de pompoen",
    farmer: "Cornelis Visser",
    status: "asked",
    runId: "run_3f9ac2e1",
  },
  {
    id: "queue-2",
    snippet: "1.5 uur onkruid gewied in de sjalotten",
    farmer: "Hendrik de Vries",
    status: "pending",
    runId: "run_60ba4d8e",
  },
  {
    id: "queue-3",
    snippet: "net zaaibed geprepareerd voor de wintertarwe",
    farmer: "Martijn Brouwer",
    status: "asked",
    runId: "run_f1e27b94",
  },
];

const queueVariants: Record<QueueStatus, "info" | "outline"> = {
  asked: "info",
  pending: "outline",
};

type RunStatus = "succeeded" | "failed" | "running";

const runRows: {
  runId: string;
  status: RunStatus;
  cost: string;
}[] = [
  { runId: "run_7c1e9a4b", status: "succeeded", cost: "€0.042" },
  { runId: "run_e49b77c0", status: "failed", cost: "€0.026" },
  { runId: "run_a3f08d12", status: "running", cost: "€0.027" },
];

const runVariants: Record<RunStatus, "success" | "destructive" | "info"> = {
  succeeded: "success",
  failed: "destructive",
  running: "info",
};

export default function Particle() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {stats.map((stat) => (
        <Card className="lg:col-span-1" key={stat.id}>
          <CardHeader>
            <CardDescription>{stat.label}</CardDescription>
            <CardTitle className="text-xl tabular-nums">{stat.value}</CardTitle>
            <CardAction>
              <Badge size="sm" variant={stat.trendVariant}>
                {stat.trendLabel}
              </Badge>
            </CardAction>
          </CardHeader>
        </Card>
      ))}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Message flow</CardTitle>
          <CardDescription>Telegram → records, last 7 days</CardDescription>
        </CardHeader>
        <CardPanel>
          <ChartContainer className="h-48 w-full" config={flowConfig}>
            <AreaChart data={flowData} margin={{ left: -24, right: 12 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                axisLine={false}
                dataKey="day"
                tickLine={false}
                tickMargin={8}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Area
                dataKey="received"
                fill="url(#overviewReceived)"
                stroke="var(--color-received)"
                stackId="a"
                type="natural"
              />
              <Area
                dataKey="registered"
                fill="url(#overviewRegistered)"
                stroke="var(--color-registered)"
                stackId="a"
                type="natural"
              />
              <Area
                dataKey="asked"
                fill="url(#overviewAsked)"
                stroke="var(--color-asked)"
                stackId="a"
                type="natural"
              />
              <defs>
                <linearGradient
                  id="overviewReceived"
                  x1="0"
                  x2="0"
                  y1="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="var(--color-received)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-received)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient
                  id="overviewRegistered"
                  x1="0"
                  x2="0"
                  y1="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="var(--color-registered)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-registered)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="overviewAsked" x1="0" x2="0" y1="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-asked)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-asked)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
            </AreaChart>
          </ChartContainer>
        </CardPanel>
      </Card>
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Service health</CardTitle>
        </CardHeader>
        <CardPanel>
          <div>
            {healthRows.map((row, index) => (
              <Fragment key={row.label}>
                {index > 0 ? <Separator /> : null}
                <div className="flex items-center justify-between gap-4 py-2">
                  <div className="flex min-w-0 items-center gap-2">
                    <row.icon
                      aria-hidden="true"
                      className="size-3.5 shrink-0 text-muted-foreground"
                    />
                    <span
                      aria-hidden="true"
                      className={
                        row.status === "healthy"
                          ? "size-1.5 animate-pulse rounded-full bg-success"
                          : "size-1.5 animate-pulse rounded-full bg-warning"
                      }
                    />
                    <span className="truncate text-sm">{row.label}</span>
                  </div>
                  <Badge
                    className="shrink-0"
                    variant={healthVariants[row.status]}
                  >
                    {row.status}
                  </Badge>
                </div>
              </Fragment>
            ))}
          </div>
        </CardPanel>
      </Card>
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Confirmation queue</CardTitle>
          <CardAction>
            <Badge variant="secondary">14 open</Badge>
          </CardAction>
        </CardHeader>
        <CardPanel>
          <div>
            {queueRows.map((row, index) => (
              <Fragment key={row.id}>
                {index > 0 ? <Separator /> : null}
                <div className="flex items-center justify-between gap-4 py-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm">{row.snippet}</p>
                    <p className="truncate text-muted-foreground text-xs">
                      {row.farmer}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <Badge size="sm" variant={queueVariants[row.status]}>
                      {row.status}
                    </Badge>
                    <span className="font-mono text-muted-foreground text-xs">
                      {row.runId}
                    </span>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </CardPanel>
      </Card>
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Agent runs</CardTitle>
        </CardHeader>
        <CardPanel>
          <div>
            {runRows.map((run, index) => (
              <Fragment key={run.runId}>
                {index > 0 ? <Separator /> : null}
                <div className="flex items-center justify-between gap-4 py-2">
                  <span className="truncate font-mono text-xs">
                    {run.runId}
                  </span>
                  <div className="flex shrink-0 items-center gap-2">
                    <Badge size="sm" variant={runVariants[run.status]}>
                      {run.status}
                    </Badge>
                    <span className="text-muted-foreground text-xs tabular-nums">
                      {run.cost}
                    </span>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </CardPanel>
      </Card>
    </div>
  );
}
