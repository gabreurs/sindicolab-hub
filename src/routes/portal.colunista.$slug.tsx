import { createFileRoute, notFound } from "@tanstack/react-router";
import { PortalColumnist } from "@/components/portal/PortalPages";
import { portalService } from "@/services/portalService";
import { buildSeo } from "@/lib/seo";
export const Route=createFileRoute("/portal/colunista/$slug")({loader:async({params})=>{const [profile,categories]=await Promise.all([portalService.columnistBySlug(params.slug),portalService.categories()]);if(!profile)throw notFound();return{...profile,categories};},head:({loaderData})=>loaderData?buildSeo({title:`${loaderData.author.name} — Portal SíndicoLab`,description:loaderData.author.bio??"Colunista do Portal SíndicoLab.",path:`/portal/colunista/${loaderData.author.slug}`}):{},component:()=> <PortalColumnist {...Route.useLoaderData()}/>});