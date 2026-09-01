"use client";

import {
  Reasoning,
  ReasoningPanel,
  ReasoningTrigger,
} from "@/registry/default/ui/reasoning";

export default function Particle() {
  return (
    <Reasoning defaultOpen duration={4} className="w-full max-w-md">
      <ReasoningTrigger />
      <ReasoningPanel>
        The user asked about the weather. I don&apos;t have live data, so I will
        explain how to find a reliable forecast instead of guessing.
      </ReasoningPanel>
    </Reasoning>
  );
}
