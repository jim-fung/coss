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

interface ConfirmationRow {
  id: number;
  message: string;
  farmer: string;
  initials: string;
  status: QueueStatus;
  parcelResolution: ParcelResolution;
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

const confirmationQueue: ConfirmationRow[] = [
  {
    id: 1,
    message: "vandaag 3 uur gespoten op de pompoen",
    farmer: "Cornelis Visser",
    initials: "CV",
    status: "asked",
    parcelResolution: "stated",
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
    runId: "run_f1e27b94",
    received: "1 hr ago",
  },
];

export default function Particle() {
  return (
    <div className="grid gap-4">
      <Card className="w-full overflow-hidden">
        <CardHeader className="border-b">
          <CardTitle>Confirmation queue</CardTitle>
          <CardDescription>
            Messages awaiting "Klopt dit?" confirmation
          </CardDescription>
          <CardAction>
            <Button variant="outline" size="sm">
              Open workbench
            </Button>
          </CardAction>
        </CardHeader>
        <Table variant="card">
          <TableHeader>
            <TableRow>
              <TableHead>Message</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Parcel</TableHead>
              <TableHead>Run</TableHead>
              <TableHead className="text-right">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {confirmationQueue.map((row) => (
              <TableRow key={row.id}>
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
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariants[row.status]}>
                    {row.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={resolutionVariants[row.parcelResolution]}>
                    {row.parcelResolution}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-mono text-muted-foreground text-xs">
                      {row.runId}
                    </span>
                    <span className="text-muted-foreground text-xs">
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
