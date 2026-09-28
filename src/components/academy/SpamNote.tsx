import { MailWarning } from "lucide-react";

// Aviso bem visível para conferir a caixa de spam — aparece sempre que
// um e-mail de acesso (convite, redefinição, aprovação) é enviado.
export function SpamNote({ className = "" }: { className?: string }) {
  return (
    <div className={`ax-spam-note ${className}`.trim()} role="status" aria-live="polite">
      <MailWarning size={18} aria-hidden />
      <p>
        <strong>Não chegou? Veja o spam.</strong> O e-mail de acesso costuma cair no spam ou na aba
        “Promoções” do Gmail. Procure pelo remetente da Academy e, se estiver lá, marque como
        “não é spam”. Ainda nada em alguns minutos? Confirme o e-mail com a administradora.
      </p>
    </div>
  );
}
