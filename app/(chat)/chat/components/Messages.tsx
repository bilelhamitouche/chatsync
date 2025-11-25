"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { authClient } from "@/lib/auth-client";
import { useEffect, useRef, useState } from "react";
import Pusher from "pusher-js";
import { ChatMessage } from "@/lib/types";
import ChatBubble from "./ChatBubble";
import { Separator } from "@/components/ui/separator";

export default function Messages({
  initialMessages,
  chatId,
}: {
  initialMessages: ChatMessage[];
  chatId: string;
}) {
  const { data: session } = authClient.useSession();
  const [messages, setMessages] = useState(initialMessages);
  const scrollRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: "eu",
    });
    const channel = pusher.subscribe(chatId);
    channel.bind("chat", (data: ChatMessage) => {
      setMessages((prevMessages: ChatMessage[]) => [...prevMessages, data]);
    });
    return () => {
      pusher.unsubscribe(chatId);
    };
  }, [chatId]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <ScrollArea className="p-4 w-full h-full">
      <div className="flex flex-col gap-4 w-full h-full">
        {messages &&
          messages.map((message: ChatMessage, index) => (
            <div key={message.id}>
              {index > 0 &&
              new Date(messages[index].createdAt).getDate() -
                new Date(messages[index - 1].createdAt).getDate() ===
                1 ? (
                <div className="flex relative items-center py-4">
                  <Separator />
                  <span className="absolute left-1/2 px-2 m-2 mx-auto text-sm text-gray-500 -translate-x-1/2 bg-background">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
              ) : null}
              <li
                className={`flex items-center max-w-full ${message.senderId === session?.user.id ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex ${message.senderId === session?.user.id ? "flex-row-reverse" : "flex-row"} gap-2 items-start max-w-full`}
                >
                  <Avatar>
                    <AvatarImage
                      src={message.senderImage as string}
                      alt={`${message.senderName} image`}
                    />
                    <AvatarFallback>
                      {message.senderName?.toUpperCase()[0]}
                    </AvatarFallback>
                  </Avatar>
                  <ChatBubble
                    content={message.content}
                    createdAt={message.createdAt}
                  />
                </div>
              </li>
            </div>
          ))}
      </div>
      <div ref={scrollRef}></div>
    </ScrollArea>
  );
}
