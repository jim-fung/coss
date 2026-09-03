import type { BadgeProps } from "@coss/ui/components/badge";
import { Badge } from "@coss/ui/components/badge";
import type * as React from "react";
import { NotRecorded } from "@/components/not-recorded";
import type {
  BusinessDecision,
  ConversationStatus,
  ExecutionStatus,
  ServiceHealth,
  TestVerdict,
  ValidationStatus,
} from "@/lib/types";

/**
 * The five WB-2 status dimensions rendered independently. Every badge has a
 * text label — status is never conveyed by colour alone (WB-9 T4).
 */

interface StatusConfig {
  label: string;
  variant: BadgeProps["variant"];
}

const serviceHealthConfig: Record<ServiceHealth, StatusConfig> = {
  healthy: { label: "healthy", variant: "success" },
  degraded: { label: "degraded", variant: "warning" },
  down: { label: "down", variant: "destructive" },
  unknown: { label: "unknown", variant: "outline" },
};

const executionConfig: Record<ExecutionStatus, StatusConfig> = {
  queued: { label: "queued", variant: "secondary" },
  running: { label: "running", variant: "info" },
  succeeded: { label: "succeeded", variant: "success" },
  failed: { label: "failed", variant: "destructive" },
  retried: { label: "retried", variant: "warning" },
  timed_out: { label: "timed out", variant: "destructive" },
  blocked: { label: "blocked", variant: "warning" },
  cancelled: { label: "cancelled", variant: "outline" },
};

const decisionConfig: Record<BusinessDecision, StatusConfig> = {
  undecided: { label: "undecided", variant: "secondary" },
  ignored: { label: "ignored", variant: "outline" },
  asked: { label: "asked", variant: "warning" },
  registered: { label: "registered", variant: "success" },
  observed: { label: "observed", variant: "info" },
  expired: { label: "expired", variant: "outline" },
};

const validationConfig: Record<ValidationStatus, StatusConfig> = {
  passed: { label: "validation passed", variant: "success" },
  clarification_required: {
    label: "clarification required",
    variant: "warning",
  },
  rejected: { label: "rejected", variant: "destructive" },
  invariant_failed: { label: "invariant failed", variant: "destructive" },
};

const verdictConfig: Record<TestVerdict, StatusConfig> = {
  pass: { label: "pass", variant: "success" },
  fail: { label: "fail", variant: "destructive" },
  flaky: { label: "flaky", variant: "warning" },
  skipped: { label: "skipped", variant: "secondary" },
  not_run: { label: "not run", variant: "outline" },
};

/** Conversation lifecycle (migration 0003) — chat-state, not a WB-2 dimension. */
const conversationStatusConfig: Record<ConversationStatus, StatusConfig> = {
  open: { label: "open", variant: "secondary" },
  awaiting_confirmation: {
    label: "awaiting confirmation",
    variant: "warning",
  },
  closed: { label: "closed", variant: "success" },
  expired: { label: "expired", variant: "outline" },
};

export function ServiceHealthBadge({
  value,
}: {
  value: ServiceHealth;
}): React.ReactElement {
  const config = serviceHealthConfig[value];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

export function ExecutionBadge({
  value,
}: {
  value: ExecutionStatus;
}): React.ReactElement {
  const config = executionConfig[value];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

export function DecisionBadge({
  value,
}: {
  value?: BusinessDecision;
}): React.ReactElement {
  if (!value) {
    return <Badge variant="secondary">undecided</Badge>;
  }
  const config = decisionConfig[value];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

export function ValidationBadge({
  value,
}: {
  value?: ValidationStatus;
}): React.ReactElement {
  if (!value) {
    return <NotRecorded />;
  }
  const config = validationConfig[value];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

export function VerdictBadge({
  value,
}: {
  value?: TestVerdict;
}): React.ReactElement {
  if (!value) {
    return <Badge variant="outline">not run</Badge>;
  }
  const config = verdictConfig[value];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

export function ConversationStatusBadge({
  value,
}: {
  value: ConversationStatus;
}): React.ReactElement {
  const config = conversationStatusConfig[value];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
