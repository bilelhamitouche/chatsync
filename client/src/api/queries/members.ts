import type { Member } from "@/lib/types";
import { apiFetch } from "@/utils/apiFetch";
import { queryOptions } from "@tanstack/react-query";

export const membersQueryOptions = () =>
  queryOptions({
    queryKey: ["members"],
    queryFn: async (): Promise<Member[]> => {
      const members = await apiFetch("/api/users/members");
      return members;
    },
  });
