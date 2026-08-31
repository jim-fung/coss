import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/registry/default/ui/resizable";

export default function Particle() {
  return (
    <ResizablePanelGroup className="h-48 max-w-md overflow-hidden rounded-lg border">
      <ResizablePanel defaultSize="50">
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-medium text-muted-foreground text-sm">
            Sidebar
          </span>
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
