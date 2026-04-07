import type { Message } from "@/lib/types";
import { Avatar, Box, Flex, Image, Stack, Text } from "@chakra-ui/react";

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  groupedWithPrev: boolean;
  groupedWithNext: boolean;
}

export default function MessageBubble({
  message,
  isOwn,
  groupedWithPrev,
  groupedWithNext,
}: MessageBubbleProps) {
  return (
    <Stack mt={!groupedWithPrev ? 4 : 0.5}>
      <Flex
        alignItems="center"
        flexDirection={isOwn ? "row-reverse" : "row"}
        gap="2"
      >
        {!groupedWithNext && (
          <Avatar.Root size="sm">
            <Avatar.Image src={message.senderAvatar as string} />
            <Avatar.Fallback name={message.senderName} />
          </Avatar.Root>
        )}
        <Box
          borderTopRightRadius={!isOwn && !groupedWithPrev ? "lg" : "none"}
          borderTopLeftRadius={isOwn && !groupedWithPrev ? "lg" : "none"}
          borderBottomRightRadius={!isOwn && !groupedWithNext ? "lg" : "none"}
          borderBottomLeftRadius={isOwn && !groupedWithNext ? "lg" : "none"}
          px="3"
          py="2"
          mr={isOwn && groupedWithNext ? 11 : 0}
          ml={!isOwn && groupedWithNext ? 11 : 0}
          w="fit-content"
          maxW="md"
          textWrap="wrap"
          textWrapMode="wrap"
          textWrapStyle="pretty"
          bg={isOwn ? "blue.solid" : "gray.200"}
          color={isOwn ? "bg" : "fg"}
        >
          <Box spaceY="4">
            {message.imageUrl ? (
              <Image
                src={message.imageUrl as string}
                alt="image content"
                maxW="300px"
                maxH="400px"
                objectFit="contain"
                borderRadius="md"
              />
            ) : null}
            {message.content ? (
              <Text fontSize="sm">{message.content}</Text>
            ) : null}
          </Box>
        </Box>
      </Flex>
    </Stack>
  );
}
