import { supabase } from "@/integrations/supabase/client";

export type MaterialStatus = "published" | "draft";

export type Material = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  type: string;
  cover_url: string | null;
  file_url: string;
  cta_label: string;
  status: MaterialStatus;
  is_featured: boolean;
  published_at: string;
};

export type MaterialInput = Omit<Material, "id"> & { id?: string };

const TABLE = "site_materials";

export const materialsService = {
  async list(opts?: { includeDrafts?: boolean }): Promise<Material[]> {
    const { data } = await supabase.from(TABLE).select("*").order("published_at", { ascending: false });
    const rows = ((data ?? []) as unknown as Material[]);
    return opts?.includeDrafts ? rows : rows.filter((m) => m.status === "published");
  },

  async getBySlug(slug: string): Promise<Material | null> {
    const { data } = await supabase.from(TABLE).select("*").eq("slug", slug).maybeSingle();
    return (data as unknown as Material) ?? null;
  },

  async create(input: MaterialInput) {
    const { data, error } = await supabase.from(TABLE).insert(input).select("*").maybeSingle();
    if (error) throw new Error(error.message);
    return data as unknown as Material;
  },

  async update(id: string, patch: Partial<MaterialInput>) {
    const { error } = await supabase.from(TABLE).update(patch).eq("id", id);
    if (error) throw new Error(error.message);
  },

  async remove(id: string) {
    const { error } = await supabase.from(TABLE).delete().eq("id", id);
    if (error) throw new Error(error.message);
  },
};
