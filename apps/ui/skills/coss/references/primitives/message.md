# coss Message

## When to use

- Chat bubbles per speaker, message actions, and alternative-reply branching.

## Install

```bash
npx shadcn@latest add @coss/message
```

## Canonical imports

```tsx
import {
  Message, MessageAction, MessageActions, MessageBranch, MessageBranchNext,
  MessageBranchPage, MessageBranchPrevious, MessageBranchSelector,
  MessageContent, MessageToolbar,
} from "@/components/ui/message"
```

## Minimal pattern

```tsx
<Message from="assistant">
  <MessageContent>Answer text.</MessageContent>
  <MessageActions>
    <MessageAction label="Copy message" tooltip="Copy"><CopyIcon aria-hidden="true" /></MessageAction>
  </MessageActions>
</Message>
```

## Notes

- `from`: `"user" | "assistant" | "system" | "tool"`, sets `data-from`; user aligns end + secondary bubble, others full width.
- Content is plain children — compose your own Markdown renderer.
- `MessageBranch` owns only navigation (`totalBranches` + controlled/uncontrolled index); render the selected alternative yourself.
- Branch parts error outside `MessageBranch`; `MessageToolbar` pairs actions with the selector.
