import type { Chat, Member } from "@/lib/types";
import { apiFetch } from "@/utils/apiFetch";
import { queryOptions } from "@tanstack/react-query";

export const getChatsOptions = () =>
  queryOptions({
    queryKey: ["chats"],
    queryFn: async (): Promise<Chat[]> => {
      const chats = await apiFetch("/api/chats");
      return chats;
    },
  });

export const getChatMembersOptions = (chatId: string) =>
  queryOptions({
    queryKey: ["members", chatId],
    queryFn: async (): Promise<Member[]> => {
      const members = await apiFetch(`/api/chats/${chatId}/members`);
      return members;
    },
  });
