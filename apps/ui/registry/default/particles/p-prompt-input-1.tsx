"use client";

import { PaperclipIcon } from "lucide-react";
import { useState } from "react";
import {
  PromptInput,
  PromptInputButton,
  PromptInputFooter,
  type PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@/registry/default/ui/prompt-input";

export default function Particle() {
  const [lastMessage, setLastMessage] = useState<string | null>(null);

  const handleSubmit = (message: PromptInputMessage) => {
    setLastMessage(message.text);
  };

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <PromptInput onSubmit={handleSubmit}>
        <PromptInputTextarea placeholder="Write a message…" rows={2} />
        <PromptInputFooter>
          <PromptInputTools>
            <PromptInputButton aria-label="Attach file" tooltip="Attach file">
              <PaperclipIcon aria-hidden="true" />
            </PromptInputButton>
          </PromptInputTools>
          <PromptInputSubmit />
        </PromptInputFooter>
      </PromptInput>
      {lastMessage ? (
        <p className="text-muted-foreground text-xs">
          Submitted: <span className="text-foreground">{lastMessage}</span>
        </p>
      ) : null}
    </div>
  );
}
