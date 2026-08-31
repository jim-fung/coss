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

const updates = [
  {
    content: "Order confirmed and payment processed.",
    date: "Aug 24, 2026",
    title: "Order placed",
  },
  {
    content: "Your parcel left the fulfilment centre.",
    date: "Aug 26, 2026",
    title: "Shipped",
  },
  {
    content: "The parcel is on its way to the local depot.",
    date: "Aug 28, 2026",
    title: "In transit",
  },
  {
    content: "Delivered to your door between 9am and 6pm.",
    date: "Aug 30, 2026",
    title: "Out for delivery",
  },
];

export default function Particle() {
  return (
    <Timeline className="w-full max-w-md" defaultValue={3}>
      {updates.map((update, index) => (
        <TimelineItem key={update.title} step={index + 1}>
          <TimelineHeader>
            <TimelineDate>{update.date}</TimelineDate>
            <TimelineTitle>{update.title}</TimelineTitle>
          </TimelineHeader>
          <TimelineIndicator />
          <TimelineSeparator />
          <TimelineContent>{update.content}</TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
