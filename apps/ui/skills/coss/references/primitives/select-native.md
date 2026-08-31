# coss Select Native

## When to use

- Dropdowns inside server components, no-JS forms, or anywhere platform-native `<select>` behavior (especially mobile pickers) is preferred over Select.

## Install

```bash
npx shadcn@latest add @coss/select-native
```

No extra runtime dependency required; the component is server-renderable.

## Canonical imports

```tsx
import { SelectNative } from "@/components/ui/select-native"
```

## Minimal pattern

```tsx
<SelectNative aria-label="Framework">
  <option value="">Select framework</option>
  <option value="next">Next.js</option>
</SelectNative>
```

## Notes

- Same `size` variants as Select (`sm`, `default`, `lg`); native `multiple` supported (chevron hidden).
