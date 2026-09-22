// Convite de acesso. É a única peça que usa a chave de serviço — e ela fica
// somente aqui, no servidor, nunca no site.
//
// Publicação (na sua máquina, com a CLI do Supabase):
//   supabase functions deploy invite-user --project-ref SEU_PROJECT_REF
import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

type Role = "platform_admin" | "org_admin" | "student";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Método não permitido." }, 405);

  const url = Deno.env.get("SUPABASE_URL")!;
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const siteUrl = Deno.env.get("SITE_URL") ?? "";

  const authHeader = req.headers.get("Authorization") ?? "";
  if (!authHeader.startsWith("Bearer ")) return json({ error: "Faça login para convidar." }, 401);

  // Quem está pedindo?
  const asUser = createClient(url, anonKey, { global: { headers: { Authorization: authHeader } } });
  const { data: me } = await asUser.auth.getUser();
  if (!me?.user) return json({ error: "Sessão inválida." }, 401);

  let body: { organization_id?: string; email?: string; role?: Role };
  try {
    body = await req.json();
  } catch {
    return json({ error: "Corpo inválido." }, 400);
  }

  const organizationId = String(body.organization_id ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const role: Role = body.role === "org_admin" || body.role === "platform_admin" ? body.role : "student";

  if (!organizationId || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return json({ error: "Informe uma empresa e um e-mail válido." }, 400);
  }

  const admin = createClient(url, serviceKey, { auth: { persistSession: false } });

  // Permissão: administrador da plataforma ou da própria empresa.
  const [{ data: isPlatform }, { data: membership }] = await Promise.all([
    asUser.rpc("is_platform_admin", { _user_id: me.user.id }),
    admin
      .from("organization_memberships")
      .select("role")
      .eq("organization_id", organizationId)
      .eq("user_id", me.user.id)
      .eq("is_active", true)
      .eq("role", "org_admin")
      .maybeSingle(),
  ]);
  if (!isPlatform && !membership) return json({ error: "Sem permissão para convidar nesta empresa." }, 403);

  // Limite de usuários da empresa.
  const { data: org } = await admin
    .from("organizations")
    .select("id, name, user_limit, status")
    .eq("id", organizationId)
    .maybeSingle();
  if (!org) return json({ error: "Empresa não encontrada." }, 404);
  if (org.status !== "active") return json({ error: "Empresa suspensa." }, 409);

  if (org.user_limit) {
    const { count } = await admin
      .from("organization_memberships")
      .select("id", { count: "exact", head: true })
      .eq("organization_id", organizationId)
      .eq("is_active", true);
    if ((count ?? 0) >= org.user_limit) {
      return json({ error: `Limite de ${org.user_limit} pessoas atingido nesta empresa.` }, 409);
    }
  }

  // Convite registrado (idempotente).
  await admin
    .from("organization_invites")
    .upsert(
      { organization_id: organizationId, email, role, status: "pending" },
      { onConflict: "organization_id,email,role" },
    );

  // Usuário já existe? Basta criar o vínculo.
  const { data: list } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
  const existing = list?.users?.find((u) => (u.email ?? "").toLowerCase() === email);

  if (existing) {
    await admin
      .from("organization_memberships")
      .upsert(
        { organization_id: organizationId, user_id: existing.id, role, is_active: true },
        { onConflict: "organization_id,user_id,role" },
      );
    await admin.from("organization_invites").update({ status: "accepted" }).eq("organization_id", organizationId).eq("email", email);
    return json({ ok: true, status: "vinculado" });
  }

  const { error } = await admin.auth.admin.inviteUserByEmail(email, {
    redirectTo: siteUrl ? `${siteUrl}/academy/login` : undefined,
    data: { organization_id: organizationId, role },
  });
  if (error) return json({ error: error.message }, 400);

  return json({ ok: true, status: "convidado" });
});
