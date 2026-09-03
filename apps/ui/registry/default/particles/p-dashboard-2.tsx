"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
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

const chartData = [
  { day: "Mon", received: 18, registered: 14, asked: 2 },
  { day: "Tue", received: 14, registered: 11, asked: 3 },
  { day: "Wed", received: 23, registered: 19, asked: 1 },
  { day: "Thu", received: 27, registered: 24, asked: 4 },
  { day: "Fri", received: 31, registered: 28, asked: 6 },
  { day: "Sat", received: 22, registered: 18, asked: 0 },
  { day: "Sun", received: 32, registered: 29, asked: 5 },
];

const chartConfig = {
  received: { label: "Received", color: "var(--chart-1)" },
  registered: { label: "Registered", color: "var(--chart-2)" },
  asked: { label: "Asked", color: "var(--chart-3)" },
} satisfies ChartConfig;

const weeklySummary = [
  {
    key: "received",
    label: "Received",
    total: 167,
    delta: "+12% vs last week",
    dot: "size-2 rounded-full bg-chart-1",
  },
  {
    key: "registered",
    label: "Registered",
    total: 143,
    delta: "+9% vs last week",
    dot: "size-2 rounded-full bg-chart-2",
  },
  {
    key: "asked",
    label: "Asked",
    total: 21,
    delta: "+26% vs last week",
    dot: "size-2 rounded-full bg-chart-3",
  },
] satisfies ReadonlyArray<{
  key: keyof typeof chartConfig;
  label: string;
  total: number;
  delta: string;
  dot: string;
}>;

export default function Particle() {
  return (
    <div className="grid gap-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Message flow</CardTitle>
          <CardDescription>
            Telegram messages received vs registered vs asked — last 7 days
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-4">
            {weeklySummary.map((item) => (
              <div key={item.key} className="flex items-center gap-2">
                <span aria-hidden="true" className={item.dot} />
                <span className="text-muted-foreground text-xs">
                  {item.label}
                </span>
                <span className="font-medium text-sm tabular-nums">
                  {item.total}
                </span>
                <span className="text-muted-foreground text-xs">
                  {item.delta}
                </span>
              </div>
            ))}
          </div>
          <ChartContainer config={chartConfig} className="h-64 w-full">
            <AreaChart
              data={chartData}
              margin={{
                left: -24,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                axisLine={false}
                dataKey="day"
                tickFormatter={(value) => value.slice(0, 3)}
                tickLine={false}
                tickMargin={8}
              />
              <YAxis axisLine={false} tickLine={false} width={32} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Area
                dataKey="received"
                fill="url(#flowReceived)"
                stroke="var(--color-received)"
                stackId="a"
                type="natural"
              />
              <Area
                dataKey="registered"
                fill="url(#flowRegistered)"
                stroke="var(--color-registered)"
                stackId="a"
                type="natural"
              />
              <Area
                dataKey="asked"
                fill="url(#flowAsked)"
                stroke="var(--color-asked)"
                stackId="a"
                type="natural"
              />
              <defs>
                <linearGradient id="flowReceived" x1="0" x2="0" y1="0" y2="1">
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
                <linearGradient id="flowRegistered" x1="0" x2="0" y1="0" y2="1">
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
                <linearGradient id="flowAsked" x1="0" x2="0" y1="0" y2="1">
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
        </CardContent>
      </Card>
    </div>
  );
}
