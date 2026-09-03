import { Badge } from "@coss/ui/components/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@coss/ui/components/table";
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@coss/ui/components/timeline";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type * as React from "react";
import { AppHeader, AppHeaderContent } from "@/components/app/app-header";
import { Panel } from "@/components/app/panel";
import { ContentClassTag } from "@/components/content-class-tag";
import { NotRecorded } from "@/components/not-recorded";
import {
  DecisionBadge,
  ExecutionBadge,
  ValidationBadge,
} from "@/components/status-badge";
import {
  formatDateTime,
  formatDuration,
  formatDurationMs,
  shortId,
} from "@/lib/format";
import {
  getActivitiesByEntry,
  getImportBatch,
  getMessage,
  getRun,
  getRunAttempts,
  getRunEvents,
} from "@/lib/mock-data";

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

export default async function RunDetailPage({
  params,
}: {
  params: Promise<{ runId: string }>;
}) {
  const { runId } = await params;
  const run = getRun(runId);
  if (!run) {
    notFound();
  }

  const attempts = getRunAttempts(run.runId);
  const events = getRunEvents(run.runId);
  const message = getMessage(run.messageId);
  const activities = getActivitiesByEntry(run.entryId);
  const importBatch = getImportBatch(run.importBatchId);

  return (
    <>
      <AppHeader>
        <AppHeaderContent title={`Run ${shortId(run.runId, 13)}…`}>
          <Link
            className="flex items-center gap-1 text-muted-foreground text-sm underline underline-offset-2 hover:text-foreground"
            href="/runs"
          >
            <ArrowLeftIcon className="size-3.5" /> Back to runs
          </Link>
        </AppHeaderContent>
      </AppHeader>

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Header: provenance + versions (WB-5 T1) */}
        <Panel
          className="xl:col-span-1"
          title="Run envelope"
          description="Versions and correlation — missing metadata is labelled, never inferred."
        >
          <dl>
            <IdRow label="run_id" value={run.runId} />
            <IdRow
              label="message_id"
              value={run.messageId ? `msg-${run.messageId}` : <NotRecorded />}
            />
            <IdRow label="entry_id" value={run.entryId ?? <NotRecorded />} />
            <IdRow
              label="conversation_id"
              value={
                run.conversationId ?? <NotRecorded label="not applicable" />
              }
            />
            <IdRow
              label="import_batch_id"
              value={
                importBatch ? (
                  importBatch.id
                ) : (
                  <NotRecorded label="not applicable" />
                )
              }
            />
            <IdRow
              label="trace_id"
              value={
                run.traceId ? (
                  <span>
                    {run.traceId}{" "}
                    <Badge className="ms-1" variant="outline">
                      OTel
                    </Badge>
                  </span>
                ) : (
                  <NotRecorded label="unlinked" />
                )
              }
            />
            <IdRow label="source kind" value={run.sourceKind} />
            <IdRow
              label="environment / mode"
              value={`${run.environment} · ${run.executionMode}`}
            />
            <IdRow label="application" value={run.applicationVersion} />
            <IdRow
              label="model"
              value={`${run.modelProvider} ${run.modelVersion}`}
            />
            <IdRow label="prompt/config hash" value={run.promptConfigHash} />
            <IdRow label="profile" value={run.profileVersion} />
            <IdRow label="vocabulary" value={`v${run.vocabularyVersion}`} />
            <IdRow label="schema" value={run.schemaVersion} />
            <IdRow label="retention class" value={run.retentionClass} />
            <IdRow label="started" value={formatDateTime(run.startedAt)} />
            <IdRow
              label="ended"
              value={run.endedAt ? formatDateTime(run.endedAt) : "in flight"}
            />
            <IdRow
              label="duration"
              value={formatDuration(run.startedAt, run.endedAt)}
            />
          </dl>
        </Panel>

        {/* Status dimensions + timeline (WB-2 / WB-5 T2) */}
        <div className="flex flex-col gap-6 xl:col-span-2">
          <Panel
            title="Status"
            description="Independent dimensions — one is never derived from another (WB-2)."
          >
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="flex flex-col gap-1.5">
                <p className="text-muted-foreground text-xs">Execution</p>
                <ExecutionBadge value={run.executionStatus} />
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-muted-foreground text-xs">
                  Business decision
                </p>
                <DecisionBadge value={run.businessDecision} />
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-muted-foreground text-xs">Validation</p>
                <ValidationBadge value={run.validationStatus} />
              </div>
            </div>
          </Panel>

          <Panel
            title="Event timeline"
            description={`Ordered by sequence number · ${events.length} events · stages carry reason codes and durations.`}
          >
            <Timeline defaultValue={events.length} orientation="vertical">
              {events.map((event) => (
                <TimelineItem key={event.eventId} step={event.sequenceNumber}>
                  <TimelineIndicator />
                  <TimelineSeparator />
                  <TimelineHeader>
                    <TimelineDate dateTime={event.occurredAt}>
                      {formatDateTime(event.occurredAt)}
                      {event.durationMs !== undefined &&
                        ` · ${formatDurationMs(event.durationMs)}`}
                    </TimelineDate>
                    <TimelineTitle className="flex flex-wrap items-center gap-2">
                      <span className="capitalize">{event.stage}</span>
                      <ExecutionBadge value={event.executionStatus} />
                      {event.reasonCode && (
                        <Badge variant="outline">{event.reasonCode}</Badge>
                      )}
                      <Badge variant="secondary">{event.actorKind}</Badge>
                      {event.attemptId && (
                        <span className="font-mono text-muted-foreground text-xs">
                          attempt {event.attemptId.split("-").at(-1)}
                        </span>
                      )}
                    </TimelineTitle>
                  </TimelineHeader>
                  {event.metadata && (
                    <TimelineContent className="font-mono text-xs">
                      {Object.entries(event.metadata)
                        .map(([key, value]) => `${key}: ${String(value)}`)
                        .join(" · ")}
                    </TimelineContent>
                  )}
                </TimelineItem>
              ))}
            </Timeline>
          </Panel>
        </div>
      </div>

      {/* Attempts */}
      <Panel
        className="mt-6"
        title="Attempts"
        description="New attempt_id per retry, same run_id (WB-1)."
      >
        {attempts.length ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Started</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Error code</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attempts.map((attempt) => (
                <TableRow key={attempt.attemptId}>
                  <TableCell>{attempt.attemptNumber}</TableCell>
                  <TableCell>
                    <ExecutionBadge value={attempt.status} />
                  </TableCell>
                  <TableCell className="text-xs">
                    {formatDateTime(attempt.startedAt)}
                  </TableCell>
                  <TableCell className="text-xs">
                    {formatDuration(attempt.startedAt, attempt.endedAt)}
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {attempt.errorCode ?? (
                      <NotRecorded label="not applicable" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-muted-foreground text-sm">
            <NotRecorded label="not recorded" /> — no attempt rows exist for
            this run.
          </p>
        )}
      </Panel>

      {/* Source vs records (WB-5 T4) */}
      <Panel
        className="mt-6 mb-4"
        title="Source & outcome"
        description="Source wording, agent proposal and authoritative records are visibly different objects."
      >
        <div className="flex flex-col gap-5">
          <div>
            <div className="mb-1.5 flex items-center gap-2">
              <ContentClassTag value="source" />
              <span className="text-muted-foreground text-xs">
                {message
                  ? `msg-${message.id} · ${formatDateTime(message.sentAt)}`
                  : "no linked message"}
              </span>
            </div>
            {message ? (
              <blockquote className="rounded-md border bg-muted/40 p-3 text-sm">
                {message.text}
              </blockquote>
            ) : (
              <p className="text-muted-foreground text-sm">
                <NotRecorded /> — this run has no chat source (import/replay).
              </p>
            )}
          </div>

          <div>
            <div className="mb-1.5 flex items-center gap-2">
              <ContentClassTag value="authoritative" />
              <span className="text-muted-foreground text-xs">
                {activities.length} record{activities.length === 1 ? "" : "s"}
                {run.entryId ? ` · entry ${run.entryId}` : ""}
              </span>
            </div>
            {activities.length ? (
              <ul className="flex flex-col gap-2">
                {activities.map((activity) => (
                  <li
                    className="rounded-md border p-3 text-sm"
                    key={activity.id}
                  >
                    <span className="font-medium">{activity.activityType}</span>{" "}
                    — {activity.durationHours} h
                    {activity.quantity !== undefined &&
                      ` · ${activity.quantity} ${activity.unit}`}
                    {activity.person && ` · ${activity.person}`}
                    {activity.parcels.length > 0 &&
                      ` · parcels ${activity.parcels.join(", ")}`}
                    {activity.note && (
                      <span className="text-muted-foreground">
                        {" "}
                        — {activity.note}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-sm">
                No authoritative records — zero records is a valid outcome for
                asked, ignored, expired, failed and undecided runs (WB-2 T2).
              </p>
            )}
          </div>
        </div>
      </Panel>
    </>
  );
}
