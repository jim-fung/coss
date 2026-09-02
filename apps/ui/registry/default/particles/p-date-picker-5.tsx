"use client";

import { format, isValid, parse } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  DateField,
  DateFieldCalendar,
  DateFieldTrigger,
} from "@/registry/default/ui/date-field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/default/ui/input-group";

export default function Particle() {
  const [date, setDate] = useState<Date | undefined>();
  const [inputValue, setInputValue] = useState("");
  const [month, setMonth] = useState<Date>(() => new Date());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value) {
      const parsedDate = parse(value, "yyyy-MM-dd", new Date());
      if (isValid(parsedDate)) {
        setDate(parsedDate);
        setMonth(parsedDate);
      }
    } else {
      setDate(undefined);
    }
  };

  return (
    <DateField
      closeOnSelect={false}
      onValueChange={(selected) => {
        setDate(selected);
        setInputValue(selected ? format(selected, "yyyy-MM-dd") : "");
      }}
      value={date}
    >
      <InputGroup>
        <InputGroupInput
          aria-label="Select date"
          className="*:[input]:[&::-webkit-calendar-picker-indicator]:hidden *:[input]:[&::-webkit-calendar-picker-indicator]:appearance-none"
          onChange={handleInputChange}
          onClick={(e) => e.stopPropagation()}
          type="date"
          value={inputValue}
        />
        <InputGroupAddon>
          <DateFieldTrigger
            aria-label="Select date"
            render={
              <Button aria-label="Select date" size="icon-xs" variant="ghost" />
            }
          >
            <CalendarIcon aria-hidden="true" />
          </DateFieldTrigger>
        </InputGroupAddon>
      </InputGroup>
      <DateFieldCalendar
        align="start"
        alignOffset={-4}
        month={month}
        onMonthChange={setMonth}
        sideOffset={8}
      />
    </DateField>
  );
}
