"use client";

import {
  Tool,
  ToolHeader,
  ToolInput,
  ToolOutput,
  ToolPanel,
} from "@/registry/default/ui/tool";

export default function Particle() {
  return (
    <Tool defaultOpen className="w-full max-w-md">
      <ToolHeader state="output-available" title="get_weather" />
      <ToolPanel>
        <ToolInput input={{ location: "San Francisco", unit: "celsius" }} />
        <ToolOutput output="18°C, partly cloudy with a high of 21°C expected later today." />
      </ToolPanel>
    </Tool>
  );
}
