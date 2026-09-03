/**
 * Synthetic fixture data — hand-authored, read-only. ADR-0006: no real-farmer
 * data. Modules under lib/mock hold the per-domain records; this barrel keeps
 * the app-wide import surface stable and composes the cross-farm arrays.
 */

import { farmActivities, farmObservations } from "./mock/activities";
import { farms, seasonFields } from "./mock/core";
import { evalCaseResults, evalRuns, importBatches } from "./mock/evals";
import { agentRunEvents } from "./mock/events";
import {
  bijoviraConversations,
  bijoviraMessages,
} from "./mock/messages-bijovira";
import {
  demoAcresConversations,
  demoAcresMessages,
} from "./mock/messages-demo-acres";
import { intakeMessages } from "./mock/messages-intake";
import {
  noorderhofConversations,
  noorderhofMessages,
} from "./mock/messages-noorderhof";
import { dailyMetrics, funnelStages, healthPanels } from "./mock/metrics";
import { agentRunAttempts, agentRuns } from "./mock/runs";
import type {
  AgentRun,
  AgentRunAttempt,
  AgentRunEvent,
  EvalCaseResult,
  EvalRun,
  Farm,
  FarmActivity,
  FarmObservation,
  ImportBatch,
  RegistrationConversation,
  RegistrationMessage,
  SeasonField,
} from "./types";

export { farms, seasonFields };
export { agentRuns, agentRunAttempts };
export { agentRunEvents };
export { farmActivities, farmObservations };
export { evalRuns, evalCaseResults, importBatches };
export { dailyMetrics, funnelStages, healthPanels };

export const registrationMessages: RegistrationMessage[] = [
  ...bijoviraMessages,
  ...demoAcresMessages,
  ...noorderhofMessages,
  ...intakeMessages,
];

export const registrationConversations: RegistrationConversation[] = [
  ...bijoviraConversations,
  ...demoAcresConversations,
  ...noorderhofConversations,
];

export function getFarm(farmId: string): Farm | undefined {
  return farms.find((farm) => farm.farmId === farmId);
}

export function getField(fieldId: number): SeasonField | undefined {
  return seasonFields.find((field) => field.id === fieldId);
}

export function getMessage(
  id: number | undefined,
): RegistrationMessage | undefined {
  if (id === undefined) {
    return undefined;
  }
  return registrationMessages.find((message) => message.id === id);
}

export function getConversation(
  conversationId: string,
): RegistrationConversation | undefined {
  return registrationConversations.find(
    (conversation) => conversation.id === conversationId,
  );
}

export function getConversationMessages(
  conversationId: string,
): RegistrationMessage[] {
  return registrationMessages
    .filter((message) => message.conversationId === conversationId)
    .sort((a, b) => a.sentAt.localeCompare(b.sentAt));
}

export function getRun(runId: string): AgentRun | undefined {
  return agentRuns.find((run) => run.runId === runId);
}

export function getRunAttempts(runId: string): AgentRunAttempt[] {
  return agentRunAttempts.filter((attempt) => attempt.runId === runId);
}

export function getRunEvents(runId: string): AgentRunEvent[] {
  return agentRunEvents.filter((event) => event.runId === runId);
}

export function getActivitiesByEntry(
  entryId: string | undefined,
): FarmActivity[] {
  if (entryId === undefined) {
    return [];
  }
  return farmActivities.filter((activity) => activity.entryId === entryId);
}

export function getCorrectionsFor(activityId: number): FarmActivity[] {
  return farmActivities.filter(
    (activity) => activity.correctionOf === activityId,
  );
}

export function getImportBatch(
  importBatchId: string | undefined,
): ImportBatch | undefined {
  if (importBatchId === undefined) {
    return undefined;
  }
  return importBatches.find((batch) => batch.id === importBatchId);
}

export function getEvalRun(evalRunId: string): EvalRun | undefined {
  return evalRuns.find((evalRun) => evalRun.evalRunId === evalRunId);
}

export function getEvalCases(evalRunId: string): EvalCaseResult[] {
  return evalCaseResults.filter((result) => result.evalRunId === evalRunId);
}

export function getObservationsForActivity(
  activityId: number,
): FarmObservation[] {
  return farmObservations.filter(
    (observation) => observation.activityId === activityId,
  );
}

export const unmappedIntake: RegistrationMessage[] = intakeMessages.filter(
  (message) => message.identityState === "unmapped",
);
