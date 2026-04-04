import { Avatar, Box, Flex, Stack, Text } from "@chakra-ui/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getChatsOptions } from "@/api/queries/chats";
import { currentUserOptions } from "@/api/queries/auth";
import { Link, useRouterState } from "@tanstack/react-router";
import { formatAvatarName } from "@/utils/formatAvatarName";
import type { Chat, Member } from "@/lib/types";
import { LuImage } from "react-icons/lu";
import ChatActionsMenu from "./chat-actions-menu";
interface ChatsListProps {
  onClose?: () => void;
}

export default function ChatsList({ onClose }: ChatsListProps) {
  const routerState = useRouterState();
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
  function isActive(chatId: string) {
    return routerState.location.pathname === `/chats/${chatId}`;
  }
  return (
    <Stack h="full">
      {chats.map((chat: Chat) => {
        const isGroup = chat.isGroup;
        const dmMember = chat.members.find(
          (member: Pick<Member, "id" | "name" | "avatar" | "isAdmin">) =>
            member.id !== currentUser.id,
        );
        const displayName = isGroup
          ? chat.name
          : (dmMember?.name ?? "Unknown User");
        return (
          <Link
            key={chat.id}
            to="/chats/$chatId"
            params={{ chatId: chat.id }}
            onClick={onClose}
          >
            <Flex
              className="group"
              align="center"
              borderRadius="md"
              w="full"
              p="2"
              gap="2"
              cursor="pointer"
              overflowY="auto"
              justifyContent="space-between"
              bg={isActive(chat.id) ? "bg.muted" : "transparent"}
              fontWeight={isActive(chat.id) ? "semibold" : "normal"}
              _hover={{ bg: isActive(chat.id) ? "bg.muted" : "bg.subtle" }}
            >
              <Flex gap="2">
                <Avatar.Root size="sm">
                  <Avatar.Image
                    src={
                      isGroup
                        ? (chat.image as string)
                        : (dmMember?.avatar as string)
                    }
                    alt={`${chat.name} image`}
                  />
                  <Avatar.Fallback>
                    {formatAvatarName(displayName)}
                  </Avatar.Fallback>
                </Avatar.Root>
                <Stack gap="0">
                  <Text fontSize="sm">{displayName}</Text>
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
              <ChatActionsMenu
                chatId={chat.id}
                isAdmin={
                  chat.members.find((member) => member.id == currentUser.id)
                    ?.isAdmin ?? false
                }
              />
            </Flex>
          </Link>
        );
      })}
    </Stack>
  );
}
