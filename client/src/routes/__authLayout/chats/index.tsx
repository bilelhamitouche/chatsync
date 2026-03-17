import { Box, Text } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__authLayout/chats/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Box p="4">
      <Text>Create chat</Text>
    </Box>
  );
}
