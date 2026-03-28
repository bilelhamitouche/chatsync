import { getChatMessagesOptions } from "@/api/queries/messages";
import { Box, ScrollArea, Stack, Text } from "@chakra-ui/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import MessageBubble from "./message-bubble";

export default function MessageList({
  currentUserId,
  chatId,
}: {
  currentUserId: string;
  chatId: string;
}) {
  const { data: messages } = useSuspenseQuery(getChatMessagesOptions(chatId));
  return (
    <ScrollArea.Root w="full" h="full">
      <ScrollArea.Viewport>
        <ScrollArea.Content
          display="flex"
          flexDirection="column"
          spaceY="4"
          p="4"
        >
          {messages.map((message: any) => (
            <MessageBubble
              key={message.id}
              message={message}
              currentUserId={currentUserId}
            />
          ))}
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Corner />
    </ScrollArea.Root>
  );
}
