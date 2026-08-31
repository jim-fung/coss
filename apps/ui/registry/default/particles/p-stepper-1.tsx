"use client";

import { useState } from "react";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/registry/default/ui/stepper";

const steps = ["Address", "Shipping", "Payment", "Review"];

export default function Particle() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <Stepper
      className="w-full max-w-2xl"
      onValueChange={setActiveStep}
      value={activeStep}
    >
      {steps.map((step, index) => (
        <StepperItem
          completed={activeStep > index}
          key={step}
          loading={activeStep === 2 && index === 2}
          step={index}
        >
          <StepperTrigger>
            <StepperIndicator />
            <StepperTitle>{step}</StepperTitle>
          </StepperTrigger>
          {index < steps.length - 1 && <StepperSeparator />}
        </StepperItem>
      ))}
    </Stepper>
  );
}
