"use client";

import type { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import { Badge } from "@coss/ui/components/badge";
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@coss/ui/components/collapsible";
import { cn } from "@coss/ui/lib/utils";
import { ChevronDownIcon, WrenchIcon } from "lucide-react";
import type * as React from "react";

type ToolState =
  | "input-streaming"
  | "input-available"
  | "approval-requested"
  | "approval-responded"
  | "output-available"
  | "output-error"
  | "output-denied";

const toolStateBadge: Record<
  ToolState,
  {
    label: string;
    variant:
      | "secondary"
      | "info"
      | "warning"
      | "success"
      | "error"
      | "destructive";
  }
> = {
  "approval-requested": { label: "Awaiting approval", variant: "warning" },
  "approval-responded": { label: "Responded", variant: "secondary" },
  "input-available": { label: "Running", variant: "info" },
  "input-streaming": { label: "Pending", variant: "secondary" },
  "output-available": { label: "Completed", variant: "success" },
  "output-denied": { label: "Denied", variant: "destructive" },
  "output-error": { label: "Error", variant: "error" },
};

function Tool({
  className,
  ...props
}: React.ComponentProps<typeof Collapsible>): React.ReactElement {
  return (
    <Collapsible
      className={cn(
        "rounded-lg border border-input bg-background not-dark:bg-clip-padding shadow-xs/5",
        className,
      )}
      data-slot="tool"
      {...props}
    />
  );
}

interface ToolHeaderProps
  extends Omit<CollapsiblePrimitive.Trigger.Props, "title"> {
  state: ToolState;
  /**
   * Header label. Falls back to `toolName`, then "Tool".
   */
  title?: React.ReactNode;
  toolName?: string;
}

function ToolHeader({
  state,
  title,
  toolName,
  className,
  children,
  ...props
}: ToolHeaderProps): React.ReactElement {
  const badge = toolStateBadge[state];

  return (
    <CollapsibleTrigger
      className={cn(
        "flex w-full items-center justify-between gap-2 rounded-[inherit] px-3 py-2.5 font-medium text-sm outline-none transition-colors hover:bg-accent/50 focus-visible:ring-2 focus-visible:ring-ring [&_svg:not([class*='size-'])]:size-4 data-panel-open:[&_svg]:rotate-180",
        className,
      )}
      data-slot="tool-header"
      {...props}
    >
      {children ?? (
        <>
          <span className="flex min-w-0 items-center gap-2">
            <WrenchIcon
              aria-hidden="true"
              className="shrink-0 text-muted-foreground"
            />
            <span className="truncate" data-slot="tool-header-title">
              {title ?? toolName ?? "Tool"}
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-2">
            <Badge size="sm" variant={badge.variant}>
              {badge.label}
            </Badge>
            <ChevronDownIcon
              aria-hidden="true"
              className="text-muted-foreground transition-transform duration-200"
            />
          </span>
        </>
      )}
    </CollapsibleTrigger>
  );
}

function ToolPanel({
  className,
  ...props
}: CollapsiblePrimitive.Panel.Props): React.ReactElement {
  return (
    <CollapsiblePanel
      className={cn("border-t px-3 py-3 text-sm", className)}
      data-slot="tool-panel"
      {...props}
    />
  );
}

interface ToolInputProps extends React.ComponentProps<"pre"> {
  input?: unknown;
}

function ToolInput({
  input,
  className,
  children,
  ...props
}: ToolInputProps): React.ReactElement | null {
  if (input === undefined) {
    return null;
  }

  let serialized: string;
  try {
    serialized = JSON.stringify(input, null, 2);
  } catch {
    serialized = String(input);
  }

  return (
    <pre
      className={cn(
        "overflow-x-auto rounded-md bg-muted p-3 font-mono text-xs",
        className,
      )}
      data-slot="tool-input"
      {...props}
    >
      {children ?? <code>{serialized}</code>}
    </pre>
  );
}

interface ToolOutputProps extends React.ComponentProps<"div"> {
  output?: React.ReactNode;
  errorText?: string;
}

function ToolOutput({
  output,
  errorText,
  className,
  children,
  ...props
}: ToolOutputProps): React.ReactElement | null {
  if (output === undefined && errorText === undefined && !children) {
    return null;
  }

  return (
    <div
      className={cn("flex flex-col gap-2", className)}
      data-slot="tool-output"
      {...props}
    >
      {errorText ? (
        <div
          className="rounded-md bg-destructive/8 p-3 text-destructive-foreground text-xs"
          data-slot="tool-output-error"
          role="alert"
        >
          {errorText}
        </div>
      ) : null}
      {output}
      {children}
    </div>
  );
}

export { Tool, ToolHeader, ToolInput, ToolOutput, ToolPanel };
export type { ToolState };
