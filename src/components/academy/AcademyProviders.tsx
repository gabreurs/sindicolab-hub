import type { ReactNode } from "react";
import { Navigate } from "@tanstack/react-router";
import { ThemeProvider } from "@/lib/theme/ThemeProvider";
import { useAuth } from "@/lib/auth/AuthProvider";
import { TenantProvider } from "@/lib/tenant/TenantProvider";
import { Toaster } from "@/components/ui/sonner";

/**
 * Contexto das superfícies da Academy (pública, aluno, admin, empresa).
 * Fica escopado a estas rotas — o site institucional continua sem nenhum
 * provider extra, exatamente como antes.
 */
export function AcademyProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      {/* AuthProvider vive na raiz: o site inteiro precisa saber quem está
          logado para mostrar a área da pessoa e o botão "Sair". */}
      <TenantProvider>
        {children}
        <Toaster />
      </TenantProvider>
    </ThemeProvider>
  );
}

/** Bloqueia a área logada enquanto não houver sessão. */
export function RequireAuth({ children }: { children: ReactNode }) {
  const { loading, session } = useAuth();
  if (loading) {
    return (
      <div className="academy grid min-h-screen place-items-center">
        <span className="ax-meta">Carregando…</span>
      </div>
    );
  }
  if (!session) return <Navigate to="/academy/login" search={{ next: "/academy/inicio" }} replace />;
  return <>{children}</>;
}
