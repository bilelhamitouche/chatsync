import { Box, Button } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <Box p={4}>
      <Button>Hello World</Button>
    </Box>
  );
}
