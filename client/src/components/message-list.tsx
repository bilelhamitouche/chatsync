import { Box, Flex, ScrollArea, Text } from "@chakra-ui/react";

export default function MessageList() {
  return (
    <ScrollArea.Root>
      <Flex gap="4">
        <Box borderRadius="md" px="4" py="3" bg="blue" color="bg">
          <Text>Hello</Text>
        </Box>
      </Flex>
    </ScrollArea.Root>
  );
}
