import LogoImage from "@/components/logo-image";
import { Button, Flex, Grid, Heading, Image, Text } from "@chakra-ui/react";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/__publicLayout/")({
  component: Index,
});

function Index() {
  return (
    <Grid templateRows="auto 1fr auto" w="full" h="full">
      <Flex
        as="header"
        alignItems="center"
        justify="space-between"
        p={2}
        shadow="sm"
      >
        <LogoImage width="150" />
        <Flex gap={2}>
          <Button variant="ghost" asChild>
            <Link to="/auth/login">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/auth/register">Register</Link>
          </Button>
        </Flex>
      </Flex>
      <Flex
        as="main"
        h="full"
        flexDirection={{ base: "column", lg: "row" }}
        justifyContent="space-between"
        gap={{ base: 8, sm: 16 }}
        px={8}
        py={{ base: 16, sm: 24, md: 32, lg: 40 }}
      >
        <Flex flexDirection="column" gap={{ base: 4, lg: 4 }}>
          <Flex
            flexDirection="column"
            alignItems="start"
            gap={{ base: 4, md: 8, lg: 12 }}
          >
            <Heading order={1} fontSize={{ base: "4xl", sm: "5xl", lg: "7xl" }}>
              Stay
            </Heading>
            <Heading order={1} fontSize={{ base: "4xl", sm: "5xl", lg: "7xl" }}>
              Connected.
            </Heading>
            <Heading order={1} fontSize={{ base: "4xl", sm: "5xl", lg: "7xl" }}>
              Stay In Sync.
            </Heading>
          </Flex>
          <Text
            mt={{ base: 2, sm: 4, lg: 6 }}
            fontSize={{ base: "md", md: "lg", lg: "xl" }}
            lineHeight="normal"
            color="fg.muted"
            maxWidth={{ base: "full", lg: "xl" }}
          >
            ChatSync brings your conversations together — real-time messaging,
            seamless channels, and end-to-end security for teams that move fast.
          </Text>
          <Button w="fit-content" size="lg">
            <Text fontSize="md">Start chatting for free</Text>
          </Button>
        </Flex>
        <Image
          src="/landing-image.png"
          alt="Landing page image"
          width="xl"
          borderRadius="lg"
          shadow="2xl"
          shadowColor="blue.solid"
        />
      </Flex>
      <Flex
        as="footer"
        w="full"
        p={4}
        shadow="sm"
        alignItems="center"
        justifyContent="center"
      >
        <Text>
          Copyright &copy; Bilel Hamitouche {new Date().getFullYear()}
        </Text>
      </Flex>
    </Grid>
  );
}
