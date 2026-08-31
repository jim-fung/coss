# coss Resizable

## When to use

- Adjustable split layouts: sidebars, panes, inspector panels.

## Install

```bash
npx shadcn@latest add @coss/resizable
```

Deps: `react-resizable-panels`.

## Canonical imports

```tsx
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
```

## Minimal pattern

```tsx
<ResizablePanelGroup>
  <ResizablePanel defaultSize="30">Sidebar</ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize="70">Content</ResizablePanel>
</ResizablePanelGroup>
```

## Notes

- Thin adapter over react-resizable-panels v3 (`Group` / `Panel` / `Separator`); sizes are percentage strings ("50") or pixel numbers.
- `orientation="vertical"` on the group; `withHandle` on `ResizableHandle` shows a visible grip.
- Snapping: `<ResizablePanel id="sidebar" snapPoints={[25, 50, 75]} snapThreshold={5}>` — pointer releases snap unconditionally when they settle within `snapThreshold` of a point (delta absorbed by the largest other panel). Requires `id`. Keyboard resizes use a zone-entry rule so nudging off a point is never trapped.
