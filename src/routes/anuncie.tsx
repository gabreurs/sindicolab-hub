import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/anuncie")({
  beforeLoad: () => { throw redirect({ to: "/patrocinios", statusCode: 301 }); },
  component: () => null,
});
