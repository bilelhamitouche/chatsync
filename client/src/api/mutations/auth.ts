import { queryClient, router } from "@/lib/router";
import { socket } from "@/lib/socket";
import type { LoginData, RegisterData } from "@/lib/types";
import { apiFetch } from "@/utils/apiFetch";
import { useMutation } from "@tanstack/react-query";

export const useLoginMutation = () =>
  useMutation({
    mutationFn: async (data: LoginData) => {
      await apiFetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    },
    onError: (error) => {
      throw new Error(error.message);
    },
    onSuccess: () => {
      socket.connect();
      router.navigate({ to: "/chats" });
    },
  });

export const useRegisterMutation = () =>
  useMutation({
    mutationFn: async (data: RegisterData) => {
      await apiFetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    },
    onError: (error) => {
      throw new Error(error.message);
    },
    onSuccess: () => {
      socket.connect();
      router.navigate({ to: "/chats" });
    },
  });

export const useLogoutMutation = () =>
  useMutation({
    mutationFn: async () => {
      await apiFetch("/api/auth/logout", {
        method: "POST",
      });
    },
    onError: (error) => {
      throw new Error(error.message);
    },
    onSuccess: () => {
      socket.disconnect();
      queryClient.clear();
      router.navigate({ to: "/auth/login" });
    },
  });
