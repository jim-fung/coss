"use client";

import { cn } from "@coss/ui/lib/utils";
import { GripVerticalIcon } from "lucide-react";
import type * as React from "react";
import { Group, Panel, Separator } from "react-resizable-panels";

function ResizablePanelGroup({
  orientation = "horizontal",
  className,
  ...props
}: React.ComponentProps<typeof Group>): React.ReactElement {
  return (
    <Group
      className={cn(
        "flex size-full in-data-[orientation=vertical]:flex-col",
        className,
      )}
      data-orientation={orientation}
      data-slot="resizable-panel-group"
      orientation={orientation}
      {...props}
    />
  );
}

function ResizablePanel({
  ...props
}: React.ComponentProps<typeof Panel>): React.ReactElement {
  return <Panel data-slot="resizable-panel" {...props} />;
}

function ResizableHandle({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof Separator> & {
  withHandle?: boolean;
}): React.ReactElement {
  return (
    <Separator
      className={cn(
        "relative flex in-data-[orientation=vertical]:h-px in-data-[orientation=vertical]:w-full w-px items-center justify-center bg-border outline-none after:absolute after:inset-y-0 after:left-1/2 in-data-[orientation=vertical]:after:left-0 in-data-[orientation=vertical]:after:h-1 after:w-1 in-data-[orientation=vertical]:after:w-full after:-translate-x-1/2 in-data-[orientation=vertical]:after:translate-x-0 in-data-[orientation=vertical]:after:-translate-y-1/2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
        className,
      )}
      data-slot="resizable-handle"
      {...props}
    >
      {withHandle && (
        <div className="z-10 flex h-4 w-3 items-center justify-center rounded-xs border bg-border">
          <GripVerticalIcon aria-hidden="true" className="size-2.5" />
        </div>
      )}
    </Separator>
  );
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup };
