import { useId } from "react";
import { Input } from "@/registry/default/ui/input";
import { Label } from "@/registry/default/ui/label";

export default function Particle() {
  const id = useId();
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <Label htmlFor={id}>Email address</Label>
      <Input id={id} placeholder="Email address" type="email" />
    </div>
  );
}
