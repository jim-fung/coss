"use client";

import { CheckIcon, ClockIcon, CopyIcon, SendIcon } from "lucide-react";
import { useCopyToClipboard } from "@/registry/default/hooks/use-copy-to-clipboard";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/registry/default/ui/card";

type RegistrationStatus = "confirmed" | "pending" | "voided";

type RegistrationSource = "telegram" | "manual";

type Registration = {
  slug: string;
  labelNl: string;
  parcel: string | null;
  duration: string;
  rainfall: string | null;
  source: RegistrationSource;
  status: RegistrationStatus;
  runId: string;
};

const registrations: Registration[] = [
  {
    slug: "sowing",
    labelNl: "Zaaien",
    parcel: "achter oost",
    duration: "2.5 u",
    rainfall: null,
    source: "telegram",
    status: "confirmed",
    runId: "run_9a3f21c4",
  },
  {
    slug: "spraying",
    labelNl: "Spuiten",
    parcel: "de pompoen",
    duration: "1.0 u",
    rainfall: null,
    source: "telegram",
    status: "pending",
    runId: "run_7c11e8d2",
  },
  {
    slug: "irrigation",
    labelNl: "Beregenen",
    parcel: "achter oost",
    duration: "6.0 u",
    rainfall: "15 mm",
    source: "telegram",
    status: "confirmed",
    runId: "run_5d90aa71",
  },
  {
    slug: "kopeggen",
    labelNl: "Kopeggen",
    parcel: null,
    duration: "3.0 u",
    rainfall: null,
    source: "telegram",
    status: "voided",
    runId: "run_2b48f0e9",
  },
  {
    slug: "hand_weeding",
    labelNl: "Handwieden",
    parcel: "de pompoen",
    duration: "3.0 u",
    rainfall: null,
    source: "manual",
    status: "confirmed",
    runId: "run_e1c27b36",
  },
];

const statusBadge: Record<
  RegistrationStatus,
  {
    label: string;
    variant: "success" | "warning" | "outline";
    className?: string;
  }
> = {
  confirmed: { label: "confirmed", variant: "success" },
  pending: { label: "pending", variant: "warning" },
  voided: {
    label: "voided",
    variant: "outline",
    className: "text-muted-foreground line-through",
  },
};

function CopyRunIdButton({ runId }: { runId: string }) {
  const { copyToClipboard, isCopied } = useCopyToClipboard();

  return (
    <Button
      aria-label={`Copy ${runId}`}
      onClick={() => copyToClipboard(runId)}
      size="icon-sm"
      variant="ghost"
    >
      {isCopied ? (
        <CheckIcon aria-hidden="true" />
      ) : (
        <CopyIcon aria-hidden="true" />
      )}
    </Button>
  );
}

export default function Particle() {
  return (
    <div className="grid gap-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Recent registrations</CardTitle>
          <CardDescription>
            Latest farm activities parsed from Telegram chat
          </CardDescription>
          <CardAction>
            <Button size="sm" variant="outline">
              View all
            </Button>
          </CardAction>
        </CardHeader>
        <CardPanel>
          <ul className="divide-y">
            {registrations.map((registration) => {
              const status = statusBadge[registration.status];

              return (
                <li
                  className="flex flex-wrap items-center gap-x-4 gap-y-2 py-3 first:pt-0 last:pb-0"
                  key={registration.runId}
                >
                  <div className="min-w-0 flex-1 basis-48">
                    <p className="font-medium text-sm">
                      {registration.labelNl}
                    </p>
                    <p className="font-mono text-muted-foreground text-xs">
                      {registration.slug}
                    </p>
                    {registration.parcel ? (
                      <p className="text-muted-foreground text-xs">
                        {registration.parcel}
                      </p>
                    ) : (
                      <p className="text-muted-foreground text-xs italic">
                        not recorded
                      </p>
                    )}
                  </div>
                  <div className="flex flex-1 basis-48 flex-wrap items-center justify-end gap-1.5">
                    <Badge size="sm" variant="outline">
                      <ClockIcon aria-hidden="true" />
                      <span className="tabular-nums">
                        {registration.duration}
                      </span>
                    </Badge>
                    {registration.rainfall ? (
                      <Badge size="sm" variant="outline">
                        <span className="tabular-nums">
                          {registration.rainfall}
                        </span>
                      </Badge>
                    ) : null}
                    {registration.source === "telegram" ? (
                      <Badge size="sm" variant="secondary">
                        <SendIcon aria-hidden="true" />
                        telegram
                      </Badge>
                    ) : (
                      <Badge size="sm" variant="outline">
                        manual
                      </Badge>
                    )}
                    <Badge
                      size="sm"
                      variant={status.variant}
                      className={status.className}
                    >
                      {status.label}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <span className="font-mono text-muted-foreground text-xs tabular-nums">
                        {registration.runId}
                      </span>
                      <CopyRunIdButton runId={registration.runId} />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </CardPanel>
      </Card>
    </div>
  );
}
