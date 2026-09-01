# coss Tool

## When to use

- Agent tool-call cards: status badge, JSON arguments, output or error.

## Install

```bash
npx shadcn@latest add @coss/tool
```

## Canonical imports

```tsx
import {
  Tool, ToolHeader, ToolInput, ToolOutput, ToolPanel,
} from "@/components/ui/tool"
```

## Minimal pattern

```tsx
<Tool defaultOpen>
  <ToolHeader state="output-available" title="get_weather" />
  <ToolPanel>
    <ToolInput input={{ location: "San Francisco" }} />
    <ToolOutput output="18°C, partly cloudy." />
  </ToolPanel>
</Tool>
```

## Notes

- `state` → badge: `input-streaming` Pending, `input-available` Running, `approval-requested` Awaiting approval, `approval-responded` Responded, `output-available` Completed, `output-error` Error, `output-denied` Denied.
- `ToolInput` pretty-prints JSON (renders nothing when `input` is undefined).
- `ToolOutput` renders only when `output`/`errorText` exist; `errorText` uses `role="alert"`.
- Label fallback: `title` → `toolName` → "Tool".
