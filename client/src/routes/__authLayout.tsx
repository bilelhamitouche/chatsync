import { currentUserOptions } from "@/api/queries/auth";
import { queryClient, router } from "@/lib/router";
import { socket } from "@/lib/socket";
import { Flex, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/__authLayout")({
  component: RouteComponent,
  errorComponent: () => {
    return (
      <Flex direction="column" align="center" justify="center" w="full" h="dvh">
        <Text fontSize="2xl" color="red">
          Something Wrong Happened
        </Text>
      </Flex>
    );
  },
  beforeLoad: async ({ context }) => {
    try {
      const user = await context.queryClient.fetchQuery(currentUserOptions());
      context.isAuthenticated = !!user;
    } catch (err) {
      context.isAuthenticated = false;
    }
    if (context.isAuthenticated === false) {
      router.navigate({ to: "/auth/login" });
    }
  },
});

function RouteComponent() {
  const { data: user } = useQuery(currentUserOptions());
  useEffect(() => {
    if (!user) return;
    if (!socket.connected) {
      socket.connect();
    }
    socket.on("chat_created", () => {
      queryClient.invalidateQueries({
        queryKey: ["chats"],
        refetchType: "all",
      });
    });

    socket.on("chat_edited", () => {
      queryClient.invalidateQueries({
        queryKey: ["chats"],
        refetchType: "all",
      });
    });

    socket.on("chat_left", () => {
      queryClient.invalidateQueries({
        queryKey: ["chats"],
        refetchType: "all",
      });
    });

    socket.on("chat_deleted", () => {
      queryClient.invalidateQueries({
        queryKey: ["chats"],
        refetchType: "all",
      });
    });
    return () => {
      socket.off("chat_created");
      socket.off("chat_edited");
      socket.off("chat_left");
      socket.off("chat_deleted");
    };
  }, [user]);
  return <Outlet />;
}
