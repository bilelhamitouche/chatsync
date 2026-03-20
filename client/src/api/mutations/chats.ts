import type { CreateDmData, CreateGroupData } from "@/lib/types";
import { apiFetch } from "@/utils/apiFetch";
import { useMutation } from "@tanstack/react-query";

export const useCreateDmMutation = () =>
  useMutation({
    mutationFn: async (data: CreateDmData) => {
      await apiFetch("/api/chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });

export const useCreateGroupMutation = () =>
  useMutation({
    mutationFn: async (data: CreateGroupData) => {
      await apiFetch("/api/chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });
