import type { User } from "@/lib/types";
import { apiFetch } from "@/utils/apiFetch";
import { queryOptions } from "@tanstack/react-query";

export const currentUserOptions = () =>
  queryOptions({
    queryKey: ["currentuser"],
    queryFn: async (): Promise<User> => {
      const user = await apiFetch("/api/auth/me");
      return user;
    },
  });
