import { Badge } from "@coss/ui/components/badge";
import { InfoIcon } from "lucide-react";
import {
  AppHeader,
  AppHeaderActions,
  AppHeaderContent,
  AppHeaderDescription,
} from "@/components/app/app-header";
import { Panel } from "@/components/app/panel";
import { ContentClassTag } from "@/components/content-class-tag";
import { NotRecorded } from "@/components/not-recorded";
import { formatDateTime } from "@/lib/format";
import { getFarm, unmappedIntake } from "@/lib/mock-data";

export default function IntakePage() {
  return (
    <>
      <AppHeader>
        <AppHeaderContent title="Intake">
          <AppHeaderDescription>
            Messages with identity_state=unmapped: a stable replay key, no run,
            no records (WB-4 T1 / TG-5).
          </AppHeaderDescription>
        </AppHeaderContent>
        <AppHeaderActions>
          <Badge variant="warning">{unmappedIntake.length} waiting</Badge>
        </AppHeaderActions>
      </AppHeader>

      <Panel
        description="Before verified farm/reporter mapping an intake item cannot be processed. Promotion happens through onboarding (TG-4), never from this surface — the workbench grants no mutation rights (WB-9)."
        title="Unmapped intake queue"
      >
        <div className="flex flex-col gap-3">
          {unmappedIntake.map((message) => {
            const farm = getFarm(message.farmId);
            return (
              <div className="rounded-md border p-4" key={message.id}>
                <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
                  <Badge variant="outline">msg-{message.id}</Badge>
                  <span className="font-mono">{message.replayKey}</span>
                  <Badge variant="warning">{message.identityState}</Badge>
                  <span className="text-muted-foreground">
                    {farm?.name ?? message.farmId} ·{" "}
                    {formatDateTime(message.sentAt)} · reporter{" "}
                    {message.reporterId}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <ContentClassTag value="source" className="mt-0.5" />
                  <p className="text-muted-foreground text-sm">
                    Source text withheld —{" "}
                    {message.reporterId.endsWith("9f2")
                      ? "repeat sender awaiting onboarding"
                      : "unknown sender"}{" "}
                    (content unavailable until mapped).
                  </p>
                </div>
              </div>
            );
          })}

          <div className="mt-2 flex items-start gap-2 rounded-md border border-dashed p-3 text-muted-foreground text-sm">
            <InfoIcon aria-hidden className="mt-0.5 size-4 shrink-0" />
            <p>
              A missing identifier is shown as{" "}
              <NotRecorded label="not recorded" /> or{" "}
              <NotRecorded label="not applicable" /> — never reconstructed from
              a nearby timestamp, raw text or telemetry (WB-1 T3). An unmapped
              item shows <span className="font-mono text-xs">replay_key</span> +{" "}
              <span className="font-mono text-xs">identity_state</span> without
              a fabricated run.
            </p>
          </div>
        </div>
      </Panel>
    </>
  );
}
