# coss Stepper

## When to use

- Multi-step flows (checkout, onboarding wizards) needing numbered, clickable steps with completed/active/loading states.

## Install

```bash
npx shadcn@latest add @coss/stepper
```

## Canonical imports

```tsx
import {
  Stepper, StepperDescription, StepperIndicator, StepperItem,
  StepperSeparator, StepperTitle, StepperTrigger,
} from "@/components/ui/stepper"
```

## Minimal pattern

```tsx
const [activeStep, setActiveStep] = useState(1)

<Stepper onValueChange={setActiveStep} value={activeStep}>
  {steps.map((step, index) => (
    <StepperItem completed={activeStep > index} key={step} step={index}>
      <StepperTrigger>
        <StepperIndicator />
        <StepperTitle>{step}</StepperTitle>
      </StepperTrigger>
      {index < steps.length - 1 && <StepperSeparator />}
    </StepperItem>
  ))}
</Stepper>
```

## Notes

- Controlled via `value` + `onValueChange`; `orientation="vertical"` stacks steps.
- `StepperItem` accepts `completed`, `disabled`, and `loading`; the indicator swaps number → check → spinner automatically.
- `StepperTrigger`/`StepperIndicator` support the `render` prop for custom elements.
