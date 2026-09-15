import { createFileRoute } from "@tanstack/react-router";
import { PortalColumnists } from "@/components/portal/PortalPages";
import { portalService } from "@/services/portalService";
import { buildSeo } from "@/lib/seo";
export const Route=createFileRoute("/portal/colunistas")({loader:async()=>({categories:await portalService.categories(),authors:(await portalService.authors()).filter(a=>a.is_columnist)}),head:()=>buildSeo({title:"Colunistas — Portal SíndicoLab",description:"Opinião e análise de especialistas em gestão condominial.",path:"/portal/colunistas"}),component:()=> <PortalColumnists {...Route.useLoaderData()}/>});