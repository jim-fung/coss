"use client";

import { Shimmer } from "@/registry/default/ui/shimmer";

export default function Particle() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2 py-6 text-center font-medium text-lg">
      <Shimmer duration={3}>Searching the web…</Shimmer>
      <Shimmer className="text-base" duration={1}>
        Reading 12 documents
      </Shimmer>
    </div>
  );
}
