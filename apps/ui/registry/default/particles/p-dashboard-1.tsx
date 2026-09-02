import { Activity, Bot, Database, Server } from "lucide-react";
import { Badge } from "@/registry/default/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";
import { Separator } from "@/registry/default/ui/separator";

const stats = [
  {
    label: "Messages received",
    value: "128",
    badge: { label: "+18%", variant: "success" as const },
  },
  {
    label: "Registered",
    value: "96",
    badge: { label: "+12%", variant: "success" as const },
  },
  {
    label: "Awaiting confirmation",
    value: "14",
    badge: { label: "Klopt dit?", variant: "warning" as const },
  },
  {
    label: "Failed runs",
    value: "3",
    badge: { label: "4 retried", variant: "destructive" as const },
  },
];

const healthChecks = [
  {
    icon: Activity,
    label: "Worker heartbeat",
    status: "healthy",
    variant: "success" as const,
    detail: "3s ago",
  },
  {
    icon: Bot,
    label: "Telegram polling",
    status: "healthy",
    variant: "success" as const,
    detail: "last poll 12s ago",
  },
  {
    icon: Server,
    label: "Model provider",
    status: "degraded",
    variant: "warning" as const,
    detail: "429s on relay",
  },
  {
    icon: Database,
    label: "Database",
    status: "healthy",
    variant: "success" as const,
    detail: "12 ms read latency",
  },
];

export default function Particle() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardHeader>
            <CardDescription>{stat.label}</CardDescription>
            <CardTitle className="font-semibold text-2xl tabular-nums">
              {stat.value}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant={stat.badge.variant}>{stat.badge.label}</Badge>
          </CardContent>
        </Card>
      ))}
      <Card className="sm:col-span-2 lg:col-span-4">
        <CardHeader>
          <CardTitle>Service health</CardTitle>
          <CardDescription>
            Worker heartbeat, polling and provider status — last checked 12s ago
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col">
          {healthChecks.map((check, index) => (
            <div key={check.label}>
              {index > 0 && <Separator />}
              <div className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-2">
                  <check.icon
                    className="size-4 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <span className="text-sm">{check.label}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={check.variant}>{check.status}</Badge>
                  <span className="text-muted-foreground text-sm tabular-nums">
                    {check.detail}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
