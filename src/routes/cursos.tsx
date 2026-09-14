import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/cursos")({
  beforeLoad: () => { throw redirect({ to: "/academy", statusCode: 301 }); },
  component: () => null,
});
