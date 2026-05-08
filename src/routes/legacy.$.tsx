import { createFileRoute, redirect } from "@tanstack/react-router";
import { LEGACY_REDIRECTS } from "@/lib/site";

// Captura todos os paths legados via splat e devolve 301 para a rota nova.
// Apenas paths listados em LEGACY_REDIRECTS são tratados; demais retornam 404.
export const Route = createFileRoute("/legacy/$")({
  beforeLoad: ({ params }) => {
    const path = `/${params._splat ?? ""}`.replace(/\/+$/, "") || "/";
    const target = LEGACY_REDIRECTS[path];
    if (target) {
      throw redirect({ to: target, statusCode: 301 });
    }
  },
  component: () => null,
});
