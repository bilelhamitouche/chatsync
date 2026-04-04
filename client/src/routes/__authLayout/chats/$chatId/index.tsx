import { currentUserOptions } from "@/api/queries/auth";
import { getChatMessagesOptions } from "@/api/queries/messages";
import MessageForm from "@/components/message-form";
import MessageList from "@/components/message-list";
import { useSidebar } from "@/context/sidebar-context";
import { queryClient } from "@/lib/router";
import { socket } from "@/lib/socket";
import type { Message } from "@/lib/types";
import { Flex, Grid, IconButton } from "@chakra-ui/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense, useEffect } from "react";
import { LuMenu } from "react-icons/lu";

export const Route = createFileRoute("/__authLayout/chats/$chatId/")({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(
      getChatMessagesOptions(params.chatId),
    );
  },
});

function RouteComponent() {
  const { onOpen } = useSidebar();
  const params = Route.useParams();
  const { data: currentUser } = useSuspenseQuery(currentUserOptions());
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
    socket.emit("join_room", params.chatId);

    socket.on("receive_message", (message) => {
      queryClient.setQueryData(
        ["messages", params.chatId],
        (old: Message[]) => {
          return [...(old ?? []), message];
        },
      );
      queryClient.invalidateQueries({
        queryKey: ["chats"],
        refetchType: "all",
      });
    });

    return () => {
      socket.emit("leave_room", params.chatId);
      socket.off("receive_message");
    };
  }, [params.chatId]);
  return (
    <Grid
      templateRows="1fr auto"
      p="4"
      w="full"
      h="dvh"
      minW="0"
      minH="0"
      overflow="hidden"
    >
      <Flex display={{ base: "flex", md: "none" }} p="2">
        <IconButton variant="ghost" onClick={onOpen}>
          <LuMenu />
        </IconButton>
      </Flex>
      <Suspense fallback={<div>Loading messages...</div>}>
        <MessageList currentUserId={currentUser.id} chatId={params.chatId} />
      </Suspense>
      <MessageForm currentUserId={currentUser.id} chatId={params.chatId} />
    </Grid>
  );
}
