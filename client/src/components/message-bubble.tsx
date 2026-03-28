import { Box, Image, Text } from "@chakra-ui/react";

interface MessageBubbleProps {
  message: {
    id: string;
    content: string | null;
    imageUrl: string | null;
    senderId: string;
    senderName: string;
    senderAvatar: string;
    chatId: string;
    sentAt: Date;
    updatedAt: Date;
  };
  currentUserId: string;
}

export default function MessageBubble({
  message,
  currentUserId,
}: MessageBubbleProps) {
  return (
    <Box
      key={message.id}
      borderRadius="md"
      px="4"
      py="3"
      w="fit-content"
      alignSelf={message.senderId === currentUserId ? "flex-end" : "flex-start"}
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
  );
}
