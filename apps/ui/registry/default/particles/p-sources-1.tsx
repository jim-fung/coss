"use client";

import {
  Source,
  Sources,
  SourcesPanel,
  SourcesTrigger,
} from "@/registry/default/ui/sources";

export default function Particle() {
  return (
    <Sources defaultOpen>
      <SourcesTrigger count={3} />
      <SourcesPanel>
        <Source href="https://base-ui.com" title="Base UI documentation" />
        <Source href="https://tailwindcss.com" title="Tailwind CSS v4" />
        <Source href="https://react.dev" title="React documentation" />
      </SourcesPanel>
    </Sources>
  );
}
