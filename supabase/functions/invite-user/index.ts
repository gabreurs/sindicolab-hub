// Convite de acesso (individual, aprovação de pedido e importação de lista).
// Arquivo autossuficiente: pode ser colado direto no editor do painel do
// Supabase (Edge Functions → Via Editor) ou publicado pela CLI.
// A chave de serviço existe só aqui, no servidor — nunca no site.
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-api-version",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type Role = "platform_admin" | "org_admin" | "student";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const fail = (status: number, error: string, message: string) => json({ error, message }, status);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return fail(405, "method_not_allowed", "Método não permitido.");

  try {
    const url = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const siteUrl = (Deno.env.get("SITE_URL") ?? "").replace(/\/+$/, "");

    const authHeader = req.headers.get("Authorization") ?? "";
    if (!authHeader.startsWith("Bearer ")) return fail(401, "unauthorized", "Faça login para convidar.");
    const token = authHeader.slice(7).trim();

    const admin = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });

    // Quem está pedindo? (token validado pelo próprio Auth)
    const { data: me, error: meErr } = await admin.auth.getUser(token);
    if (meErr || !me?.user) return fail(401, "unauthorized", "Sessão inválida. Entre novamente.");

    let body: { organization_id?: string; email?: string; role?: Role };
    try {
      body = await req.json();
    } catch {
      return fail(400, "invalid_body", "Corpo inválido.");
    }

    const organizationId = String(body.organization_id ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const role: Role = body.role === "org_admin" || body.role === "platform_admin" ? body.role : "student";

    if (!organizationId || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return fail(400, "invalid_input", "Informe uma empresa e um e-mail válido.");
    }

    // Permissão: dono da plataforma ou administrador da própria empresa.
    const { data: myRoles } = await admin
      .from("organization_memberships")
      .select("organization_id, role")
      .eq("user_id", me.user.id)
      .eq("is_active", true);
    const isPlatform = (myRoles ?? []).some((m) => m.role === "platform_admin");
    const isOrgAdmin = (myRoles ?? []).some((m) => m.organization_id === organizationId && m.role === "org_admin");
    if (!isPlatform && !isOrgAdmin) {
      return fail(403, "forbidden", "Seu login não é administrador desta empresa.");
    }
    if (role === "platform_admin" && !isPlatform) {
      return fail(403, "forbidden", "Só o dono da plataforma pode criar outro dono.");
    }

    const { data: org } = await admin
      .from("organizations")
      .select("id, name, user_limit, status")
      .eq("id", organizationId)
      .maybeSingle();
    if (!org) return fail(404, "not_found", "Empresa não encontrada.");
    if (org.status && org.status !== "active") return fail(409, "org_suspended", "Empresa suspensa.");

    // Já existe alguém com esse e-mail?
    let existing: { id: string } | undefined;
    for (let page = 1; page <= 20 && !existing; page++) {
      const { data: list, error: listErr } = await admin.auth.admin.listUsers({ page, perPage: 1000 });
      if (listErr) break;
      existing = list.users.find((u) => (u.email ?? "").toLowerCase() === email);
      if (list.users.length < 1000) break;
    }

    if (existing) {
      const { data: already } = await admin
        .from("organization_memberships")
        .select("id")
        .eq("organization_id", organizationId)
        .eq("user_id", existing.id)
        .eq("role", role)
        .eq("is_active", true)
        .maybeSingle();
      if (already) return fail(409, "duplicated", `${email} já tem acesso (already).`);
    }

    // Limite de pessoas da empresa.
    if (org.user_limit) {
      const { count } = await admin
        .from("organization_memberships")
        .select("id", { count: "exact", head: true })
        .eq("organization_id", organizationId)
        .eq("is_active", true);
      if ((count ?? 0) >= org.user_limit) {
        return fail(409, "user_limit_reached", `Limite de ${org.user_limit} pessoas atingido nesta empresa.`);
      }
    }

    // Registra o convite (sem duplicar).
    const { error: invErr } = await admin
      .from("organization_invites")
      .upsert(
        { organization_id: organizationId, email, role, status: existing ? "accepted" : "pending" },
        { onConflict: "organization_id,email,role" },
      );
    if (invErr) return fail(500, "db_error", `Não foi possível registrar o convite: ${invErr.message}`);

    // O link do e-mail volta para o endereço de onde o convite saiu
    // (cada empresa no seu próprio domínio). SITE_URL é o reserva.
    const origin = (req.headers.get("origin") ?? "").replace(/\/+$/, "");
    const base = /^https:\/\//.test(origin) ? origin : siteUrl;
    const redirectTo = base ? `${base}/academy/definir-senha` : undefined;

    if (existing) {
      const { error: memErr } = await admin
        .from("organization_memberships")
        .upsert(
          { organization_id: organizationId, user_id: existing.id, role, is_active: true },
          { onConflict: "organization_id,user_id,role" },
        );
      if (memErr) return fail(500, "db_error", `Não foi possível liberar o acesso: ${memErr.message}`);
      // Conta já existia (ex.: pedido de acesso ou criada no painel): manda o link para criar a senha.
      const { error: rErr } = await admin.auth.resetPasswordForEmail(email, { redirectTo });
      return json({ ok: true, status: "vinculado", invited_by_email: !rErr, email_error: rErr?.message });
    }

    const { error } = await admin.auth.admin.inviteUserByEmail(email, {
      redirectTo,
      data: { organization_id: organizationId, role },
    });
    if (error) {
      const already = /already|registered|exists/i.test(error.message);
      return fail(already ? 409 : 400, already ? "duplicated" : "invite_failed", error.message);
    }

    return json({ ok: true, status: "convidado", invited_by_email: true });
  } catch (e) {
    return fail(500, "unexpected", e instanceof Error ? e.message : "Erro inesperado.");
  }
});
