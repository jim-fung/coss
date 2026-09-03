import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@coss/ui/components/tooltip";
import type * as React from "react";
import {
  type ContentClass,
  contentClassDescriptions,
  contentClassLabels,
} from "@/lib/types";

/**
 * WB-1 content-class label: makes visible whether a value is source wording,
 * an agent proposal, a validation result, an authoritative record, operational
 * or evaluation evidence. An unconfirmed draft must never read as fact.
 */
export function ContentClassTag({
  value,
  className,
}: {
  value: ContentClass;
  className?: string;
}): React.ReactElement {
  return (
    <Tooltip>
      <TooltipTrigger
        className={
          className ??
          "inline-flex items-center rounded-sm border-current/40 border-dashed font-medium text-muted-foreground text-xs leading-none underline decoration-dotted underline-offset-2"
        }
      >
        {contentClassLabels[value]}
      </TooltipTrigger>
      <TooltipContent className="max-w-64">
        {contentClassDescriptions[value]}
      </TooltipContent>
    </Tooltip>
  );
}
