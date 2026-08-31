import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/registry/default/ui/timeline";

const milestones = [
  { date: "Q1", title: "Kickoff" },
  { date: "Q2", title: "Beta" },
  { date: "Q3", title: "Launch" },
  { date: "Q4", title: "GA" },
];

export default function Particle() {
  return (
    <Timeline
      className="w-full max-w-2xl"
      defaultValue={2}
      orientation="horizontal"
    >
      {milestones.map((milestone, index) => (
        <TimelineItem key={milestone.title} step={index + 1}>
          <TimelineHeader>
            <TimelineDate>{milestone.date}</TimelineDate>
            <TimelineTitle>{milestone.title}</TimelineTitle>
          </TimelineHeader>
          <TimelineIndicator />
          <TimelineSeparator />
          <TimelineContent>
            Milestone {index + 1} of {milestones.length}.
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
