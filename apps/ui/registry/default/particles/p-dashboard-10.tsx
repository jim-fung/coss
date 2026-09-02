import {
  DropletsIcon,
  HandIcon,
  type LucideIcon,
  PickaxeIcon,
  SprayCanIcon,
  SproutIcon,
} from "lucide-react";
import { Fragment } from "react";
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
import { Separator } from "@/registry/default/ui/separator";

type ParcelActivity = {
  action: string;
  ago: string;
  icon: LucideIcon;
};

type ParcelHours = {
  label: string;
  pct: number;
};

type Parcel = {
  name: string;
  crop: string | null;
  areaHa: string | null;
  hours: ParcelHours | null;
  lastActivity: ParcelActivity;
  polygon: string | null;
};

const parcels: Parcel[] = [
  {
    name: "achter oost",
    crop: "Winter wheat",
    areaHa: "2.4 ha",
    hours: { label: "12,5 u", pct: 100 },
    lastActivity: { action: "Zaaien", ago: "2d ago", icon: SproutIcon },
    polygon: "92% geo",
  },
  {
    name: "de pompoen",
    crop: "Pumpkins",
    areaHa: "1.1 ha",
    hours: { label: "8,0 u", pct: 64 },
    lastActivity: { action: "Spuiten", ago: "1d ago", icon: SprayCanIcon },
    polygon: "87% geo",
  },
  {
    name: "wegendijk",
    crop: "Sugar beet",
    areaHa: "1.8 ha",
    hours: { label: "6,5 u", pct: 52 },
    lastActivity: { action: "Handwieden", ago: "3d ago", icon: HandIcon },
    polygon: "95% geo",
  },
  {
    name: "kavel 7",
    crop: "Onions",
    areaHa: null,
    hours: { label: "4,0 u", pct: 32 },
    lastActivity: { action: "Beregenen", ago: "5u ago", icon: DropletsIcon },
    polygon: null,
  },
  {
    name: "de slootkant",
    crop: null,
    areaHa: null,
    hours: null,
    lastActivity: { action: "Kopeggen", ago: "6d ago", icon: PickaxeIcon },
    polygon: null,
  },
];

export default function Particle() {
  return (
    <div className="grid gap-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Parcels</CardTitle>
          <CardDescription>Season fields, hours this week</CardDescription>
          <CardAction>
            <Button size="sm" variant="outline">
              Manage parcels
            </Button>
          </CardAction>
        </CardHeader>
        <CardPanel>
          {parcels.map((parcel, index) => {
            const ActivityIcon = parcel.lastActivity.icon;
            return (
              <Fragment key={parcel.name}>
                {index > 0 && <Separator />}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 py-3 first:pt-0 last:pb-0">
                  <div className="min-w-0 flex-1 basis-48">
                    <p className="font-medium text-sm">{parcel.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {parcel.crop ?? (
                        <span className="italic">crop not recorded</span>
                      )}
                      {" · "}
                      {parcel.areaHa ?? (
                        <span className="italic">area not recorded</span>
                      )}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${parcel.hours?.pct ?? 0}%` }}
                      />
                    </div>
                    {parcel.hours ? (
                      <span className="text-muted-foreground text-xs tabular-nums">
                        {parcel.hours.label}
                      </span>
                    ) : (
                      <span className="text-muted-foreground text-xs italic">
                        not recorded
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Badge size="sm" variant="outline">
                      <ActivityIcon />
                      {parcel.lastActivity.action} {parcel.lastActivity.ago}
                    </Badge>
                    {parcel.polygon ? (
                      <Badge size="sm" variant="success">
                        {parcel.polygon}
                      </Badge>
                    ) : (
                      <Badge size="sm" variant="outline">
                        no polygon
                      </Badge>
                    )}
                  </div>
                </div>
              </Fragment>
            );
          })}
        </CardPanel>
      </Card>
    </div>
  );
}
