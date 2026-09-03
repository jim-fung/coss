"use client";

import { Button } from "@coss/ui/components/button";
import {
  Menu,
  MenuGroup,
  MenuItem,
  MenuPopup,
  MenuSeparator,
  MenuTrigger,
} from "@coss/ui/components/menu";
import { cn } from "@coss/ui/lib/utils";
import { EllipsisIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type * as React from "react";
import { useScrollHide } from "@/hooks/use-scroll-hide";
import type { NavItem } from "@/lib/navigation-data";
import { navMainItems } from "@/lib/navigation-data";

const primaryNavItems: NavItem[] = navMainItems.slice(0, 3);
const remainingItems: NavItem[] = navMainItems.slice(3);

export function AppMobileFooter(): React.ReactElement {
  const isHidden = useScrollHide();

  return (
    <footer
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 flex justify-center pb-4 transition-transform duration-500 ease-in-out before:pointer-events-none before:absolute before:inset-x-0 before:-bottom-1 before:h-[200%] before:bg-linear-to-t before:from-60% before:from-background before:transition-opacity before:duration-500 before:ease-in-out md:hidden",
        isHidden
          ? "translate-y-full before:opacity-0"
          : "translate-y-0 before:opacity-100",
      )}
    >
      <div className="relative flex w-fit items-center justify-around gap-1 rounded-full border bg-popover p-1 shadow-black/5 shadow-lg backdrop-blur-sm before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/6%)]">
        {primaryNavItems.map((item) => (
          <MobileNavItem item={item} key={item.title} />
        ))}
        <Menu>
          <MenuTrigger
            aria-label="More navigation"
            render={
              <Button className="size-11! rounded-full" variant="ghost" />
            }
          >
            <EllipsisIcon className="size-5" aria-hidden />
          </MenuTrigger>
          <MenuPopup side="top" align="end">
            <MenuGroup>
              {remainingItems.map((item) => (
                <MenuItem key={item.title} render={<Link href={item.url} />}>
                  <item.icon aria-hidden />
                  <span>{item.title}</span>
                </MenuItem>
              ))}
            </MenuGroup>
            <MenuSeparator />
            <p className="px-2 py-1.5 text-muted-foreground text-xs">
              Synthetic fixtures (ADR-0006)
            </p>
          </MenuPopup>
        </Menu>
      </div>
    </footer>
  );
}

function MobileNavItem({ item }: { item: NavItem }): React.ReactElement {
  const pathname = usePathname();
  const isActive = pathname.startsWith(item.matchPath ?? item.url);

  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      className="flex size-11 items-center justify-center rounded-full text-sidebar-foreground/80 aria-[current=page]:bg-sidebar-accent aria-[current=page]:text-sidebar-accent-foreground"
      href={item.url}
    >
      <item.icon className="size-5" />
    </Link>
  );
}
