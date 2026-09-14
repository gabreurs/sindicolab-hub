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
    "inline-flex items-center justify-center min-h-[44px] shrink-0 rounded-full text-sm transition whitespace-nowrap";
  const soft = dark
    ? "bg-white/10 text-white hover:bg-white/20"
    : "bg-secondary text-ink-soft hover:bg-accent hover:text-ink";

  return (
    <div className="flex items-center gap-2 flex-none shrink-0">
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
