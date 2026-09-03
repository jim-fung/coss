import {
  CardContent,
  CardFrame,
  CardFrameDescription,
  CardFrameHeader,
  CardFrameTitle,
} from "@coss/ui/components/card";
import type * as React from "react";

interface PanelProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function Panel({
  title,
  description,
  children,
  className,
}: PanelProps): React.ReactElement {
  return (
    <CardFrame className={className}>
      <CardFrameHeader>
        <CardFrameTitle>{title}</CardFrameTitle>
        {description && (
          <CardFrameDescription>{description}</CardFrameDescription>
        )}
      </CardFrameHeader>
      <CardContent>{children}</CardContent>
    </CardFrame>
  );
}
