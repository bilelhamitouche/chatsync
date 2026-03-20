import { routeTree } from "@/routeTree.gen";
import { QueryCache, QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      if (error.message === "Unauthenticated") {
        queryClient.clear();
        router.navigate({ to: "/auth/login" });
      }
    },
  }),
});

export const router = createRouter({
  routeTree,
  context: { queryClient, isAuthenticated: false },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
});
