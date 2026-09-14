import { useEffect, useRef, useState } from "react";
import { X, Users } from "lucide-react";
import { EXTERNAL_LINKS, whatsappRafaelUrl } from "@/config/external-links";

const TEASER_DISMISSED_KEY = "sindicolab.chatDock.teaserDismissed";

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.94.56 3.75 1.53 5.28L2 22l4.98-1.6a9.9 9.9 0 0 0 5.06 1.38c5.44 0 9.84-4.4 9.84-9.84C21.88 6.4 17.48 2 12.04 2Zm0 17.9c-1.6 0-3.1-.44-4.38-1.22l-.31-.19-2.95.95.96-2.87-.2-.32a7.98 7.98 0 0 1-1.24-4.27c0-4.44 3.62-8.06 8.12-8.06s8.06 3.62 8.06 8.06-3.62 8.06-8.06 8.06Zm4.5-5.9c-.24-.12-1.44-.71-1.67-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.03-.38-1.96-1.21-.72-.65-1.2-1.45-1.34-1.69-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.32-.74-1.8-.19-.47-.39-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.64 4.12 3.6 2.02.8 2.43.64 2.87.6.44-.04 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}

/**
 * Dock de conversa (referência: joinchat).
 * Um único botão. Primeiro uma chamada curta e animada; ao abrir, o painel
 * simula um papo — o Rafael "digita" e manda duas mensagens; só então
 * aparecem as duas ações, visualmente distintas: falar com ele (1:1) ou
 * entrar no grupo de conversas (coletivo).
 */
export function WhatsAppDock() {
  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [step, setStep] = useState(0); // 0 digitando · 1 primeira msg · 2 segunda msg · 3 ações
  const timers = useRef<number[]>([]);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(TEASER_DISMISSED_KEY) === "1";
    } catch {
      /* sessionStorage indisponível */
    }
    if (dismissed) return;
    const t = window.setTimeout(() => setTeaser(true), 4500);
    return () => window.clearTimeout(t);
  }, []);

  // Sequência do "papo" — cada etapa entra sozinha, como mensagem chegando.
  useEffect(() => {
    if (!open) return;
    setStep(0);
    const schedule = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms));
    schedule(() => setStep(1), 750);
    schedule(() => setStep(2), 1750);
    schedule(() => setStep(3), 2500);
    return () => {
      timers.current.forEach(window.clearTimeout);
      timers.current = [];
    };
  }, [open]);

  function dismissTeaser() {
    setTeaser(false);
    try {
      sessionStorage.setItem(TEASER_DISMISSED_KEY, "1");
    } catch {
      /* sessionStorage indisponível */
    }
  }

  function toggle() {
    dismissTeaser();
    setOpen((o) => !o);
  }

  return (
    <div
      className="fixed z-[60] flex flex-col items-end gap-3"
      style={{
        right: "max(1rem, env(safe-area-inset-right))",
        bottom: "max(1rem, env(safe-area-inset-bottom))",
      }}
    >
      {open && (
        <div
          role="dialog"
          aria-label="Conversar com o SíndicoLab"
          className="wa-panel w-[min(20.5rem,calc(100vw-2rem))] overflow-hidden rounded-[1.5rem] border border-border/70 bg-background shadow-[0_28px_70px_-30px_rgba(27,11,46,0.6)]"
        >
          {/* Cabeçalho do "chat" */}
          <div className="flex items-center gap-3 bg-ink px-4 py-3.5 text-background">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-background/15 font-display text-sm">
              RB
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">Rafael Bernardes</p>
              <p className="flex items-center gap-1.5 text-[11px] text-background/70">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
                SíndicoLab · normalmente responde rápido
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fechar conversa"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-background/70 transition hover:bg-background/15 hover:text-background"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Mensagens */}
          <div className="space-y-2 bg-secondary/50 px-4 py-4">
            {step === 0 && (
              <div className="wa-msg inline-flex items-center gap-1 rounded-2xl rounded-bl-md bg-background px-3.5 py-3 shadow-sm">
                <span className="wa-dot h-1.5 w-1.5 rounded-full bg-ink-soft/60" />
                <span className="wa-dot h-1.5 w-1.5 rounded-full bg-ink-soft/60" style={{ animationDelay: "0.16s" }} />
                <span className="wa-dot h-1.5 w-1.5 rounded-full bg-ink-soft/60" style={{ animationDelay: "0.32s" }} />
              </div>
            )}
            {step >= 1 && (
              <p className="wa-msg max-w-[15rem] rounded-2xl rounded-bl-md bg-background px-3.5 py-2.5 text-[13px] leading-snug text-ink shadow-sm">
                Oi! Aqui é o Rafael, do SíndicoLab 👋
              </p>
            )}
            {step >= 2 && (
              <p className="wa-msg max-w-[16.5rem] rounded-2xl rounded-bl-md bg-background px-3.5 py-2.5 text-[13px] leading-snug text-ink shadow-sm">
                Prefere falar comigo agora ou trocar ideia com outros síndicos no nosso grupo?
              </p>
            )}
          </div>

          {/* Ações — duas coisas diferentes, com pesos diferentes */}
          {step >= 3 && (
            <div className="wa-msg space-y-2 border-t border-border/70 bg-background px-4 py-4">
              <a
                href={whatsappRafaelUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-2xl bg-ink px-4 py-3 text-background transition hover:bg-brand"
              >
                <WhatsAppGlyph className="h-5 w-5 shrink-0" />
                <span className="min-w-0">
                  <span className="block text-sm font-medium">Falar com o Rafael</span>
                  <span className="block text-[11px] text-background/70">Conversa direta, só vocês dois</span>
                </span>
              </a>
              <a
                href={EXTERNAL_LINKS.WHATSAPP_GROUP}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-2xl border border-border px-4 py-3 text-ink transition hover:border-ink hover:bg-secondary"
              >
                <Users className="h-5 w-5 shrink-0 text-brand" />
                <span className="min-w-0">
                  <span className="block text-sm font-medium">Entrar no grupo de síndicos</span>
                  <span className="block text-[11px] text-ink-soft">Conversas entre colegas, no WhatsApp</span>
                </span>
              </a>
            </div>
          )}
        </div>
      )}

      {/* Chamada animada antes de abrir */}
      {teaser && !open && (
        <div className="wa-teaser flex items-center gap-1.5 rounded-2xl rounded-br-md border border-border/70 bg-background px-3.5 py-2.5 shadow-[0_18px_40px_-24px_rgba(27,11,46,0.55)]">
          <button type="button" onClick={toggle} className="text-[13px] font-medium leading-snug text-ink">
            Podemos ajudar?
          </button>
          <button
            type="button"
            onClick={dismissTeaser}
            aria-label="Fechar chamada"
            className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-ink-soft transition hover:bg-secondary hover:text-ink"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-label={open ? "Fechar conversa" : "Abrir conversa no WhatsApp"}
        className="group relative inline-flex min-h-[52px] items-center gap-2 rounded-full bg-ink pl-3 pr-4 text-background shadow-[0_16px_36px_-18px_rgba(27,11,46,0.85)] transition hover:opacity-95"
      >
        {!open && teaser && <span className="wa-ping absolute inset-0 rounded-full" aria-hidden />}
        <span className="relative grid h-9 w-9 place-items-center rounded-full bg-background/15">
          {open ? <X className="h-4 w-4" /> : <WhatsAppGlyph className="h-5 w-5" />}
        </span>
        <span className="relative text-sm font-medium">{open ? "Fechar" : "Fale conosco"}</span>
      </button>
    </div>
  );
}
