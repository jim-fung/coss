# coss Reasoning

## When to use

- Model "thinking" disclosures that open while streaming and collapse when done.

## Install

```bash
npx shadcn@latest add @coss/reasoning
```

## Canonical imports

```tsx
import {
  Reasoning, ReasoningPanel, ReasoningTrigger,
} from "@/components/ui/reasoning"
```

## Minimal pattern

```tsx
<Reasoning isStreaming={isThinking} duration={seconds}>
  <ReasoningTrigger />
  <ReasoningPanel>{thinkingText}</ReasoningPanel>
</Reasoning>
```

## Notes

- Stream start auto-opens (unless `defaultOpen={false}` explicitly); measured duration shows as "Thought for Ns"; auto-closes once, 1s after the stream ends.
- `duration` prop overrides the measured value; `getThinkingMessage` customizes the trigger label.
- With controlled `open`, auto transitions still fire `onOpenChange` — mirror it.
- Panel children are plain nodes; compose a Markdown renderer for rich content.
