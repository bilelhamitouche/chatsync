import {
  Box,
  Button,
  FileUpload,
  Flex,
  Input,
  useFileUploadContext,
} from "@chakra-ui/react";
import { useForm } from "@tanstack/react-form";
import { LuFileImage, LuSend } from "react-icons/lu";
import { createMessageSchema } from "@/lib/zod";
import { ImageUploadList } from "./image-upload-list";
import { uploadImage } from "@/utils/uploadImage";
import { socket } from "@/lib/socket";

export default function MessageForm({
  currentUserId,
  chatId,
}: {
  currentUserId: string;
  chatId: string;
}) {
  return (
    <FileUpload.Root accept="image/*" maxFiles={1}>
      <MessageFormInner currentUserId={currentUserId} chatId={chatId} />
    </FileUpload.Root>
  );
}

export function MessageFormInner({
  currentUserId,
  chatId,
}: {
  currentUserId: string;
  chatId: string;
}) {
  const fileUpload = useFileUploadContext();
  const form = useForm({
    defaultValues: {
      content: "",
    },
    validators: {
      onSubmit: createMessageSchema,
    },
    onSubmit: async ({ value }) => {
      const files = fileUpload.acceptedFiles;
      let imageUrl: string | null = null;
      if (files.length > 0) {
        imageUrl = await uploadImage(files[0]);
      }

      socket.emit("send_message", {
        chatId,
        senderId: currentUserId,
        content: value.content,
        imageUrl,
      });

      form.reset();
      fileUpload.clearFiles();
    },
  });
  return (
    <Flex gap="2" w="full" asChild p="4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <Box position="relative">
          <ImageUploadList />
          <FileUpload.HiddenInput />
          <FileUpload.Trigger asChild>
            <Button variant="subtle">
              <LuFileImage />
            </Button>
          </FileUpload.Trigger>
        </Box>
        <form.Field
          name="content"
          children={(field) => (
            <Input
              w="full"
              placeholder="Type message"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
            />
          )}
        />
        <Button type="submit">
          <LuSend />
          <span>Send</span>
        </Button>
      </form>
    </Flex>
  );
}
