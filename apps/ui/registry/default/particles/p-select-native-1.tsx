import { SelectNative } from "@/registry/default/ui/select-native";

export default function Particle() {
  return (
    <SelectNative aria-label="Framework" className="max-w-64">
      <option value="">Select framework</option>
      <option value="next">Next.js</option>
      <option value="vite">Vite</option>
      <option value="astro">Astro</option>
    </SelectNative>
  );
}
