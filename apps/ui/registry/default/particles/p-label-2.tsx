import { Checkbox } from "@/registry/default/ui/checkbox";
import { Label } from "@/registry/default/ui/label";

export default function Particle() {
  return (
    <div className="flex flex-col gap-3">
      <Label>
        <Checkbox defaultChecked />
        Email notifications
      </Label>
      <Label>
        <Checkbox />
        Push notifications
      </Label>
      <Label aria-disabled className="text-muted-foreground">
        <Checkbox disabled />
        SMS notifications
      </Label>
    </div>
  );
}
