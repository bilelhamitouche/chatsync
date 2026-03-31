import type { Message } from "@/lib/types";
import { apiFetch } from "@/utils/apiFetch";
import { queryOptions } from "@tanstack/react-query";

export const getChatMessagesOptions = (chatId: string) =>
  queryOptions({
    queryKey: ["messages", chatId],
    queryFn: async () => {
      const messages = await apiFetch(`/api/chats/${chatId}/messages`);
      return messages as Message[];
    },
  });
