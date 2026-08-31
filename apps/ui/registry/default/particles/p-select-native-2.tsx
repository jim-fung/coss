import { SelectNative } from "@/registry/default/ui/select-native";

export default function Particle() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <SelectNative aria-label="Assignees" multiple className="max-h-32">
        <option value="ken">Ken99</option>
        <option value="abe">Abe45</option>
        <option value="monserrat">Monserrat44</option>
        <option value="silas">Silas22</option>
      </SelectNative>
      <SelectNative aria-label="Framework" defaultValue="next" size="sm">
        <option value="next">Next.js</option>
        <option value="vite">Vite</option>
        <option value="astro">Astro</option>
      </SelectNative>
    </div>
  );
}
