import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__authLayout/settings/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Settings page</div>;
}
