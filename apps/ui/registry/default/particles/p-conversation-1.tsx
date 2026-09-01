"use client";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/registry/default/ui/conversation";
import { Message, MessageContent } from "@/registry/default/ui/message";

const messages = Array.from({ length: 12 }, (_, index) => ({
  from: index % 2 === 0 ? ("user" as const) : ("assistant" as const),
  id: index,
  text: `Message ${index + 1}: this filler keeps the thread long enough to scroll and exercise the stick-to-bottom behavior.`,
}));

export default function Particle() {
  return (
    <div className="flex h-96 w-full max-w-md flex-col">
      <Conversation className="rounded-lg border">
        <ConversationContent>
          {messages.map((message) => (
            <Message from={message.from} key={message.id}>
              <MessageContent>{message.text}</MessageContent>
            </Message>
          ))}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
    </div>
  );
}
