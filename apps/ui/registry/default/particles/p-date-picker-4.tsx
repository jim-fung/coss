"use client";

import { addDays } from "date-fns";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import { Calendar } from "@/registry/default/ui/calendar";
import { DateField, DateFieldTrigger } from "@/registry/default/ui/date-field";
import { PopoverPopup } from "@/registry/default/ui/popover";

export default function Particle() {
  const today = new Date();
  const [date, setDate] = useState<Date | undefined>(today);
  const [month, setMonth] = useState(today);

  return (
    <DateField closeOnSelect={false} onValueChange={setDate} value={date}>
      <DateFieldTrigger />
      <PopoverPopup>
        <div className="flex max-sm:flex-col">
          <div className="relative py-1 ps-1 max-sm:order-1 max-sm:border-t">
            <div className="flex h-full flex-col sm:border-e sm:pe-3">
              <Button
                className="w-full justify-start"
                onClick={() => {
                  setDate(today);
                  setMonth(today);
                }}
                size="sm"
                variant="ghost"
              >
                Today
              </Button>
              <Button
                className="w-full justify-start"
                onClick={() => {
                  const tomorrow = addDays(today, 1);
                  setDate(tomorrow);
                  setMonth(tomorrow);
                }}
                size="sm"
                variant="ghost"
              >
                Tomorrow
              </Button>
              <Button
                className="w-full justify-start"
                onClick={() => {
                  const in3Days = addDays(today, 3);
                  setDate(in3Days);
                  setMonth(in3Days);
                }}
                size="sm"
                variant="ghost"
              >
                In 3 days
              </Button>
              <Button
                className="w-full justify-start"
                onClick={() => {
                  const inAWeek = addDays(today, 7);
                  setDate(inAWeek);
                  setMonth(inAWeek);
                }}
                size="sm"
                variant="ghost"
              >
                In a week
              </Button>
            </div>
          </div>
          <Calendar
            className="max-sm:pb-3 sm:ps-2"
            mode="single"
            month={month}
            onMonthChange={setMonth}
            onSelect={setDate}
            selected={date}
          />
        </div>
      </PopoverPopup>
    </DateField>
  );
}
