import { getChatMembersOptions } from "@/api/queries/chats";
import { useSidebar } from "@/context/sidebar-context";
import {
  Avatar,
  AvatarGroup,
  Flex,
  IconButton,
  Skeleton,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { LuMenu } from "react-icons/lu";

interface ChatNavbarProps {
  chatId: string;
}

export default function ChatNavbar({ chatId }: ChatNavbarProps) {
  const { data: members, isPending } = useQuery(getChatMembersOptions(chatId));
  const { onOpen } = useSidebar();
  return (
    <Flex p="4" gap="2" shadow="xs" alignItems="center" flexWrap="nowrap">
      <IconButton
        variant="ghost"
        onClick={onOpen}
        display={{ base: "flex", md: "none" }}
      >
        <LuMenu />
      </IconButton>
      {isPending ? (
        <Skeleton h="3" w="30" />
      ) : (
        <AvatarGroup gap="0" spaceX="-3" size="sm">
          {members?.slice(0, 4).map((member) => (
            <Avatar.Root key={member.id}>
              <Avatar.Fallback name={member.name} />
              <Avatar.Image src={member.avatar as string} />
            </Avatar.Root>
          ))}
          {members && members.length > 4 && (
            <Avatar.Root>
              <Avatar.Fallback>+{members.length - 4}</Avatar.Fallback>
            </Avatar.Root>
          )}
        </AvatarGroup>
      )}
    </Flex>
  );
}
