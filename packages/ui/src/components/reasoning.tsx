"use client";

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import {
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@coss/ui/components/collapsible";
import { Shimmer } from "@coss/ui/components/shimmer";
import { cn } from "@coss/ui/lib/utils";
import { ChevronDownIcon } from "lucide-react";
import type * as React from "react";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const AUTO_CLOSE_DELAY = 1000;

type ReasoningContextValue = {
  isStreaming: boolean;
  duration: number | undefined;
};

const ReasoningContext = createContext<ReasoningContextValue | undefined>(
  undefined,
);

const useReasoning = () => {
  const context = useContext(ReasoningContext);
  if (!context) {
    throw new Error("useReasoning must be used within a Reasoning");
  }
  return context;
};

interface ReasoningProps extends CollapsiblePrimitive.Root.Props {
  /**
   * While true, the trigger shows a streaming indicator and the panel
   * auto-opens (unless `defaultOpen` is explicitly `false`). The transition
   * back to `false` records the duration and auto-closes the panel once,
   * after a short delay.
   */
  isStreaming?: boolean;
  /**
   * Overrides the internally measured duration (in seconds) shown by the
   * trigger after streaming finishes.
   */
  duration?: number;
}

function Reasoning({
  isStreaming = false,
  duration: durationProp,
  open: openProp,
  defaultOpen,
  onOpenChange,
  className,
  ...props
}: ReasoningProps): React.ReactElement {
  const [internalOpen, setInternalOpen] = useState(defaultOpen ?? false);
  const [measuredDuration, setMeasuredDuration] = useState<number | undefined>(
    undefined,
  );
  const streamStartRef = useRef<number | null>(null);
  const hasAutoClosedRef = useRef(false);
  const autoCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const isOpen = openProp ?? internalOpen;

  useEffect(
    () => () => {
      if (autoCloseTimeoutRef.current !== null) {
        clearTimeout(autoCloseTimeoutRef.current);
      }
    },
    [],
  );

  useEffect(() => {
    if (isStreaming) {
      streamStartRef.current = Date.now();
      if (defaultOpen !== false) {
        setInternalOpen(true);
      }
      return;
    }

    if (streamStartRef.current === null) {
      return;
    }
    if (durationProp === undefined) {
      setMeasuredDuration(
        Math.ceil((Date.now() - streamStartRef.current) / 1000),
      );
    }
    streamStartRef.current = null;

    if (!hasAutoClosedRef.current) {
      hasAutoClosedRef.current = true;
      if (autoCloseTimeoutRef.current !== null) {
        clearTimeout(autoCloseTimeoutRef.current);
      }
      autoCloseTimeoutRef.current = setTimeout(() => {
        autoCloseTimeoutRef.current = null;
        setInternalOpen(false);
      }, AUTO_CLOSE_DELAY);
    }
  }, [defaultOpen, durationProp, isStreaming]);

  const handleOpenChange: NonNullable<
    CollapsiblePrimitive.Root.Props["onOpenChange"]
  > = (nextOpen, eventDetails) => {
    if (openProp === undefined) {
      setInternalOpen(nextOpen);
    }
    onOpenChange?.(nextOpen, eventDetails);
  };

  return (
    <ReasoningContext.Provider
      value={{ duration: durationProp ?? measuredDuration, isStreaming }}
    >
      <CollapsiblePrimitive.Root
        className={cn(className)}
        data-slot="reasoning"
        onOpenChange={handleOpenChange}
        open={isOpen}
        {...props}
      />
    </ReasoningContext.Provider>
  );
}

interface ReasoningTriggerProps extends CollapsiblePrimitive.Trigger.Props {
  /**
   * Returns the trigger label. Defaults to a shimmering "Thinking…" while
   * streaming and "Thought for Ns" once a duration is known.
   */
  getThinkingMessage?: (
    isStreaming: boolean,
    duration: number | undefined,
  ) => string;
}

function ReasoningTrigger({
  getThinkingMessage,
  className,
  children,
  ...props
}: ReasoningTriggerProps): React.ReactElement {
  return (
    <CollapsibleTrigger
      className={cn(
        "flex items-center gap-1.5 rounded-md font-medium text-muted-foreground text-sm outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring [&_svg:not([class*='size-'])]:size-3.5 data-panel-open:[&_svg]:rotate-180",
        className,
      )}
      data-slot="reasoning-trigger"
      {...props}
    >
      {children ?? (
        <>
          <ReasoningTriggerLabel getThinkingMessage={getThinkingMessage} />
          <ChevronDownIcon
            aria-hidden="true"
            className="transition-transform duration-200"
          />
        </>
      )}
    </CollapsibleTrigger>
  );
}

function ReasoningTriggerLabel({
  getThinkingMessage,
}: {
  getThinkingMessage?:
    | ((isStreaming: boolean, duration: number | undefined) => string)
    | undefined;
}): React.ReactElement {
  const { isStreaming, duration } = useReasoning();

  if (getThinkingMessage) {
    return <>{getThinkingMessage(isStreaming, duration)}</>;
  }
  if (isStreaming) {
    return (
      <>
        <span
          aria-hidden="true"
          className="size-1.5 animate-pulse rounded-full bg-muted-foreground"
        />
        <Shimmer>Thinking…</Shimmer>
      </>
    );
  }
  if (duration !== undefined) {
    return <>{`Thought for ${duration}s`}</>;
  }
  return <>Thought process</>;
}

function ReasoningPanel({
  className,
  ...props
}: CollapsiblePrimitive.Panel.Props): React.ReactElement {
  return (
    <CollapsiblePanel
      className={cn("text-muted-foreground text-sm", className)}
      data-slot="reasoning-panel"
      {...props}
    />
  );
}

export { Reasoning, ReasoningPanel, ReasoningTrigger };
