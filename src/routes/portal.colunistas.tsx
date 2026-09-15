import { createFileRoute } from "@tanstack/react-router";
import { PortalColumnists } from "@/components/portal/PortalPages";
import { portalService } from "@/services/portalService";
export const Route=createFileRoute("/portal/colunistas")({loader:async()=>({categories:await portalService.categories(),authors:(await portalService.authors()).filter(a=>a.is_columnist)}),component:()=> <PortalColumnists {...Route.useLoaderData()}/>});