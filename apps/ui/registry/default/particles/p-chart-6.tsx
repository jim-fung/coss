"use client";

import { Cell, PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";
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
  { workstream: "design", progress: 85, fill: "var(--color-design)" },
  { workstream: "backend", progress: 72, fill: "var(--color-backend)" },
  { workstream: "frontend", progress: 68, fill: "var(--color-frontend)" },
  { workstream: "qa", progress: 45, fill: "var(--color-qa)" },
];

const chartConfig = {
  progress: { label: "Complete" },
  design: { label: "Design", color: "var(--chart-1)" },
  backend: { label: "Backend", color: "var(--chart-2)" },
  frontend: { label: "Frontend", color: "var(--chart-3)" },
  qa: { label: "QA", color: "var(--chart-4)" },
} satisfies ChartConfig;

export default function Particle() {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Sprint progress</CardTitle>
        <CardDescription>Completion by workstream</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-60"
        >
          <RadialBarChart
            barSize={10}
            data={chartData}
            endAngle={360}
            innerRadius={30}
            outerRadius={105}
            startAngle={0}
          >
            <PolarAngleAxis domain={[0, 100]} tick={false} type="number" />
            <ChartTooltip
              content={<ChartTooltipContent hideLabel nameKey="workstream" />}
              cursor={false}
            />
            <RadialBar background cornerRadius={10} dataKey="progress">
              {chartData.map((entry) => (
                <Cell fill={entry.fill} key={entry.workstream} />
              ))}
            </RadialBar>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
