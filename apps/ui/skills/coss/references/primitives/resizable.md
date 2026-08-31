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
- Snapping (mandatory): `<ResizablePanel id="sidebar" snapPoints={[25, 50, 75]}>` — every pointer release parks the panel on the nearest snap point (delta absorbed by the largest other panel); there are no in-between positions. Edges (0 and 100) are always snap points. Requires `id`. Keyboard resizes snap on zone entry (`snapThreshold`, default 5) so arrow-key steps can pass through a point without getting trapped.
