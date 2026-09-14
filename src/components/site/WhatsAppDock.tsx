import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { EXTERNAL_LINKS, whatsappRafaelUrl } from "@/config/external-links";

const INVITE_DISMISSED_KEY = "sindicolab.groupInvite.dismissed";

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.94.56 3.75 1.53 5.28L2 22l4.98-1.6a9.9 9.9 0 0 0 5.06 1.38c5.44 0 9.84-4.4 9.84-9.84C21.88 6.4 17.48 2 12.04 2Zm0 17.9c-1.6 0-3.1-.44-4.38-1.22l-.31-.19-2.95.95.96-2.87-.2-.32a7.98 7.98 0 0 1-1.24-4.27c0-4.44 3.62-8.06 8.12-8.06s8.06 3.62 8.06 8.06-3.62 8.06-8.06 8.06Zm4.5-5.9c-.24-.12-1.44-.71-1.67-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.03-.38-1.96-1.21-.72-.65-1.2-1.45-1.34-1.69-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.32-.74-1.8-.19-.47-.39-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.64 4.12 3.6 2.02.8 2.43.64 2.87.6.44-.04 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}

/**
 * Dock de contato: um único botão permanente (Rafael) e, acima dele, um
 * convite discreto para o grupo — que aparece depois de alguns segundos e
 * pode ser fechado pela sessão.
 */
export function WhatsAppDock() {
  const [showInvite, setShowInvite] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(INVITE_DISMISSED_KEY) === "1";
    } catch {
      /* sessionStorage indisponível */
    }
    if (dismissed) return;
    const t = window.setTimeout(() => setShowInvite(true), 6000);
    return () => window.clearTimeout(t);
  }, []);

  function dismissInvite() {
    setShowInvite(false);
    try {
      sessionStorage.setItem(INVITE_DISMISSED_KEY, "1");
    } catch {
      /* sessionStorage indisponível */
    }
  }

  return (
    <div
      className="fixed z-[60] flex flex-col items-end gap-2"
      style={{
        right: "max(1rem, env(safe-area-inset-right))",
        bottom: "max(1rem, env(safe-area-inset-bottom))",
      }}
    >
      {showInvite && (
        <div className="wa-invite flex max-w-[16rem] items-start gap-2 rounded-2xl border border-border/70 bg-background/95 p-3 shadow-[0_18px_40px_-24px_rgba(27,11,46,0.55)] backdrop-blur-sm sm:max-w-[18rem]">
          <div className="min-w-0">
            <p className="text-[13px] font-medium leading-snug text-ink">
              Grupo de apoio entre síndicas e síndicos
            </p>
            <a
              href={EXTERNAL_LINKS.WHATSAPP_GROUP}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1.5 inline-flex items-center gap-1.5 text-[13px] font-medium text-brand hover:underline"
            >
              Entrar no grupo
            </a>
          </div>
          <button
            type="button"
            onClick={dismissInvite}
            aria-label="Fechar convite do grupo"
            className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-ink-soft transition hover:bg-secondary hover:text-ink"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      <a
        href={whatsappRafaelUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale conosco no WhatsApp"
        className="group inline-flex min-h-[48px] items-center gap-2 rounded-full bg-ink pl-3 pr-4 text-background shadow-[0_16px_36px_-20px_rgba(27,11,46,0.8)] transition hover:opacity-95"
      >
        <span className="grid h-9 w-9 place-items-center rounded-full bg-background/15">
          <WhatsAppGlyph className="h-4.5 w-4.5" />
        </span>
        <span className="text-sm font-medium">Fale conosco</span>
      </a>
    </div>
  );
}
