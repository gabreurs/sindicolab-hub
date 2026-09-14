/**
 * Camada de serviços do SíndicoLab.
 *
 * Nenhum componente conversa direto com a origem dos dados: todos passam por
 * um destes serviços. Quando o banco entrar, só o cliente em
 * `src/integrations/supabase/client.ts` muda.
 */
export { materialsService } from "./materialsService";
export type { Material, MaterialInput } from "./materialsService";
export { articlesService } from "./articlesService";
export type { SiteArticle, SiteArticleInput } from "./articlesService";
export { eventsService } from "./eventsService";
export type { SiteEvent, SiteEventInput } from "./eventsService";
export { newsletterService, captureNewsletterEmail, isValidEmail } from "./newsletterService";
export { academyService } from "./academyService";
export { authService } from "./authService";
export { tenantService } from "./tenantService";
