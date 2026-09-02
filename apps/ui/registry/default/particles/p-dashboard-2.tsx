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

export default function Particle() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Message flow</CardTitle>
        <CardDescription>
          Telegram messages received vs registered vs asked — last 7 days
        </CardDescription>
      </CardHeader>
      <CardContent>
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
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Area
              dataKey="received"
              fill="var(--color-received)"
              fillOpacity={0.4}
              stroke="var(--color-received)"
              stackId="a"
              type="natural"
            />
            <Area
              dataKey="registered"
              fill="var(--color-registered)"
              fillOpacity={0.4}
              stroke="var(--color-registered)"
              stackId="a"
              type="natural"
            />
            <Area
              dataKey="asked"
              fill="var(--color-asked)"
              fillOpacity={0.4}
              stroke="var(--color-asked)"
              stackId="a"
              type="natural"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
