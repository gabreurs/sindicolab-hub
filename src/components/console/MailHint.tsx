import type { ReactNode } from "react";
import { Mail } from "lucide-react";

// Nota discreta para a equipe da administradora (painel /empresa): lembra que o
// e-mail de acesso pode cair no spam/promoções do destinatário. Não é o aviso
// voltado ao aluno final (esse fica nas telas públicas da Academy).
export function MailHint({ children, className = "" }: { children?: ReactNode; className?: string }) {
  return (
    <p className={`text-xs c-muted flex items-start gap-2 ${className}`.trim()}>
      <Mail size={14} aria-hidden className="mt-0.5 flex-none" />
      <span>{children}</span>
    </p>
  );
}
