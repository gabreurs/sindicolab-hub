import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import logoSrc from "@/assets/logo-sindicolab.svg";

/**
 * IntroLoader — abertura curta de marca:
 *   1) frase institucional aparece (CSS keyframes)
 *   2) frase recua, logo + linha entram (CSS keyframes encadeados via delay)
 *   3) overlay sai com clip-path vertical (GSAP)
 * Total ~2.4s. Skip em prefers-reduced-motion ou já visto na sessão.
 * Use ?intro=1 para forçar reexecução.
 */
export function IntroLoader() {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // decide se vai mostrar (após mount no client)
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

  // sequência: marca seen, prepara exit, desmonta
  useEffect(() => {
    if (!visible) return;
    const tExit = window.setTimeout(() => setExiting(true), 1900);
    const tEnd = window.setTimeout(() => {
      try { sessionStorage.setItem("sl-intro-seen", "1"); } catch {}
      setVisible(false);
    }, 2500);
    const fallback = window.setTimeout(() => setVisible(false), 3500);
    return () => {
      window.clearTimeout(tExit);
      window.clearTimeout(tEnd);
      window.clearTimeout(fallback);
    };
  }, [visible]);

  // exit reveal com GSAP (clip-path vertical)
  useEffect(() => {
    if (!exiting || !rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(rootRef.current, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.55,
        ease: "power3.inOut",
      });
    }, rootRef);
    return () => { ctx.revert(); };
  }, [exiting]);

  if (!visible) return null;

  return (
    <div ref={rootRef} className="intro-loader" aria-hidden>
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
