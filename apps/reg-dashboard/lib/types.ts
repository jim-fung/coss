/**
 * Shared vocabulary for the Flow Workbench. Mirrors the repository-owned
 * registry tables (migrations 0001/0003) and the WB-1/WB-2 contracts in
 * docs/stories/09-flow-workbench.md.
 *
 * The five status dimensions are deliberately independent types: no panel may
 * derive one dimension by guessing from another (WB-2 T1).
 */

// ── Status dimensions (WB-2) ─────────────────────────────────────────────────

export type ServiceHealth = "healthy" | "degraded" | "down" | "unknown";

export type ExecutionStatus =
  | "queued"
  | "running"
  | "succeeded"
  | "failed"
  | "retried"
  | "timed_out"
  | "blocked"
  | "cancelled";

export type BusinessDecision =
  | "undecided"
  | "ignored"
  | "asked"
  | "registered"
  | "observed"
  | "expired";

export type ValidationStatus =
  | "passed"
  | "clarification_required"
  | "rejected"
  | "invariant_failed";

export type TestVerdict = "pass" | "fail" | "flaky" | "skipped" | "not_run";

// ── Content classes (WB-1) ───────────────────────────────────────────────────

export type ContentClass =
  | "source"
  | "proposal"
  | "validation"
  | "authoritative"
  | "operational"
  | "evaluation";

export const contentClassLabels: Record<ContentClass, string> = {
  source: "Source",
  proposal: "Proposal / draft",
  validation: "Validation / confirmation",
  authoritative: "Authoritative record",
  operational: "Operational evidence",
  evaluation: "Evaluation evidence",
};

export const contentClassDescriptions: Record<ContentClass, string> = {
  source:
    "Authenticated message/import reference and original wording (controlled by the source-data policy).",
  proposal: "Agent interpretation; not an authoritative record.",
  validation:
    "Domain checks, required-field result, farmer confirmation event.",
  authoritative:
    "Confirmed activity/observation with append-only correction history.",
  operational: "Logs, traces, metrics, timings, costs — no farmer content.",
  evaluation: "Fixture, expected result, actual structured result and verdict.",
};

// ── Correlation identifiers (WB-1 T1) ────────────────────────────────────────

export type IdentityState = "unmapped" | "mapped";

// ── Domain records (migration 0001) ──────────────────────────────────────────

export interface Farm {
  farmId: string;
  name: string;
}

export interface SeasonField {
  id: number;
  farmId: string;
  jaar: number;
  name: string;
  cropNl: string;
}

export interface ActivityType {
  code: string;
  labelNl: string;
  category:
    | "field_work"
    | "maintenance"
    | "office"
    | "meeting"
    | "procurement"
    | "absence"
    | "other";
  spatial: boolean;
}

export interface ActivityInput {
  product: string;
  amount: number;
  unit: string;
  skalApproved: boolean;
}

export interface FarmActivity {
  id: number;
  farmId: string;
  date: string;
  activityType: string;
  durationHours: number;
  category: ActivityType["category"];
  quantity?: number;
  unit?: string;
  person?: string;
  note?: string;
  source: "telegram" | "manual" | "import";
  entryId: string;
  rawText: string;
  reporterId: string;
  dateUncertain: boolean;
  hoursEstimated: boolean;
  parcels: number[];
  inputs?: ActivityInput[];
  correctionOf?: number;
}

export interface FarmObservation {
  id: number;
  farmId: string;
  seasonFieldId: number;
  activityId?: number;
  observedAt: string;
  concern:
    | "Pest"
    | "Disease"
    | "Weed"
    | "Nutrient or water stress"
    | "Weather damage"
    | "General condition";
  observationText: string;
  person: string;
  source: "telegram" | "manual";
  photoUrl?: string;
}

export type MessageDecision =
  | BusinessDecision
  /** '{}' metadata = undecided (model outage, OPS-5) */
  | "undecided";

export interface RegistrationMessage {
  id: number;
  farmId: string;
  reporterId: string;
  direction: "in" | "out";
  sentAt: string;
  text: string;
  entryId?: string;
  /** Business decision metadata; `{}` means undecided. */
  metadata: { decision?: MessageDecision; reason?: string };
  /** WB-1: explicit identity/mapping state on intake. */
  identityState: IdentityState;
  /** Stable intake idempotency key; exists before mapping. */
  replayKey?: string;
}

// ── Run registry (migration 0003, DM-13/WB-1) ────────────────────────────────

export interface AgentRun {
  runId: string;
  farmId: string;
  messageId?: number;
  conversationId?: string;
  importBatchId?: string;
  entryId?: string;
  sourceKind: "telegram" | "import" | "replay";
  environment: "staging" | "pilot" | "ci";
  executionMode: "deterministic" | "live";
  executionStatus: ExecutionStatus;
  businessDecision?: BusinessDecision;
  validationStatus?: ValidationStatus;
  applicationVersion: string;
  modelProvider: string;
  modelVersion: string;
  promptConfigHash: string;
  profileVersion: string;
  vocabularyVersion: number;
  schemaVersion: string;
  traceId?: string;
  evalRunId?: string;
  retentionClass: "standard" | "extended" | "short";
  startedAt: string;
  endedAt?: string;
}

export interface AgentRunAttempt {
  attemptId: string;
  runId: string;
  attemptNumber: number;
  status: ExecutionStatus;
  traceId?: string;
  startedAt: string;
  endedAt?: string;
  errorCode?: string;
}

export interface AgentRunEvent {
  eventId: string;
  runId: string;
  attemptId?: string;
  sequenceNumber: number;
  occurredAt: string;
  stage:
    | "persist"
    | "scope"
    | "conversation"
    | "agent"
    | "model"
    | "tool"
    | "validation"
    | "confirmation"
    | "transaction"
    | "reply"
    | "retry"
    | "expiry"
    | "correction";
  executionStatus: ExecutionStatus;
  reasonCode?: string;
  durationMs?: number;
  actorKind:
    | "worker"
    | "agent"
    | "model"
    | "tool"
    | "validator"
    | "database"
    | "farmer";
  /** Bounded safe metadata — never message text or secrets (OPS-9). */
  metadata?: Record<string, string | number | boolean>;
}

// ── Evaluation registry (migration 0003, QA-2/WB-7) ──────────────────────────

export interface EvalRun {
  evalRunId: string;
  environment: "staging" | "ci";
  executionMode: "deterministic" | "live";
  fixtureReference: string;
  fixtureRedactionState: "redacted" | "synthetic";
  baselineVersion: string;
  candidateVersion: string;
  schemaVersion: string;
  startedAt: string;
  endedAt?: string;
  verdict?: TestVerdict;
  retentionClass: "standard" | "extended" | "short";
}

export interface EvalCaseResult {
  id: number;
  evalRunId: string;
  caseId: string;
  runId?: string;
  expectedOutcome: string;
  actualOutcome: string;
  fieldDiff: Record<string, { expected: string; actual: string }>;
  invariantResults: Record<string, boolean>;
  verdict: TestVerdict;
  retryCount: number;
  latencyMs: number;
  tokenCount: number;
  costAmount: number;
}

// ── Import (migration 0003, IM-5/IM-6) ───────────────────────────────────────

export interface ImportBatch {
  id: string;
  farmId: string;
  importFileHash: string;
  requestedBy: string;
  startedAt: string;
  completedAt?: string;
  status: "running" | "completed" | "failed" | "cancelled";
  rowsTotal: number;
  rowsRegistered: number;
  rowsIgnored: number;
  rowsDeferred: number;
}

// ── Operational aggregates (OPS-10 / WB-3) ───────────────────────────────────

export interface HealthPanel {
  id: string;
  label: string;
  health: ServiceHealth;
  detail: string;
  observedAt: string;
  freshness: "live" | "delayed" | "unknown";
  alertLink?: string;
}

export interface FunnelStage {
  id: string;
  label: string;
  count: number;
  /** Stage ids of the mutually-exclusive terminal branches. */
  branchOf?: string;
}

export interface DailyMetric {
  date: string;
  p50LatencyMs: number;
  p95LatencyMs: number;
  tokensIn: number;
  tokensOut: number;
  costAmount: number;
  runs: number;
}
