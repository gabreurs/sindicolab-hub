import { supabase } from "@/integrations/supabase/client";
import type { PortalAuthor, PortalCategory, PortalPost } from "@/data/portal";
import { withPostCover } from "@/lib/course/covers";
import { extraPortalAuthors, extraPortalPosts } from "@/data/portalExtra";

export type CategoryInput = Omit<PortalCategory, "id"> & { id?: string };
export type AuthorInput = Omit<PortalAuthor, "id"> & { id?: string };
export type PostInput = Omit<PortalPost, "id" | "categories" | "authors"> & { id?: string };

async function categories(includeInactive = false) {
  const { data } = await supabase.from("portal_categories").select("*").order("sort_order");
  const rows = (data ?? []) as PortalCategory[];
  return includeInactive ? rows : rows.filter((item) => item.active);
}

async function authors(includeInactive = false) {
  const { data } = await supabase.from("portal_authors").select("*").order("sort_order");
  const base = (data ?? []) as PortalAuthor[];
  const rows = [...base, ...extraPortalAuthors.filter((x) => !base.some((b) => b.id === x.id || b.slug === x.slug))];
  return includeInactive ? rows : rows.filter((item) => item.active);
}

const norm = (v: unknown) =>
  String(v ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

/** Converte os blocos do editor de artigos (/admin) em HTML para o Portal. */
function articleBlocksToHtml(content: unknown): string {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";
  return content
    .map((block: { type?: string; text?: unknown; items?: unknown[] }) => {
      if (block?.type === "ul") {
        return `<ul>${(block.items ?? []).map((item) => `<li>${String(item)}</li>`).join("")}</ul>`;
      }
      const text = String(block?.text ?? "").trim();
      return text ? `<p>${text}</p>` : "";
    })
    .filter(Boolean)
    .join("");
}

/**
 * Artigos criados em /admin → Artigos vivem em `site_articles`; o Portal lê
 * `portal_posts`. Aqui os artigos publicados do painel entram no feed do
 * Portal, sem duplicar slugs já existentes.
 */
async function siteArticleRows(): Promise<Record<string, unknown>[]> {
  const { data } = await supabase
    .from("site_articles")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  const rows = (data ?? []) as Record<string, unknown>[];
  if (rows.length === 0) return [];
  const [cats, auths] = await Promise.all([categories(true), authors(true)]);
  return rows.map((a) => ({
    id: `sa-${a.id}`,
    title: a.title,
    slug: a.slug,
    excerpt: a.excerpt ?? "",
    content: articleBlocksToHtml(a.content),
    cover_image: a.cover_url ?? null,
    cover_alt: a.cover_alt ?? "",
    category_id: cats.find((c) => norm(c.name) === norm(a.category))?.id ?? null,
    author_id: auths.find((x) => norm(x.name) === norm(a.author))?.id ?? null,
    featured: false,
    published: true,
    published_at: a.published_at ?? null,
    view_count: 0,
    seo_title: a.seo_title ?? a.title,
    meta_description: a.meta_description ?? String(a.excerpt ?? "").slice(0, 155),
    social_image_url: a.social_image_url ?? a.cover_url ?? null,
  }));
}

async function hydrate(raw: Record<string, unknown>[]): Promise<PortalPost[]> {
  const [allCategories, allAuthors] = await Promise.all([categories(true), authors(true)]);
  return raw.map((row) => {
    const post = withPostCover(row as { slug?: string; cover_image?: string | null; social_image_url?: string | null });
    return {
      ...post,
      categories: allCategories.find((item) => item.id === (row as Record<string, unknown>).category_id) ?? null,
      authors: allAuthors.find((item) => item.id === (row as Record<string, unknown>).author_id) ?? null,
    };
  }) as unknown as PortalPost[];
}

export const portalService = {
  categories,
  authors,
  async posts(opts?: { includeDrafts?: boolean }) {
    const [{ data }, siteArticles] = await Promise.all([
      supabase.from("portal_posts").select("*").order("published_at", { ascending: false }),
      siteArticleRows(),
    ]);
    const base = (data ?? []) as Record<string, unknown>[];
    const seen = new Set(base.map((b) => String(b.slug ?? "")));
    const extras = [
      ...extraPortalPosts.filter((x) => !base.some((b) => b.id === x.id || b.slug === x.slug)),
      ...siteArticles.filter((x) => !seen.has(String(x.slug ?? ""))),
    ];
    const merged = [...base, ...extras]
      .sort((a, b) => String(b.published_at ?? "").localeCompare(String(a.published_at ?? "")));
    const hydrated = await hydrate(merged);
    const now = Date.now();
    return opts?.includeDrafts ? hydrated : hydrated.filter((post) => post.published && (!post.published_at || new Date(post.published_at).getTime() <= now));
  },
  async postBySlug(slug: string) { return (await this.posts()).find((post) => post.slug === slug) ?? null; },
  async postsByCategory(slug: string) { return (await this.posts()).filter((post) => post.categories?.slug === slug); },
  async columnistBySlug(slug: string) {
    const author = (await authors()).find((item) => item.slug === slug && item.is_columnist) ?? null;
    return author ? { author, posts: (await this.posts()).filter((post) => post.author_id === author.id) } : null;
  },
  async incrementViews(id: string) {
    const post = (await this.posts({ includeDrafts: true })).find((item) => item.id === id);
    if (post && !post.id.startsWith("sa-")) await supabase.from("portal_posts").update({ view_count: post.view_count + 1 }).eq("id", id);
  },
  async createPost(input: Record<string, unknown>) { const { data, error } = await supabase.from("portal_posts").insert(input).select("*").maybeSingle(); if (error) throw new Error(error.message); return data; },
  async updatePost(id: string, input: Record<string, unknown>) { const { error } = await supabase.from("portal_posts").update(input).eq("id", id); if (error) throw new Error(error.message); },
  async removePost(id: string) { const { error } = await supabase.from("portal_posts").delete().eq("id", id); if (error) throw new Error(error.message); },
  async createCategory(input: Record<string, unknown>) { const { error } = await supabase.from("portal_categories").insert(input); if (error) throw new Error(error.message); },
  async updateCategory(id: string, input: Record<string, unknown>) { const { error } = await supabase.from("portal_categories").update(input).eq("id", id); if (error) throw new Error(error.message); },
  async removeCategory(id: string) { const { error } = await supabase.from("portal_categories").delete().eq("id", id); if (error) throw new Error(error.message); },
  async createAuthor(input: Record<string, unknown>) { const { error } = await supabase.from("portal_authors").insert(input); if (error) throw new Error(error.message); },
  async updateAuthor(id: string, input: Record<string, unknown>) { const { error } = await supabase.from("portal_authors").update(input).eq("id", id); if (error) throw new Error(error.message); },
  async removeAuthor(id: string) { const { error } = await supabase.from("portal_authors").delete().eq("id", id); if (error) throw new Error(error.message); },
};
