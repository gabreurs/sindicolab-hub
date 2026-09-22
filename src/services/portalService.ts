import { supabase } from "@/integrations/supabase/client";
import type { PortalAuthor, PortalCategory, PortalPost } from "@/data/portal";
import { withPostCover } from "@/lib/course/covers";

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
  const rows = (data ?? []) as PortalAuthor[];
  return includeInactive ? rows : rows.filter((item) => item.active);
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
    const { data } = await supabase.from("portal_posts").select("*").order("published_at", { ascending: false });
    const hydrated = await hydrate((data ?? []) as Record<string, unknown>[]);
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
    if (post) await supabase.from("portal_posts").update({ view_count: post.view_count + 1 }).eq("id", id);
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
