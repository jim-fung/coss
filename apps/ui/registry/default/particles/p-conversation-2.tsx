"use client";

import {
  CopyIcon,
  MessagesSquareIcon,
  PaperclipIcon,
  RefreshCwIcon,
  ThumbsUpIcon,
} from "lucide-react";
import { useRef, useState } from "react";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/registry/default/ui/conversation";
import {
  Message,
  MessageAction,
  MessageActions,
  MessageContent,
} from "@/registry/default/ui/message";
import {
  PromptInput,
  PromptInputButton,
  PromptInputFooter,
  type PromptInputStatus,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@/registry/default/ui/prompt-input";
import {
  Reasoning,
  ReasoningPanel,
  ReasoningTrigger,
} from "@/registry/default/ui/reasoning";
import {
  Source,
  Sources,
  SourcesPanel,
  SourcesTrigger,
} from "@/registry/default/ui/sources";
import { Suggestion, Suggestions } from "@/registry/default/ui/suggestion";
import {
  Tool,
  ToolHeader,
  ToolInput,
  ToolOutput,
  ToolPanel,
} from "@/registry/default/ui/tool";

interface ChatMessage {
  id: number;
  role: "user" | "assistant";
  text: string;
  reasoning?: boolean;
}

const suggestions = [
  "What is a design system?",
  "Explain CSS cascade layers",
  "Give me a React performance checklist",
];

const answer =
  "A design system is a shared library of tokens, components, and guidelines that keeps every product surface consistent while letting teams ship faster.";

export default function Particle() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<PromptInputStatus>("ready");
  const [streaming, setStreaming] = useState(false);
  const nextId = useRef(1);

  const handleSubmit = ({ text }: { text: string }) => {
    const userMessage: ChatMessage = { id: nextId.current, role: "user", text };
    const assistantId = nextId.current + 1;
    nextId.current += 2;

    setMessages((previous) => [...previous, userMessage]);
    setStatus("streaming");
    setStreaming(true);

    setTimeout(() => {
      setStreaming(false);
      setMessages((previous) => [
        ...previous,
        { id: assistantId, role: "assistant", text: answer, reasoning: true },
      ]);
      setStatus("ready");
    }, 2000);
  };

  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <div className="flex h-96 flex-col">
        <Conversation className="rounded-lg border">
          <ConversationContent>
            {messages.length === 0 ? (
              <ConversationEmptyState
                description="Ask anything, or pick a suggestion to get started."
                icon={<MessagesSquareIcon aria-hidden="true" />}
                title="No messages yet"
              />
            ) : (
              messages.map((message) => (
                <Message from={message.role} key={message.id}>
                  <MessageContent>
                    {message.role === "assistant" && message.reasoning ? (
                      <Reasoning>
                        <ReasoningTrigger />
                        <ReasoningPanel>
                          The user wants a definition. I will keep it to one
                          sentence and mention tokens, components, and
                          guidelines.
                        </ReasoningPanel>
                      </Reasoning>
                    ) : null}
                    {message.text}
                    {message.role === "assistant" && message.reasoning ? (
                      <>
                        <Sources defaultOpen>
                          <SourcesTrigger count={2} />
                          <SourcesPanel>
                            <Source
                              href="https://atomicblends.com"
                              title="Design systems primer"
                            />
                            <Source
                              href="https://base-ui.com"
                              title="Base UI docs"
                            />
                          </SourcesPanel>
                        </Sources>
                        <Tool defaultOpen>
                          <ToolHeader
                            state="output-available"
                            title="lookup_glossary"
                          />
                          <ToolPanel>
                            <ToolInput input={{ term: "design system" }} />
                            <ToolOutput output="1 result from the internal glossary." />
                          </ToolPanel>
                        </Tool>
                      </>
                    ) : null}
                  </MessageContent>
                  {message.role === "assistant" && message.reasoning ? (
                    <MessageActions>
                      <MessageAction label="Copy message" tooltip="Copy">
                        <CopyIcon aria-hidden="true" />
                      </MessageAction>
                      <MessageAction
                        label="Good response"
                        tooltip="Good response"
                      >
                        <ThumbsUpIcon aria-hidden="true" />
                      </MessageAction>
                      <MessageAction label="Regenerate" tooltip="Regenerate">
                        <RefreshCwIcon aria-hidden="true" />
                      </MessageAction>
                    </MessageActions>
                  ) : null}
                </Message>
              ))
            )}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>
      </div>
      {messages.length === 0 ? (
        <Suggestions>
          {suggestions.map((suggestion) => (
            <Suggestion
              key={suggestion}
              onClick={() => {
                handleSubmit({ text: suggestion });
              }}
              suggestion={suggestion}
            />
          ))}
        </Suggestions>
      ) : null}
      <PromptInput onSubmit={handleSubmit}>
        <PromptInputTextarea placeholder="Reply…" rows={1} />
        <PromptInputFooter>
          <PromptInputTools>
            <PromptInputButton aria-label="Attach file" tooltip="Attach file">
              <PaperclipIcon aria-hidden="true" />
            </PromptInputButton>
          </PromptInputTools>
          <PromptInputSubmit status={status} />
        </PromptInputFooter>
      </PromptInput>
      {streaming ? (
        <p aria-live="polite" className="text-muted-foreground text-xs">
          Assistant is thinking…
        </p>
      ) : null}
    </div>
  );
}
