import { supabase } from "@/integrations/supabase/client";
import type { ArticleBlock } from "@/data/articles";

export type ArticleStatus = "published" | "draft";

export type SiteArticle = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: ArticleBlock[];
  cover_url: string;
  cover_alt: string;
  category: string;
  author: string;
  read_time: string;
  status: ArticleStatus;
  seo_title: string;
  meta_description: string;
  social_image_url: string | null;
  published_at: string;
};

export type SiteArticleInput = Omit<SiteArticle, "id"> & { id?: string };

const TABLE = "site_articles";

export const articlesService = {
  async list(opts?: { includeDrafts?: boolean }): Promise<SiteArticle[]> {
    const { data } = await supabase.from(TABLE).select("*").order("published_at", { ascending: false });
    const rows = (data ?? []) as unknown as SiteArticle[];
    return opts?.includeDrafts ? rows : rows.filter((a) => a.status === "published");
  },

  async getBySlug(slug: string): Promise<SiteArticle | null> {
    const { data } = await supabase.from(TABLE).select("*").eq("slug", slug).maybeSingle();
    return (data as unknown as SiteArticle) ?? null;
  },

  async create(input: SiteArticleInput) {
    const { data, error } = await supabase.from(TABLE).insert(input).select("*").maybeSingle();
    if (error) throw new Error(error.message);
    return data as unknown as SiteArticle;
  },

  async update(id: string, patch: Partial<SiteArticleInput>) {
    const { error } = await supabase.from(TABLE).update(patch).eq("id", id);
    if (error) throw new Error(error.message);
  },

  async remove(id: string) {
    const { error } = await supabase.from(TABLE).delete().eq("id", id);
    if (error) throw new Error(error.message);
  },
};
