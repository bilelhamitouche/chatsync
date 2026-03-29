import Sidebar from "@/components/sidebar";
import { Box, Flex } from "@chakra-ui/react";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/__authLayout/chats")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Flex w="full" h="dvh" overflow="hidden">
      <Sidebar />
      <Box flex="1" minW="0" h="dvh" overflow="hidden">
        <Outlet />
      </Box>
    </Flex>
  );
}
