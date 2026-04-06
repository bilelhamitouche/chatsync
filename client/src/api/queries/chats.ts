import type { Chat, Member } from "@/lib/types";
import { apiFetch } from "@/utils/apiFetch";
import { queryOptions } from "@tanstack/react-query";

export const getChatsOptions = () =>
  queryOptions({
    queryKey: ["chats"],
    queryFn: async () => {
      const chats = await apiFetch("/api/chats");
      return chats as Chat[];
    },
  });

export const getChatMembersOptions = (chatId: string) =>
  queryOptions({
    queryKey: ["members", chatId],
    queryFn: async () => {
      const members = await apiFetch(`/api/chats/${chatId}/members`);
      return members as Member[];
    },
  });
