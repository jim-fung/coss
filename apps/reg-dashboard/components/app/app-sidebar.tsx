"use client";

import { Badge } from "@coss/ui/components/badge";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@coss/ui/components/sidebar";
import { useMediaQuery } from "@coss/ui/hooks/use-media-query";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type * as React from "react";
import { Logo } from "@/components/logo";
import { navMainItems } from "@/lib/navigation-data";

function NavItem({
  item,
}: {
  item: (typeof navMainItems)[number];
}): React.ReactElement {
  const isBetweenMdAndLg = useMediaQuery("md:max-lg");
  const pathname = usePathname();
  const isActive = pathname.startsWith(item.matchPath ?? item.url);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={isActive}
        render={<Link href={item.url} />}
        tooltip={isBetweenMdAndLg ? item.title : undefined}
      >
        <ItemIcon icon={item.icon} />
        <span className="max-lg:sr-only">{item.title}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function ItemIcon({ icon: Icon }: { icon: LucideIcon }): React.ReactElement {
  return <Icon />;
}

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>): React.ReactElement {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex flex-col items-center justify-between gap-0.5 px-1 lg:flex-row">
          <Logo />
          <Badge variant="secondary" className="max-lg:hidden">
            synthetic
          </Badge>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="gap-0.5">
          {navMainItems.map((item) => (
            <NavItem item={item} key={item.title} />
          ))}
        </SidebarMenu>
        <div className="mt-auto px-3 pb-4">
          <p className="mb-1 text-[0.625rem] text-sidebar-foreground/70 leading-snug max-lg:hidden">
            Read-only workbench over synthetic fixtures (ADR-0006). No
            real-farmer data; the farmer's interface is chat.
          </p>
          <p className="text-[0.625rem] text-sidebar-foreground/50 max-lg:hidden">
            REG registration pilot · WB-1..9
          </p>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
