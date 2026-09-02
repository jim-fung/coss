import { Rating } from "@/registry/default/ui/rating";

export default function Particle() {
  return (
    <div className="flex max-w-sm flex-col gap-2">
      <span className="text-muted-foreground text-sm">
        Rate your experience
      </span>
      <Rating defaultValue={3} />
    </div>
  );
}
