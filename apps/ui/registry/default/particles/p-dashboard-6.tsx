"use client";

import { CheckIcon } from "lucide-react";
import { useEffect, useState } from "react";
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
  { label: "Europe/Amsterdam", value: "eu-amsterdam" },
  { label: "Europe/Berlin", value: "eu-berlin" },
  { label: "UTC", value: "utc" },
];

const unitsItems = [
  { label: "Metric (ha, mm, h)", value: "metric" },
  { label: "Imperial (ac, in, h)", value: "imperial" },
];

type WorkbenchPreferences = {
  digestDay: string;
  timezone: string;
  units: string;
  autoRegister: boolean;
  flagMissingDays: boolean;
  includeObservations: boolean;
};

const defaultPreferences: WorkbenchPreferences = {
  digestDay: "sunday",
  timezone: "eu-amsterdam",
  units: "metric",
  autoRegister: true,
  flagMissingDays: true,
  includeObservations: false,
};

export default function Particle() {
  const [lastSaved, setLastSaved] =
    useState<WorkbenchPreferences>(defaultPreferences);
  const [draft, setDraft] = useState<WorkbenchPreferences>(defaultPreferences);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!saved) {
      return;
    }
    const timeout = setTimeout(() => {
      setSaved(false);
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, [saved]);

  const isDirty =
    draft.digestDay !== lastSaved.digestDay ||
    draft.timezone !== lastSaved.timezone ||
    draft.units !== lastSaved.units ||
    draft.autoRegister !== lastSaved.autoRegister ||
    draft.flagMissingDays !== lastSaved.flagMissingDays ||
    draft.includeObservations !== lastSaved.includeObservations;

  const handleUpdate = () => {
    setLastSaved(draft);
    setSaved(true);
  };

  const handleReset = () => {
    setDraft(lastSaved);
  };

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
            <Select
              items={digestDayItems}
              onValueChange={(value) => {
                if (value !== null) {
                  setDraft({ ...draft, digestDay: value });
                }
              }}
              value={draft.digestDay}
            >
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
            <Select
              items={timezoneItems}
              onValueChange={(value) => {
                if (value !== null) {
                  setDraft({ ...draft, timezone: value });
                }
              }}
              value={draft.timezone}
            >
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
            <Select
              items={unitsItems}
              onValueChange={(value) => {
                if (value !== null) {
                  setDraft({ ...draft, units: value });
                }
              }}
              value={draft.units}
            >
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
              checked={draft.autoRegister}
              onCheckedChange={(checked) => {
                setDraft({ ...draft, autoRegister: checked });
              }}
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
            <Switch
              aria-label="Flag missing days"
              checked={draft.flagMissingDays}
              onCheckedChange={(checked) => {
                setDraft({ ...draft, flagMissingDays: checked });
              }}
            />
          </div>
          <Separator className="my-4" />
          <div className="flex items-start justify-between gap-8">
            <Field className="min-w-0 gap-1">
              <FieldLabel>Include observations</FieldLabel>
              <FieldDescription>
                Add scouting observations to the digest
              </FieldDescription>
            </Field>
            <Switch
              aria-label="Include observations"
              checked={draft.includeObservations}
              onCheckedChange={(checked) => {
                setDraft({ ...draft, includeObservations: checked });
              }}
            />
          </div>
        </CardPanel>
        <CardFooter className="gap-2">
          <Button
            disabled={!isDirty && !saved}
            onClick={handleUpdate}
            size="sm"
            variant={saved ? "secondary" : isDirty ? "default" : "outline"}
          >
            {saved ? (
              <>
                <CheckIcon aria-hidden="true" />
                Saved
              </>
            ) : (
              "Update"
            )}
          </Button>
          <Button
            disabled={!isDirty}
            onClick={handleReset}
            size="sm"
            variant="ghost"
          >
            Reset
          </Button>
        </CardFooter>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Danger zone</CardTitle>
          <CardDescription>
            Irreversible actions for this workbench
          </CardDescription>
        </CardHeader>
        <CardPanel>
          <div className="flex items-start justify-between gap-8">
            <Field className="min-w-0 gap-1">
              <FieldLabel>Disable workbench</FieldLabel>
              <FieldDescription>
                Blocks all operators until re-enabled. Active runs finish first.
              </FieldDescription>
            </Field>
            <Button
              onClick={() => undefined}
              size="sm"
              variant="destructive-outline"
            >
              Disable
            </Button>
          </div>
        </CardPanel>
      </Card>
    </div>
  );
}
