"use client";

import {
  CheckedState,
  checkboxesFeature,
  hotkeysCoreFeature,
  syncDataLoaderFeature,
} from "@headless-tree/core";
import { useTree } from "@headless-tree/react";
import { FileIcon, FolderIcon, type LucideIcon } from "lucide-react";
import { Checkbox } from "@/registry/default/ui/checkbox";
import { Tree, TreeItem, TreeItemLabel } from "@/registry/default/ui/tree";

interface Item {
  name: string;
  children?: string[];
}

const items: Record<string, Item> = {
  app: { children: ["app/layout.tsx", "app/page.tsx"], name: "app" },
  "app/layout.tsx": { name: "layout.tsx" },
  "app/page.tsx": { name: "page.tsx" },
  components: {
    children: ["components/button.tsx", "components/card.tsx"],
    name: "components",
  },
  "components/button.tsx": { name: "button.tsx" },
  "components/card.tsx": { name: "card.tsx" },
  "lib/utils.ts": { name: "utils.ts" },
  lib: { children: ["lib/utils.ts"], name: "lib" },
  root: {
    children: ["app", "components", "lib"],
    name: "Project",
  },
};

function ItemIcon({ isFolder }: { isFolder: boolean }) {
  const Icon: LucideIcon = isFolder ? FolderIcon : FileIcon;
  return <Icon aria-hidden="true" className="size-4 text-muted-foreground" />;
}

export default function Particle() {
  const tree = useTree<Item>({
    dataLoader: {
      getChildren: (itemId) => items[itemId]?.children ?? [],
      getItem: (itemId) => items[itemId] ?? { name: itemId },
    },
    features: [syncDataLoaderFeature, checkboxesFeature, hotkeysCoreFeature],
    getItemName: (item) => item.getItemData()?.name ?? "Unknown",
    isItemFolder: (item) => Boolean(item.getItemData()?.children),
    propagateCheckedState: true,
    rootItemId: "root",
    initialState: { expandedItems: ["app", "components"] },
  });

  return (
    <Tree indent={20} tree={tree}>
      {tree.getItems().map((item) => (
        <TreeItem item={item} key={item.getId()}>
          <TreeItemLabel className="gap-2">
            <Checkbox
              checked={item.getCheckedState() === CheckedState.Checked}
              indeterminate={
                item.getCheckedState() === CheckedState.Indeterminate
              }
              onClick={() => item.toggleCheckedState()}
            />
            <ItemIcon isFolder={item.isFolder()} />
            {item.getItemName()}
          </TreeItemLabel>
        </TreeItem>
      ))}
    </Tree>
  );
}
