import { supabase } from "@/integrations/supabase/client";

export type EventFormat = "presencial" | "online";
export type EventStatus = "published" | "draft";

export type SiteEvent = {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  content: string;
  cover_url: string | null;
  /** ISO — data/hora de início */
  starts_at: string;
  /** rótulo de horário exibido ("14h às 18h") */
  time_label: string | null;
  /** ISO — encerramento */
  ends_at: string | null;
  location: string | null;
  format: EventFormat;
  city: string | null;
  external_url: string | null;
  sympla_url: string | null;
  status: EventStatus;
  is_featured: boolean;
};

export type SiteEventInput = Omit<SiteEvent, "id"> & { id?: string };

const TABLE = "site_events";

function isPast(ev: SiteEvent) {
  const ref = ev.ends_at ?? ev.starts_at;
  return new Date(ref).getTime() < Date.now();
}

export const eventsService = {
  async list(opts?: { includeDrafts?: boolean }): Promise<SiteEvent[]> {
    const { data } = await supabase.from(TABLE).select("*").order("starts_at", { ascending: true });
    const rows = (data ?? []) as unknown as SiteEvent[];
    return opts?.includeDrafts ? rows : rows.filter((e) => e.status === "published");
  },

  /** Próximos primeiro (crescente) e realizados depois (mais recente primeiro). */
  async listSplit() {
    const all = await eventsService.list();
    const upcoming = all.filter((e) => !isPast(e));
    const past = all.filter(isPast).sort((a, b) => b.starts_at.localeCompare(a.starts_at));
    return { upcoming, past };
  },

  async getBySlug(slug: string): Promise<SiteEvent | null> {
    const { data } = await supabase.from(TABLE).select("*").eq("slug", slug).maybeSingle();
    return (data as unknown as SiteEvent) ?? null;
  },

  isPast,

  async create(input: SiteEventInput) {
    const { data, error } = await supabase.from(TABLE).insert(input).select("*").maybeSingle();
    if (error) throw new Error(error.message);
    return data as unknown as SiteEvent;
  },

  async update(id: string, patch: Partial<SiteEventInput>) {
    const { error } = await supabase.from(TABLE).update(patch).eq("id", id);
    if (error) throw new Error(error.message);
  },

  async remove(id: string) {
    const { error } = await supabase.from(TABLE).delete().eq("id", id);
    if (error) throw new Error(error.message);
  },
};
