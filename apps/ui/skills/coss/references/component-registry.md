# coss Component Registry Index

Use this file to quickly identify the right coss primitive for a UI task. Each entry includes the component name, a one-line purpose, and the path to its reference guide (relative to the skill root `apps/ui/skills/coss/`).

For optional **`portalProps`** on composed `*Popup` components and **toast** providers (Base UI portal forwarding), see `./references/portal-props.md`.

## Cross-component patterns
- **Segmented Control** — Shared visual treatment for radio choices, navigation links, exclusive toggles, or tabbed panels; choose semantics first. `./references/segmented-control.md`

## Overlays & Popups
- **Dialog** — Centered modal requiring user focus. `./references/primitives/dialog.md`
- **AlertDialog** — Destructive/critical confirmation modal. `./references/primitives/alert-dialog.md`
- **Sheet** — Side-panel overlay for settings/details. `./references/primitives/sheet.md`
- **Drawer** — Bottom/side drawer, often mobile-responsive. `./references/primitives/drawer.md`
- **Popover** — Anchored non-modal floating content. `./references/primitives/popover.md`
- **Tooltip** — Short hover/focus hint text. `./references/primitives/tooltip.md`
- **PreviewCard** — Hover-triggered rich entity preview. `./references/primitives/preview-card.md`
- **Menu** — Dropdown action list with groups/submenus. `./references/primitives/menu.md`
- **Menubar** — Horizontal application menu bar composed from Menu parts. `./references/primitives/menubar.md`
- **ContextMenu** — Right-click/long-press action menu at the pointer. `./references/primitives/context-menu.md`
- **Command** — Searchable command palette (not cmdk). `./references/primitives/command.md`

## Selection & Input
- **Select** — Single-choice from predefined list (no search). `./references/primitives/select.md`
- **Select Native** — Styled native `<select>` for no-JS/mobile-native pickers. `./references/primitives/select-native.md`
- **Combobox** — Searchable selection with filtering. `./references/primitives/combobox.md`
- **Autocomplete** — Free-text with suggestions. `./references/primitives/autocomplete.md`
- **Input** — Single-line text entry. `./references/primitives/input.md`
- **Textarea** — Multi-line text entry. `./references/primitives/textarea.md`
- **InputGroup** — Input with addons (icons, buttons, badges). `./references/primitives/input-group.md`
- **OTPField** — One-time passcode segmented slots. `./references/primitives/otp-field.md`
- **NumberField** — Numeric entry with stepper controls. `./references/primitives/number-field.md`
- **Slider** — Continuous/ranged numeric control. `./references/primitives/slider.md`
- **Calendar** — Date picker / calendar views. `./references/primitives/calendar.md`

## Forms & Validation
- **TagInput** — Free-form tag composer with removable chips. `./references/primitives/tag-input.md`
- **Form** — Form validation/submission with Zod. `./references/primitives/form.md`
- **Field** — Label + description + error wiring. `./references/primitives/field.md`
- **Fieldset** — Grouped form controls with legend. `./references/primitives/fieldset.md`
- **Label** — Accessible label for controls. `./references/primitives/label.md`

## Toggle & Choice
- **Checkbox** — Single boolean toggle. `./references/primitives/checkbox.md`
- **CheckboxGroup** — Multiple-selection set. `./references/primitives/checkbox-group.md`
- **RadioGroup** — Mutually exclusive single choice. `./references/primitives/radio-group.md`
- **Rating** — Star rating input on radiogroup semantics. `./references/primitives/rating.md`
- **Switch** — Binary on/off preference toggle. `./references/primitives/switch.md`
- **Toggle** — Pressable two-state command button. `./references/primitives/toggle.md`
- **ToggleGroup** — Grouped pressed-state controls. `./references/primitives/toggle-group.md`

## Layout & Navigation
- **Tabs** — Mutually exclusive tabbed panels. `./references/primitives/tabs.md`
- **NavigationMenu** — Horizontal navigation with a shared morphing dropdown viewport. `./references/primitives/navigation-menu.md`
- **Accordion** — Collapsible content sections. `./references/primitives/accordion.md`
- **Collapsible** — Single expand/collapse region. `./references/primitives/collapsible.md`
- **Sidebar** — Persistent app shell navigation. `./references/primitives/sidebar.md`
- **Tree** — File-tree hierarchy with selection and keyboard navigation (Headless Tree). `./references/primitives/tree.md`
- **Breadcrumb** — Hierarchical navigation trail. `./references/primitives/breadcrumb.md`
- **Pagination** — Paged navigation controls. `./references/primitives/pagination.md`
- **Toolbar** — Grouped command/action strip. `./references/primitives/toolbar.md`
- **Stepper** — Numbered clickable steps for multi-step flows. `./references/primitives/stepper.md`
- **Resizable** — Adjustable split panes (react-resizable-panels). `./references/primitives/resizable.md`
- **ScrollArea** — Styled scroll container. `./references/primitives/scroll-area.md`

## Content & Display
- **Card** — Content container with sections. `./references/primitives/card.md`
- **Carousel** — Slideshow / horizontal scroller with prev-next controls (Embla). `./references/primitives/carousel.md`
- **DataTable** — Sortable, paginated table composed on TanStack Table. `./references/primitives/data-table.md`
- **Timeline** — Chronological event list with indicators. `./references/primitives/timeline.md`
- **Frame** — Bordered content surface. `./references/primitives/frame.md`
- **Table** — Tabular data presentation. `./references/primitives/table.md`
- **Avatar** — User/entity profile image. `./references/primitives/avatar.md`
- **Badge** — Status indicator / label. `./references/primitives/badge.md`
- **Kbd** — Keyboard shortcut hints. `./references/primitives/kbd.md`
- **Separator** — Visual/semantic divider. `./references/primitives/separator.md`
- **Group** — Connected control cluster. `./references/primitives/group.md`
- **Empty** — Empty-state placeholder. `./references/primitives/empty.md`

## Feedback & Status
- **Alert** — Inline persistent status message. `./references/primitives/alert.md`
- **Toast** — Transient notification (toastManager). `./references/primitives/toast.md`
- **Progress** — Task completion / async progress bar. `./references/primitives/progress.md`
- **Meter** — Bounded scalar measurement. `./references/primitives/meter.md`
- **Spinner** — Indeterminate loading indicator. `./references/primitives/spinner.md`
- **Skeleton** — Loading placeholder. `./references/primitives/skeleton.md`

## Actions
- **Button** — Primary/secondary action trigger. `./references/primitives/button.md`

## AI Chat
- **Conversation** — Stick-to-bottom chat thread with jump button, empty state, Markdown download. `./references/primitives/conversation.md`
- **Message** — Role-aware chat bubble with actions and reply branching. `./references/primitives/message.md`
- **Prompt Input** — Composer form: auto-grow textarea, tool buttons, submit statuses. `./references/primitives/prompt-input.md`
- **Reasoning** — Collapsible model-thinking block with streaming-aware auto-open/close. `./references/primitives/reasoning.md`
- **Tool** — Tool-call card with status badge, JSON input, output/error. `./references/primitives/tool.md`
- **Sources** — Collapsible "Used N sources" citation list. `./references/primitives/sources.md`
- **Suggestion** — Clickable prompt suggestion chips. `./references/primitives/suggestion.md`
- **Shimmer** — Animated gradient text for streaming states. `./references/primitives/shimmer.md`

