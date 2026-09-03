"use client";

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@coss/ui/components/chart";
import type * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import type { DailyMetric, FunnelStage } from "@/lib/types";

const funnelConfig = {
  count: { label: "messages", color: "var(--chart-1)" },
} satisfies ChartConfig;

export function FunnelChart({
  stages,
}: {
  stages: FunnelStage[];
}): React.ReactElement {
  return (
    <ChartContainer config={funnelConfig} className="h-56 w-full">
      <BarChart accessibilityLayer data={stages}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="label"
          interval={0}
          angle={-35}
          height={56}
          textAnchor="end"
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          allowDecimals={false}
          width={28}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="count" fill="var(--color-count)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}

const latencyConfig = {
  p50LatencyMs: { label: "p50", color: "var(--chart-2)" },
  p95LatencyMs: { label: "p95", color: "var(--chart-1)" },
} satisfies ChartConfig;

export function LatencyChart({
  data,
}: {
  data: DailyMetric[];
}): React.ReactElement {
  return (
    <ChartContainer config={latencyConfig} className="h-56 w-full">
      <LineChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          width={44}
          tickFormatter={(value: number): string => `${value / 1000}s`}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Line
          dataKey="p50LatencyMs"
          stroke="var(--color-p50LatencyMs)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="p95LatencyMs"
          stroke="var(--color-p95LatencyMs)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}

const costConfig = {
  costAmount: { label: "cost (EUR)", color: "var(--chart-3)" },
  runs: { label: "runs", color: "var(--chart-4)" },
} satisfies ChartConfig;

export function CostChart({
  data,
}: {
  data: DailyMetric[];
}): React.ReactElement {
  return (
    <ChartContainer config={costConfig} className="h-56 w-full">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <YAxis yAxisId="left" tickLine={false} axisLine={false} width={40} />
        <YAxis
          yAxisId="right"
          orientation="right"
          tickLine={false}
          axisLine={false}
          width={28}
          allowDecimals={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar
          yAxisId="left"
          dataKey="costAmount"
          fill="var(--color-costAmount)"
          radius={4}
        />
        <Bar
          yAxisId="right"
          dataKey="runs"
          fill="var(--color-runs)"
          radius={4}
        />
      </BarChart>
    </ChartContainer>
  );
}
