# coss Prompt Input

## When to use

- Chat composers: auto-grow textarea, tool buttons, submit with status icons.

## Install

```bash
npx shadcn@latest add @coss/prompt-input
```

## Canonical imports

```tsx
import {
  PromptInput, PromptInputButton, PromptInputFooter, PromptInputHeader,
  PromptInputSubmit, PromptInputTextarea, PromptInputTools,
} from "@/components/ui/prompt-input"
```

## Minimal pattern

```tsx
<PromptInput onSubmit={({ text }) => send(text)}>
  <PromptInputTextarea placeholder="Write a message…" />
  <PromptInputFooter>
    <PromptInputTools>
      <PromptInputButton aria-label="Attach file" tooltip="Attach file">
        <PaperclipIcon aria-hidden="true" />
      </PromptInputButton>
    </PromptInputTools>
    <PromptInputSubmit status={status} />
  </PromptInputFooter>
</PromptInput>
```

## Notes

- `onSubmit` gets trimmed non-empty text; the (uncontrolled) textarea resets first.
- Enter submits; Shift+Enter newlines; IME composition respected.
- `status`: `"ready" | "submitted" | "streaming" | "error"` — pending shows a stop square, error a retry arrow.
- `PromptInputHeader`/`Footer` are `InputGroupAddon`s; keep them after the textarea in DOM order.
