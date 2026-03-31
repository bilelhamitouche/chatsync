import { currentUserOptions } from "@/api/queries/auth";
import DeleteAccountDialog from "@/components/delete-account-dialog";
import UpdatePasswordForm from "@/components/update-password-form";
import UpdateProfileInfoForm from "@/components/update-profile-info-form";
import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { LuArrowLeft } from "react-icons/lu";

export const Route = createFileRoute("/__authLayout/settings/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(currentUserOptions());
  },
});

function RouteComponent() {
  return (
    <Box w="full" h="full">
      <Box maxW="4xl" marginX="auto" pt="16">
        <Link to="/chats">
          <Button variant="ghost">
            <LuArrowLeft />
            <Text>Go back to chats</Text>
          </Button>
        </Link>
      </Box>
      <Flex
        p={{ base: "8", md: "20" }}
        flexDirection="column"
        gap="10"
        maxW="5xl"
        marginX="auto"
      >
        <Flex
          w="full"
          flexDirection={{ base: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="start"
          gap={{ base: "4", md: "8", lg: "20" }}
        >
          <Stack gap="2">
            <Heading as="h2">Profile Information</Heading>
            <Text fontSize="sm" color="fg.muted">
              Update your profile information
            </Text>
          </Stack>
          <UpdateProfileInfoForm />
        </Flex>
        <Flex
          w="full"
          flexDirection={{ base: "column", md: "row" }}
          justifyContent="space-between"
          gap={{ base: "4", md: "8", lg: "20" }}
        >
          <Stack gap="2">
            <Heading as="h2">Password</Heading>
            <Text fontSize="sm" color="fg.muted">
              Update your password
            </Text>
          </Stack>
          <UpdatePasswordForm />
        </Flex>
        <Flex
          w="full"
          flexDirection={{ base: "column", md: "row" }}
          justifyContent="space-between"
          gap={{ base: "4", md: "8", lg: "20" }}
        >
          <Stack gap="2">
            <Heading as="h2">Danger Zone</Heading>
            <Text fontSize="sm" color="fg.muted">
              Delete your account
            </Text>
          </Stack>
          <Stack gap="4">
            <Text color="fg.muted" maxW="sm">
              Once you delete your account, there is no going back. All of your
              information will be lost. Before you go, please download your
              information.
            </Text>
            <DeleteAccountDialog />
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
