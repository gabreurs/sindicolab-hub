import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/blog")({
  beforeLoad: () => { throw redirect({ to: "/portal", statusCode: 301 }); },
  component: () => null,
});
