"use client";

import { useState } from "react";
import { cn } from "@/registry/default/lib/utils";
import { Avatar, AvatarFallback } from "@/registry/default/ui/avatar";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";
import { Checkbox } from "@/registry/default/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/default/ui/table";

type QueueStatus = "asked" | "clarification_required" | "pending";
type ParcelResolution = "stated" | "by_crop" | "inferred";
type Confidence = "high" | "medium" | "low";

interface ConfirmationRow {
  id: number;
  message: string;
  farmer: string;
  initials: string;
  status: QueueStatus;
  parcelResolution: ParcelResolution;
  confidence: Confidence;
  runId: string;
  received: string;
}

const statusVariants: Record<QueueStatus, "info" | "warning" | "outline"> = {
  asked: "info",
  clarification_required: "warning",
  pending: "outline",
};

const resolutionVariants: Record<ParcelResolution, "secondary" | "outline"> = {
  stated: "secondary",
  by_crop: "outline",
  inferred: "outline",
};

const confidenceVariants: Record<Confidence, "outline" | "warning"> = {
  high: "outline",
  medium: "outline",
  low: "warning",
};

const confidenceLabels: Record<Confidence, string> = {
  high: "high confidence",
  medium: "medium",
  low: "low",
};

const confirmationQueue: ConfirmationRow[] = [
  {
    id: 1,
    message: "vandaag 3 uur gespoten op de pompoen",
    farmer: "Cornelis Visser",
    initials: "CV",
    status: "asked",
    parcelResolution: "stated",
    confidence: "high",
    runId: "run_3f9ac2e1",
    received: "2 min ago",
  },
  {
    id: 2,
    message: "gisteren 8 uur gefreesd tussen de rode bieten",
    farmer: "Anneke Bakker",
    initials: "AB",
    status: "clarification_required",
    parcelResolution: "by_crop",
    confidence: "medium",
    runId: "run_8d41c07a",
    received: "9 min ago",
  },
  {
    id: 3,
    message: "vanmorgen kunstmest gestrooid op de wortelen, 40 kg per ha",
    farmer: "Joris van Dam",
    initials: "JD",
    status: "asked",
    parcelResolution: "stated",
    confidence: "high",
    runId: "run_c25e9f13",
    received: "14 min ago",
  },
  {
    id: 4,
    message: "1.5 uur onkruid gewied in de sjalotten",
    farmer: "Hendrik de Vries",
    initials: "HD",
    status: "pending",
    parcelResolution: "inferred",
    confidence: "low",
    runId: "run_60ba4d8e",
    received: "31 min ago",
  },
  {
    id: 5,
    message:
      "net zaaibed geprepareerd voor de wintertarwe op het stuk bij de sloot",
    farmer: "Martijn Brouwer",
    initials: "MB",
    status: "asked",
    parcelResolution: "by_crop",
    confidence: "medium",
    runId: "run_f1e27b94",
    received: "1 hr ago",
  },
];

export default function Particle() {
  const [selected, setSelected] = useState<Set<number>>(
    () => new Set<number>(),
  );

  const isAllSelected = selected.size === confirmationQueue.length;
  const isSomeSelected = selected.size > 0 && !isAllSelected;

  const toggleAll = (checked: boolean) => {
    setSelected(
      checked ? new Set(confirmationQueue.map((row) => row.id)) : new Set(),
    );
  };

  const toggleRow = (id: number, checked: boolean) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (checked) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  };

  return (
    <div className="grid gap-4">
      <Card className="w-full overflow-hidden">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-2">
            Confirmation queue
            <Badge variant="secondary">{confirmationQueue.length} open</Badge>
          </CardTitle>
          <CardDescription>
            Messages awaiting "Klopt dit?" confirmation
          </CardDescription>
          <CardAction>
            {selected.size > 0 ? (
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-xs tabular-nums">
                  {selected.size} selected
                </span>
                <Button size="sm" variant="outline">
                  Confirm
                </Button>
                <Button size="sm" variant="ghost">
                  Discard
                </Button>
              </div>
            ) : (
              <Button size="sm" variant="outline">
                Open workbench
              </Button>
            )}
          </CardAction>
        </CardHeader>
        <Table variant="card">
          <TableHeader>
            <TableRow>
              <TableHead className="w-9">
                <Checkbox
                  aria-label="Select all messages"
                  checked={isAllSelected}
                  indeterminate={isSomeSelected}
                  onCheckedChange={toggleAll}
                />
              </TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Run</TableHead>
              <TableHead className="text-right">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {confirmationQueue.map((row) => (
              <TableRow
                className="data-[state=selected]:bg-muted/40"
                data-state={selected.has(row.id) ? "selected" : undefined}
                key={row.id}
              >
                <TableCell className="w-9">
                  <Checkbox
                    aria-label={`Select message from ${row.farmer}`}
                    checked={selected.has(row.id)}
                    onCheckedChange={(checked) => toggleRow(row.id, checked)}
                  />
                </TableCell>
                <TableCell className="max-w-44">
                  <div className="flex flex-col gap-1">
                    <p className="truncate" title={row.message}>
                      "{row.message}"
                    </p>
                    <div className="flex items-center gap-1.5">
                      <Avatar className="size-5">
                        <AvatarFallback className="text-[10px]">
                          {row.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-muted-foreground text-xs">
                        {row.farmer}
                      </span>
                      <Badge
                        className={cn(
                          "font-normal",
                          row.confidence !== "low" && "text-muted-foreground",
                        )}
                        size="sm"
                        variant={confidenceVariants[row.confidence]}
                      >
                        {confidenceLabels[row.confidence]}
                      </Badge>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col items-start">
                    <Badge variant={statusVariants[row.status]}>
                      {row.status}
                    </Badge>
                    <Badge
                      className="mt-1"
                      size="sm"
                      variant={resolutionVariants[row.parcelResolution]}
                    >
                      {row.parcelResolution}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-mono text-muted-foreground text-xs tabular-nums">
                      {row.runId}
                    </span>
                    <span className="text-muted-foreground text-xs tabular-nums">
                      {row.received}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="ghost">
                    Open
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
