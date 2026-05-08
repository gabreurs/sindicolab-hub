import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/sobre")({
  beforeLoad: () => { throw redirect({ to: "/quem-somos", statusCode: 301 }); },
  component: () => null,
});
