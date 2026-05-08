import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/artigos")({
  beforeLoad: () => { throw redirect({ to: "/portal", statusCode: 301 }); },
  component: () => null,
});
