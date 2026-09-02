import { Rating } from "@/registry/default/ui/rating";

const sizes = [
  { defaultValue: 2, label: "Small", size: "sm" },
  { defaultValue: 3, label: "Default", size: "default" },
  { defaultValue: 4, label: "Large", size: "lg" },
] as const;

export default function Particle() {
  return (
    <div className="flex max-w-sm flex-col gap-3">
      {sizes.map(({ label, size, defaultValue }) => (
        <div key={size} className="flex flex-col gap-1.5">
          <span className="text-muted-foreground text-xs">{label}</span>
          <Rating defaultValue={defaultValue} size={size} />
        </div>
      ))}
    </div>
  );
}
