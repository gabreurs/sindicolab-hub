import { supabase } from "@/integrations/supabase/client";

/**
 * Acesso a identidade. Toda a aplicação passa por aqui ou pelo AuthProvider —
 * nunca por credenciais no código.
 */
export const authService = {
  async getSession() {
    const { data } = await supabase.auth.getSession();
    return data.session;
  },
  signIn(email: string, password: string) {
    return supabase.auth.signInWithPassword({ email, password });
  },
  signUp(email: string, password: string) {
    return supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/academy/inicio` },
    });
  },
  signOut() {
    return supabase.auth.signOut();
  },
  async listUsers() {
    const { data } = await supabase.from("profiles").select("*").order("full_name");
    return (data ?? []) as unknown as { id: string; email: string; full_name: string }[];
  },
  async listMemberships() {
    const { data } = await supabase.from("organization_memberships").select("*");
    return (data ?? []) as unknown as {
      id: string;
      organization_id: string;
      user_id: string;
      role: string;
      is_active: boolean;
    }[];
  },
};
