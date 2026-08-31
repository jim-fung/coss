"use client";

import { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/registry/default/ui/resizable";

export default function Particle() {
  const [size, setSize] = useState(50);

  return (
    <ResizablePanelGroup className="h-48 max-w-md overflow-hidden rounded-lg border">
      <ResizablePanel
        defaultSize="50"
        id="sidebar"
        onResize={(panelSize) => setSize(panelSize.asPercentage)}
        snapPoints={[25, 50, 75]}
      >
        <div className="flex h-full flex-col items-center justify-center gap-1 p-6">
          <span className="font-medium text-muted-foreground text-sm">
            Sidebar
          </span>
          <span className="font-medium tabular-nums">{Math.round(size)}%</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize="50">
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-medium text-muted-foreground text-sm">
            Content
          </span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
