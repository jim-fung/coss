"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { CheckIcon, LoaderCircleIcon } from "lucide-react";
import * as React from "react";
import { createContext, useContext } from "react";
import { cn } from "@/registry/default/lib/utils";

type StepperContextValue = {
  activeStep: number;
  setActiveStep: (step: number) => void;
  orientation: "horizontal" | "vertical";
};

type StepItemContextValue = {
  step: number;
  state: StepState;
  isDisabled: boolean;
  isLoading: boolean;
};

type StepState = "active" | "completed" | "inactive" | "loading";

const StepperContext = createContext<StepperContextValue | undefined>(
  undefined,
);
const StepItemContext = createContext<StepItemContextValue | undefined>(
  undefined,
);

const useStepper = () => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error("useStepper must be used within a Stepper");
  }
  return context;
};

const useStepItem = () => {
  const context = useContext(StepItemContext);
  if (!context) {
    throw new Error("useStepItem must be used within a StepperItem");
  }
  return context;
};

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: number;
  value?: number;
  onValueChange?: (value: number) => void;
  orientation?: "horizontal" | "vertical";
}

function Stepper({
  defaultValue = 0,
  value,
  onValueChange,
  orientation = "horizontal",
  className,
  ...props
}: StepperProps): React.ReactElement {
  const [activeStep, setInternalStep] = React.useState(defaultValue);

  const setActiveStep = React.useCallback(
    (step: number) => {
      if (value === undefined) {
        setInternalStep(step);
      }
      onValueChange?.(step);
    },
    [value, onValueChange],
  );

  const currentStep = value ?? activeStep;

  return (
    <StepperContext.Provider
      value={{
        activeStep: currentStep,
        orientation,
        setActiveStep,
      }}
    >
      <div
        className={cn(
          "group/stepper inline-flex data-[orientation=horizontal]:w-full data-[orientation=horizontal]:flex-row data-[orientation=vertical]:flex-col",
          className,
        )}
        data-orientation={orientation}
        data-slot="stepper"
        {...props}
      />
    </StepperContext.Provider>
  );
}

interface StepperItemProps extends React.HTMLAttributes<HTMLDivElement> {
  step: number;
  completed?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

function StepperItem({
  step,
  completed = false,
  disabled = false,
  loading = false,
  className,
  children,
  ...props
}: StepperItemProps): React.ReactElement {
  const { activeStep } = useStepper();

  const state: StepState =
    completed || step < activeStep
      ? "completed"
      : activeStep === step
        ? "active"
        : "inactive";

  const isLoading = loading && step === activeStep;

  return (
    <StepItemContext.Provider
      value={{ isDisabled: disabled, isLoading, state, step }}
    >
      <div
        className={cn(
          "group/step flex items-center group-data-[orientation=horizontal]/stepper:not-last:flex-1 group-data-[orientation=horizontal]/stepper:flex-row group-data-[orientation=vertical]/stepper:flex-col",
          className,
        )}
        data-loading={isLoading ? "" : undefined}
        data-slot="stepper-item"
        data-state={state}
        {...props}
      >
        {children}
      </div>
    </StepItemContext.Provider>
  );
}

function StepperTrigger({
  className,
  children,
  render,
  ...props
}: useRender.ComponentProps<"button">): React.ReactElement {
  const { setActiveStep } = useStepper();
  const { step, isDisabled } = useStepItem();

  const defaultProps = {
    children,
    className: cn(
      "inline-flex cursor-pointer items-center gap-3 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-64",
      className,
    ),
    "data-slot": "stepper-trigger",
    disabled: isDisabled,
    onClick: () => setActiveStep(step),
  };

  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(defaultProps, props),
    render,
  });
}

function StepperIndicator({
  className,
  children,
  render,
  ...props
}: useRender.ComponentProps<"span">): React.ReactElement {
  const { state, step, isLoading } = useStepItem();

  const defaultProps = {
    children: children ?? (
      <>
        <span className="transition-all group-data-[state=completed]/step:scale-0 group-data-loading/step:scale-0 group-data-[state=completed]/step:opacity-0 group-data-loading/step:opacity-0 group-data-loading/step:transition-none">
          {step}
        </span>
        <CheckIcon
          aria-hidden="true"
          className="absolute size-4 scale-0 opacity-0 transition-all group-data-[state=completed]/step:scale-100 group-data-[state=completed]/step:opacity-100"
        />
        {isLoading && (
          <span className="absolute transition-all">
            <LoaderCircleIcon
              aria-hidden="true"
              className="size-3.5 animate-spin"
            />
          </span>
        )}
      </>
    ),
    className: cn(
      "relative flex size-6 shrink-0 items-center justify-center rounded-full bg-muted font-medium text-muted-foreground text-xs transition-colors data-[state=active]:bg-primary data-[state=completed]:bg-primary data-[state=active]:text-primary-foreground data-[state=completed]:text-primary-foreground",
      className,
    ),
    "data-slot": "stepper-indicator",
    "data-state": state,
  };

  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(defaultProps, props),
    render,
  });
}

function StepperTitle({
  className,
  ...props
}: React.ComponentProps<"h3">): React.ReactElement {
  return (
    <h3
      className={cn("font-medium text-base sm:text-sm", className)}
      data-slot="stepper-title"
      {...props}
    />
  );
}

function StepperDescription({
  className,
  ...props
}: React.ComponentProps<"p">): React.ReactElement {
  return (
    <p
      className={cn("text-base text-muted-foreground sm:text-sm", className)}
      data-slot="stepper-description"
      {...props}
    />
  );
}

function StepperSeparator({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn(
        "mx-3 my-0.5 bg-muted group-data-[orientation=vertical]/stepper:mx-0.5 group-data-[orientation=vertical]/stepper:my-3 group-data-[orientation=horizontal]/stepper:h-0.5 group-data-[orientation=vertical]/stepper:h-12 group-data-[orientation=horizontal]/stepper:w-full group-data-[orientation=vertical]/stepper:w-0.5 group-data-[orientation=horizontal]/stepper:flex-1 group-data-[state=completed]/step:bg-primary",
        className,
      )}
      data-slot="stepper-separator"
      {...props}
    />
  );
}

export {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
};
