"use client";

import { Message, MessageContent } from "@/registry/default/ui/message";
import {
  Source,
  Sources,
  SourcesPanel,
  SourcesTrigger,
} from "@/registry/default/ui/sources";

export default function Particle() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4 py-2">
      <Message from="user">
        <MessageContent>What is new in Tailwind CSS v4?</MessageContent>
      </Message>
      <Message from="assistant">
        <MessageContent>
          Tailwind v4 moved configuration into CSS with a new{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">@theme</code>{" "}
          directive and ships a much faster engine written in Rust.
        </MessageContent>
        <Sources defaultOpen>
          <SourcesTrigger count={2} />
          <SourcesPanel>
            <Source
              href="https://tailwindcss.com"
              title="Tailwind CSS v4 release notes"
            />
            <Source
              href="https://tailwindcss.com/blog"
              title="Tailwind CSS blog"
            />
          </SourcesPanel>
        </Sources>
      </Message>
    </div>
  );
}
