import Link from "next/link";
import type * as React from "react";

type LogoProps = Omit<React.ComponentPropsWithoutRef<typeof Link>, "href">;

export function Logo(props: LogoProps): React.ReactElement {
  return (
    <Link href="/" {...props}>
      <h1 className="font-bold font-heading text-foreground text-xl leading-none [font-variation-settings:'GEOM'_50,'opsz'_32] md:text-base lg:text-lg">
        REG<span className="md:max-lg:sr-only"> Flow Workbench</span>
      </h1>
    </Link>
  );
}
