import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/registry/default/ui/resizable";

export default function Particle() {
  return (
    <ResizablePanelGroup
      className="h-64 max-w-md overflow-hidden rounded-lg border"
      orientation="vertical"
    >
      <ResizablePanel defaultSize="30">
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-medium text-muted-foreground text-sm">
            Header
          </span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="70">
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-medium text-muted-foreground text-sm">
            Content
          </span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
