import type { createMessageData } from "@/lib/types";
import { apiFetch } from "@/utils/apiFetch";
import { useMutation } from "@tanstack/react-query";

export const createMessageMutation = () =>
  useMutation({
    mutationFn: async (data: createMessageData) => {
      await apiFetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });
