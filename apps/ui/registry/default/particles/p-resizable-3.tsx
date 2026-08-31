"use client";

import { useState } from "react";
import { cn } from "@/registry/default/lib/utils";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/registry/default/ui/resizable";

const snapPoints = [0, 25, 50, 75, 100];

export default function Particle() {
  const [size, setSize] = useState(50);

  return (
    <ResizablePanelGroup className="relative h-48 max-w-md overflow-hidden rounded-lg border">
      {snapPoints.map((point) => (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-y-2 z-10 w-px transition-colors",
            Math.abs(size - point) < 0.75 ? "bg-primary" : "bg-border",
          )}
          key={point}
          style={{ left: `${point}%` }}
        />
      ))}
      <ResizablePanel
        defaultSize="50"
        id="sidebar"
        onResize={(panelSize) => setSize(panelSize.asPercentage)}
        snapPoints={snapPoints}
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
