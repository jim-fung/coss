# coss Carousel

## When to use

- Slideshows, horizontal card scrollers, image galleries with prev/next controls.

## Install

```bash
npx shadcn@latest add @coss/carousel
```

Deps: `embla-carousel-react`.

## Canonical imports

```tsx
import {
  Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,
} from "@/components/ui/carousel"
```

## Minimal pattern

```tsx
<Carousel>
  <CarouselContent>
    <CarouselItem>…</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

## Notes

- Slide visibility via `basis-*` on `CarouselItem` (e.g. `basis-1/3`); arrows reuse the Button `outline` variant.
- `setApi` exposes the Embla instance (`CarouselApi` type) for programmatic control; arrow keys work out of the box.
