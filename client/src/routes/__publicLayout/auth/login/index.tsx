import { Card, Flex, Text } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__publicLayout/auth/login/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Flex w="vw" h="vh" justify="center" align="center">
      <Card.Root p={8}>
        <Text fontSize="md">Hello</Text>
      </Card.Root>
    </Flex>
  );
}
