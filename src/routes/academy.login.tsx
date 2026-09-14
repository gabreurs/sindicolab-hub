import { createFileRoute, useNavigate, useSearch, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { TenantLogo } from "@/components/academy/TenantLogo";
import { academyAuthService, demoAccounts, demoRoleFor } from "@/services/academyAuthService";

export const Route = createFileRoute("/academy/login")({
  ssr: false,
  validateSearch: (s: Record<string, unknown>) => ({ next: typeof s.next === "string" ? s.next : "/academy/inicio" }),
  component: LoginPage,
});

function LoginPage() {
  const nav = useNavigate();
  const { next } = useSearch({ from: "/academy/login" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const { error } =
        mode === "login"
          ? await academyAuthService.signIn(email, password)
          : await academyAuthService.signUp(email, password);
      if (error) throw new Error(error.message);
      toast.success(mode === "login" ? "Bem-vindo!" : "Conta criada.");
      // Cada papel entra na sua superfície: plataforma, organização ou aluno.
      const role = demoRoleFor(email);
      const target = next && next !== "/academy/inicio" ? next : academyAuthService.homeFor(role);
      nav({ to: target as string });
    } catch (err: any) {
      toast.error(err.message ?? "Falha ao autenticar");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="academy flex min-h-screen items-center justify-center p-6">
      <div className="ax-panel w-full max-w-md p-8">
        <div className="flex items-center justify-between gap-4">
          <TenantLogo />
          <Link to="/" className="ax-meta hover:opacity-80">← Voltar</Link>
        </div>
        <h1 className="ax-h2 mt-7">{mode === "login" ? "Entrar na Academy" : "Criar sua conta"}</h1>
        <p className="ax-body mt-1.5 text-[14px]">
          {mode === "login" ? "Acesse seus cursos e continue de onde parou." : "Leva menos de um minuto."}
        </p>
        <form onSubmit={submit} className="mt-7 space-y-3">
          <input
            type="email"
            required
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 text-[15px]"
          />
          <input
            type="password"
            required
            minLength={6}
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 text-[15px]"
          />
          <button disabled={busy} type="submit" className="ax-btn w-full" data-variant="primary" data-size="lg">
            {busy ? "…" : mode === "login" ? "Entrar" : "Criar conta"}
          </button>
        </form>

        {mode === "login" && (
          <div className="ax-divider-block mt-7 rounded-[12px] p-4" style={{ background: "var(--ax-veil)" }}>
            <p className="ax-meta">Acessos de demonstração</p>
            <div className="mt-2.5 space-y-1.5">
              {demoAccounts.map((a) => (
                <button
                  key={a.email}
                  type="button"
                  onClick={() => {
                    setEmail(a.email);
                    setPassword(a.password);
                  }}
                  className="flex w-full flex-col items-start rounded-[9px] px-2.5 py-2 text-left transition hover:opacity-80"
                  style={{ background: "var(--ax-surface)" }}
                >
                  <span className="text-[13.5px] font-medium" style={{ color: "var(--ax-text)" }}>
                    {a.label} · {a.organization}
                  </span>
                  <span className="ax-meta">{a.email}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <button onClick={() => setMode(mode === "login" ? "signup" : "login")} className="ax-btn mt-5" data-variant="link">
          {mode === "login" ? "Não tem conta? Criar conta" : "Já tenho conta"}
        </button>
        <div>
          <Link to="/academy/solicitar-acesso" className="ax-btn" data-variant="link">
            Não tem acesso? Solicitar acesso
          </Link>
        </div>
      </div>
    </div>
  );
}
