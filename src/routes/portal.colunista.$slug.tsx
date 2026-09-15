import { createFileRoute, notFound } from "@tanstack/react-router";
import { PortalColumnist } from "@/components/portal/PortalPages";
import { portalService } from "@/services/portalService";
export const Route=createFileRoute("/portal/colunista/$slug")({loader:async({params})=>{const [profile,categories]=await Promise.all([portalService.columnistBySlug(params.slug),portalService.categories()]);if(!profile)throw notFound();return{...profile,categories};},component:()=> <PortalColumnist {...Route.useLoaderData()}/>});