# coss Navigation Menu

## When to use

- Site-header navigation with rich dropdown panels (cards, link lists).
- Panel contents morph between triggers inside one shared animated viewport.

## Install

```bash
npx shadcn@latest add @coss/navigation-menu
```

## Canonical imports

```tsx
import {
  NavigationMenu, NavigationMenuContent, NavigationMenuItem,
  NavigationMenuLink, NavigationMenuList, NavigationMenuPopup, NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
```

## Minimal pattern

```tsx
<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Components</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink href="/docs/components/dialog">Dialog</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="#" className="flex h-8 items-center rounded-md px-2.5 font-medium text-base sm:text-sm">GitHub</NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
  <NavigationMenuPopup />
</NavigationMenu>
```

## Notes

- `NavigationMenuPopup` bundles Portal + Positioner + Popup + morphing Viewport; render it once as a sibling of the list. It accepts `portalProps`.
- Router integration: `render={<Link href="…" />}` on `NavigationMenuLink`; `active` sets `data-active`.
- Base UI reference: https://base-ui.com/react/components/navigation-menu
