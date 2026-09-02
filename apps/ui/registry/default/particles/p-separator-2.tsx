import { Separator } from "@/registry/default/ui/separator";

export default function Particle() {
  return (
    <div className="flex items-center gap-6">
      <div className="flex max-w-48 flex-col gap-1">
        <p className="font-medium text-sm">Free plan</p>
        <p className="text-muted-foreground text-sm">
          Up to three projects with basic analytics and community support.
        </p>
      </div>
      <Separator className="h-16" orientation="vertical" />
      <div className="flex max-w-48 flex-col gap-1">
        <p className="font-medium text-sm">Pro plan</p>
        <p className="text-muted-foreground text-sm">
          Unlimited projects with advanced insights and priority support.
        </p>
      </div>
    </div>
  );
}
