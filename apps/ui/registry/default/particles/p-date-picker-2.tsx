"use client";

import {
  DateField,
  DateFieldCalendar,
  DateFieldTrigger,
} from "@/registry/default/ui/date-field";

export default function Particle() {
  return (
    <DateField format="LLL dd, y" mode="range">
      <DateFieldTrigger />
      <DateFieldCalendar />
    </DateField>
  );
}
