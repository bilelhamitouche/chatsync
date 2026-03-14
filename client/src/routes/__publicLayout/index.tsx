import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__publicLayout/")({
  component: Index,
});

function Index() {
  return (
    <div>
      <h3>Welcome Home!</h3>
    </div>
  );
}
