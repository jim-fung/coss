"use client";

import { SparklesIcon } from "lucide-react";
import { Shimmer } from "@/registry/default/ui/shimmer";

export default function Particle() {
  return (
    <div className="flex w-full flex-col items-center gap-2 py-6 text-base">
      <span className="flex items-center gap-2 text-muted-foreground">
        <SparklesIcon aria-hidden="true" className="size-4" />
        <Shimmer>Generating response…</Shimmer>
      </span>
      <p className="max-w-xs text-center text-muted-foreground text-sm">
        The shimmer effect indicates that content is being streamed.
      </p>
    </div>
  );
}
