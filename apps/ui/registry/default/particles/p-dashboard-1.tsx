"use client";

import {
  ActivityIcon,
  BotIcon,
  DatabaseIcon,
  ServerIcon,
  TrendingUpIcon,
} from "lucide-react";
import { Area, AreaChart } from "recharts";
import { Badge } from "@/registry/default/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";
import { type ChartConfig, ChartContainer } from "@/registry/default/ui/chart";
import { Separator } from "@/registry/default/ui/separator";

const stats = [
  {
    id: "messages",
    label: "Messages received",
    value: "128",
    color: "var(--chart-1)",
    badge: { label: "+18%", variant: "success" as const },
    trend: "good" as const,
    spark: [
      { v: 14 },
      { v: 17 },
      { v: 15 },
      { v: 19 },
      { v: 21 },
      { v: 20 },
      { v: 22 },
    ],
  },
  {
    id: "registered",
    label: "Registered",
    value: "96",
    color: "var(--chart-2)",
    badge: { label: "+12%", variant: "success" as const },
    trend: "good" as const,
    spark: [
      { v: 11 },
      { v: 12 },
      { v: 14 },
      { v: 13 },
      { v: 15 },
      { v: 15 },
      { v: 16 },
    ],
  },
  {
    id: "awaiting",
    label: "Awaiting confirmation",
    value: "14",
    color: "var(--chart-3)",
    badge: { label: "Klopt dit?", variant: "warning" as const },
    trend: "bad" as const,
    spark: [
      { v: 7 },
      { v: 8 },
      { v: 10 },
      { v: 9 },
      { v: 11 },
      { v: 13 },
      { v: 14 },
    ],
  },
  {
    id: "failed",
    label: "Failed runs",
    value: "3",
    color: "var(--chart-4)",
    badge: { label: "4 retried", variant: "destructive" as const },
    trend: "bad" as const,
    spark: [
      { v: 1 },
      { v: 1 },
      { v: 0 },
      { v: 1 },
      { v: 2 },
      { v: 2 },
      { v: 3 },
    ],
  },
];

const healthChecks = [
  {
    icon: ActivityIcon,
    label: "Worker heartbeat",
    status: "healthy",
    variant: "success" as const,
    detail: "3s ago",
  },
  {
    icon: BotIcon,
    label: "Telegram polling",
    status: "healthy",
    variant: "success" as const,
    detail: "last poll 12s ago",
  },
  {
    icon: ServerIcon,
    label: "Model provider",
    status: "degraded",
    variant: "warning" as const,
    detail: "429s on relay",
  },
  {
    icon: DatabaseIcon,
    label: "Database",
    status: "healthy",
    variant: "success" as const,
    detail: "12 ms read latency",
  },
];

export default function Particle() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.id}>
          <CardHeader className="p-4 pb-2">
            <CardDescription>{stat.label}</CardDescription>
            <CardAction>
              <Badge variant={stat.badge.variant}>{stat.badge.label}</Badge>
            </CardAction>
            <CardTitle className="font-semibold text-2xl tabular-nums">
              {stat.value}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <ChartContainer
              aria-hidden="true"
              className="h-10 w-full"
              config={
                {
                  [stat.id]: { color: stat.color, label: stat.label },
                } satisfies ChartConfig
              }
            >
              <AreaChart
                data={stat.spark}
                margin={{ bottom: 0, left: 0, right: 0, top: 0 }}
              >
                <Area
                  dataKey="v"
                  fill={`url(#fill-${stat.id})`}
                  stroke={`var(--color-${stat.id})`}
                  strokeWidth={1.5}
                  type="natural"
                />
                <defs>
                  <linearGradient
                    id={`fill-${stat.id}`}
                    x1="0"
                    x2="0"
                    y1="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={`var(--color-${stat.id})`}
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor={`var(--color-${stat.id})`}
                      stopOpacity={0.02}
                    />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ChartContainer>
            <div className="mt-2 flex items-center gap-1.5 text-muted-foreground text-xs">
              <TrendingUpIcon
                aria-hidden="true"
                className={
                  stat.trend === "good"
                    ? "size-3.5 text-success"
                    : "size-3.5 text-destructive"
                }
              />
              <span>vs last week</span>
            </div>
          </CardContent>
        </Card>
      ))}
      <Card className="sm:col-span-2 lg:col-span-4">
        <CardHeader>
          <CardTitle>Service health</CardTitle>
          <CardDescription>
            Worker heartbeat, polling and provider status — last checked 12s ago
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col">
          {healthChecks.map((check, index) => (
            <div key={check.label}>
              {index > 0 && <Separator />}
              <div className="flex items-center justify-between gap-2 py-2.5">
                <div className="flex items-center gap-2">
                  <check.icon
                    className="size-4 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <span
                    aria-hidden="true"
                    className={
                      check.variant === "success"
                        ? "size-1.5 animate-pulse rounded-full bg-success"
                        : "size-1.5 animate-pulse rounded-full bg-warning"
                    }
                  />
                  <span className="text-sm">{check.label}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={check.variant}>{check.status}</Badge>
                  <span className="text-muted-foreground text-sm tabular-nums">
                    {check.detail}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <p className="mt-3 border-t pt-3 text-muted-foreground text-xs tabular-nums">
            Alerts routed to #regenos-ops · uptime 99.7% this week
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
