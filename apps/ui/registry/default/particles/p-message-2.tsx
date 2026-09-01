"use client";

import { useState } from "react";
import {
  Message,
  MessageBranch,
  MessageBranchNext,
  MessageBranchPage,
  MessageBranchPrevious,
  MessageBranchSelector,
  MessageContent,
  MessageToolbar,
} from "@/registry/default/ui/message";

const branches = [
  "A design system is a shared language between design and engineering.",
  "A design system is a library of reusable components, tokens, and guidelines.",
  "Think of a design system as a product that serves other products.",
];

export default function Particle() {
  const [branch, setBranch] = useState(0);

  return (
    <div className="flex w-full max-w-md flex-col gap-4 py-2">
      <Message from="user">
        <MessageContent>What is a design system?</MessageContent>
      </Message>
      <Message from="assistant">
        <MessageBranch
          branch={branch}
          onBranchChange={setBranch}
          totalBranches={branches.length}
        >
          <MessageContent>{branches[branch]}</MessageContent>
          <MessageToolbar className="justify-start">
            <MessageBranchSelector>
              <MessageBranchPrevious />
              <MessageBranchPage />
              <MessageBranchNext />
            </MessageBranchSelector>
          </MessageToolbar>
        </MessageBranch>
      </Message>
    </div>
  );
}
