"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
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
  { month: "January", thisYear: 186, lastYear: 140 },
  { month: "February", thisYear: 305, lastYear: 220 },
  { month: "March", thisYear: 237, lastYear: 250 },
  { month: "April", thisYear: 173, lastYear: 190 },
  { month: "May", thisYear: 209, lastYear: 160 },
  { month: "June", thisYear: 214, lastYear: 205 },
];

const chartConfig = {
  thisYear: { label: "This year", color: "var(--chart-1)" },
  lastYear: { label: "Last year", color: "var(--chart-2)" },
} satisfies ChartConfig;

export default function Particle() {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Sessions</CardTitle>
        <CardDescription>This year vs last year</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-48 w-full">
          <LineChart
            data={chartData}
            margin={{
              left: -24,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              axisLine={false}
              dataKey="month"
              tickFormatter={(value) => value.slice(0, 3)}
              tickLine={false}
              tickMargin={8}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Line
              dataKey="thisYear"
              dot={false}
              stroke="var(--color-thisYear)"
              strokeWidth={2}
              type="natural"
            />
            <Line
              dataKey="lastYear"
              dot={false}
              stroke="var(--color-lastYear)"
              strokeDasharray="4 4"
              strokeWidth={2}
              type="natural"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
