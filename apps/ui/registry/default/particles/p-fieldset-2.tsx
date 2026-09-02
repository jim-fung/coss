import { Checkbox } from "@/registry/default/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldItem,
  FieldLabel,
} from "@/registry/default/ui/field";
import { Fieldset, FieldsetLegend } from "@/registry/default/ui/fieldset";
import { Radio, RadioGroup } from "@/registry/default/ui/radio-group";

export default function Particle() {
  return (
    <Fieldset className="flex w-full flex-col gap-6" disabled>
      <FieldsetLegend>Notification preferences</FieldsetLegend>

      <Field>
        <FieldLabel>
          <Checkbox defaultChecked />
          Email notifications
        </FieldLabel>
      </Field>

      <Field>
        <FieldLabel>
          <Checkbox />
          Push notifications
        </FieldLabel>
      </Field>

      <Field>
        <RadioGroup defaultValue="daily">
          <FieldItem>
            <FieldLabel>
              <Radio value="daily" /> Daily digest
            </FieldLabel>
          </FieldItem>
          <FieldItem>
            <FieldLabel>
              <Radio value="weekly" /> Weekly summary
            </FieldLabel>
          </FieldItem>
        </RadioGroup>
        <FieldDescription>
          Notification settings are managed by your organization.
        </FieldDescription>
      </Field>
    </Fieldset>
  );
}
