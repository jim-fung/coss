"use client";

import { cn } from "@coss/ui/lib/utils";
import type * as React from "react";
import { useEffect, useRef } from "react";

interface ShimmerProps extends React.ComponentProps<"span"> {
  /**
   * Seconds per shimmer cycle.
   */
  duration?: number;
}

function Shimmer({
  duration = 2,
  className,
  ...props
}: ShimmerProps): React.ReactElement {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const animation = node.animate(
      [{ backgroundPosition: "100% 0" }, { backgroundPosition: "0% 0" }],
      { duration: duration * 1000, iterations: Number.POSITIVE_INFINITY },
    );
    return () => {
      animation.cancel();
    };
  }, [duration]);

  return (
    <span
      className={cn(
        "bg-[length:200%_100%] bg-[linear-gradient(90deg,var(--color-muted-foreground)_40%,var(--color-foreground)_50%,var(--color-muted-foreground)_60%)] bg-clip-text bg-no-repeat text-transparent",
        className,
      )}
      data-slot="shimmer"
      ref={ref}
      {...props}
    />
  );
}

export { Shimmer };
