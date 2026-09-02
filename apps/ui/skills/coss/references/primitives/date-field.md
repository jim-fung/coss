# coss Date Field

## When to use

- Any "pick a date" affordance: a single date, multiple dates, or a date range — a trigger button showing the current value with a calendar in a popover.
- Forms and filters that want the Popover + Button + Calendar composition packaged with per-mode typing and close-on-select defaults, instead of hand-wiring the Date Picker pattern.

## Install

```bash
npx shadcn@latest add @coss/date-field
```

## Canonical imports

```tsx
import {
  DateField, DateFieldCalendar, DateFieldTrigger,
  useDateField, type DateFieldValue,
} from "@/components/ui/date-field"
// The range type comes from the calendar dependency:
import type { DateRange } from "@daypicker/react"
```

## Minimal pattern

```tsx
<DateField mode="single">
  <DateFieldTrigger />
  <DateFieldCalendar />
</DateField>
```

## Notes

- `mode` picks the value shape — `"single"` (default) holds a `Date`, `"multiple"` a `Date[]`, `"range"` a `DateRange`; `value` / `defaultValue` / `onValueChange` follow the mode's type.
- `closeOnSelect` defaults per mode: single closes on every select; range and multiple never auto-close (DayPicker's first range click sets a same-day range, so completeness is not a useful close signal). `closeOnSelect={true}` forces close on every select; `false` never closes.
- Controlled value: pass `value` + `onValueChange`; otherwise use `defaultValue`. Open state is the Popover root's `open` / `onOpenChange` / `defaultOpen`.
- Trigger content: a function passed as `DateFieldTrigger` children — `(state) => …` — receives `{ value }` for custom content (e.g. a badge list in multiple mode); `render` swaps the button entirely.
- `useDateField()` is the escape hatch for bespoke popup layouts (preset sidebar next to the calendar): render a raw `PopoverPopup` + `Calendar` inside `DateField` and wire them from context (`mode`, `value`, `setValue`, `setOpen`). Throws outside `DateField`.
- Calendar props pass through `DateFieldCalendar` (`numberOfMonths`, `captionLayout`, `min`/`max`, …) except `mode` / `selected` / `onSelect`, which are wired from the field.
