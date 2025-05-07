"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { authClient } from "@/lib/auth-client";
import { useEffect, useRef, useState } from "react";
import Pusher from "pusher-js";

export default function Messages({
  initialMessages,
  chatId,
}: {
  initialMessages: any;
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
    channel.bind("chat", (data: any) => {
      setMessages((prevMessages: any) => [...prevMessages, data]);
    });
    return () => {
      pusher.unsubscribe(chatId);
    };
  }, []);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <ScrollArea className="p-4 w-full h-full">
      <div className="flex flex-col gap-4 w-full h-full">
        {messages &&
          messages.map((message: any, index: number) => (
            <li
              className={`flex items-center w-full ${message.senderId === session?.user.id ? "justify-end" : "justify-start"}`}
              key={index}
            >
              <div
                className={`flex ${message.senderId === session?.user.id ? "flex-row-reverse" : "flex-row"} gap-2 items-start`}
              >
                <Avatar>
                  <AvatarImage
                    src={message.senderImage as string}
                    alt={`${message.senderName} image`}
                  />
                  <AvatarFallback>
                    {message.senderName.toLowerCase()[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                  <div className="py-2 px-2 text-center text-white rounded-full min-w-10 bg-primary">
                    {message.content}
                  </div>
                  <span className="pl-4 text-xs text-left text-gray-500">
                    {new Date(message.createdAt).getHours() +
                      ":" +
                      new Date(message.createdAt).getMinutes()}
                  </span>
                </div>
              </div>
            </li>
          ))}
      </div>
      <div ref={scrollRef}></div>
    </ScrollArea>
  );
}
