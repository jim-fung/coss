import {
  AppHeader,
  AppHeaderContent,
  AppHeaderDescription,
} from "@/components/app/app-header";
import { RunsTable } from "@/components/app/runs-table";
import { agentRuns, farms } from "@/lib/mock-data";

export default function RunsPage() {
  return (
    <>
      <AppHeader>
        <AppHeaderContent title="Runs">
          <AppHeaderDescription>
            Find a processing run by stable identifiers and controlled filters
            (WB-4). Joins use recorded identifiers only.
          </AppHeaderDescription>
        </AppHeaderContent>
      </AppHeader>
      <RunsTable farms={farms} runs={agentRuns} />
      <p className="mt-6 text-muted-foreground text-xs">
        Messages with no run (unmapped intake) are listed under{" "}
        <a className="underline underline-offset-2" href="/intake">
          Intake
        </a>{" "}
        keyed by replay key and identity state — they are never shown here as
        runs.
      </p>
    </>
  );
}
