# coss Tag Input

## When to use

- Free-form tagging: labels, filters, recipients, skills, category lists.

## Install

```bash
npx shadcn@latest add @coss/tag-input
```

## Canonical imports

```tsx
import {
  TagInput, TagInputInput, TagInputItem, TagInputItemRemove,
} from "@/components/ui/tag-input"
```

## Minimal pattern

```tsx
const [tags, setTags] = React.useState<string[]>(["design", "react"])

<TagInput value={tags} onValueChange={setTags}>
  {tags.map((tag) => (
    <TagInputItem key={tag} tag={tag} />
  ))}
  <TagInputInput placeholder="Add tag…" />
</TagInput>
```

## Notes

- Enter adds the trimmed draft as a tag; empty and duplicate (case-sensitive) values are ignored.
- Backspace on an empty input removes the last tag.
- Controlled usage is recommended: chips render from the `tags` array you own via `value` + `onValueChange`.
- `disabled` on `TagInput` freezes chips and input; `disabled` on `TagInputInput` alone is useful for caps like a max-tag limit.
