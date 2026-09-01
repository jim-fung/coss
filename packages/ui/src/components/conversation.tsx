"use client";

import { Button } from "@coss/ui/components/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@coss/ui/components/empty";
import { cn } from "@coss/ui/lib/utils";
import { ArrowDownIcon, DownloadIcon } from "lucide-react";
import type * as React from "react";
import { StickToBottom, useStickToBottomContext } from "use-stick-to-bottom";

type ConversationProps = React.ComponentProps<typeof StickToBottom>;

function Conversation({
  className,
  ...props
}: ConversationProps): React.ReactElement {
  return (
    <StickToBottom
      aria-live="polite"
      className={cn(
        "relative min-h-0 flex-1 overflow-y-auto overflow-x-hidden",
        className,
      )}
      data-slot="conversation"
      initial="smooth"
      resize="smooth"
      role="log"
      {...props}
    />
  );
}

type ConversationContentProps = React.ComponentProps<
  typeof StickToBottom.Content
>;

function ConversationContent({
  className,
  ...props
}: ConversationContentProps): React.ReactElement {
  return (
    <StickToBottom.Content
      className={cn("flex flex-col gap-6 px-4 py-4", className)}
      data-slot="conversation-content"
      scrollClassName="overflow-y-auto"
      {...props}
    />
  );
}

interface ConversationEmptyStateProps
  extends Omit<React.ComponentProps<"div">, "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
}

function ConversationEmptyState({
  title = "No messages yet",
  description = "Start a conversation to see messages here",
  icon,
  className,
  children,
  ...props
}: ConversationEmptyStateProps): React.ReactElement {
  return (
    <div
      className={cn(
        "flex min-h-full flex-1 items-center justify-center",
        className,
      )}
      data-slot="conversation-empty-state"
      {...props}
    >
      {children ?? (
        <Empty className="py-8">
          <EmptyHeader>
            {icon ? <EmptyMedia variant="icon">{icon}</EmptyMedia> : null}
            <EmptyTitle>{title}</EmptyTitle>
            <EmptyDescription>{description}</EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}
    </div>
  );
}

function ConversationScrollButton({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>): React.ReactElement | null {
  const { isAtBottom, scrollToBottom } = useStickToBottomContext();

  if (isAtBottom) {
    return null;
  }

  return (
    <Button
      aria-label="Scroll to latest messages"
      className={cn(
        "absolute bottom-4 left-1/2 size-8 -translate-x-1/2 rounded-full",
        className,
      )}
      data-slot="conversation-scroll-button"
      onClick={(event) => {
        onClick?.(event);
        scrollToBottom();
      }}
      size="icon"
      variant="outline"
      {...props}
    >
      <ArrowDownIcon aria-hidden="true" />
    </Button>
  );
}

interface ConversationMessage {
  role: string;
  content: React.ReactNode;
}

function getNodeText(node: React.ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") {
    return "";
  }
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map((child) => getNodeText(child)).join("");
  }
  if (typeof node === "object" && "props" in node) {
    return getNodeText(
      (node as React.ReactElement<{ children?: React.ReactNode }>).props
        .children,
    );
  }
  return "";
}

function messagesToMarkdown(
  messages: ConversationMessage[],
  formatMessage?: (message: ConversationMessage) => string,
): string {
  const format =
    formatMessage ??
    ((message: ConversationMessage) =>
      `## ${
        message.role.charAt(0).toUpperCase() + message.role.slice(1)
      }\n\n${getNodeText(message.content)}`);
  return messages.map((message) => format(message)).join("\n\n");
}

interface ConversationDownloadProps
  extends React.ComponentProps<typeof Button> {
  messages: ConversationMessage[];
  filename?: string;
  formatMessage?: (message: ConversationMessage) => string;
}

function ConversationDownload({
  messages,
  filename = "conversation.md",
  formatMessage,
  className,
  onClick,
  ...props
}: ConversationDownloadProps): React.ReactElement {
  return (
    <Button
      className={className}
      data-slot="conversation-download"
      onClick={(event) => {
        onClick?.(event);
        const markdown = messagesToMarkdown(messages, formatMessage);
        const url = URL.createObjectURL(
          new Blob([markdown], { type: "text/markdown" }),
        );
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = filename;
        anchor.click();
        URL.revokeObjectURL(url);
      }}
      size="sm"
      variant="outline"
      {...props}
    >
      <DownloadIcon aria-hidden="true" />
      Download
    </Button>
  );
}

export {
  Conversation,
  ConversationContent,
  ConversationDownload,
  ConversationEmptyState,
  ConversationScrollButton,
  messagesToMarkdown,
};
export type { ConversationMessage };
