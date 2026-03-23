import { currentUserOptions } from "@/api/queries/auth";
import { router } from "@/lib/router";
import { Flex, Text } from "@chakra-ui/react";
import { createFileRoute, Outlet } from "@tanstack/react-router";

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
  return <Outlet />;
}
