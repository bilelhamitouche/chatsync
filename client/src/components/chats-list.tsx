import { Flex, Stack, Text } from "@chakra-ui/react";
import Chat from "./chat";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getChatsOptions } from "@/api/queries/chats";
import { currentUserOptions } from "@/api/queries/auth";

export default function ChatsList() {
  const { data: chats } = useSuspenseQuery(getChatsOptions());
  const { data: currentUser } = useSuspenseQuery(currentUserOptions());
  if (chats.length === 0) {
    return (
      <Flex align="center" justify="center" flex="1">
        <Text color="fg.subtle" fontSize="sm">
          No Chats Yet
        </Text>
      </Flex>
    );
  }
  return (
    <Stack h="full">
      {chats.map((chat: any) => (
        <Chat key={chat.id} chat={chat} currentUserId={currentUser.id} />
      ))}
    </Stack>
  );
}
