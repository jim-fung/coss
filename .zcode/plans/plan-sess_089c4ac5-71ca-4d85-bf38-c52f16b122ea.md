# Dashboard particles — RegenOS Flow Workbench theme

## Context
- **Domain** (from `regenos-regtool` docs, esp. `docs/stories/09-flow-workbench.md`): AI agent converts farmer Telegram messages into `farm_activities` records for GO/GLB/SKAL paperwork. Dashboards are the internal **Flow Workbench** (Operate / Investigate / Evaluate) — no farmer-facing UI by design.
- **Design inspiration**: the 4 coss-examples Cal.com pages — event-types (title + slug + chips + copy-link list cards), bookings (actionable status rows), members (avatar + role-badge table), settings general (label + helper + Select/Switch + Update form).
- **No new primitives** — pure particles. Gallery-only (like the chart/ai category rounds); no docs pages needed.

## Deliverable: 6 particles in `apps/ui/registry/default/particles/p-dashboard-{1..6}.tsx`
All with hardcoded mock data, exact domain enums/terminology, Dutch activity labels (`label_nl`: zaaien, spuiten, beregenen…), missing-data wording per docs (`not recorded`, never guessed zeros).

1. **p-dashboard-1 — Operate stats + health**: stat Cards (messages received, registered, awaiting "Klopt dit?" confirmation, failed runs) with trend Badges, plus service-health strip (worker heartbeat / model provider / DB → healthy / degraded badges). *(Cal.com members-style stats)*
2. **p-dashboard-2 — Message flow chart**: Card + `ChartContainer` 7-day area/line: received vs registered vs asked/expired, `var(--chart-1..3)`, tooltip + legend. *(reuses chart primitives)*
3. **p-dashboard-3 — Confirmation queue**: Table of messages awaiting farmer confirmation — chat snippet, farmer avatar initials + nickname, status Badge (`asked` / `clarification_required` / `pending`), parcel resolution (`stated` / `by_crop` / `inferred`), mono `run_id`, actions. *(members-table style)*
4. **p-dashboard-4 — Recent registrations**: vertical list cards — activity (`label_nl` + code), parcel chip ("de pompoen"), duration chip, source badge (telegram/manual/import), status badge (confirmed/voided), copy-`run_id` action. *(event-types-card style)*
5. **p-dashboard-5 — Agent runs monitor**: run rows — mono `run_id` + attempt count, execution Badge (`succeeded` / `running` / `failed` / `timed_out` / `retried`), latency, tokens/cost, retry Button. *(bookings-actionable style)*
6. **p-dashboard-6 — Workbench preferences**: settings form — label + helper text rows with Select (digest frequency, timezone), Switch toggles (Sunday digest, auto-register confirmed), Update Button. *(settings-general style)*

## Pipeline steps
1. Add `"dashboard"` category to `registry-categories.ts` (alphabetical slot near "data table").
2. Write the 6 particle files; import style `@/registry/default/ui/*`, `"use client"` only where interactive (chart tooltip, copy action), `registryDependencies` = `@coss/*` for every primitive used.
3. Insert entries in `registry-particles.ts` at the correct alphabetical positions (mind the no-trailing-comma join gotcha).
4. Regenerate registry artifacts (`public/r/*.json`, `registry.json`) per the add-a-component checklist; run `validate-deps` + typecheck.
5. QA in dev server: `/ui/particles?tags=dashboard` — click/toggle what's interactive and screenshot-verify layout **and** placement (functional ≠ visual). Dark-mode spot check for chart vars.
6. Parallelization: 3 subagents × 2 particles each (disjoint files) for the writing step; I keep category/registration/artifacts/QA.

Commit as one `feat(ui): add dashboard particles` on fork main (not pushed unless asked).