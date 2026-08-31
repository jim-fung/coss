"use client";

import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { ChevronDownIcon } from "lucide-react";
import type * as React from "react";
import { cn } from "@/registry/default/lib/utils";

export const NavigationMenu: typeof NavigationMenuPrimitive.Root =
  NavigationMenuPrimitive.Root;

export function NavigationMenuList({
  className,
  children,
  ...props
}: NavigationMenuPrimitive.List.Props): React.ReactElement {
  return (
    <NavigationMenuPrimitive.List
      className={cn("relative flex items-center gap-0.5", className)}
      data-slot="navigation-menu-list"
      {...props}
    >
      {children}
    </NavigationMenuPrimitive.List>
  );
}

export function NavigationMenuItem(
  props: NavigationMenuPrimitive.Item.Props,
): React.ReactElement {
  return (
    <NavigationMenuPrimitive.Item data-slot="navigation-menu-item" {...props} />
  );
}

export function NavigationMenuTrigger({
  className,
  children,
  ...props
}: NavigationMenuPrimitive.Trigger.Props): React.ReactElement {
  return (
    <NavigationMenuPrimitive.Trigger
      className={cn(
        "flex h-8 cursor-pointer items-center gap-1.5 rounded-md px-2.5 font-medium text-base text-foreground outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-64 data-popup-open:bg-accent sm:text-sm [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      data-slot="navigation-menu-trigger"
      {...props}
    >
      {children}
      <NavigationMenuPrimitive.Icon
        className="relative flex items-center justify-center transition-transform duration-200 ease-out data-popup-open:rotate-180"
        data-slot="navigation-menu-icon"
      >
        <ChevronDownIcon aria-hidden="true" className="size-3.5 opacity-80" />
      </NavigationMenuPrimitive.Icon>
    </NavigationMenuPrimitive.Trigger>
  );
}

export function NavigationMenuContent({
  className,
  children,
  ...props
}: NavigationMenuPrimitive.Content.Props): React.ReactElement {
  return (
    <NavigationMenuPrimitive.Content
      className={cn(
        "h-full w-[calc(100vw-2.5rem)] text-foreground outline-none transition-[opacity,transform,translate] duration-[var(--duration)] ease-[var(--easing)] data-ending-style:data-[activation-direction=left]:translate-x-[50%] data-ending-style:data-[activation-direction=right]:-translate-x-[50%] data-starting-style:data-[activation-direction=left]:-translate-x-[50%] data-starting-style:data-[activation-direction=right]:translate-x-[50%] data-ending-style:opacity-0 data-starting-style:opacity-0 sm:w-max sm:max-w-96",
        className,
      )}
      data-slot="navigation-menu-content"
      {...props}
    >
      {children}
    </NavigationMenuPrimitive.Content>
  );
}

export function NavigationMenuLink({
  className,
  children,
  ...props
}: NavigationMenuPrimitive.Link.Props): React.ReactElement {
  return (
    <NavigationMenuPrimitive.Link
      className={cn(
        "rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
        className,
      )}
      data-slot="navigation-menu-link"
      {...props}
    >
      {children}
    </NavigationMenuPrimitive.Link>
  );
}

export function NavigationMenuViewport({
  className,
  ...props
}: NavigationMenuPrimitive.Viewport.Props): React.ReactElement {
  return (
    <NavigationMenuPrimitive.Viewport
      className={cn("relative h-full w-full overflow-hidden p-1", className)}
      data-slot="navigation-menu-viewport"
      {...props}
    />
  );
}

export function NavigationMenuPopup({
  className,
  sideOffset = 10,
  align = "center",
  alignOffset,
  side = "bottom",
  collisionPadding = { top: 5, bottom: 5, left: 20, right: 20 },
  portalProps,
  ...props
}: NavigationMenuPrimitive.Popup.Props & {
  align?: NavigationMenuPrimitive.Positioner.Props["align"];
  sideOffset?: NavigationMenuPrimitive.Positioner.Props["sideOffset"];
  alignOffset?: NavigationMenuPrimitive.Positioner.Props["alignOffset"];
  side?: NavigationMenuPrimitive.Positioner.Props["side"];
  collisionPadding?: NavigationMenuPrimitive.Positioner.Props["collisionPadding"];
  portalProps?: NavigationMenuPrimitive.Portal.Props;
}): React.ReactElement {
  return (
    <NavigationMenuPrimitive.Portal {...portalProps}>
      <NavigationMenuPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        className="z-50 h-[var(--positioner-height)] w-[var(--positioner-width)] max-w-[var(--available-width)] outline-none transition-[top,left,right,bottom] duration-[var(--duration)] ease-[var(--easing)] before:absolute before:content-[''] data-instant:transition-none data-[side=bottom]:before:top-[-10px] data-[side=left]:before:top-0 data-[side=right]:before:top-0 data-[side=bottom]:before:right-0 data-[side=left]:before:right-[-10px] data-[side=top]:before:right-0 data-[side=left]:before:bottom-0 data-[side=right]:before:bottom-0 data-[side=top]:before:bottom-[-10px] data-[side=bottom]:before:left-0 data-[side=right]:before:left-[-10px] data-[side=top]:before:left-0 data-[side=bottom]:before:h-2.5 data-[side=top]:before:h-2.5 data-[side=left]:before:w-2.5 data-[side=right]:before:w-2.5"
        collisionAvoidance={{ side: "none" }}
        collisionPadding={collisionPadding}
        data-slot="navigation-menu-positioner"
        side={side}
        sideOffset={sideOffset}
        style={
          {
            "--duration": "0.35s",
            "--easing": "cubic-bezier(0.22, 1, 0.36, 1)",
          } as React.CSSProperties
        }
      >
        <NavigationMenuPrimitive.Popup
          className={cn(
            "relative h-[var(--popup-height)] w-[var(--popup-width)] origin-(--transform-origin) rounded-lg border bg-popover not-dark:bg-clip-padding text-popover-foreground shadow-lg/5 outline-none transition-[opacity,transform,width,height,scale] duration-[var(--duration)] ease-[var(--easing)] before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] data-ending-style:scale-95 data-starting-style:scale-95 data-ending-style:opacity-0 data-starting-style:opacity-0 data-ending-style:duration-150 data-ending-style:ease-[ease] dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
            className,
          )}
          data-slot="navigation-menu-popup"
          {...props}
        >
          <NavigationMenuViewport />
        </NavigationMenuPrimitive.Popup>
      </NavigationMenuPrimitive.Positioner>
    </NavigationMenuPrimitive.Portal>
  );
}
