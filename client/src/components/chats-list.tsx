import { Avatar, Box, Flex, Stack, Text } from "@chakra-ui/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getChatsOptions } from "@/api/queries/chats";
import { currentUserOptions } from "@/api/queries/auth";
import { Link } from "@tanstack/react-router";
import { formatAvatarName } from "@/utils/formatAvatarName";
interface ChatsListProps {
  onClose?: () => void;
}

export default function ChatsList({ onClose }: ChatsListProps) {
  const { data: chats } = useSuspenseQuery(getChatsOptions());
  const { data: currentUser } = useSuspenseQuery(currentUserOptions());
  if (chats.length === 0) {
    return (
      <Box flex="1" h="full" p="1">
        <Text color="fg.muted" fontSize="sm" textAlign="center">
          No Chats Yet
        </Text>
      </Box>
    );
  }
  return (
    <Stack h="full">
      {chats.map((chat: any) => {
        const isDm = !chat.isGroup;
        const dmMember = chat.members.find(
          (member: any) => member.id !== currentUser.id,
        );
        return (
          <Link
            to="/chats/$chatId"
            params={{ chatId: chat.id }}
            onClick={onClose}
          >
            <Flex
              align="center"
              borderRadius="md"
              w="full"
              p="2"
              gap="2"
              _hover={{ bg: "bg.subtle" }}
              cursor="pointer"
              overflowY="auto"
            >
              <Avatar.Root size="sm">
                <Avatar.Image
                  src={
                    isDm ? (dmMember?.avatar as string) : (chat.image as string)
                  }
                  alt={`${chat.name} image`}
                />
                <Avatar.Fallback>
                  {isDm
                    ? formatAvatarName(dmMember?.name as string)
                    : formatAvatarName(chat.name as string)}
                </Avatar.Fallback>
              </Avatar.Root>
              <Text fontSize="sm">{isDm ? dmMember?.name : chat.name}</Text>
            </Flex>
          </Link>
        );
      })}
    </Stack>
  );
}
