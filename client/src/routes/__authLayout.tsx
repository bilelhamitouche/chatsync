import { currentUserOptions } from "@/api/queries/auth";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/__authLayout")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    try {
      const user = await context.queryClient.fetchQuery(currentUserOptions());
      context.isAuthenticated = !!user;
    } catch (err) {
      context.isAuthenticated = false;
    }
  },
});

function RouteComponent() {
  return <Outlet />;
}
