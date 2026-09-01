"use client";

import { Button } from "@coss/ui/components/button";
import { cn } from "@coss/ui/lib/utils";
import type * as React from "react";

function Suggestions({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn("flex flex-wrap gap-2", className)}
      data-slot="suggestions"
      {...props}
    />
  );
}

interface SuggestionProps
  extends Omit<React.ComponentProps<typeof Button>, "onClick"> {
  suggestion: string;
  onClick?: (
    suggestion: string,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => void;
}

function Suggestion({
  suggestion,
  onClick,
  variant = "outline",
  className,
  children,
  ...props
}: SuggestionProps): React.ReactElement {
  return (
    <Button
      className={cn("rounded-full", className)}
      data-slot="suggestion"
      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(suggestion, event);
      }}
      size="xs"
      variant={variant}
      {...props}
    >
      {children ?? suggestion}
    </Button>
  );
}

export { Suggestion, Suggestions };
export type { SuggestionProps };
