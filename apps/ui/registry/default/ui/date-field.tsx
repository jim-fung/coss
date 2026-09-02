"use client";

import type { DateRange } from "@daypicker/react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type * as React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Button } from "@/registry/default/ui/button";
import { Calendar } from "@/registry/default/ui/calendar";
import {
  Popover,
  PopoverPopup,
  PopoverTrigger,
} from "@/registry/default/ui/popover";

type DateFieldMode = "single" | "multiple" | "range";

type DateFieldValue = Date | Date[] | DateRange | undefined;

type DateFieldContextValue = {
  mode: DateFieldMode;
  value: DateFieldValue;
  setValue: (value: DateFieldValue) => void;
  closeOnSelect: boolean | undefined;
  setOpen: (open: boolean) => void;
  placeholder: string;
  formatStr: string;
};

const DateFieldContext: React.Context<DateFieldContextValue | null> =
  createContext<DateFieldContextValue | null>(null);

function useDateField(): DateFieldContextValue {
  const context = useContext(DateFieldContext);

  if (!context) {
    throw new Error("useDateField must be used within a <DateField />");
  }

  return context;
}

type DateFieldProps = Omit<React.ComponentProps<typeof Popover>, "children"> & {
  children?: React.ReactNode;
  /** Placeholder shown in the trigger while no value is selected. Defaults per mode. */
  placeholder?: string;
  /** date-fns format string used for the trigger label. */
  format?: string;
  /**
   * Overrides the mode's default close behavior: single closes on every
   * select, while range and multiple stay open (DayPicker selects a
   * same-day range on the first click). `true` closes after every select;
   * `false` never closes.
   */
  closeOnSelect?: boolean;
} & (
    | {
        /** Selection mode. */
        mode?: "single";
        value?: Date;
        defaultValue?: Date;
        onValueChange?: (value: Date | undefined) => void;
      }
    | {
        mode: "multiple";
        value?: Date[];
        defaultValue?: Date[];
        onValueChange?: (value: Date[] | undefined) => void;
      }
    | {
        mode: "range";
        value?: DateRange;
        defaultValue?: DateRange;
        onValueChange?: (value: DateRange | undefined) => void;
      }
  );

function DateField(props: DateFieldProps): React.ReactElement {
  const {
    mode = "single",
    value: controlledValue,
    defaultValue,
    onValueChange,
    closeOnSelect,
    placeholder = mode === "range"
      ? "Pick a date range"
      : mode === "multiple"
        ? "Pick dates"
        : "Pick a date",
    format: formatStr = "PPP",
    open: controlledOpen,
    defaultOpen,
    onOpenChange,
    children,
    ...popoverProps
  } = props;

  const valueControlled = "value" in props;
  const openControlled = "open" in props;

  const [internalValue, setInternalValue] =
    useState<DateFieldValue>(defaultValue);
  const value: DateFieldValue = valueControlled
    ? controlledValue
    : internalValue;

  const [internalOpen, setInternalOpen] = useState<boolean>(
    defaultOpen ?? false,
  );
  const open: boolean =
    (openControlled ? controlledOpen : internalOpen) ?? false;

  const setValue = useCallback(
    (next: DateFieldValue): void => {
      if (!valueControlled) {
        setInternalValue(next);
      }
      (onValueChange as ((next: DateFieldValue) => void) | undefined)?.(next);
    },
    [onValueChange, valueControlled],
  );

  const setOpen = useCallback(
    (next: boolean): void => {
      if (!openControlled) {
        setInternalOpen(next);
      }
      (onOpenChange as ((open: boolean) => void) | undefined)?.(next);
    },
    [onOpenChange, openControlled],
  );

  const context = useMemo<DateFieldContextValue>(
    () => ({
      mode,
      value,
      setValue,
      closeOnSelect,
      setOpen,
      placeholder,
      formatStr,
    }),
    [closeOnSelect, formatStr, mode, setOpen, placeholder, setValue, value],
  );

  return (
    <DateFieldContext.Provider value={context}>
      <Popover onOpenChange={setOpen} open={open} {...popoverProps}>
        {children}
      </Popover>
    </DateFieldContext.Provider>
  );
}

function renderLabel(
  value: DateFieldValue,
  mode: DateFieldMode,
  placeholder: string,
  formatStr: string,
): string {
  if (mode === "range") {
    const range = value as DateRange | undefined;
    if (!range?.from) {
      return placeholder;
    }
    if (range.to) {
      return `${format(range.from, formatStr)} - ${format(range.to, formatStr)}`;
    }
    return format(range.from, formatStr);
  }

  if (mode === "multiple") {
    const dates = value as Date[] | undefined;
    if (!dates || dates.length === 0) {
      return placeholder;
    }
    return dates.length === 1 && dates[0]
      ? format(dates[0], formatStr)
      : `${dates.length} dates`;
  }

  const date = value as Date | undefined;
  return date ? format(date, formatStr) : placeholder;
}

function DateFieldTrigger({
  children,
  ...props
}: Omit<React.ComponentProps<typeof PopoverTrigger>, "children"> & {
  /**
   * Replaces the default icon + label content. A function receives the
   * current value and renders custom trigger content.
   */
  children?:
    | React.ReactNode
    | ((state: { value: DateFieldValue }) => React.ReactNode);
}): React.ReactElement {
  const { mode, value, placeholder, formatStr } = useDateField();

  let content: React.ReactNode;
  if (typeof children === "function") {
    content = children({ value });
  } else if (children !== undefined) {
    content = children;
  } else {
    content = (
      <>
        <CalendarIcon aria-hidden="true" />
        {renderLabel(value, mode, placeholder, formatStr)}
      </>
    );
  }

  return (
    <PopoverTrigger
      render={<Button className="w-full justify-start" variant="outline" />}
      {...props}
    >
      {content}
    </PopoverTrigger>
  );
}

function shouldCloseAfterSelect(
  selected: DateFieldValue,
  mode: DateFieldMode,
  closeOnSelect: boolean | undefined,
): boolean {
  if (closeOnSelect !== undefined) {
    return closeOnSelect;
  }
  // Range stays open: DayPicker's first click already sets a same-day range,
  // so "range complete" cannot distinguish an in-progress selection.
  return mode === "single";
}

type DateFieldCalendarProps = Omit<
  React.ComponentProps<typeof Calendar>,
  "mode" | "selected" | "onSelect" | "defaultMonth"
> & {
  min?: number;
  max?: number;
  resetOnSelect?: boolean;
  /** Initial month; defaults to the current value's month. */
  defaultMonth?: Date;
  /** Extra content rendered before the calendar inside the popup. */
  children?: React.ReactNode;
  side?: React.ComponentProps<typeof PopoverPopup>["side"];
  align?: React.ComponentProps<typeof PopoverPopup>["align"];
  sideOffset?: React.ComponentProps<typeof PopoverPopup>["sideOffset"];
  alignOffset?: React.ComponentProps<typeof PopoverPopup>["alignOffset"];
};

function DateFieldCalendar({
  className,
  children,
  side,
  align,
  sideOffset,
  alignOffset,
  defaultMonth,
  ...calendarProps
}: DateFieldCalendarProps): React.ReactElement {
  const { mode, value, setValue, closeOnSelect, setOpen } = useDateField();

  const handleSelect = useCallback(
    (selected: DateFieldValue): void => {
      setValue(selected);
      if (shouldCloseAfterSelect(selected, mode, closeOnSelect)) {
        setOpen(false);
      }
    },
    [closeOnSelect, mode, setOpen, setValue],
  );

  const initialMonth: Date | undefined =
    defaultMonth ??
    (mode === "range"
      ? (value as DateRange | undefined)?.from
      : mode === "multiple"
        ? (value as Date[] | undefined)?.[0]
        : (value as Date | undefined));

  // mode/selected/onSelect are wired from context; the prop union of the
  // underlying calendar cannot express that split, hence the single cast.
  const wiredProps = {
    ...calendarProps,
    defaultMonth: initialMonth,
    mode,
    onSelect: handleSelect,
    selected: value,
  } as React.ComponentProps<typeof Calendar>;

  return (
    <PopoverPopup
      align={align}
      alignOffset={alignOffset}
      className={className}
      side={side}
      sideOffset={sideOffset}
    >
      {children}
      <Calendar {...wiredProps} />
    </PopoverPopup>
  );
}

export { DateField, DateFieldCalendar, DateFieldTrigger, useDateField };
export type { DateFieldMode, DateFieldValue };
