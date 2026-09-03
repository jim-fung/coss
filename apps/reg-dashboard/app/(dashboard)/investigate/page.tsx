import { Badge } from "@coss/ui/components/badge";
import {
  AppHeader,
  AppHeaderActions,
  AppHeaderContent,
  AppHeaderDescription,
} from "@/components/app/app-header";
import { MessagesTable } from "@/components/app/messages-table";
import { Panel } from "@/components/app/panel";
import { ContentClassTag } from "@/components/content-class-tag";
import { agentRuns, registrationMessages } from "@/lib/mock-data";

export default function InvestigatePage() {
  return (
    <>
      <AppHeader>
        <AppHeaderContent title="Investigate">
          <AppHeaderDescription>
            Message-level drill-down: source text, decision metadata and run
            lineage for a single conversation (WB-4/5/8).
          </AppHeaderDescription>
        </AppHeaderContent>
        <AppHeaderActions>
          <Badge variant="outline">
            {registrationMessages.length} messages
          </Badge>
        </AppHeaderActions>
      </AppHeader>

      <Panel
        description="Source content is visible on this surface only — Operate shows aggregates without identifiers (WB-3/WB-5 T4). Metadata without a decision means undecided (WB-2); a message without a run has not been processed."
        title={
          <span className="flex items-center gap-2">
            <ContentClassTag value="source" /> Messages
          </span>
        }
      >
        <MessagesTable messages={registrationMessages} runs={agentRuns} />
      </Panel>
    </>
  );
}
