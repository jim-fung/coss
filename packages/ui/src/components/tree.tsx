// biome-ignore-all lint/suspicious/noExplicitAny: known

"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "@coss/ui/lib/utils";
import type { ItemInstance } from "@headless-tree/core";
import { ChevronDownIcon } from "lucide-react";
import * as React from "react";

interface TreeContextValue<T = any> {
  indent: number;
  currentItem?: ItemInstance<T>;
  tree?: any;
}

const TreeContext = React.createContext<TreeContextValue>({
  currentItem: undefined,
  indent: 20,
  tree: undefined,
});

function useTreeContext<T = any>() {
  return React.useContext(TreeContext) as TreeContextValue<T>;
}

interface TreeProps extends React.HTMLAttributes<HTMLDivElement> {
  indent?: number;
  tree?: any;
}

function Tree({
  indent = 20,
  tree,
  className,
  ...props
}: TreeProps): React.ReactElement {
  const containerProps =
    tree && typeof tree.getContainerProps === "function"
      ? tree.getContainerProps()
      : {};
  const mergedProps = { ...props, ...containerProps };

  const { style: propStyle, ...otherProps } = mergedProps;

  const mergedStyle = {
    ...propStyle,
    "--tree-indent": `${indent}px`,
  } as React.CSSProperties;

  return (
    <TreeContext.Provider value={{ indent, tree }}>
      <div
        className={cn("flex flex-col", className)}
        data-slot="tree"
        style={mergedStyle}
        {...otherProps}
      />
    </TreeContext.Provider>
  );
}

interface TreeItemProps<T = any>
  extends React.HTMLAttributes<HTMLButtonElement> {
  item: ItemInstance<T>;
  render?: React.ReactElement;
}

function TreeItem<T = any>({
  item,
  className,
  render,
  ...props
}: TreeItemProps<T>): React.ReactElement {
  const { indent } = useTreeContext<T>();

  const itemProps = typeof item.getProps === "function" ? item.getProps() : {};
  const mergedProps = { ...props, ...itemProps };

  const { style: propStyle, ...otherProps } = mergedProps;

  const mergedStyle = {
    ...propStyle,
    "--tree-padding": `${item.getItemMeta().level * indent}px`,
  } as React.CSSProperties;

  const defaultProps = {
    "aria-expanded": item.isExpanded(),
    className: cn(
      "z-10 select-none ps-(--tree-padding) not-last:pb-0.5 outline-none focus:z-20 data-[disabled]:pointer-events-none data-[disabled]:opacity-64",
      className,
    ),
    "data-drag-target":
      typeof item.isDragTarget === "function"
        ? item.isDragTarget() || false
        : undefined,
    "data-focus":
      typeof item.isFocused === "function"
        ? item.isFocused() || false
        : undefined,
    "data-folder":
      typeof item.isFolder === "function"
        ? item.isFolder() || false
        : undefined,
    "data-search-match":
      typeof item.isMatchingSearch === "function"
        ? item.isMatchingSearch() || false
        : undefined,
    "data-selected":
      typeof item.isSelected === "function"
        ? item.isSelected() || false
        : undefined,
    "data-slot": "tree-item",
    style: mergedStyle,
  };

  return (
    <TreeContext.Provider value={{ currentItem: item, indent }}>
      {useRender({
        defaultTagName: "button",
        props: mergeProps<"button">(
          defaultProps,
          otherProps as useRender.ComponentProps<"button">,
        ),
        render,
      })}
    </TreeContext.Provider>
  );
}

interface TreeItemLabelProps<T = any>
  extends React.HTMLAttributes<HTMLSpanElement> {
  item?: ItemInstance<T>;
}

function TreeItemLabel<T = any>({
  item: propItem,
  children,
  className,
  ...props
}: TreeItemLabelProps<T>): React.ReactElement {
  const { currentItem } = useTreeContext<T>();
  const item = propItem || currentItem;

  if (!item) {
    console.warn("TreeItemLabel: No item provided via props or context");
    return null as unknown as React.ReactElement;
  }

  return (
    <span
      className={cn(
        "flex items-center gap-1 rounded-sm bg-background in-data-[drag-target=true]:bg-accent in-data-[search-match=true]:bg-primary/15! in-data-[selected=true]:bg-accent px-2 py-1.5 not-in-data-[folder=true]:ps-7 in-data-[selected=true]:text-accent-foreground text-base text-foreground outline-none in-data-[focus=true]:ring-2 in-data-[focus=true]:ring-ring in-data-[focus=true]:ring-offset-1 in-data-[focus=true]:ring-offset-background transition-colors hover:bg-accent sm:text-sm [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      data-slot="tree-item-label"
      {...props}
    >
      {item.isFolder() && (
        <ChevronDownIcon
          aria-hidden="true"
          className="size-4 in-aria-[expanded=false]:-rotate-90 text-muted-foreground transition-transform"
        />
      )}
      {children ||
        (typeof item.getItemName === "function" ? item.getItemName() : null)}
    </span>
  );
}

function TreeDragLine({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  const { tree } = useTreeContext();

  if (!tree || typeof tree.getDragLineStyle !== "function") {
    console.warn(
      "TreeDragLine: No tree provided via context or tree does not have getDragLineStyle method",
    );
    return null as unknown as React.ReactElement;
  }

  const dragLine = tree.getDragLineStyle();
  return (
    <div
      className={cn(
        "absolute z-30 -mt-px h-0.5 w-[unset] bg-primary before:absolute before:-top-[3px] before:left-0 before:size-2 before:rounded-full before:border-2 before:border-primary before:bg-background",
        className,
      )}
      style={dragLine}
      {...props}
    />
  );
}

export { Tree, TreeDragLine, TreeItem, TreeItemLabel };
