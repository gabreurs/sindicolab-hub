import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/noticias")({
  beforeLoad: () => { throw redirect({ to: "/portal", statusCode: 301 }); },
  component: () => null,
});
