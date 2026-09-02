"use client";

import type { DropdownProps } from "@daypicker/react";
import * as React from "react";
import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
} from "@/registry/default/ui/combobox";
import {
  DateField,
  DateFieldCalendar,
  DateFieldTrigger,
} from "@/registry/default/ui/date-field";
import { Field, FieldLabel } from "@/registry/default/ui/field";

interface DropdownItem {
  disabled?: boolean;
  label: string;
  value: string;
}

function CalendarDropdown(props: DropdownProps) {
  const { options, value, onChange, "aria-label": ariaLabel } = props;

  const items: DropdownItem[] =
    options?.map((option) => ({
      disabled: option.disabled,
      label: option.label,
      value: option.value.toString(),
    })) ?? [];

  const selectedItem = items.find((item) => item.value === value?.toString());

  const handleValueChange = (newValue: DropdownItem | null) => {
    if (onChange && newValue) {
      const syntheticEvent = {
        target: { value: newValue.value },
      } as React.ChangeEvent<HTMLSelectElement>;
      onChange(syntheticEvent);
    }
  };

  return (
    <Combobox
      aria-label={ariaLabel}
      autoHighlight
      items={items}
      onValueChange={handleValueChange}
      value={selectedItem}
    >
      <ComboboxInput
        className="**:[input]:w-0 **:[input]:flex-1"
        onFocus={(e) => e.currentTarget.select()}
      />
      <ComboboxPopup aria-label={ariaLabel}>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item: DropdownItem) => (
            <ComboboxItem
              disabled={item.disabled}
              key={item.value}
              value={item}
            >
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>
  );
}

export default function Particle() {
  const id = React.useId();
  return (
    <Field>
      <FieldLabel htmlFor={id}>Start date</FieldLabel>
      <DateField closeOnSelect={false}>
        <DateFieldTrigger id={id} />
        <DateFieldCalendar
          captionLayout="dropdown"
          components={{ Dropdown: CalendarDropdown }}
          endMonth={new Date()}
          startMonth={new Date(1900, 0)}
        />
      </DateField>
    </Field>
  );
}
