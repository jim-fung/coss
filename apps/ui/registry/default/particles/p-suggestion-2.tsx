"use client";

import { BookOpenIcon, CodeIcon, LightbulbIcon } from "lucide-react";
import { Suggestion, Suggestions } from "@/registry/default/ui/suggestion";

export default function Particle() {
  return (
    <Suggestions>
      <Suggestion onClick={() => {}} suggestion="How does it work?">
        <LightbulbIcon aria-hidden="true" />
        How does it work?
      </Suggestion>
      <Suggestion onClick={() => {}} suggestion="Show an example">
        <CodeIcon aria-hidden="true" />
        Show an example
      </Suggestion>
      <Suggestion variant="secondary" onClick={() => {}} suggestion="Deep dive">
        <BookOpenIcon aria-hidden="true" />
        Deep dive
      </Suggestion>
    </Suggestions>
  );
}
