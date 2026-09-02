"use client";

import { useState } from "react";
import {
  TagInput,
  TagInputInput,
  TagInputItem,
} from "@/registry/default/ui/tag-input";

const MAX_TAGS = 5;

export default function Particle() {
  const [tags, setTags] = useState<string[]>(["next", "typescript"]);
  const limitReached = tags.length >= MAX_TAGS;
  const remaining = MAX_TAGS - tags.length;

  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <TagInput onValueChange={setTags} value={tags}>
        {tags.map((tag) => (
          <TagInputItem key={tag} tag={tag} />
        ))}
        <TagInputInput
          disabled={limitReached}
          placeholder={limitReached ? "Tag limit reached" : "Add tag…"}
        />
      </TagInput>
      <p className="text-muted-foreground text-xs">
        {limitReached
          ? `Maximum of ${MAX_TAGS} tags reached.`
          : `${remaining} more tag${remaining === 1 ? "" : "s"} allowed.`}
      </p>
    </div>
  );
}
