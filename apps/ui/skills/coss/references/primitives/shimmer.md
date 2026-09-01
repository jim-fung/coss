# coss Shimmer

## When to use

- Streaming/loading text ("Generating response…", "Thinking…").

## Install

```bash
npx shadcn@latest add @coss/shimmer
```

## Canonical imports

```tsx
import { Shimmer } from "@/components/ui/shimmer"
```

## Minimal pattern

```tsx
<Shimmer duration={2}>Generating response…</Shimmer>
```

## Notes

- Animated via the Web Animations API — no global keyframes; skipped under `prefers-reduced-motion: reduce`.
- `duration` is seconds per cycle; styling (size, weight) via className as usual.
