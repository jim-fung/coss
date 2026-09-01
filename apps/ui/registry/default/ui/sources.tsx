"use client";

import type { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { ChevronDownIcon, LinkIcon } from "lucide-react";
import type * as React from "react";
import { cn } from "@/registry/default/lib/utils";
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@/registry/default/ui/collapsible";

function Sources({
  className,
  ...props
}: React.ComponentProps<typeof Collapsible>): React.ReactElement {
  return (
    <Collapsible className={cn(className)} data-slot="sources" {...props} />
  );
}

interface SourcesTriggerProps extends CollapsiblePrimitive.Trigger.Props {
  count: number;
}

function SourcesTrigger({
  count,
  className,
  children,
  ...props
}: SourcesTriggerProps): React.ReactElement {
  return (
    <CollapsibleTrigger
      className={cn(
        "flex w-fit items-center gap-1.5 rounded-md font-medium text-muted-foreground text-sm outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring [&_svg:not([class*='size-'])]:size-3.5 data-panel-open:[&_svg]:rotate-180",
        className,
      )}
      data-slot="sources-trigger"
      {...props}
    >
      {children ?? `Used ${count} ${count === 1 ? "source" : "sources"}`}
      <ChevronDownIcon
        aria-hidden="true"
        className="transition-transform duration-200"
      />
    </CollapsibleTrigger>
  );
}

function SourcesPanel({
  className,
  ...props
}: CollapsiblePrimitive.Panel.Props): React.ReactElement {
  return (
    <CollapsiblePanel
      className={cn(
        "mt-2 flex flex-col gap-2 text-muted-foreground text-sm",
        className,
      )}
      data-slot="sources-panel"
      {...props}
    />
  );
}

function Source({
  className,
  children,
  title,
  render,
  ...props
}: useRender.ComponentProps<"a">): React.ReactElement {
  const defaultProps = {
    children: (
      <>
        <LinkIcon
          aria-hidden="true"
          className="size-3.5 shrink-0 text-muted-foreground"
        />
        {children ?? title}
      </>
    ),
    className: cn(
      "flex w-fit items-center gap-1.5 text-foreground text-xs underline-offset-4 hover:underline",
      className,
    ),
    "data-slot": "source",
    rel: "noreferrer",
    target: "_blank",
    title,
  };

  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(defaultProps, props),
    render,
  });
}

export { Source, Sources, SourcesPanel, SourcesTrigger };
export type { SourcesTriggerProps };
