"use client";

import { SidebarInset, SidebarProvider } from "@coss/ui/components/sidebar";
import type * as React from "react";
import { AppMobileFooter } from "@/components/app/app-mobile-footer";
import { AppMobileHeader } from "@/components/app/app-mobile-header";
import { AppSidebar } from "@/components/app/app-sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppMobileHeader />
      <AppSidebar />
      <SidebarInset className="max-md:px-4 max-md:pt-14 md:px-6">
        {children}
      </SidebarInset>
      <AppMobileFooter />
    </SidebarProvider>
  );
}
