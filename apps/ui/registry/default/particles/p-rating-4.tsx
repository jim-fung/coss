import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/registry/default/ui/field";
import { Rating } from "@/registry/default/ui/rating";

export default function Particle() {
  return (
    <Field className="max-w-sm">
      <FieldLabel>How was the call?</FieldLabel>
      <Rating defaultValue={4} name="rating" />
      <FieldDescription>
        Your rating helps us improve call quality.
      </FieldDescription>
    </Field>
  );
}
