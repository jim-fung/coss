import {
  DatabaseIcon,
  FlaskConicalIcon,
  GaugeIcon,
  InboxIcon,
  type LucideIcon,
  RepeatIcon,
  RouteIcon,
  SearchIcon,
} from "lucide-react";

export interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
  matchPath?: string;
}

/**
 * Flow Workbench navigation — the three WB surfaces (operate / investigate /
 * evaluate) plus the two supporting views. Docs/stories/09-flow-workbench.md
 * is the contract; this is a read-only navigation surface.
 */
export const navMainItems: NavItem[] = [
  {
    icon: GaugeIcon,
    title: "Operate",
    url: "/operate",
  },
  {
    icon: SearchIcon,
    matchPath: "/investigate",
    title: "Investigate",
    url: "/investigate",
  },
  {
    icon: RouteIcon,
    matchPath: "/runs",
    title: "Runs",
    url: "/runs",
  },
  {
    icon: InboxIcon,
    title: "Intake",
    url: "/intake",
  },
  {
    icon: FlaskConicalIcon,
    matchPath: "/evaluations",
    title: "Evaluations",
    url: "/evaluations",
  },
  {
    icon: RepeatIcon,
    matchPath: "/replays",
    title: "Replays",
    url: "/replays",
  },
  {
    icon: DatabaseIcon,
    title: "Records",
    url: "/records",
  },
];
