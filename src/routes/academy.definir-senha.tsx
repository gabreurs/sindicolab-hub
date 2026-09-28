import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { TenantLogo } from "@/components/academy/TenantLogo";
import { academyAuthService } from "@/services/academyAuthService";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/academy/definir-senha")({
  ssr: false,
  component: DefinirSenhaPage,
});

// Destino do link dos e-mails de convite e de recuperação:
// a pessoa chega já identificada pelo link e só escolhe a senha.
function DefinirSenhaPage() {
  const nav = useNavigate();
  const [ready, setReady] = useState<"wait" | "ok" | "expired">("wait");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState<"create" | "reset">("create");
  const [resendEmail, setResendEmail] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.slice(1));
    if (hash.get("type") === "recovery") setMode("reset");
    if (hash.get("error")) {
      setReady("expired");
      return;
    }
    const check = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setEmail(data.session.user.email ?? "");
        setReady("ok");
        return true;
      }
      return false;
    };
    const { data: sub } = supabase.auth.onAuthStateChange((ev, session) => {
      if ((ev as string) === "PASSWORD_RECOVERY") setMode("reset");
      if (session) {
        setEmail(session.user.email ?? "");
        setReady("ok");
      }
    });
    check();
    const t = setTimeout(async () => {
      if (!(await check())) setReady((r) => (r === "wait" ? "expired" : r));
    }, 4000);
    return () => {
      clearTimeout(t);
      sub.subscription.unsubscribe();
    };
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pw !== pw2) return toast.error("As senhas não conferem.");
    setBusy(true);
    try {
      const { data, error } = await (supabase.auth as any).updateUser({ password: pw });
      if (error) throw error;
      const { data: ms } = await supabase
        .from("organization_memberships")
        .select("role")
        .eq("user_id", data.user!.id)
        .eq("is_active", true);
      const roles = (ms ?? []).map((m: any) => m.role as string);
      const role = roles.includes("platform_admin")
        ? "platform_admin"
        : roles.includes("org_admin")
          ? "org_admin"
          : "student";
      toast.success("Senha definida. Bem-vindo!");
      nav({ to: academyAuthService.homeFor(role as any) as string });
    } catch (err: any) {
      toast.error(err.message ?? "Não foi possível salvar a senha.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="academy flex min-h-screen items-center justify-center p-6">
      <div className="ax-panel w-full max-w-md p-8">
        <Link to="/academy" aria-label="Voltar à página inicial da Academy">
          <TenantLogo />
        </Link>
        {ready === "wait" && <p className="ax-body mt-7">Confirmando seu link…</p>}
        {ready === "expired" && (
          <>
            <h1 className="ax-h2 mt-7">Link expirado</h1>
            <p className="ax-body mt-1.5 text-[14px]">
              Este link já foi usado ou venceu. Informe seu e-mail e enviamos um novo agora.
            </p>
            {sent ? (
              <p className="ax-body mt-6 text-[14px]">Pronto! Confira sua caixa de entrada.</p>
            ) : (
              <form
                className="mt-6 space-y-3"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setBusy(true);
                  const { error } = await (supabase.auth as any).resetPasswordForEmail(resendEmail.trim(), {
                    redirectTo: `${window.location.origin}/academy/definir-senha`,
                  });
                  setBusy(false);
                  if (error) toast.error(error.message);
                  else setSent(true);
                }}
              >
                <input type="email" required placeholder="Seu e-mail" value={resendEmail}
                  onChange={(e) => setResendEmail(e.target.value)} className="w-full px-4 py-3 text-[15px]" />
                <button disabled={busy} type="submit" className="ax-btn w-full" data-variant="primary">
                  {busy ? "…" : "Enviar novo link"}
                </button>
              </form>
            )}
          </>
        )}
        {ready === "ok" && (
          <>
            <h1 className="ax-h2 mt-7">{mode === "reset" ? "Redefina sua senha" : "Crie sua senha"}</h1>
            <p className="ax-body mt-1.5 text-[14px]">
              {email ? `Conta ${email}. ` : ""}{mode === "reset" ? "Escolha uma nova senha para entrar na Academy." : "Escolha uma senha para entrar na Academy."}
            </p>
            <form onSubmit={submit} className="mt-7 space-y-3">
              <input type="password" required minLength={6} placeholder="Senha (mín. 6 caracteres)"
                value={pw} onChange={(e) => setPw(e.target.value)} className="w-full px-4 py-3 text-[15px]" />
              <input type="password" required minLength={6} placeholder="Repita a senha"
                value={pw2} onChange={(e) => setPw2(e.target.value)} className="w-full px-4 py-3 text-[15px]" />
              <button disabled={busy} type="submit" className="ax-btn w-full" data-variant="primary" data-size="lg">
                {busy ? "…" : "Salvar senha e entrar"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
