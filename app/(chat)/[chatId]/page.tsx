"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

function Chat() {
  const { data: session } = authClient.useSession();
  const [messages, setMessages] = useState([]);
  return (
    <ScrollArea className="h-full">
      {messages.map((message) => (
        <div
          className={`flex ${session?.user.id === message.id && "justify-end"}`}
        >
          <div className="p-2 rounded-lg">{message.content}</div>
        </div>
      ))}
    </ScrollArea>
  );
}

export default Chat;
