import MessageForm from "@/components/message-form";
import MessageList from "@/components/message-list";
import { Grid } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__authLayout/chats/$chatId/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Grid templateRows="1fr auto" p="4" w="full">
      <MessageList />
      <MessageForm />
    </Grid>
  );
}
