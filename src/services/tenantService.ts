import { supabase } from "@/integrations/supabase/client";
import type { Branding, Organization } from "@/lib/tenant/types";

/** Organizações e marca — nível plataforma (SíndicoLab). */
export const tenantService = {
  async listOrganizations(): Promise<Organization[]> {
    const { data } = await supabase.from("organizations").select("*").order("name");
    return (data ?? []) as unknown as Organization[];
  },
  async getBranding(organizationId: string): Promise<Branding | null> {
    const { data } = await supabase
      .from("organization_branding")
      .select("*")
      .eq("organization_id", organizationId)
      .maybeSingle();
    return (data as unknown as Branding) ?? null;
  },
  async listDomains() {
    const { data } = await supabase.from("organization_domains").select("*").order("hostname");
    return (data ?? []) as unknown as { id: string; hostname: string; is_primary: boolean; organization_id: string }[];
  },
};
