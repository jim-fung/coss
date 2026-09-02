"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Badge } from "@/registry/default/ui/badge";
import {
  DateField,
  DateFieldCalendar,
  DateFieldTrigger,
} from "@/registry/default/ui/date-field";

export default function Particle() {
  return (
    <DateField mode="multiple">
      <DateFieldTrigger>
        {({ value }) => {
          const dates = value as Date[] | undefined;
          return (
            <>
              <CalendarIcon className="shrink-0" />
              <span className="flex flex-wrap gap-1">
                {dates && dates.length > 0 ? (
                  <>
                    {dates.slice(0, 3).map((date) => (
                      <Badge key={date.toISOString()} variant="secondary">
                        {format(date, "MMM d")}
                      </Badge>
                    ))}
                    {dates.length > 3 && (
                      <Badge variant="secondary">+{dates.length - 3}</Badge>
                    )}
                  </>
                ) : (
                  <span>Pick dates</span>
                )}
              </span>
            </>
          );
        }}
      </DateFieldTrigger>
      <DateFieldCalendar />
    </DateField>
  );
}
