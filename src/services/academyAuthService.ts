/**
 * IDENTIDADE DA ACADEMY — arquitetura de adapters.
 *
 * `DemoAcademyAuthAdapter` reproduz os acessos de demonstração documentados no
 * repositório oficial da Academy (README): platform_admin, org_admin e student,
 * cada um com sua organização e papel. Serve APENAS para testar a plataforma
 * antes da conexão definitiva do banco — a sessão vive em memória/sessão do
 * navegador e nunca guarda cursos, usuários ou conteúdos.
 *
 * `SupabaseAcademyAuthAdapter` entra na etapa seguinte: mesma superfície,
 * validação real no banco. Trocar o adapter é a única alteração necessária.
 */
import { supabase } from "@/integrations/supabase/client";
import { DEMO_ACCOUNTS } from "./db/academyFixtures";
import { DEMO_ACCESS_ENABLED, DEMO_ACCESS_CLOSED_MESSAGE } from "@/lib/academy/demoAccess";

export type AcademyRole = "platform_admin" | "org_admin" | "student";

export type AcademyAuthAdapter = {
  readonly kind: "demo" | "supabase";
  signIn(email: string, password: string): Promise<{ error: { message: string } | null }>;
  signUp(email: string, password: string): Promise<{ error: { message: string } | null }>;
  signOut(): Promise<void>;
  /** Destino após o login, por papel. */
  homeFor(role: AcademyRole | null): string;
};

/** Contas de demonstração, na ordem em que aparecem na tela de login. */
export const demoAccounts = DEMO_ACCOUNTS;

const homeByRole: Record<AcademyRole, string> = {
  platform_admin: "/admin",
  org_admin: "/empresa",
  student: "/academy/inicio",
};

export const DemoAcademyAuthAdapter: AcademyAuthAdapter = {
  kind: "demo",
  async signIn(email, password) {
    // Site publicado sem acesso demo liberado: ninguém entra com conta de exemplo.
    if (!DEMO_ACCESS_ENABLED) return { error: { message: DEMO_ACCESS_CLOSED_MESSAGE } };
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error ?? null };
  },
  async signUp(email, password) {
    if (!DEMO_ACCESS_ENABLED) return { error: { message: DEMO_ACCESS_CLOSED_MESSAGE } };
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/academy/inicio` },
    });
    return { error: error ?? null };
  },
  async signOut() {
    await supabase.auth.signOut();
  },
  homeFor(role) {
    return role ? homeByRole[role] : "/academy/inicio";
  },
};

export const academyAuthService: AcademyAuthAdapter = DemoAcademyAuthAdapter;

/** Papel do acesso demo correspondente ao e-mail (usado para redirecionar). */
export function demoRoleFor(email: string): AcademyRole | null {
  return demoAccounts.find((a) => a.email === email.trim().toLowerCase())?.role ?? null;
}
