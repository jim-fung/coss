# coss Suggestion

## When to use

- Clickable prompt chips for follow-up questions and starter prompts.

## Install

```bash
npx shadcn@latest add @coss/suggestion
```

## Canonical imports

```tsx
import { Suggestion, Suggestions } from "@/components/ui/suggestion"
```

## Minimal pattern

```tsx
<Suggestions>
  <Suggestion onClick={(s) => send(s)} suggestion="Explain this code" />
</Suggestions>
```

## Notes

- Pill `Button` (`variant="outline" size="xs"`, rounded-full); all Button props pass through.
- `onClick` receives `(suggestion, event)`; `children` replace the label (e.g. icon + text).
