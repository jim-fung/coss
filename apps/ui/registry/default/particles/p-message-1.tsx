"use client";

import {
  CheckIcon,
  CopyIcon,
  PencilIcon,
  RefreshCwIcon,
  ThumbsUpIcon,
} from "lucide-react";
import { useState } from "react";
import {
  Message,
  MessageAction,
  MessageActions,
  MessageContent,
} from "@/registry/default/ui/message";

export default function Particle() {
  const [copied, setCopied] = useState(false);

  return (
    <div className="flex w-full max-w-md flex-col gap-6 py-2">
      <Message from="user">
        <MessageContent>
          Can you explain what a design token is in one sentence?
        </MessageContent>
        <MessageActions>
          <MessageAction label="Edit message">
            <PencilIcon aria-hidden="true" />
          </MessageAction>
        </MessageActions>
      </Message>
      <Message from="assistant">
        <MessageContent>
          A design token is a named, reusable value (like a color, spacing step,
          or font size) that encodes a design decision so interfaces stay
          consistent.
        </MessageContent>
        <MessageActions>
          <MessageAction
            label={copied ? "Copied" : "Copy message"}
            onClick={() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
          >
            {copied ? (
              <CheckIcon aria-hidden="true" />
            ) : (
              <CopyIcon aria-hidden="true" />
            )}
          </MessageAction>
          <MessageAction label="Good response" tooltip="Good response">
            <ThumbsUpIcon aria-hidden="true" />
          </MessageAction>
          <MessageAction label="Regenerate" tooltip="Regenerate">
            <RefreshCwIcon aria-hidden="true" />
          </MessageAction>
        </MessageActions>
      </Message>
    </div>
  );
}
