"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
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
  ChartTooltip,
  ChartTooltipContent,
} from "@/registry/default/ui/chart";

const chartData = [
  { quarter: "Q1", closed: 42, inProgress: 25, blocked: 6 },
  { quarter: "Q2", closed: 58, inProgress: 31, blocked: 4 },
  { quarter: "Q3", closed: 51, inProgress: 38, blocked: 9 },
  { quarter: "Q4", closed: 67, inProgress: 22, blocked: 3 },
];

const chartConfig = {
  closed: { label: "Closed", color: "var(--chart-1)" },
  inProgress: { label: "In progress", color: "var(--chart-2)" },
  blocked: { label: "Blocked", color: "var(--chart-3)" },
} satisfies ChartConfig;

export default function Particle() {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Issues shipped</CardTitle>
        <CardDescription>Stacked by status, per quarter</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-48 w-full">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              axisLine={false}
              dataKey="quarter"
              tickLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent className="w-40" indicator="line" />
              }
              cursor={false}
            />
            <Bar
              dataKey="closed"
              fill="var(--color-closed)"
              radius={4}
              stackId="a"
            />
            <Bar
              dataKey="inProgress"
              fill="var(--color-inProgress)"
              radius={4}
              stackId="a"
            />
            <Bar
              dataKey="blocked"
              fill="var(--color-blocked)"
              radius={4}
              stackId="a"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
