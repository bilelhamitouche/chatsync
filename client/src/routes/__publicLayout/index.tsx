import { Box, Heading } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__publicLayout/")({
  component: Index,
});

function Index() {
  return (
    <Box p="4">
      <Heading size="md">Welcome Home</Heading>
    </Box>
  );
}
