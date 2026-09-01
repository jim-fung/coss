# coss Chart

## When to use

- Any data visualization: area, line, bar, pie/donut, radial — anything Recharts renders.
- Dashboards and reports that need charts matching the design tokens in light and dark mode.

## Install

```bash
npx shadcn@latest add @coss/chart
```

## Canonical imports

```tsx
import {
  ChartContainer, ChartLegend, ChartLegendContent,
  ChartTooltip, ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
// Recharts chart types come from recharts directly:
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
```

## Minimal pattern

```tsx
const chartConfig = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
} satisfies ChartConfig

<ChartContainer config={chartConfig} className="h-48 w-full">
  <AreaChart data={chartData}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" tickLine={false} axisLine={false} />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Area dataKey="desktop" fill="var(--color-desktop)" stroke="var(--color-desktop)" />
  </AreaChart>
</ChartContainer>
```

## Notes

- `config` colors become scoped `--color-<key>` CSS variables; reference them as `var(--color-desktop)` in fills/strokes. Use `var(--chart-1…5)` as colors to follow light/dark mode.
- Charts are client-only — the composing component needs `"use client"`.
- ChartContainer defaults to `aspect-video`; size explicitly with e.g. `h-48 w-full`.
- Pie/donut: pass `nameKey` and `hideLabel` on `ChartTooltipContent`; `ChartLegend`/`ChartTooltip` are re-exports of the Recharts components, so all Recharts props pass through.
- `ChartLegendContent` for the legend body: `content={<ChartLegendContent />}`; set `verticalAlign="top"` for legends above the plot.
