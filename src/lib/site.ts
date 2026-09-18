// Configuração centralizada de SEO/site.
// Trocar SITE_URL aqui propaga para sitemap, canonicals, OG, JSON-LD.

export const SITE_URL = "https://sindicolab.com";

export const STATIC_ROUTES: Array<{ path: string; changefreq?: string; priority?: number }> = [
  { path: "/", changefreq: "weekly", priority: 1.0 },
  { path: "/portal", changefreq: "daily", priority: 0.9 },
  { path: "/academy", changefreq: "weekly", priority: 0.8 },
  { path: "/materiais", changefreq: "weekly", priority: 0.8 },
  { path: "/eventos", changefreq: "weekly", priority: 0.8 },
  { path: "/academy", changefreq: "weekly", priority: 0.8 },
  { path: "/academy/catalogo", changefreq: "weekly", priority: 0.7 },
  { path: "/quem-somos", changefreq: "monthly", priority: 0.6 },
];

// Mapeamento de URLs legadas (origem -> destino).
// Usado para preservar SEO de links antigos. Edite à vontade.
export const LEGACY_REDIRECTS: Record<string, string> = {
  "/blog": "/portal",
  "/artigos": "/portal",
  "/cursos": "/academy",
  "/downloads": "/materiais",
  "/sobre": "/quem-somos",
  "/quem-somos.html": "/quem-somos",
  "/index.html": "/",
};
