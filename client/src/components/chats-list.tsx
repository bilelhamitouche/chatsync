import { Avatar, Box, Flex, Stack, Text } from "@chakra-ui/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getChatsOptions } from "@/api/queries/chats";
import { currentUserOptions } from "@/api/queries/auth";
import { Link, useMatchRoute } from "@tanstack/react-router";
import { formatAvatarName } from "@/utils/formatAvatarName";
import type { Chat } from "@/lib/types";
import { LuImage } from "react-icons/lu";
interface ChatsListProps {
  onClose?: () => void;
}

export default function ChatsList({ onClose }: ChatsListProps) {
  const matchRoute = useMatchRoute();
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
      {chats.map((chat: Chat) => {
        const isDm = !chat.isGroup;
        const dmMember = chat.members.find(
          (member: any) => member.id !== currentUser.id,
        );
        const isActive = matchRoute({
          to: "/chats/$chatId",
          params: { chatId: chat.id },
        });
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
              cursor="pointer"
              overflowY="auto"
              bg={isActive ? "bg.muted" : "transparent"}
              fontWeight={isActive ? "semibold" : "normal"}
              _hover={{ bg: isActive ? "bg.muted" : "bg.subtle" }}
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
              <Stack gap="0">
                <Text fontSize="sm">{isDm ? dmMember?.name : chat.name}</Text>
                {chat.lastMessage ? (
                  chat.lastMessage.content ? (
                    <Text fontSize="xs" color="fg.muted">
                      {chat.lastMessage.content}
                    </Text>
                  ) : (
                    <Box>
                      <LuImage />
                      <Text fontSize="xs" color="fg.muted">
                        Photo
                      </Text>
                    </Box>
                  )
                ) : null}
              </Stack>
            </Flex>
          </Link>
        );
      })}
    </Stack>
  );
}
