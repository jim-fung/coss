"use client";

import { useState } from "react";
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/registry/default/ui/stepper";

const steps = [
  { description: "Where should we ship it?", title: "Address" },
  { description: "Pick a delivery speed.", title: "Shipping" },
  { description: "Enter your card details.", title: "Payment" },
  { description: "Confirm and place the order.", title: "Review" },
];

export default function Particle() {
  const [activeStep, setActiveStep] = useState(2);

  return (
    <Stepper
      className="max-w-md"
      onValueChange={setActiveStep}
      orientation="vertical"
      value={activeStep}
    >
      {steps.map((step, index) => (
        <StepperItem
          completed={activeStep > index}
          key={step.title}
          loading={activeStep === 2 && index === 2}
          step={index}
        >
          <StepperTrigger>
            <StepperIndicator />
            <div className="flex flex-col items-start gap-0.5">
              <StepperTitle>{step.title}</StepperTitle>
              <StepperDescription>{step.description}</StepperDescription>
            </div>
          </StepperTrigger>
          {index < steps.length - 1 && <StepperSeparator />}
        </StepperItem>
      ))}
    </Stepper>
  );
}
