import { AlertTriangleIcon, CircleAlertIcon } from "lucide-react";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/registry/default/ui/card";

const categories: { hours: string; label: string; width: number }[] = [
  { hours: "20,1 u", label: "Field work", width: 62 },
  { hours: "5,8 u", label: "Maintenance", width: 18 },
  { hours: "4,6 u", label: "Irrigation", width: 14 },
  { hours: "2,0 u", label: "Office", width: 6 },
];

export default function Particle() {
  return (
    <div className="grid gap-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Weekly digest</CardTitle>
          <CardDescription>
            Preview of Cornelis&apos;s summary · Sunday 30 August
          </CardDescription>
          <CardAction>
            <Badge variant="secondary">draft</Badge>
          </CardAction>
        </CardHeader>
        <CardPanel className="space-y-6">
          <div className="flex flex-wrap gap-6">
            <div className="space-y-1">
              <p className="font-semibold text-2xl tabular-nums">32,5 u</p>
              <p className="text-muted-foreground text-sm">hours logged</p>
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-2xl tabular-nums">18</p>
              <p className="text-muted-foreground text-sm">registrations</p>
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-2xl tabular-nums">3</p>
              <p className="flex items-center gap-2 text-muted-foreground text-sm">
                unresolved
                <Badge size="sm" variant="warning">
                  2 clarifications · 1 void
                </Badge>
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <p className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
              Hours by category
            </p>
            {categories.map((category) => (
              <div className="flex items-center gap-3" key={category.label}>
                <span className="w-28 shrink-0 truncate text-sm">
                  {category.label}
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${category.width}%` }}
                  />
                </div>
                <span className="w-14 text-right text-muted-foreground text-xs tabular-nums">
                  {category.hours}
                </span>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            <p className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
              Needs attention
            </p>
            <div className="flex items-start gap-2 text-sm">
              <AlertTriangleIcon className="size-4 text-warning" />
              <p>Tuesday has no messages — ask Cornelis what happened</p>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <CircleAlertIcon className="size-4 text-warning" />
              <p>
                Beregenen on achter oost still awaiting &apos;Klopt dit?&apos;
                reply{" "}
                <span className="text-muted-foreground">run_5d90aa71</span>
              </p>
            </div>
          </div>
        </CardPanel>
        <CardFooter>
          <div className="flex w-full items-center justify-between">
            <p className="text-muted-foreground text-xs">
              Sent Sundays at 18:00 · Europe/Amsterdam
            </p>
            <Button size="sm" variant="outline">
              Send now
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
