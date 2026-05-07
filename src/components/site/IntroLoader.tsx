import { useEffect, useState } from "react";
import logoSrc from "@/assets/logo-sindicolab.svg";

/**
 * IntroLoader — abertura curta de marca (CSS-only, ~2.4s).
 *
 * Regras de exibição:
 *  - `?intro=1` na URL força execução, ignorando storage.
 *  - localStorage `sl-intro-ts` guarda o último timestamp em ms.
 *  - Cooldown configurável via `INTRO_COOLDOWN_MS` (default: 24h).
 *  - `prefers-reduced-motion` pula a intro.
 *  - Qualquer erro no fluxo é silenciado: a home segue renderizando.
 *
 * Replay programático:
 *  - `window.__sindicoLabReplayIntro()` limpa o gate e reexecuta.
 */

const STORAGE_KEY = "sl-intro-ts";
const INTRO_COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24h

declare global {
  interface Window {
    __sindicoLabReplayIntro?: () => void;
  }
}

export function IntroLoader() {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  // Decisão de exibir — protegida contra qualquer falha de storage/matchMedia.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const params = new URLSearchParams(window.location.search);
      const force = params.get("intro") === "1";

      let reduced = false;
      try {
        reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      } catch {}
      if (reduced && !force) return;

      let last = 0;
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        last = raw ? parseInt(raw, 10) || 0 : 0;
      } catch {}

      const fresh = Date.now() - last < INTRO_COOLDOWN_MS;
      if (fresh && !force) return;

      setVisible(true);
    } catch {
      // Falha geral — não bloqueia a home.
      setVisible(false);
    }
  }, []);

  // Timeline de saída.
  useEffect(() => {
    if (!visible) return;
    const tExit = window.setTimeout(() => setExiting(true), 2000);
    const tEnd = window.setTimeout(() => {
      try {
        window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
      } catch {}
      setVisible(false);
    }, 2600);
    return () => {
      window.clearTimeout(tExit);
      window.clearTimeout(tEnd);
    };
  }, [visible]);

  // Expõe replay global (botão discreto chama essa fn).
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.__sindicoLabReplayIntro = () => {
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {}
      setExiting(false);
      setVisible(true);
    };
    return () => {
      delete window.__sindicoLabReplayIntro;
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`intro-loader${exiting ? " intro-loader-exit" : ""}`} aria-hidden>
      <span className="intro-bg-light intro-bg-light-a" />
      <span className="intro-bg-light intro-bg-light-b" />
      <span className="intro-bg-light intro-bg-light-c" />

      <div className="intro-stage">
        <div className="intro-phrase">
          <span>O maior coletivo de</span>
          <span className="intro-phrase-accent">síndicos profissionais</span>
          <span>do Brasil</span>
        </div>

        <div className="intro-logo-wrap">
          <img src={logoSrc} alt="SíndicoLab" className="intro-logo" draggable={false} />
          <span className="intro-line" />
        </div>
      </div>
    </div>
  );
}
