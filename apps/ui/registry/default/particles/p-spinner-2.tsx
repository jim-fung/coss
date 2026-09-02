import { Spinner } from "@/registry/default/ui/spinner";

export default function Particle() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <Spinner className="size-4" />
        <span className="text-muted-foreground text-xs">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner />
        <span className="text-muted-foreground text-xs">Default</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner className="size-8" />
        <span className="text-muted-foreground text-xs">Large</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner className="size-12" />
        <span className="text-muted-foreground text-xs">Extra large</span>
      </div>
    </div>
  );
}
