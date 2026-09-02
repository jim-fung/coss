"use client";

import * as React from "react";
import {
  DateField,
  DateFieldCalendar,
  DateFieldTrigger,
} from "@/registry/default/ui/date-field";
import { Field, FieldLabel } from "@/registry/default/ui/field";

export default function Particle() {
  const id = React.useId();

  return (
    <Field>
      <FieldLabel htmlFor={id}>Start date</FieldLabel>
      <DateField>
        <DateFieldTrigger id={id} />
        <DateFieldCalendar />
      </DateField>
    </Field>
  );
}
