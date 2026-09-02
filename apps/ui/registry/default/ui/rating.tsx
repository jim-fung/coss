"use client";

import { StarIcon } from "lucide-react";
import type * as React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { cn } from "@/registry/default/lib/utils";
import {
  RadioGroupPrimitive,
  RadioPrimitive,
} from "@/registry/default/ui/radio-group";

type RatingContextValue = {
  value: number | undefined;
  hoveredValue: number | undefined;
  interactive: boolean;
  setHoveredValue: (value: number | undefined) => void;
  clearIfSelected: (value: number) => void;
};

const RatingContext: React.Context<RatingContextValue | null> =
  createContext<RatingContextValue | null>(null);

function useRating(): RatingContextValue {
  const context = useContext(RatingContext);

  if (!context) {
    throw new Error("Rating parts must be used within a <Rating />");
  }

  return context;
}

type RatingProps = Omit<
  React.ComponentProps<typeof RadioGroupPrimitive>,
  "value" | "defaultValue" | "onValueChange" | "children"
> & {
  /** Rated value; `undefined` means nothing is rated. */
  value?: number;
  /** Initial value for uncontrolled usage. */
  defaultValue?: number;
  /** Called with the new rating, or `undefined` when cleared via `allowClear`. */
  onValueChange?: (value: number | undefined) => void;
  /** Number of stars rendered when no children are passed. */
  count?: number;
  /** Clicking the selected value clears the rating to `undefined`. */
  allowClear?: boolean;
  size?: "sm" | "default" | "lg";
  /** Replaces the auto-rendered stars with explicit `RatingItem` elements. */
  children?: React.ReactNode;
};

function Rating(props: RatingProps): React.ReactElement {
  const {
    value: controlledValue,
    defaultValue,
    onValueChange,
    count = 5,
    allowClear = false,
    size = "default",
    disabled,
    readOnly,
    children,
    className,
    ...groupProps
  } = props;

  const valueControlled = "value" in props;
  const [internalValue, setInternalValue] = useState<number | undefined>(
    defaultValue,
  );
  const value: number | undefined = valueControlled
    ? controlledValue
    : internalValue;

  const [hoveredValue, setHoveredValue] = useState<number | undefined>();

  const commit = useCallback(
    (next: number | undefined): void => {
      if (!valueControlled) {
        setInternalValue(next);
      }
      onValueChange?.(next);
    },
    [onValueChange, valueControlled],
  );

  const clearIfSelected = useCallback(
    (itemValue: number): void => {
      if (allowClear && value === itemValue) {
        commit(undefined);
      }
    },
    [allowClear, commit, value],
  );

  const context = useMemo<RatingContextValue>(
    () => ({
      value,
      hoveredValue,
      interactive: !disabled && !readOnly,
      setHoveredValue,
      clearIfSelected,
    }),
    [clearIfSelected, disabled, hoveredValue, readOnly, value],
  );

  const stars = Array.from({ length: count }, (_, index) => index + 1);

  return (
    <RatingContext.Provider value={context}>
      <RadioGroupPrimitive
        className={cn("flex items-center gap-0.5", className)}
        data-size={size}
        data-slot="rating"
        disabled={disabled}
        readOnly={readOnly}
        value={value}
        onMouseLeave={() => setHoveredValue(undefined)}
        onValueChange={(next) => commit(next)}
        {...groupProps}
      >
        {children ??
          stars.map((star) => <RatingItem key={star} value={star} />)}
      </RadioGroupPrimitive>
    </RatingContext.Provider>
  );
}

type RatingItemProps = Omit<RadioPrimitive.Root.Props, "value"> & {
  /** Rating value this star represents. */
  value: number;
};

function RatingItem({
  value,
  className,
  onClick,
  ...props
}: RatingItemProps): React.ReactElement {
  const {
    value: currentValue,
    hoveredValue,
    interactive,
    setHoveredValue,
    clearIfSelected,
  } = useRating();

  const filled = (hoveredValue ?? currentValue ?? 0) >= value;

  return (
    <RadioPrimitive.Root
      aria-label={
        props["aria-label"] ?? `${value} star${value === 1 ? "" : "s"}`
      }
      className={cn(
        "cursor-pointer rounded-xs outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background data-disabled:cursor-not-allowed data-disabled:opacity-64",
        className,
      )}
      data-fill={filled ? "" : undefined}
      data-slot="rating-item"
      onClick={(event) => {
        clearIfSelected(value);
        onClick?.(event);
      }}
      onMouseEnter={interactive ? () => setHoveredValue(value) : undefined}
      value={value}
      {...props}
    >
      <StarIcon
        className={cn(
          "in-data-[size=lg]:size-6 in-data-[size=sm]:size-4 size-5 transition-colors",
          filled ? "fill-primary stroke-primary" : "fill-transparent",
        )}
      />
    </RadioPrimitive.Root>
  );
}

export { Rating, RatingItem };
