import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/registry/default/ui/resizable";

export default function Particle() {
  return (
    <div className="h-64 w-full max-w-md">
      <ResizablePanelGroup
        className="h-full overflow-hidden rounded-lg border"
        orientation="vertical"
      >
        <ResizablePanel defaultSize="30" maxSize="60" minSize="20">
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-medium text-muted-foreground text-sm">
              Header
            </span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize="70" maxSize="80" minSize="40">
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-medium text-muted-foreground text-sm">
              Content
            </span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
