import { Stack, Text } from "@chakra-ui/react";

export default function ChatsListSkeleton() {
  return (
    <Stack h="full">
      <Text color="bg.subtle">Loading chats...</Text>
    </Stack>
  );
}
