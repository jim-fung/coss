"use client";

import { useState } from "react";
import {
  TagInput,
  TagInputInput,
  TagInputItem,
} from "@/registry/default/ui/tag-input";

export default function Particle() {
  const [tags, setTags] = useState<string[]>(["design", "react"]);

  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <TagInput onValueChange={setTags} value={tags}>
        {tags.map((tag) => (
          <TagInputItem key={tag} tag={tag} />
        ))}
        <TagInputInput placeholder="Add tag…" />
      </TagInput>
      <p className="text-muted-foreground text-xs">
        {tags.length === 0
          ? "No tags yet."
          : `${tags.length} tag${tags.length === 1 ? "" : "s"}: ${tags.join(", ")}`}
      </p>
    </div>
  );
}
