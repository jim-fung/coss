# coss Tree

## When to use

- File explorers, category hierarchies, any nested structure needing keyboard navigation and selection.

## Install

```bash
npx shadcn@latest add @coss/tree
```

Deps: `@headless-tree/core`, `@headless-tree/react`.

## Canonical imports

```tsx
import { hotkeysCoreFeature, selectionFeature, syncDataLoaderFeature } from "@headless-tree/core"
import { useTree } from "@headless-tree/react"
import { Tree, TreeItem, TreeItemLabel } from "@/components/ui/tree"
```

## Minimal pattern

```tsx
const tree = useTree({
  dataLoader: { getChildren: (id) => items[id]?.children ?? [], getItem: (id) => items[id] },
  features: [syncDataLoaderFeature, selectionFeature, hotkeysCoreFeature],
  isItemFolder: (item) => Boolean(item.getItemData()?.children),
  rootItemId: "root",
})

<Tree indent={20} tree={tree}>
  {tree.getItems().map((item) => (
    <TreeItem item={item} key={item.getId()}>
      <TreeItemLabel>{item.getItemName()}</TreeItemLabel>
    </TreeItem>
  ))}
</Tree>
```

## Notes

- Styling layer over Headless Tree; all behavior (expand, select, dnd, search) comes from its features.
- `TreeItemLabel` renders/rotates the folder chevron; `TreeDragLine` visualizes dnd drop position.
