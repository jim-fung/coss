"use client";

import { Cell, Pie, PieChart } from "recharts";
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
  { channel: "organic", visitors: 320, fill: "var(--color-organic)" },
  { channel: "direct", visitors: 245, fill: "var(--color-direct)" },
  { channel: "referral", visitors: 188, fill: "var(--color-referral)" },
  { channel: "social", visitors: 135, fill: "var(--color-social)" },
  { channel: "email", visitors: 90, fill: "var(--color-email)" },
];

const chartConfig = {
  visitors: { label: "Visitors" },
  organic: { label: "Organic", color: "var(--chart-1)" },
  direct: { label: "Direct", color: "var(--chart-2)" },
  referral: { label: "Referral", color: "var(--chart-3)" },
  social: { label: "Social", color: "var(--chart-4)" },
  email: { label: "Email", color: "var(--chart-5)" },
} satisfies ChartConfig;

export default function Particle() {
  return (
    <Card className="flex max-w-md flex-col">
      <CardHeader>
        <CardTitle>Traffic sources</CardTitle>
        <CardDescription>By channel, last 30 days</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-60"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent hideLabel />}
              cursor={false}
            />
            <ChartLegend
              content={
                <ChartLegendContent
                  className="flex-wrap gap-2"
                  nameKey="channel"
                />
              }
            />
            <Pie
              cornerRadius={4}
              data={chartData}
              dataKey="visitors"
              nameKey="channel"
              paddingAngle={2}
            >
              {chartData.map((entry) => (
                <Cell fill={entry.fill} key={entry.channel} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
