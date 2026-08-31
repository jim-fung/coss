# coss Timeline

## When to use

- Chronological content: order tracking, activity feeds, release history.

## Install

```bash
npx shadcn@latest add @coss/timeline
```

## Canonical imports

```tsx
import {
  Timeline, TimelineContent, TimelineDate, TimelineHeader,
  TimelineIndicator, TimelineItem, TimelineSeparator, TimelineTitle,
} from "@/components/ui/timeline"
```

## Minimal pattern

```tsx
<Timeline defaultValue={3}>
  <TimelineItem step={1}>
    <TimelineHeader>
      <TimelineDate>Aug 24, 2026</TimelineDate>
      <TimelineTitle>Order placed</TimelineTitle>
    </TimelineHeader>
    <TimelineIndicator />
    <TimelineSeparator />
    <TimelineContent>Order confirmed.</TimelineContent>
  </TimelineItem>
</Timeline>
```

## Notes

- Items with `step <= value` render as completed (filled dot, primary connector).
- `orientation="horizontal"` switches to a horizontal layout; `TimelineDate` accepts `render` for custom elements.
