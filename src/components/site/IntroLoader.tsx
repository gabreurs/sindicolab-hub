import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import logoSrc from "@/assets/logo-sindicolab.svg";

/**
 * IntroLoader — abertura curta de marca com hierarquia:
 *   1) frase institucional aparece com reveal por máscara + blur
 *   2) frase recua, logo entra com presença (scale + blur out)
 *   3) overlay sai com clip-path vertical revelando a home
 * Duração total: ~2.4s. Pula para usuários com prefers-reduced-motion
 * ou quando já vista na sessão (?intro=1 força reexecução).
 */
export function IntroLoader() {
  const [mounted, setMounted] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const phraseRef = useRef<HTMLDivElement>(null);
  const logoWrapRef = useRef<HTMLDivElement>(null);

  // decide se mostra antes do paint (evita flash)
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("intro") === "1") {
      try { sessionStorage.removeItem("sl-intro-seen"); } catch {}
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try { seen = !!sessionStorage.getItem("sl-intro-seen"); } catch {}
    if (reduced || seen) setMounted(false);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = rootRef.current;
    const phrase = phraseRef.current;
    const logoWrap = logoWrapRef.current;
    if (!root || !phrase || !logoWrap) return;

    const ctx = gsap.context(() => {
      gsap.set(phrase, { opacity: 0, filter: "blur(10px)", y: 8 });
      gsap.set(logoWrap, { opacity: 0, scale: 0.94, filter: "blur(6px)" });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          try { sessionStorage.setItem("sl-intro-seen", "1"); } catch {}
          setMounted(false);
        },
      });

      // 1) frase entra
      tl.to(phrase, { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.7 }, 0.05)
        // 2) frase recua, logo entra
        .to(phrase, { opacity: 0, y: -10, filter: "blur(6px)", duration: 0.45, ease: "power2.in" }, 1.05)
        .to(logoWrap, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.7 }, 1.1)
        // 3) overlay sai (reveal vertical)
        .to(root, {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 0.55,
          ease: "power3.inOut",
        }, 2.0);
    }, root);

    // fallback duro
    const fallback = window.setTimeout(() => setMounted(false), 3200);
    return () => { ctx.revert(); window.clearTimeout(fallback); };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div ref={rootRef} className="intro-loader" aria-hidden style={{ clipPath: "inset(0 0 0 0)" }}>
      <span className="intro-bg-light intro-bg-light-a" />
      <span className="intro-bg-light intro-bg-light-b" />
      <span className="intro-bg-light intro-bg-light-c" />

      <div className="intro-stage">
        <div ref={phraseRef} className="intro-phrase">
          <span>O maior coletivo de</span>
          <span className="intro-phrase-accent">síndicos profissionais</span>
          <span>do Brasil</span>
        </div>

        <div ref={logoWrapRef} className="intro-logo-wrap">
          <img src={logoSrc} alt="SíndicoLab" className="intro-logo" draggable={false} />
          <span className="intro-line" />
        </div>
      </div>
    </div>
  );
}
