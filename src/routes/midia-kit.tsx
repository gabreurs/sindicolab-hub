import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/midia-kit")({
  beforeLoad: () => { throw redirect({ to: "/patrocinios", statusCode: 301 }); },
  component: () => null,
});
