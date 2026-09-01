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
    <div className="flex w-full max-w-md flex-col gap-4">
      <Tool defaultOpen>
        <ToolHeader state="approval-requested" toolName="delete_file" />
        <ToolPanel>
          <ToolInput input={{ path: "/tmp/notes.txt" }} />
          <ToolOutput errorText="Waiting for the user to approve this action." />
        </ToolPanel>
      </Tool>
      <Tool>
        <ToolHeader state="output-error" toolName="web_search" />
      </Tool>
    </div>
  );
}
