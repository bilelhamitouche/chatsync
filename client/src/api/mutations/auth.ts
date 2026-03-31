import { toaster } from "@/components/ui/toaster";
import { queryClient, router } from "@/lib/router";
import { socket } from "@/lib/socket";
import type {
  LoginData,
  RegisterData,
  UpdatePasswordData,
  UpdateProfileInfoData,
} from "@/lib/types";
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
      toaster.error({
        title: "Login failed",
        description: error.message,
      });
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
      toaster.error({
        title: "Registration failed",
        description: error.message,
      });
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
      toaster.error({
        title: "Logout failed",
        description: error.message,
      });
    },
    onSuccess: () => {
      socket.disconnect();
      queryClient.clear();
      router.navigate({ to: "/auth/login" });
    },
  });

export const useDeleteAccountMutation = () =>
  useMutation({
    mutationFn: async (id: string) => {
      await apiFetch(`/api/users/${id}/delete`, {
        method: "POST",
      });
    },
    onError: (error) => {
      toaster.error({
        title: "Failed to delete account",
        description: JSON.parse(error.message).message,
      });
    },
    onSuccess: () => {
      router.navigate({ to: "/auth/login" });
    },
  });

export const useUpdateProfileInfoMutation = () =>
  useMutation({
    mutationFn: async (data: UpdateProfileInfoData) => {
      await apiFetch("/api/users/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    },
    onError: (error) => {
      toaster.error({
        title: "Failed to delete account",
        description: JSON.parse(error.message).message,
      });
    },
    onSuccess: () => {
      toaster.success({
        title: "Updated profile information successfully",
      });
    },
  });

export const useUpdatePasswordMutation = () =>
  useMutation({
    mutationFn: async (data: UpdatePasswordData) => {
      await apiFetch("/api/users/me/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    },
    onError: (error) => {
      toaster.error({
        title: "Failed to update password",
        description: JSON.parse(error.message).message,
      });
    },
    onSuccess: () => {
      toaster.success({
        title: "Updated password successfully",
      });
    },
  });
