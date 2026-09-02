import { Button } from "@/registry/default/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/registry/default/ui/card";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/registry/default/ui/field";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";
import { Separator } from "@/registry/default/ui/separator";
import { Switch } from "@/registry/default/ui/switch";

const digestDayItems = [
  { label: "Saturday", value: "saturday" },
  { label: "Sunday", value: "sunday" },
  { label: "Monday", value: "monday" },
];

const timezoneItems = [
  { label: "Europe/Amsterdam", value: "europe-amsterdam" },
  { label: "Europe/Berlin", value: "europe-berlin" },
  { label: "UTC", value: "utc" },
];

const unitsItems = [
  { label: "Metric (ha, mm, h)", value: "metric" },
  { label: "Imperial (ac, in, h)", value: "imperial" },
];

export default function Particle() {
  return (
    <div className="grid gap-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Digest &amp; reporting</CardTitle>
          <CardDescription>
            When and how the weekly digest is delivered
          </CardDescription>
        </CardHeader>
        <CardPanel>
          <div className="flex items-start justify-between gap-8">
            <Field className="min-w-0 gap-1">
              <FieldLabel>Weekly digest</FieldLabel>
              <FieldDescription>
                Sunday summary of hours, registrations and unresolved items
              </FieldDescription>
            </Field>
            <Select defaultValue="sunday" items={digestDayItems}>
              <SelectTrigger
                aria-label="Weekly digest"
                className="w-36 shrink-0"
                size="sm"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectPopup>
                {digestDayItems.map(({ label, value }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectPopup>
            </Select>
          </div>
          <Separator className="my-4" />
          <div className="flex items-start justify-between gap-8">
            <Field className="min-w-0 gap-1">
              <FieldLabel>Timezone</FieldLabel>
              <FieldDescription>
                Used for digest delivery and day boundaries
              </FieldDescription>
            </Field>
            <Select defaultValue="europe-amsterdam" items={timezoneItems}>
              <SelectTrigger
                aria-label="Timezone"
                className="w-44 shrink-0"
                size="sm"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectPopup>
                {timezoneItems.map(({ label, value }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectPopup>
            </Select>
          </div>
          <Separator className="my-4" />
          <div className="flex items-start justify-between gap-8">
            <Field className="min-w-0 gap-1">
              <FieldLabel>Units</FieldLabel>
              <FieldDescription>
                Applies to areas, rainfall and durations
              </FieldDescription>
            </Field>
            <Select defaultValue="metric" items={unitsItems}>
              <SelectTrigger
                aria-label="Units"
                className="w-44 shrink-0"
                size="sm"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectPopup>
                {unitsItems.map(({ label, value }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectPopup>
            </Select>
          </div>
        </CardPanel>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Automation</CardTitle>
          <CardDescription>
            What Flow Workbench does without manual review
          </CardDescription>
        </CardHeader>
        <CardPanel>
          <div className="flex items-start justify-between gap-8">
            <Field className="min-w-0 gap-1">
              <FieldLabel>Auto-register confirmed outcomes</FieldLabel>
              <FieldDescription>
                Confirmed &quot;Klopt dit?&quot; replies become records without
                review
              </FieldDescription>
            </Field>
            <Switch
              aria-label="Auto-register confirmed outcomes"
              defaultChecked
            />
          </div>
          <Separator className="my-4" />
          <div className="flex items-start justify-between gap-8">
            <Field className="min-w-0 gap-1">
              <FieldLabel>Flag missing days</FieldLabel>
              <FieldDescription>
                Highlight days without any Telegram message
              </FieldDescription>
            </Field>
            <Switch aria-label="Flag missing days" defaultChecked />
          </div>
          <Separator className="my-4" />
          <div className="flex items-start justify-between gap-8">
            <Field className="min-w-0 gap-1">
              <FieldLabel>Include observations</FieldLabel>
              <FieldDescription>
                Add scouting observations to the digest
              </FieldDescription>
            </Field>
            <Switch aria-label="Include observations" />
          </div>
        </CardPanel>
        <CardFooter className="gap-2">
          <Button size="sm">Update</Button>
          <Button size="sm" variant="ghost">
            Reset
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
