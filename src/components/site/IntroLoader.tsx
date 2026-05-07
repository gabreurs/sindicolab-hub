import { useEffect, useState } from "react";
import logoSrc from "@/assets/logo-sindicolab.svg";

/**
 * IntroLoader — abertura curta de marca (CSS-only):
 *   1) frase institucional aparece
 *   2) frase recua, logo + linha entram
 *   3) overlay desaparece com fade
 * Total ~2.4s. Skip em prefers-reduced-motion ou já visto na sessão.
 */
export function IntroLoader() {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("intro") === "1") {
      try { sessionStorage.removeItem("sl-intro-seen"); } catch {}
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try { seen = !!sessionStorage.getItem("sl-intro-seen"); } catch {}
    if (reduced || seen) return;
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const tExit = window.setTimeout(() => setExiting(true), 2000);
    const tEnd = window.setTimeout(() => {
      try { sessionStorage.setItem("sl-intro-seen", "1"); } catch {}
      setVisible(false);
    }, 2600);
    return () => { window.clearTimeout(tExit); window.clearTimeout(tEnd); };
  }, [visible]);

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
