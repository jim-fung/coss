# Code Review — Standards

**Comparison:** `main...HEAD` (`feat/nine-new-primitives`)

## Findings

### High — Checkbox is not associated with its visible label

- **File:** `apps/ui/registry/default/particles/p-tree-2.tsx:61-70`
- **Rule:** `apps/ui/AGENTS.md` §6, lines 520–524: checkbox controls with visible labels must be wrapped in `Label`, or associated with a label using `id`/`htmlFor` when additional content is outside the label.
- **Issue:** The tree checkbox is rendered beside visible item text without a `Label` wrapper or an explicit label association.
- **Recommendation:** Wrap the checkbox and its visible name in `Label`, or generate an ID with `useId()` and connect the checkbox to a `Label htmlFor={id}`. Preserve the tree's interaction semantics while making the control accessible.

### Judgment call — Nested interactive controls

- **File:** `apps/ui/registry/default/particles/p-tree-2.tsx:59-67`; `apps/ui/registry/default/ui/tree.tsx:64-70`
- **Smell:** Conflicting/nested interaction design (related to duplicated responsibility and unclear ownership).
- **Issue:** `TreeItem` renders as a button, while the example places a checkbox button inside it. This creates invalid nested interactive semantics and can cause checkbox clicks to also select/focus the tree item.
- **Recommendation:** Render checkbox-containing rows with a non-button row element, or make row selection own the interaction and keep the checkbox non-conflicting. Add propagation/keyboard handling only if the chosen interaction model requires it.

## Review notes

No other high-confidence documented-standard violations were found in the reviewed diff. Registry entries, particle naming, imports, dependency declarations, and generated artifacts were otherwise consistent with the repository guidance.

---

# Pass 2 — 2026-09-01 (AI chat suite, `80fae01f...fd65eada`, pre-fix)

**Result: 0 documented-standard violations; 5 baseline smells (judgement calls).**

1. Duplicated collapsible-trigger class core across reasoning/sources/tool — KEPT: cross-file dedup would couple self-contained registry files (copy-paste registry model, AI Elements does the same).
2. Dead narrowing `typeof tooltip === "string"` in PromptInputButton — FIXED (2b2feab2).
3. p-conversation-1 `data-from` on bare `<p>` (attribute inert without Message) — FIXED: real Message/MessageContent rows.
4. Repeated `role === "assistant" && reasoning` ×3 in p-conversation-2 — FIXED: hoisted `isRichAssistant`.
5. `import type` suggestion for reasoning's CollapsiblePrimitive — DISMISSED (false positive: value usage in JSX at reasoning.tsx:122); `cn(className)` no-op — DISMISSED (timeline.tsx:110 precedent).

### Pass-2 resolution (2026-09-01, commit: "chore(ui): resolve remaining review findings")
- #2 dead narrowing — RESOLVED (2b2feab2).
- #3 inert data-from — RESOLVED (2b2feab2).
- #4 repeated condition — RESOLVED (2b2feab2).
- #1 duplicated trigger classes across reasoning/sources/tool — CLOSED WON'T-FIX: the three files are copy-paste self-contained registry units; dedup would either create false dependency edges (sources importing from reasoning) or expand the audited collapsible.tsx API; upstream shadcn/AI Elements duplicate identically.
- #5 `cn(className)` single-arg no-ops (sources.tsx, reasoning.tsx) — RESOLVED (pass straight `className`; timeline.tsx precedent noted but the no-op was still pointless).
- Dismissed items stand as dismissed (CollapsiblePrimitive value-import false positive; cn(className) precedent now moot for our files).
