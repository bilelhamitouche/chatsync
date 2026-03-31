import type { Chat } from "@/lib/types";
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
