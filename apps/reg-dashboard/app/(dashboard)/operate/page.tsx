import { Card, CardContent } from "@coss/ui/components/card";
import { Separator } from "@coss/ui/components/separator";
import Link from "next/link";
import {
  AppHeader,
  AppHeaderActions,
  AppHeaderContent,
  AppHeaderDescription,
} from "@/components/app/app-header";
import {
  CostChart,
  FunnelChart,
  LatencyChart,
} from "@/components/app/operate-charts";
import { ServiceHealthBadge } from "@/components/status-badge";
import { formatDate, formatDateTime } from "@/lib/format";
import { dailyMetrics, funnelStages, healthPanels } from "@/lib/mock-data";

export default function OperatePage() {
  return (
    <>
      <AppHeader>
        <AppHeaderContent title="Operate">
          <AppHeaderDescription>
            Is the service healthy, and where is work accumulating? (WB-3)
          </AppHeaderDescription>
        </AppHeaderContent>
        <AppHeaderActions className="text-muted-foreground text-xs">
          Aggregate only — no source content. Synthetic fixtures.
        </AppHeaderActions>
      </AppHeader>

      <section
        aria-label="Health panels"
        className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3"
      >
        {healthPanels.map((panel) => (
          <Card key={panel.id} className="py-4">
            <CardContent className="flex h-full flex-col gap-2 px-4">
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-medium text-sm">{panel.label}</h2>
                <ServiceHealthBadge value={panel.health} />
              </div>
              <p className="text-muted-foreground text-sm">{panel.detail}</p>
              <div className="mt-auto flex items-center justify-between gap-2 text-muted-foreground text-xs">
                <span>
                  {panel.freshness} · {formatDateTime(panel.observedAt)}
                </span>
                {panel.alertLink && (
                  <Link
                    className="underline underline-offset-2 hover:text-foreground"
                    href={panel.alertLink}
                  >
                    Investigate
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <Separator className="my-6" />

      <section aria-label="Flow funnel" className="grid gap-6 xl:grid-cols-2">
        <div>
          <div className="mb-2 flex items-baseline justify-between gap-2">
            <h2 className="font-medium text-sm">Flow funnel — last 7 days</h2>
            <p className="text-muted-foreground text-xs">
              Window: Aug 28 – Sep 3 · 62 messages · terminal branches are
              mutually exclusive (WB-3 T2)
            </p>
          </div>
          <FunnelChart stages={funnelStages} />
        </div>
        <div>
          <div className="mb-2 flex items-baseline justify-between gap-2">
            <h2 className="font-medium text-sm">Latency (end-to-end)</h2>
            <p className="text-muted-foreground text-xs">
              p50/p95 per day · no message content in metrics (OPS-9)
            </p>
          </div>
          <LatencyChart data={dailyMetrics} />
        </div>
        <div>
          <div className="mb-2 flex items-baseline justify-between gap-2">
            <h2 className="font-medium text-sm">Cost & volume</h2>
            <p className="text-muted-foreground text-xs">
              Provider spend reconciles with usage (AG-18) · updated{" "}
              {formatDate(dailyMetrics.at(-1)?.date)}
            </p>
          </div>
          <CostChart data={dailyMetrics} />
        </div>
        <div className="text-muted-foreground text-sm">
          <h2 className="mb-2 font-medium text-foreground text-sm">
            Empty-state & scope notes
          </h2>
          <ul className="list-disc space-y-1.5 ps-5">
            <li>
              Zero, not applicable and no data are distinct states; an absent
              panel value is labelled, never guessed.
            </li>
            <li>
              A role without source-data permission sees these aggregates only —
              identifiers and source text require the Investigate surface.
            </li>
            <li>
              Real-farmer intake stays disabled until the G6 legal gate
              (ADR-0006/0008).
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
