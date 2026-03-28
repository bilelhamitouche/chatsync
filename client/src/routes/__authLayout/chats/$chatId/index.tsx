import { currentUserOptions } from "@/api/queries/auth";
import { getChatMessagesOptions } from "@/api/queries/messages";
import MessageForm from "@/components/message-form";
import MessageList from "@/components/message-list";
import { queryClient } from "@/lib/router";
import { socket } from "@/lib/socket";
import type { Message } from "@/lib/types";
import { Grid } from "@chakra-ui/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense, useEffect } from "react";

export const Route = createFileRoute("/__authLayout/chats/$chatId/")({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(
      getChatMessagesOptions(params.chatId),
    );
  },
});

function RouteComponent() {
  const params = Route.useParams();
  const { data: currentUser } = useSuspenseQuery(currentUserOptions());
  useEffect(() => {
    socket.connect();
    socket.emit("join_room", params.chatId);

    socket.on("connect", () => {
      socket.emit("join_room", params.chatId);
    });

    socket.on("receive_message", (message) => {
      queryClient.setQueryData(
        ["messages", params.chatId],
        (old: Message[]) => {
          return [...(old ?? []), message];
        },
      );
    });

    return () => {
      socket.emit("leave_room", params.chatId);
      socket.off("receive_message");
      socket.off("connect");
      socket.disconnect();
    };
  }, [params.chatId]);
  return (
    <Grid templateRows="1fr auto" p="4" w="full">
      <Suspense fallback={<div>Loading messages...</div>}>
        <MessageList currentUserId={currentUser.id} chatId={params.chatId} />
      </Suspense>
      <MessageForm currentUserId={currentUser.id} chatId={params.chatId} />
    </Grid>
  );
}
