"use client";

import { Suggestion, Suggestions } from "@/registry/default/ui/suggestion";

export default function Particle() {
  return (
    <Suggestions>
      <Suggestion onClick={() => {}} suggestion="Explain this code" />
      <Suggestion onClick={() => {}} suggestion="Write unit tests" />
      <Suggestion onClick={() => {}} suggestion="Summarize this page" />
      <Suggestion onClick={() => {}} suggestion="Draft a reply" />
    </Suggestions>
  );
}
