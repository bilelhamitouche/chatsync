import Sidebar from "@/components/sidebar";
import { Flex } from "@chakra-ui/react";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/__authLayout/chats")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Flex w="full" h="dvh">
      <Sidebar />
      <Outlet />
    </Flex>
  );
}
