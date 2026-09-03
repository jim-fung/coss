import type * as React from "react";
import { HeaderBadge } from "@/components/app/header-badge";
import { Logo } from "@/components/logo";
import { MobileHeader } from "@/components/mobile-header";

export function AppMobileHeader(): React.ReactElement {
  return (
    <MobileHeader>
      <Logo />
      <HeaderBadge />
    </MobileHeader>
  );
}
