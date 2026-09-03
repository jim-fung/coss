import { Badge } from "@coss/ui/components/badge";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type * as React from "react";
import { AppHeader, AppHeaderContent } from "@/components/app/app-header";
import { Panel } from "@/components/app/panel";
import { ContentClassTag } from "@/components/content-class-tag";
import { NotRecorded } from "@/components/not-recorded";
import {
  ConversationStatusBadge,
  DecisionBadge,
} from "@/components/status-badge";
import { formatDateTime } from "@/lib/format";
import {
  agentRuns,
  getConversation,
  getConversationMessages,
  getFarm,
} from "@/lib/mock-data";
import type { RegistrationMessage } from "@/lib/types";

function IdRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}): React.ReactElement {
  return (
    <div className="flex items-baseline justify-between gap-4 py-1">
      <dt className="shrink-0 text-muted-foreground text-xs">{label}</dt>
      <dd className="text-right font-mono text-xs">{value}</dd>
    </div>
  );
}

function ThreadMessage({
  message,
}: {
  message: RegistrationMessage;
}): React.ReactElement {
  const run = agentRuns.find((candidate) => candidate.messageId === message.id);
  const isAgent = message.direction === "out";

  return (
    <li
      className={`flex flex-col gap-1 ${isAgent ? "items-end text-right" : "items-start"}`}
    >
      <div
        className={`flex flex-wrap items-center gap-2 text-xs ${isAgent ? "justify-end" : "justify-start"}`}
      >
        <span className="font-mono">msg-{message.id}</span>
        <span className="font-mono text-muted-foreground">
          {message.reporterId}
        </span>
        <span className="text-muted-foreground">
          {formatDateTime(message.sentAt)}
        </span>
        <DecisionBadge value={message.metadata.decision} />
      </div>
      <blockquote
        className={`max-w-xl rounded-md border p-3 text-sm ${isAgent ? "bg-muted/60" : "bg-muted/40"}`}
      >
        {message.text}
      </blockquote>
      <div className="flex flex-wrap items-center gap-2 text-muted-foreground text-xs">
        {message.entryId && (
          <span className="font-mono">entry {message.entryId}</span>
        )}
        {run ? (
          <span className="flex items-center gap-1">
            <Link
              className="font-mono underline underline-offset-2 hover:text-foreground"
              href={`/runs/${run.runId}`}
            >
              run {run.runId.slice(0, 8)}
            </Link>
            <span>· retention {run.retentionClass}</span>
          </span>
        ) : (
          <span className="font-mono">
            {message.identityState === "unmapped"
              ? "no run (unmapped)"
              : "no run"}
          </span>
        )}
      </div>
    </li>
  );
}

export default async function ConversationPage({
  params,
}: {
  params: Promise<{ conversationId: string }>;
}) {
  const { conversationId } = await params;
  const conversation = getConversation(conversationId);
  if (!conversation) {
    notFound();
  }

  const messages = getConversationMessages(conversation.id);
  const farm = getFarm(conversation.farmId);

  return (
    <>
      <AppHeader>
        <AppHeaderContent title={`Conversation ${conversation.id}`}>
          <Link
            className="flex items-center gap-1 text-muted-foreground text-sm underline underline-offset-2 hover:text-foreground"
            href="/investigate"
          >
            <ArrowLeftIcon className="size-3.5" /> Back to messages
          </Link>
        </AppHeaderContent>
      </AppHeader>

      <Panel
        title="Conversation envelope"
        description="Chat state per migration 0003: one open conversation per chat; closure carries evidence (AG-10)."
      >
        <dl>
          <IdRow label="conversation_id" value={conversation.id} />
          <IdRow label="farm" value={farm?.name ?? conversation.farmId} />
          <IdRow label="reporter" value={conversation.reporterId} />
          <IdRow
            label="channel · chat"
            value={
              conversation.providerChatId
                ? `${conversation.channel} · ${conversation.providerChatId}`
                : conversation.channel
            }
          />
          <IdRow
            label="status"
            value={<ConversationStatusBadge value={conversation.status} />}
          />
          <IdRow label="opened" value={formatDateTime(conversation.openedAt)} />
          <IdRow
            label="updated"
            value={formatDateTime(conversation.updatedAt)}
          />
          <IdRow
            label="closed"
            value={
              conversation.closedAt ? (
                formatDateTime(conversation.closedAt)
              ) : (
                <NotRecorded label="not applicable" />
              )
            }
          />
          <IdRow
            label="close reason"
            value={
              conversation.closeReason ?? <NotRecorded label="not applicable" />
            }
          />
          <IdRow label="messages" value={`${messages.length}`} />
        </dl>
      </Panel>

      <Panel
        className="mt-6 mb-4"
        title={
          <span className="flex items-center gap-2">
            <ContentClassTag value="source" /> Thread
          </span>
        }
        description="Ordered by recorded sent_at — never reconstructed from telemetry. Agent replies align right."
      >
        <ul className="flex flex-col gap-5">
          {messages.map((message) => (
            <ThreadMessage key={message.id} message={message} />
          ))}
        </ul>
        {messages.length === 0 && (
          <p className="text-muted-foreground text-sm">
            <Badge variant="outline">no messages</Badge> — an empty thread is
            labelled, never fabricated.
          </p>
        )}
      </Panel>
    </>
  );
}
