import { Badge } from "@coss/ui/components/badge";
import { Card, CardContent } from "@coss/ui/components/card";
import Link from "next/link";
import {
  AppHeader,
  AppHeaderContent,
  AppHeaderDescription,
} from "@/components/app/app-header";
import { VerdictBadge } from "@/components/status-badge";
import { formatDateTime } from "@/lib/format";
import { evalCaseResults, evalRuns } from "@/lib/mock-data";

function caseCounts(evalRunId: string): {
  total: number;
  failed: number;
  flaky: number;
} {
  const cases = evalCaseResults.filter(
    (result) => result.evalRunId === evalRunId,
  );
  return {
    total: cases.length,
    failed: cases.filter((result) => result.verdict === "fail").length,
    flaky: cases.filter((result) => result.verdict === "flaky").length,
  };
}

export default function EvaluationsPage() {
  return (
    <>
      <AppHeader>
        <AppHeaderContent title="Evaluations">
          <AppHeaderDescription>
            Did a model, prompt, vocabulary or code change preserve expected
            behaviour? (WB-7)
          </AppHeaderDescription>
        </AppHeaderContent>
      </AppHeader>

      <div className="grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
        {evalRuns.map((evalRun) => {
          const counts = caseCounts(evalRun.evalRunId);
          return (
            <Card
              className="py-4 transition-shadow hover:shadow-md"
              key={evalRun.evalRunId}
            >
              <CardContent className="flex h-full flex-col gap-3 px-4">
                <div className="flex items-start justify-between gap-2">
                  <Link
                    className="font-mono text-sm underline underline-offset-2 hover:text-foreground"
                    href={`/evaluations/${evalRun.evalRunId}`}
                  >
                    {evalRun.evalRunId}
                  </Link>
                  <VerdictBadge value={evalRun.verdict} />
                </div>
                <p className="text-muted-foreground text-xs">
                  {evalRun.fixtureReference} ·{" "}
                  <Badge variant="outline">{evalRun.executionMode}</Badge>
                </p>
                <p className="text-xs">
                  <span className="font-mono">{evalRun.baselineVersion}</span>
                  {" → "}
                  <span className="font-mono">{evalRun.candidateVersion}</span>
                </p>
                <div className="mt-auto flex items-center justify-between text-muted-foreground text-xs">
                  <span>
                    {counts.total} cases
                    {counts.failed > 0 && ` · ${counts.failed} fail`}
                    {counts.flaky > 0 && ` · ${counts.flaky} flaky`}
                  </span>
                  <span>{formatDateTime(evalRun.startedAt)}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <p className="mt-6 text-muted-foreground text-xs">
        The workbench can export a redacted scorecard but cannot approve a
        release, edit goldens, promote vocabulary or deploy a model (WB-7 T4).
      </p>
    </>
  );
}
