"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import type * as React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { cn } from "@/registry/default/lib/utils";
import { Button } from "@/registry/default/ui/button";
import {
  Tooltip,
  TooltipPopup,
  TooltipTrigger,
} from "@/registry/default/ui/tooltip";

type MessageRole = "user" | "assistant" | "system" | "tool";

interface MessageProps extends React.ComponentProps<"div"> {
  from: MessageRole;
}

function Message({
  from,
  className,
  ...props
}: MessageProps): React.ReactElement {
  return (
    <div
      className={cn(
        "group/message flex w-full flex-col gap-2 data-[from=user]:items-end",
        className,
      )}
      data-from={from}
      data-slot="message"
      {...props}
    />
  );
}

function MessageContent({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 overflow-hidden text-sm group-data-[from=user]/message:w-fit group-data-[from=user]/message:max-w-[min(80%,36rem)] group-data-[from=user]/message:rounded-lg group-data-[from=user]/message:bg-secondary group-data-[from=user]/message:px-4 group-data-[from=user]/message:py-3",
        className,
      )}
      data-slot="message-content"
      {...props}
    />
  );
}

function MessageActions({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn("flex items-center gap-1", className)}
      data-slot="message-actions"
      {...props}
    />
  );
}

interface MessageActionProps extends React.ComponentProps<typeof Button> {
  /**
   * Tooltip content; also the accessible name when `label` is omitted.
   */
  tooltip?: string;
  /**
   * Accessible name for an icon-only action.
   */
  label?: string;
}

function MessageAction({
  tooltip,
  label,
  variant = "ghost",
  size = "icon-sm",
  className,
  children,
  ...props
}: MessageActionProps): React.ReactElement {
  if (tooltip) {
    return (
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              aria-label={label ?? tooltip}
              className={className}
              data-slot="message-action"
              size={size}
              variant={variant}
              {...props}
            />
          }
        >
          {children}
        </TooltipTrigger>
        <TooltipPopup>{tooltip}</TooltipPopup>
      </Tooltip>
    );
  }

  return (
    <Button
      aria-label={label}
      className={className}
      data-slot="message-action"
      size={size}
      variant={variant}
      {...props}
    >
      {children}
    </Button>
  );
}

type MessageBranchContextValue = {
  branch: number;
  totalBranches: number;
  goToPrevious: () => void;
  goToNext: () => void;
};

const MessageBranchContext = createContext<
  MessageBranchContextValue | undefined
>(undefined);

const useMessageBranch = () => {
  const context = useContext(MessageBranchContext);
  if (!context) {
    throw new Error("useMessageBranch must be used within a MessageBranch");
  }
  return context;
};

interface MessageBranchProps extends React.ComponentProps<"div"> {
  totalBranches: number;
  branch?: number;
  defaultBranch?: number;
  onBranchChange?: (branch: number) => void;
}

function MessageBranch({
  totalBranches,
  branch,
  defaultBranch = 0,
  onBranchChange,
  className,
  ...props
}: MessageBranchProps): React.ReactElement {
  const [internalBranch, setInternalBranch] = useState(defaultBranch);

  const setBranch = useCallback(
    (next: number) => {
      const clamped = Math.min(
        Math.max(next, 0),
        Math.max(totalBranches - 1, 0),
      );
      if (branch === undefined) {
        setInternalBranch(clamped);
      }
      onBranchChange?.(clamped);
    },
    [branch, onBranchChange, totalBranches],
  );

  const currentBranch = branch ?? internalBranch;

  const context = useMemo<MessageBranchContextValue>(
    () => ({
      branch: currentBranch,
      goToNext: () => setBranch(currentBranch + 1),
      goToPrevious: () => setBranch(currentBranch - 1),
      totalBranches,
    }),
    [currentBranch, setBranch, totalBranches],
  );

  return (
    <MessageBranchContext.Provider value={context}>
      <div
        className={cn("w-full", className)}
        data-slot="message-branch"
        {...props}
      />
    </MessageBranchContext.Provider>
  );
}

function MessageBranchSelector({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn(
        "flex items-center gap-0.5 text-muted-foreground",
        className,
      )}
      data-slot="message-branch-selector"
      {...props}
    />
  );
}

function MessageBranchPrevious({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>): React.ReactElement {
  const { goToPrevious, branch } = useMessageBranch();

  return (
    <Button
      aria-label="Previous branch"
      className={className}
      data-slot="message-branch-previous"
      disabled={branch === 0}
      onClick={(event) => {
        onClick?.(event);
        goToPrevious();
      }}
      size="icon-xs"
      variant="ghost"
      {...props}
    >
      <ChevronLeftIcon aria-hidden="true" />
    </Button>
  );
}

function MessageBranchNext({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>): React.ReactElement {
  const { goToNext, branch, totalBranches } = useMessageBranch();

  return (
    <Button
      aria-label="Next branch"
      className={className}
      data-slot="message-branch-next"
      disabled={totalBranches <= 1 || branch === totalBranches - 1}
      onClick={(event) => {
        onClick?.(event);
        goToNext();
      }}
      size="icon-xs"
      variant="ghost"
      {...props}
    >
      <ChevronRightIcon aria-hidden="true" />
    </Button>
  );
}

function MessageBranchPage({
  className,
  children,
  ...props
}: React.ComponentProps<"span">): React.ReactElement {
  const { branch, totalBranches } = useMessageBranch();

  return (
    <span
      className={cn(
        "font-medium text-muted-foreground text-xs tabular-nums",
        className,
      )}
      data-slot="message-branch-page"
      {...props}
    >
      {children ?? `${branch + 1} / ${totalBranches}`}
    </span>
  );
}

function MessageToolbar({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-between gap-2",
        className,
      )}
      data-slot="message-toolbar"
      {...props}
    />
  );
}

export {
  Message,
  MessageAction,
  MessageActions,
  MessageBranch,
  MessageBranchNext,
  MessageBranchPage,
  MessageBranchPrevious,
  MessageBranchSelector,
  MessageContent,
  MessageToolbar,
};
export type { MessageRole };
