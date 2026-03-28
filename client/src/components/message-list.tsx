import { getChatMessagesOptions } from "@/api/queries/messages";
import { Box, ScrollArea, Stack, Text } from "@chakra-ui/react";
import { useSuspenseQuery } from "@tanstack/react-query";

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
      <Stack w="full" h="full" gap="4">
        {messages.map((message: any) => (
          <Box
            key={message.id}
            borderRadius="md"
            px="4"
            py="3"
            w="fit-content"
            alignSelf={
              message.senderId === currentUserId ? "flex-end" : "flex-start"
            }
            bg={message.senderId === currentUserId ? "blue" : "gray.200"}
            color={message.senderId === currentUserId ? "bg" : "fg"}
          >
            <Text>{message.content}</Text>
          </Box>
        ))}
      </Stack>
    </ScrollArea.Root>
  );
}
