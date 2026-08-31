"use client";

import {
  hotkeysCoreFeature,
  selectionFeature,
  syncDataLoaderFeature,
} from "@headless-tree/core";
import { useTree } from "@headless-tree/react";
import { FileIcon, FolderIcon, type LucideIcon } from "lucide-react";
import { Tree, TreeItem, TreeItemLabel } from "@/registry/default/ui/tree";

interface Item {
  name: string;
  children?: string[];
}

const items: Record<string, Item> = {
  app: {
    children: ["app/layout.tsx", "app/page.tsx"],
    name: "app",
  },
  "app/layout.tsx": { name: "layout.tsx" },
  "app/page.tsx": { name: "page.tsx" },
  components: {
    children: ["components/button.tsx", "components/card.tsx"],
    name: "components",
  },
  "components/button.tsx": { name: "button.tsx" },
  "components/card.tsx": { name: "card.tsx" },
  lib: { children: ["lib/utils.ts"], name: "lib" },
  "lib/utils.ts": { name: "utils.ts" },
  "package.json": { name: "package.json" },
  root: {
    children: ["app", "components", "lib", "package.json"],
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
    features: [syncDataLoaderFeature, selectionFeature, hotkeysCoreFeature],
    getItemName: (item) => item.getItemData()?.name ?? "Unknown",
    isItemFolder: (item) => Boolean(item.getItemData()?.children),
    rootItemId: "root",
    initialState: { expandedItems: ["app", "components"] },
  });

  const selectedNames = tree
    .getSelectedItems()
    .map((item) => item.getItemName())
    .join(", ");

  return (
    <div className="w-full max-w-sm">
      <Tree indent={20} tree={tree}>
        {tree.getItems().map((item) => (
          <TreeItem item={item} key={item.getId()}>
            <TreeItemLabel className="gap-2">
              <ItemIcon isFolder={item.isFolder()} />
              {item.getItemName()}
            </TreeItemLabel>
          </TreeItem>
        ))}
      </Tree>
      <p className="mt-3 text-muted-foreground text-sm">
        Selected: {selectedNames || "none"}
      </p>
    </div>
  );
}
