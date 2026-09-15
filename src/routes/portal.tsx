import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { PortalHome } from "@/components/portal/PortalHome";

export const Route = createFileRoute("/portal")({
  head: () => buildSeo({ title: "Portal SíndicoLab — Notícias do mercado condominial", description: "Notícias, colunistas, eventos e análises para transformar a gestão condominial.", path: "/portal" }),
  component: PortalHome,
});