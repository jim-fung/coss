# coss Rating

## When to use

- Star-based scoring where users pick a discrete rating (reviews, feedback, quality).
- Ratings that must be keyboard-operable or submitted with a form.
- When clear-on-click ("unset my rating") is part of the interaction.

## Install

```bash
npx shadcn@latest add @coss/rating
```

Manual deps from docs:

```bash
npm install @base-ui/react
```

## Canonical imports

```tsx
import { Rating, RatingItem } from "@/components/ui/rating"
```

## Minimal pattern

```tsx
import { Rating } from "@/components/ui/rating"

<Rating defaultValue={3} />
```

## Patterns from coss particles

### Key patterns

Controlled rating with clear-on-click; `onValueChange` receives `undefined` when cleared:

```tsx
const [value, setValue] = useState<number | undefined>(3)

<Rating
  allowClear
  value={value}
  onValueChange={setValue}
/>
```

More stars via `count`, smaller via `size`:

```tsx
<Rating count={10} defaultValue={7} size="sm" />
```

Custom stars with `RatingItem` children (replaces the auto-rendered stars):

```tsx
<Rating defaultValue={3}>
  <RatingItem value={1} />
  <RatingItem value={2} />
  <RatingItem value={3} />
  <RatingItem value={4} aria-label="4 stars" />
  <RatingItem value={5} aria-label="5 stars" />
</Rating>
```

### More examples

See `p-rating-1` through `p-rating-4` for the basic rating, controlled usage, sizes, and field integration.

## Common pitfalls

- `allowClear` semantics: without it a selected rating cannot be unset; with it, clicking the selected star (or pressing Space on it while focused) clears to `undefined` — handle that case in `onValueChange` and any persisted state.
- `readOnly` vs `disabled`: both block interaction and the hover preview, but `disabled` also greys the stars out; `readOnly` suits showing a rating inside an otherwise editable form.
- Field integration with `name`: the group submits through its hidden input, so give `Rating` a `name` (and `required` if applicable) when used in a form, or the rating never reaches the payload.
- Half-star precision is not supported — values are whole numbers from `1` to `count`.

## Useful particle references

- basic: `p-rating-1`
- controlled: `p-rating-2`
- sizes: `p-rating-3`
- with field: `p-rating-4`
