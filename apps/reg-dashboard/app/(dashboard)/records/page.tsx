import { Badge } from "@coss/ui/components/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@coss/ui/components/table";
import { HistoryIcon } from "lucide-react";
import Link from "next/link";
import type * as React from "react";
import {
  AppHeader,
  AppHeaderContent,
  AppHeaderDescription,
} from "@/components/app/app-header";
import { Panel } from "@/components/app/panel";
import { ContentClassTag } from "@/components/content-class-tag";
import { NotRecorded } from "@/components/not-recorded";
import { formatDate, formatDateTime } from "@/lib/format";
import {
  agentRuns,
  farmActivities,
  farmObservations,
  getField,
} from "@/lib/mock-data";

function RunLink({ entryId }: { entryId: string }): React.ReactElement {
  const run = agentRuns.find((candidate) => candidate.entryId === entryId);
  return run ? (
    <Link
      className="font-mono text-xs underline underline-offset-2 hover:text-foreground"
      href={`/runs/${run.runId}`}
    >
      run {run.runId.slice(0, 8)}
    </Link>
  ) : (
    <NotRecorded label="unlinked" />
  );
}

export default function RecordsPage() {
  const correctedIds = new Set(
    farmActivities.map((activity) => activity.correctionOf).filter(Boolean),
  );

  return (
    <>
      <AppHeader>
        <AppHeaderContent title="Records">
          <AppHeaderDescription>
            Authoritative domain records with provenance links — read-only over
            the domain owners (WB-8).
          </AppHeaderDescription>
        </AppHeaderContent>
      </AppHeader>

      <Panel
        description="Confirmed activities. After an append-only correction the successor shows as current and the predecessor as historical (WB-8 T3)."
        title={
          <span className="flex items-center gap-2">
            <ContentClassTag value="authoritative" /> Activities
          </span>
        }
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Hours</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Person</TableHead>
              <TableHead>Parcels</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Provenance</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {farmActivities.map((activity) => {
              const isCorrection = activity.correctionOf !== undefined;
              const isSuperseded = correctedIds.has(activity.id);
              return (
                <TableRow
                  className={
                    isSuperseded
                      ? "text-muted-foreground line-through decoration-border"
                      : ""
                  }
                  key={activity.id}
                >
                  <TableCell className="whitespace-nowrap text-xs">
                    {formatDate(activity.date)}
                    {activity.dateUncertain && (
                      <Badge className="ms-1" variant="outline">
                        uncertain
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-sm">
                    <span className="font-mono text-xs">
                      {activity.activityType}
                    </span>
                    {activity.inputs && (
                      <span className="ms-2 text-muted-foreground text-xs">
                        {activity.inputs
                          .map(
                            (input) =>
                              `${input.product} ${input.amount} ${input.unit}`,
                          )
                          .join(", ")}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-xs">
                    {activity.durationHours > 0
                      ? `${activity.durationHours} h`
                      : "—"}
                    {activity.hoursEstimated && (
                      <span className="ms-1 text-muted-foreground">(est.)</span>
                    )}
                  </TableCell>
                  <TableCell className="text-xs">
                    {activity.quantity !== undefined
                      ? `${activity.quantity} ${activity.unit}`
                      : "—"}
                  </TableCell>
                  <TableCell className="text-xs">
                    {activity.person ?? "—"}
                  </TableCell>
                  <TableCell className="text-xs">
                    {activity.parcels.length
                      ? activity.parcels
                          .map((id) => getField(id)?.name ?? `field-${id}`)
                          .join(", ")
                      : "—"}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{activity.source}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-mono text-muted-foreground text-xs">
                        {activity.entryId}
                      </span>
                      <RunLink entryId={activity.entryId} />
                    </div>
                  </TableCell>
                  <TableCell>
                    {isCorrection ? (
                      <Badge variant="info">
                        <HistoryIcon aria-hidden className="size-3" />
                        corrects #{activity.correctionOf}
                      </Badge>
                    ) : isSuperseded ? (
                      <Badge variant="outline">superseded</Badge>
                    ) : (
                      <Badge variant="success">current</Badge>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Panel>

      <Panel
        className="mt-6 mb-4"
        description="Something seen — stored separately from activities by design (REG-36 §8)."
        title={
          <span className="flex items-center gap-2">
            <ContentClassTag value="authoritative" /> Observations
          </span>
        }
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Observed</TableHead>
              <TableHead>Concern</TableHead>
              <TableHead>Text</TableHead>
              <TableHead>Field</TableHead>
              <TableHead>Person</TableHead>
              <TableHead>Photo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {farmObservations.map((observation) => (
              <TableRow key={observation.id}>
                <TableCell className="whitespace-nowrap text-xs">
                  {formatDateTime(observation.observedAt)}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{observation.concern}</Badge>
                </TableCell>
                <TableCell className="text-sm">
                  {observation.observationText}
                </TableCell>
                <TableCell className="text-xs">
                  {getField(observation.seasonFieldId)?.name ?? "—"}
                </TableCell>
                <TableCell className="text-xs">{observation.person}</TableCell>
                <TableCell>
                  {observation.photoUrl ? (
                    <Badge variant="outline">bewijsstuk</Badge>
                  ) : (
                    <NotRecorded label="not applicable" />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>
    </>
  );
}
