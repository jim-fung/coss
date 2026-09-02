"use client";

import {
  DateField,
  DateFieldCalendar,
  DateFieldTrigger,
} from "@/registry/default/ui/date-field";

export default function Particle() {
  return (
    <DateField closeOnSelect={false}>
      <DateFieldTrigger />
      <DateFieldCalendar />
    </DateField>
  );
}
