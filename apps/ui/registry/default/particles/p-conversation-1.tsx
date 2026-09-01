"use client";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/registry/default/ui/conversation";

const messages = Array.from({ length: 12 }, (_, index) => ({
  id: index,
  text: `Message ${index + 1}: this filler keeps the thread long enough to scroll and exercise the stick-to-bottom behavior.`,
}));

export default function Particle() {
  return (
    <div className="flex h-96 w-full max-w-md flex-col">
      <Conversation className="rounded-lg border">
        <ConversationContent>
          {messages.map((message) => (
            <p
              className="text-sm"
              data-from={message.id % 2 === 0 ? "user" : "assistant"}
              key={message.id}
            >
              {message.text}
            </p>
          ))}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
    </div>
  );
}
