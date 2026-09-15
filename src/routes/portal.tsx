import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { PortalHome } from "@/components/portal/PortalHome";
import { Outlet, useRouterState } from "@tanstack/react-router";

function PortalRoute() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  return pathname === "/portal" || pathname === "/portal/" ? <PortalHome /> : <Outlet />;
}

export const Route = createFileRoute("/portal")({
  head: () => buildSeo({ title: "Portal SíndicoLab — Notícias do mercado condominial", description: "Notícias, colunistas, eventos e análises para transformar a gestão condominial.", path: "/portal" }),
  component: PortalRoute,
});