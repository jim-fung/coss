"use client";

import { MicIcon, PaperclipIcon } from "lucide-react";
import { useRef, useState } from "react";
import {
  PromptInput,
  PromptInputButton,
  PromptInputFooter,
  PromptInputHeader,
  type PromptInputStatus,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@/registry/default/ui/prompt-input";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";

const models = [
  { label: "glm-5.3", value: "glm-5.3" },
  { label: "glm-5.3-air", value: "glm-5.3-air" },
  { label: "glm-5.3-flash", value: "glm-5.3-flash" },
];

export default function Particle() {
  const [status, setStatus] = useState<PromptInputStatus>("ready");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const handleSubmit = () => {
    timers.current.forEach(clearTimeout);
    setStatus("submitted");
    timers.current = [
      setTimeout(() => setStatus("streaming"), 600),
      setTimeout(() => setStatus("ready"), 2400),
    ];
  };

  return (
    <PromptInput className="max-w-md" onSubmit={handleSubmit}>
      <PromptInputTextarea placeholder="Ask anything…" rows={2} />
      <PromptInputHeader>
        <Select defaultValue="glm-5.3" items={models}>
          <SelectTrigger size="sm">
            <SelectValue />
          </SelectTrigger>
          <SelectPopup>
            {models.map((model) => (
              <SelectItem key={model.value} value={model.value}>
                {model.label}
              </SelectItem>
            ))}
          </SelectPopup>
        </Select>
      </PromptInputHeader>
      <PromptInputFooter>
        <PromptInputTools>
          <PromptInputButton aria-label="Attach file" tooltip="Attach file">
            <PaperclipIcon aria-hidden="true" />
          </PromptInputButton>
          <PromptInputButton aria-label="Dictate message" tooltip="Dictate">
            <MicIcon aria-hidden="true" />
          </PromptInputButton>
        </PromptInputTools>
        <PromptInputSubmit status={status} />
      </PromptInputFooter>
    </PromptInput>
  );
}
