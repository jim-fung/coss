"use client";

import { format } from "date-fns";
import { useState } from "react";
import {
  DateField,
  DateFieldCalendar,
  DateFieldTrigger,
} from "@/registry/default/ui/date-field";
import { SelectButton } from "@/registry/default/ui/select";

export default function Particle() {
  const [date, setDate] = useState<Date | undefined>();

  return (
    <DateField closeOnSelect={false} onValueChange={setDate} value={date}>
      <DateFieldTrigger
        render={<SelectButton data-placeholder={!date ? "" : undefined} />}
      >
        {date ? format(date, "PPP") : "Pick a date"}
      </DateFieldTrigger>
      <DateFieldCalendar />
    </DateField>
  );
}
