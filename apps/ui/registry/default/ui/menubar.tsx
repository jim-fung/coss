"use client";

import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { Menubar as MenubarPrimitive } from "@base-ui/react/menubar";
import type * as React from "react";
import { cn } from "@/registry/default/lib/utils";

export function Menubar({
  className,
  children,
  ...props
}: MenubarPrimitive.Props): React.ReactElement {
  return (
    <MenubarPrimitive
      className={cn(
        "inline-flex items-center gap-0.5 rounded-lg border bg-popover not-dark:bg-clip-padding p-1 shadow-xs/5 outline-none",
        className,
      )}
      data-slot="menubar"
      {...props}
    >
      {children}
    </MenubarPrimitive>
  );
}

export function MenubarTrigger({
  className,
  children,
  ...props
}: MenuPrimitive.Trigger.Props): React.ReactElement {
  return (
    <MenuPrimitive.Trigger
      className={cn(
        "flex min-h-7 cursor-pointer items-center gap-1.5 rounded-md px-2 py-1 font-medium text-base text-foreground outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-64 data-popup-open:bg-accent sm:text-sm [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      data-slot="menubar-trigger"
      {...props}
    >
      {children}
    </MenuPrimitive.Trigger>
  );
}
