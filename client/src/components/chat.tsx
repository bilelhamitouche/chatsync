import { formatAvatarName } from "@/utils/formatAvatarName";
import { Avatar, AvatarFallback, Flex, Text } from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";

interface ChatProps {
  id: string;
  name: string;
  image: string;
  isGroup: string;
  members: { id: string; name: string; avatar: string | null }[];
  createdAt: Date;
  updatedAt: Date;
}

export default function Chat({
  chat,
  currentUserId,
}: {
  chat: ChatProps;
  currentUserId: string;
}) {
  const isDm = !chat.isGroup;
  const dmMember = chat.members.find((member) => member.id !== currentUserId);
  return (
    <Link to="/chats/$chatId" params={{ chatId: chat.id }}>
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
            src={isDm ? (dmMember?.avatar as string) : (chat.image as string)}
            alt={`${chat.name} image`}
          />
          <AvatarFallback>
            {isDm
              ? formatAvatarName(dmMember?.name as string)
              : formatAvatarName(chat.name as string)}
          </AvatarFallback>
        </Avatar.Root>
        <Text fontSize="sm">{isDm ? dmMember?.name : chat.name}</Text>
      </Flex>
    </Link>
  );
}
