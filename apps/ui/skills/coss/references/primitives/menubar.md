# coss Menubar

## When to use

- Horizontal application menu bar (File / Edit / View) at the top of a window-like layout.
- Any horizontal row of menus that should open on hover-after-open and share menubar keyboard behavior.

## Install

```bash
npx shadcn@latest add @coss/menubar
```

Requires `@coss/menu` at usage time — the menus inside the bar are regular Menu compositions.

## Canonical imports

```tsx
import { Menubar, MenubarTrigger } from "@/components/ui/menubar"
import { Menu, MenuItem, MenuPopup, MenuSeparator, MenuShortcut } from "@/components/ui/menu"
```

## Minimal pattern

```tsx
<Menubar>
  <Menu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenuPopup align="start">
      <MenuItem>New Tab</MenuItem>
      <MenuSeparator />
      <MenuItem variant="destructive">Close Window</MenuItem>
    </MenuPopup>
  </Menu>
</Menubar>
```

## Notes

- `MenubarTrigger` replaces `MenuTrigger` inside the bar; it carries the bar styling and `data-popup-open` state.
- All Menu parts (submenus, checkbox/radio items, shortcuts) work unchanged inside a menubar.
- Base UI reference: https://base-ui.com/react/components/menubar
