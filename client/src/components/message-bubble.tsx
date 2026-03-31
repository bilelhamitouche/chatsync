import type { Message } from "@/lib/types";
import { Box, Image, Text } from "@chakra-ui/react";

interface MessageBubbleProps {
  message: Message;
  currentUserId: string;
}

export default function MessageBubble({
  message,
  currentUserId,
}: MessageBubbleProps) {
  return (
    <Box
      alignSelf={message.senderId === currentUserId ? "flex-end" : "flex-start"}
    >
      <Box
        borderRadius="md"
        px="4"
        py="3"
        w="fit-content"
        maxW="md"
        textWrap="wrap"
        textWrapMode="wrap"
        textWrapStyle="pretty"
        bg={message.senderId === currentUserId ? "blue.solid" : "gray.200"}
        color={message.senderId === currentUserId ? "bg" : "fg"}
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
          {message.content ? <Text>{message.content}</Text> : null}
        </Box>
      </Box>
      <Text fontSize="xs" color="gray.600">
        {new Date(message.sentAt).toLocaleDateString()}
      </Text>
    </Box>
  );
}
