import { apiFetch } from "@/utils/apiFetch";
import { queryOptions } from "@tanstack/react-query";

export const membersQueryOptions = () =>
  queryOptions({
    queryKey: ["members"],
    queryFn: async () => {
      const res = await apiFetch("/api/users/members");
      return res;
    },
  });
