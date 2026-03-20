import { apiFetch } from "@/utils/apiFetch";
import { queryOptions } from "@tanstack/react-query";

export const currentUserOptions = () =>
  queryOptions({
    queryKey: ["currentuser"],
    queryFn: async () => {
      const res = await apiFetch("/api/auth/me");
      return res;
    },
  });
