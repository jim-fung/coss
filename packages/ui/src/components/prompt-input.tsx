"use client";

import { Button } from "@coss/ui/components/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupTextarea,
} from "@coss/ui/components/input-group";
import type { TextareaProps } from "@coss/ui/components/textarea";
import {
  Tooltip,
  TooltipPopup,
  TooltipTrigger,
} from "@coss/ui/components/tooltip";
import { cn } from "@coss/ui/lib/utils";
import { ArrowUpIcon, RefreshCwIcon, SquareIcon } from "lucide-react";
import type * as React from "react";
import { createContext, useCallback, useContext, useRef } from "react";

type PromptInputStatus = "ready" | "submitted" | "streaming" | "error";

interface PromptInputMessage {
  text: string;
}

type PromptInputContextValue = {
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  requestSubmit: () => void;
};

const PromptInputContext = createContext<PromptInputContextValue | undefined>(
  undefined,
);

const usePromptInput = () => {
  const context = useContext(PromptInputContext);
  if (!context) {
    throw new Error("usePromptInput must be used within a PromptInput");
  }
  return context;
};

interface PromptInputProps
  extends Omit<React.ComponentProps<"form">, "onSubmit"> {
  /**
   * Called with the trimmed text when the form is submitted with non-empty
   * text. The textarea is reset before this callback runs.
   */
  onSubmit?: (
    message: PromptInputMessage,
    event: React.FormEvent<HTMLFormElement>,
  ) => void;
}

function PromptInput({
  onSubmit,
  className,
  children,
  ...props
}: PromptInputProps): React.ReactElement {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const requestSubmit = useCallback(() => {
    textareaRef.current?.form?.requestSubmit();
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const textarea = textareaRef.current;
    const text = textarea?.value.trim() ?? "";
    if (!text) {
      return;
    }
    if (textarea) {
      textarea.value = "";
    }
    onSubmit?.({ text }, event);
  };

  return (
    <PromptInputContext.Provider value={{ requestSubmit, textareaRef }}>
      <form
        className={cn("w-full", className)}
        data-slot="prompt-input"
        onSubmit={handleSubmit}
        {...props}
      >
        <InputGroup>{children}</InputGroup>
      </form>
    </PromptInputContext.Provider>
  );
}

function PromptInputTextarea({
  className,
  onKeyDown,
  ...props
}: TextareaProps): React.ReactElement {
  const { textareaRef, requestSubmit } = usePromptInput();

  return (
    <InputGroupTextarea
      className={cn("[&_textarea]:min-h-9! [&_textarea]:py-2!", className)}
      data-slot="prompt-input-textarea"
      onKeyDown={(event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        onKeyDown?.(event);
        if (
          event.key === "Enter" &&
          !event.shiftKey &&
          !event.nativeEvent.isComposing
        ) {
          event.preventDefault();
          requestSubmit();
        }
      }}
      ref={textareaRef}
      {...props}
    />
  );
}

function PromptInputHeader({
  className,
  ...props
}: React.ComponentProps<typeof InputGroupAddon>): React.ReactElement {
  return (
    <InputGroupAddon
      align="block-start"
      className={className}
      data-slot="prompt-input-header"
      {...props}
    />
  );
}

function PromptInputFooter({
  className,
  ...props
}: React.ComponentProps<typeof InputGroupAddon>): React.ReactElement {
  return (
    <InputGroupAddon
      align="block-end"
      className={className}
      data-slot="prompt-input-footer"
      {...props}
    />
  );
}

function PromptInputTools({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn("flex items-center gap-1", className)}
      data-slot="prompt-input-tools"
      {...props}
    />
  );
}

interface PromptInputButtonProps extends React.ComponentProps<typeof Button> {
  /**
   * Tooltip content. Omit to rely on `children`/`aria-label` alone.
   */
  tooltip?: string;
}

function PromptInputButton({
  tooltip,
  variant = "ghost",
  size = "icon-sm",
  className,
  children,
  ...props
}: PromptInputButtonProps): React.ReactElement {
  if (tooltip) {
    return (
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              aria-label={tooltip}
              className={className}
              data-slot="prompt-input-button"
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
      className={className}
      data-slot="prompt-input-button"
      size={size}
      variant={variant}
      {...props}
    >
      {children}
    </Button>
  );
}

interface PromptInputSubmitProps extends React.ComponentProps<typeof Button> {
  status?: PromptInputStatus;
}

function PromptInputSubmit({
  status = "ready",
  variant = "default",
  size = "icon-sm",
  className,
  children,
  ...props
}: PromptInputSubmitProps): React.ReactElement {
  const pending = status === "submitted" || status === "streaming";

  return (
    <Button
      aria-label={pending ? "Stop generating" : "Send message"}
      className={cn("ms-auto", className)}
      data-slot="prompt-input-submit"
      size={size}
      type="submit"
      variant={variant}
      {...props}
    >
      {children ??
        (pending ? (
          <SquareIcon aria-hidden="true" className="size-3.5 fill-current" />
        ) : status === "error" ? (
          <RefreshCwIcon aria-hidden="true" />
        ) : (
          <ArrowUpIcon aria-hidden="true" />
        ))}
    </Button>
  );
}

export {
  PromptInput,
  PromptInputButton,
  PromptInputFooter,
  PromptInputHeader,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
};
export type { PromptInputMessage, PromptInputStatus };
