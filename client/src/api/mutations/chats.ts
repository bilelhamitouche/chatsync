import { toaster } from "@/components/ui/toaster";
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
      toaster.error({
        title: "Failed to create Direct Message",
        description: error.message,
      });
    },
    onSuccess: () => {
      toaster.success({
        title: "Direct Message created successfully",
      });
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
      toaster.error({
        title: "Failed to create Group",
        description: error.message,
      });
    },
    onSuccess: () => {
      toaster.success({
        title: "Group created successfully",
      });
    },
  });
