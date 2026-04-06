import { currentUserOptions } from "@/api/queries/auth";
import { getChatMembersOptions } from "@/api/queries/chats";
import { getChatMessagesOptions } from "@/api/queries/messages";
import ChatNavbar from "@/components/chat-navbar";
import MessageForm from "@/components/message-form";
import MessageList from "@/components/message-list";
import { queryClient } from "@/lib/router";
import { socket } from "@/lib/socket";
import type { Message } from "@/lib/types";
import { Grid, Spinner } from "@chakra-ui/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense, useEffect } from "react";

export const Route = createFileRoute("/__authLayout/chats/$chatId/")({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(
      getChatMessagesOptions(params.chatId),
    );
    await context.queryClient.ensureQueryData(
      getChatMembersOptions(params.chatId),
    );
  },
});

function RouteComponent() {
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
      templateRows="auto 1fr auto"
      w="full"
      h="dvh"
      minW="0"
      minH="0"
      overflow="hidden"
    >
      <ChatNavbar chatId={params.chatId} />
      <Suspense fallback={<Spinner />}>
        <MessageList currentUserId={currentUser.id} chatId={params.chatId} />
      </Suspense>
      <MessageForm currentUserId={currentUser.id} chatId={params.chatId} />
    </Grid>
  );
}
