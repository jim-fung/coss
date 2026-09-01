# coss Sources

## When to use

- "Used N sources" citation lists under an AI response.

## Install

```bash
npx shadcn@latest add @coss/sources
```

## Canonical imports

```tsx
import {
  Source, Sources, SourcesPanel, SourcesTrigger,
} from "@/components/ui/sources"
```

## Minimal pattern

```tsx
<Sources defaultOpen>
  <SourcesTrigger count={3} />
  <SourcesPanel>
    <Source href="https://example.com" title="Example reference" />
  </SourcesPanel>
</Sources>
```

## Notes

- `SourcesTrigger` label is singular-aware ("Used 1 source"); `children` replaces it.
- `Source` renders a safe external anchor (`target="_blank" rel="noreferrer"`).
