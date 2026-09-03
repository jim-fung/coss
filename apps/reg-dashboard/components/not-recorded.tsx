import type * as React from "react";

/**
 * WB-1/WB-2: a missing identifier or evidence is shown explicitly as
 * "not recorded", "not applicable" or "unlinked" — it is never reconstructed
 * from a nearby timestamp, raw text or telemetry, and never rendered as an
 * empty cell that looks broken.
 */
export function NotRecorded({
  label = "not recorded",
}: {
  label?: "not recorded" | "not applicable" | "unlinked";
}): React.ReactElement {
  return (
    <span className="text-muted-foreground/70 text-xs italic" title={label}>
      {label}
    </span>
  );
}
