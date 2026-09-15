/**
 * Estado da sessão no site institucional.
 *
 * Quando existe alguém logado (aluno, empresa ou administração), o site inteiro
 * passa a mostrar o atalho para a área da pessoa e o botão "Sair". Sem sessão,
 * nada é renderizado — o header segue exatamente como era.
 */
import { Link } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthProvider";

export function SessionMenu({ dark = false }: { dark?: boolean }) {
  const { session, isPlatformAdmin, isOrgAdmin, signOut, loading } = useAuth();
  if (loading || !session) return null;

  const home = isPlatformAdmin ? "/admin" : isOrgAdmin() ? "/empresa" : "/academy/inicio";
  const label = isPlatformAdmin ? "Plataforma" : isOrgAdmin() ? "Empresa" : "Meus cursos";

  const base =
    "header-control inline-flex items-center justify-center shrink-0 text-sm transition whitespace-nowrap";
  const soft = "header-action-white";

  return (
    <div className="site-session-actions flex items-center flex-none shrink-0">
      <Link to={home} className={`${base} ${soft} hidden sm:inline-flex px-4`}>
        {label}
      </Link>
      <button
        type="button"
        onClick={() => void signOut()}
        aria-label="Sair da conta"
        title="Sair"
        className={`${base} ${soft} min-w-[44px] gap-2 px-3 sm:px-4`}
      >
        <LogOut className="w-4 h-4" />
        <span className="hidden md:inline">Sair</span>
      </button>
    </div>
  );
}
