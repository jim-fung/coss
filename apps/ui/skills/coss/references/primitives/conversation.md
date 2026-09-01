# coss Conversation

## When to use

- AI chat threads: auto-scroll during streaming, jump-to-latest, empty state, Markdown export.

## Install

```bash
npx shadcn@latest add @coss/conversation
```

## Canonical imports

```tsx
import {
  Conversation, ConversationContent, ConversationDownload,
  ConversationEmptyState, ConversationScrollButton, messagesToMarkdown,
} from "@/components/ui/conversation"
```

## Minimal pattern

```tsx
<div className="flex h-96 flex-col">
  <Conversation>
    <ConversationContent>{messages}</ConversationContent>
    <ConversationScrollButton />
  </Conversation>
</div>
```

## Notes

- Root is `role="log"` with `aria-live="polite"`; it has `flex-1 min-h-0`, so bound the height with a fixed-height flex wrapper (or any bounded flex context).
- Stick-to-bottom follows streaming content until the user scrolls up; `ConversationScrollButton` (renders only when away) jumps back.
- `ConversationDownload` / `messagesToMarkdown` take `{ role, content }[]` with optional `formatMessage`.
- Depends on `use-stick-to-bottom`; compose with `Message` and `PromptInput` for a full chat.
