import { getChatsOptions } from "@/api/queries/chats";
import Sidebar from "@/components/sidebar";
import { SidebarProvider } from "@/context/sidebar-context";
import { Box, Drawer, Flex, Portal } from "@chakra-ui/react";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/__authLayout/chats")({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(getChatsOptions());
  },
});

function RouteComponent() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <SidebarProvider
      value={{
        onOpen: () => setDrawerOpen(true),
        onClose: () => setDrawerOpen(false),
      }}
    >
      <Flex w="full" h="dvh" overflow="hidden">
        <Box display={{ base: "none", md: "block" }} w="sm">
          <Sidebar withShadow={true} />
        </Box>
        <Drawer.Root
          open={drawerOpen}
          onOpenChange={(e) => setDrawerOpen(e.open)}
          placement="start"
        >
          <Portal>
            <Drawer.Backdrop />
            <Drawer.Positioner>
              <Drawer.Content w="fit-content">
                <Sidebar withShadow={false} />
              </Drawer.Content>
            </Drawer.Positioner>
          </Portal>
        </Drawer.Root>
        <Box flex="1" minW="0" h="dvh" overflow="hidden">
          <Outlet />
        </Box>
      </Flex>
    </SidebarProvider>
  );
}
