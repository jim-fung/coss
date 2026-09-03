# Code Review — Spec / Behavior

**Comparison:** `main...HEAD` (`feat/nine-new-primitives`)

## Spec availability

No issue-tracker file, issue reference, or branch-specific specification was found in the repository or commit history. Consequently, formal requirements coverage cannot be assessed without inventing a spec.

## Concrete behavior and integration findings

### High — Nested `<button>` in the tree checkbox particle

- **Files:** `packages/ui/src/components/tree.tsx:121`; `apps/ui/registry/default/particles/p-tree-2.tsx:73-79`
- `TreeItem` defaults to a `<button>`, while the particle places a Base UI `Checkbox` (also a button) inside it. This produces invalid nested interactive HTML, can trigger React DOM-nesting warnings, and causes checkbox clicks to bubble into tree selection/focus behavior.
- **Recommendation:** Use a non-button row for checkbox-containing items, or redesign the row/checkbox interaction so only one control owns selection and keyboard behavior.

### High — `StepperTrigger` submits enclosing forms

- **File:** `packages/ui/src/components/stepper.tsx:154-163`
- The trigger renders a raw button without `type="button"`. When a stepper is placed inside a form, clicking a step can submit the form unexpectedly.
- **Recommendation:** Set `type="button"` by default while allowing an explicit caller override if the API requires it.

### Medium-high — Sort state is not exposed to assistive technology

- **File:** `packages/ui/src/components/data-table.tsx:138`, `202-211`
- Sort direction is communicated visually through an icon, but sortable headers do not expose `aria-sort` on the corresponding table header. Screen readers therefore cannot determine the active sort direction.
- **Recommendation:** Set `aria-sort="ascending"`, `"descending"`, or `"none"` on each sortable `TableHead` based on the table state.

### Medium — Registry preview resolver can select the wrong export for `select-native`

- **File:** `apps/ui/registry/__index__.tsx:805-813`; `apps/ui/registry/default/ui/select-native.tsx:6`
- The lazy resolver chooses the first module export whose value is a function or object. `selectNativeVariants` is exported before the component and is a callable CVA factory, so a preview resolving `select-native` directly may render the variant factory instead of the component.
- **Recommendation:** Resolve an explicit component export (or use a naming convention/metadata map) rather than selecting the first function/object export.

### Low — Dead orientation class on `ResizablePanelGroup`

- **File:** `packages/ui/src/components/resizable.tsx:223`
- `in-data-[orientation=vertical]:flex-col` targets an ancestor carrying the data attribute, but the attribute is on the same group element. The class is inert and misleading, even though the library's inline flex direction currently masks the issue.
- **Recommendation:** Use a self-targeting variant/class or remove the redundant rule and rely on the library's layout behavior.

## Verification notes

TypeScript checks, registry dependency validation, generated registry consistency, and documentation route consistency were reported clean by the integration review. No formal spec pass/fail determination is possible until an originating spec is supplied.

---

# Pass 2 — 2026-09-01 (AI chat suite, `80fae01f...fd65eada`, spec = approved plan, pre-fix)

**Result: core requirements verified faithful; 2 partial-format gaps fixed; 2 accepted deviations.**

- Partial: `useRender` absent from swappable parts — FIXED for Source (the genuinely swappable one, router-link case); Button-derived parts inherit render via ButtonProps; noted as convention satisfied where it matters.
- Partial: sources.mdx had no prop tables, tool.mdx partial — FIXED (tables added).
- Borderline-pass: 2 particles per page (hero + example) matches the nine-primitive batch precedent — kept.
- Deviation kept: Message prop is `from`, not the plan's `role` (avoids aria-role confusion, matches data-from; docs consistent).
- Scope creep kept: `duration` + `getThinkingMessage` props, aria-live thinking line (documented).
- Docs-vs-code cross-check of sources/tool/suggestion/shimmer tables: all accurate.

### Pass-2 resolution (2026-09-01)
- useRender on Source — RESOLVED (2b2feab2) + @base-ui/react declared on the sources entry.
- Missing prop tables (sources/tool) — RESOLVED (2b2feab2).
- Message `from` vs plan's `role` — CLOSED AS DESIGN DECISION (not a defect): `from` matches `data-from`, avoids confusion with ARIA `role`, mirrors AI Elements; docs/changelog consistently use `from`.
- Scope creep items (duration/getThinkingMessage props, aria-live line) — CLOSED AS DOCUMENTED FEATURES.
- Examples = hero + 1 example particle per page — CLOSED: matches the nine-primitive batch precedent for the ≥2-particles docs rule.
