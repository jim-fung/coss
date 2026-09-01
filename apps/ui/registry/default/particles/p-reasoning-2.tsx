"use client";

import { PlayIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  Reasoning,
  ReasoningPanel,
  ReasoningTrigger,
} from "@/registry/default/ui/reasoning";

export default function Particle() {
  const [isStreaming, setIsStreaming] = useState(false);

  const simulateStream = () => {
    setIsStreaming(true);
    setTimeout(() => {
      setIsStreaming(false);
    }, 3000);
  };

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Button
        className="w-fit"
        onClick={simulateStream}
        size="sm"
        variant="outline"
      >
        <PlayIcon aria-hidden="true" />
        Simulate streaming
      </Button>
      <Reasoning isStreaming={isStreaming}>
        <ReasoningTrigger />
        <ReasoningPanel>
          First I plan the steps, then I verify the result before answering.
          While streaming, this panel stays open and the trigger keeps
          shimmering. One second after the stream ends it collapses again.
        </ReasoningPanel>
      </Reasoning>
    </div>
  );
}
