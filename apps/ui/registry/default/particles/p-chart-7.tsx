"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
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
  { hour: "10:00", load: 24 },
  { hour: "11:00", load: 38 },
  { hour: "12:00", load: 52 },
  { hour: "13:00", load: 86 },
  { hour: "14:00", load: 64 },
  { hour: "15:00", load: 41 },
  { hour: "16:00", load: 33 },
];

const chartConfig = {
  load: { label: "CPU", color: "var(--chart-1)" },
} satisfies ChartConfig;

export default function Particle() {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Server load</CardTitle>
        <CardDescription>CPU %, today</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-48 w-full">
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
              dataKey="hour"
              tickFormatter={(value) => value.split(":")[0]}
              tickLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              content={<ChartTooltipContent indicator="dashed" />}
              defaultIndex={3}
            />
            <Area
              dataKey="load"
              fill="url(#fillLoad)"
              stroke="var(--color-load)"
              type="natural"
            />
            <defs>
              <linearGradient id="fillLoad" x1="0" x2="0" y1="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-load)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-load)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
