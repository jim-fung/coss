import type { RegistrationMessage } from "../types";
import { T } from "./core";

export const intakeMessages: RegistrationMessage[] = [
  // ── Unmapped intake (TG-5 / WB-1: identity_state=unmapped, no run) ─────────
  {
    id: 201,
    farmId: "bijovira-synthetic",
    reporterId: "tg:unknown-9f2",
    direction: "in",
    sentAt: `2026-09-03T07:58:00${T}`,
    text: "[source withheld — unmapped sender]",
    metadata: {},
    identityState: "unmapped",
    replayKey: "rk_01J9ZK7Q2M",
  },
  {
    id: 202,
    farmId: "demo-acres",
    reporterId: "tg:unknown-3a1",
    direction: "in",
    sentAt: `2026-09-03T08:31:00${T}`,
    text: "[source withheld — unmapped sender]",
    metadata: {},
    identityState: "unmapped",
    replayKey: "rk_01J9ZK8W4P",
  },
  {
    id: 203,
    farmId: "bijovira-synthetic",
    reporterId: "tg:unknown-9f2",
    direction: "in",
    sentAt: `2026-09-03T09:12:00${T}`,
    text: "[source withheld — unmapped sender]",
    metadata: {},
    identityState: "unmapped",
    replayKey: "rk_01J9ZK9D7T",
  },
];
