import { getChatMessagesOptions } from "@/api/queries/messages";
import { Flex, ScrollArea } from "@chakra-ui/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import MessageBubble from "./message-bubble";
import { useEffect, useRef } from "react";
import { isGrouped } from "@/utils/isGrouped";

export default function MessageList({
  currentUserId,
  chatId,
}: {
  currentUserId: string;
  chatId: string;
}) {
  const { data: messages } = useSuspenseQuery(getChatMessagesOptions(chatId));
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const viewport = scrollRef.current?.parentElement;
    if (!viewport) return;
    const isNearBottom =
      viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight < 100;
    if (isNearBottom) {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  return (
    <ScrollArea.Root w="full" h="full" minH="0">
      <ScrollArea.Viewport>
        <ScrollArea.Content display="flex" flexDirection="column" p="4">
          {messages.map((message, index, array) => {
            return (
              <Flex
                key={message.id}
                w="full"
                align="center"
                justifyContent={
                  message.senderId === currentUserId ? "flex-end" : "flex-start"
                }
              >
                <Flex
                  gap="2"
                  alignItems="center"
                  flexDirection={
                    message.senderId === currentUserId ? "row-reverse" : "row"
                  }
                >
                  <MessageBubble
                    message={message}
                    isOwn={message.senderId === currentUserId}
                    groupedWithPrev={isGrouped(array[index - 1], message)}
                    groupedWithNext={isGrouped(message, array[index + 1])}
                  />
                </Flex>
              </Flex>
            );
          })}
          <div ref={scrollRef}></div>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Corner />
    </ScrollArea.Root>
  );
}
