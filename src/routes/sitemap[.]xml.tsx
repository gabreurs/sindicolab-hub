import { createFileRoute } from "@tanstack/react-router";
import { articles } from "@/data/articles";
import { SITE_URL, STATIC_ROUTES } from "@/lib/site";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const today = new Date().toISOString().slice(0, 10);
        const urls = [
          ...STATIC_ROUTES.map(
            (r) =>
              `<url><loc>${SITE_URL}${r.path}</loc><lastmod>${today}</lastmod><changefreq>${r.changefreq ?? "weekly"}</changefreq><priority>${r.priority ?? 0.7}</priority></url>`,
          ),
          ...articles.map(
            (a) =>
              `<url><loc>${SITE_URL}/portal/${a.slug}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`,
          ),
        ];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
