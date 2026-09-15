import { useEffect, useRef, useState } from "react";

/**
 * IntroLoader — abertura de marca SíndicoLab (GSAP).
 *
 * Conceito: módulos do símbolo do SíndicoLab se conectam num hub central,
 * o wordmark "SíndicoLab" entra por clip-path com destaque ciano em "Lab",
 * e a frase institucional sustenta o fechamento. Total ≤ 2.2s.
 *
 * Regras:
 *  - `?intro=1` força execução, ignorando storage.
 *  - localStorage `sl-intro-ts` controla cooldown (24h).
 *  - prefers-reduced-motion → logo estático por 800ms e sai.
 *  - Hard timeout: se GSAP não inicializar em 300ms ou animação passar de
 *    2200ms, sai imediatamente. Nunca bloqueia a home.
 *  - `window.__sindicoLabReplayIntro()` reexecuta sob demanda.
 */

const STORAGE_KEY = "sl-intro-ts";
const COOLDOWN_MS = 24 * 60 * 60 * 1000;
const MAX_DURATION = 2200;
const INIT_TIMEOUT = 300;
const REDUCED_DURATION = 800;

declare global {
  interface Window {
    __sindicoLabReplayIntro?: () => void;
  }
}

export function IntroLoader() {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  // Decisão de exibir
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const params = new URLSearchParams(window.location.search);
      const force = params.get("intro") === "1";
      let last = 0;
      try {
        last = parseInt(window.localStorage.getItem(STORAGE_KEY) || "0", 10) || 0;
      } catch {}
      const fresh = Date.now() - last < COOLDOWN_MS;
      if (fresh && !force) return;
      setVisible(true);
    } catch {
      setVisible(false);
    }
  }, []);

  // Replay global
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

  // Animação
  useEffect(() => {
    if (!visible) return;
    const root = rootRef.current;
    if (!root) return;

    const finish = (delay = 0) => {
      window.setTimeout(() => {
        try { window.localStorage.setItem(STORAGE_KEY, String(Date.now())); } catch {}
        setExiting(true);
        window.setTimeout(() => setVisible(false), 420);
      }, delay);
    };

    let reduced = false;
    try { reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch {}

    if (reduced) {
      finish(REDUCED_DURATION);
      return;
    }

    // Hard cap absoluto
    const hardCap = window.setTimeout(() => finish(0), MAX_DURATION + 200);

    let cleanup: (() => void) | null = null;
    let initialized = false;

    // Se GSAP não rodar em 300ms, pula intro
    const initFailsafe = window.setTimeout(() => {
      if (!initialized) finish(0);
    }, INIT_TIMEOUT);

    (async () => {
      try {
        const { gsap } = await import("gsap");
        if (!root.isConnected) return;
        initialized = true;
        window.clearTimeout(initFailsafe);

        const ctx = gsap.context(() => {
          const modules = root.querySelectorAll<SVGElement>(".intro-mod");
          const wordmark = root.querySelector(".intro-wordmark-mask");
          const phrase = root.querySelector(".intro-phrase-2");
          const labGlow = root.querySelector(".intro-lab-glow");

          gsap.set(modules, { opacity: 0, scale: 0.6, rotate: -8, filter: "blur(8px)", transformOrigin: "50% 50%" });
          gsap.set(wordmark, { clipPath: "inset(0 100% 0 0)" });
          gsap.set(phrase, { opacity: 0, y: 8 });
          gsap.set(labGlow, { opacity: 0 });

          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

          tl.to(modules, {
            opacity: 1,
            scale: 1,
            rotate: 0,
            filter: "blur(0px)",
            duration: 0.7,
            stagger: { each: 0.07, from: "random" },
          })
            .to(wordmark, { clipPath: "inset(0 0% 0 0)", duration: 0.7, ease: "power4.out" }, "-=0.25")
            .to(labGlow, { opacity: 1, duration: 0.35, ease: "sine.out" }, "-=0.4")
            .to(phrase, { opacity: 1, y: 0, duration: 0.45 }, "-=0.35")
            .to({}, { duration: 0.25 })
            .add(() => finish(0));
        }, root);

        cleanup = () => ctx.revert();
      } catch {
        // Falha ao carregar GSAP → sai
        finish(0);
      }
    })();

    return () => {
      window.clearTimeout(hardCap);
      window.clearTimeout(initFailsafe);
      if (cleanup) cleanup();
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={rootRef}
      className={`intro-root${exiting ? " is-exiting" : ""}`}
      aria-hidden
    >
      <div className="intro-bg" />
      <div className="intro-dots" aria-hidden>
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} style={{ left: `${(i * 53) % 100}%`, top: `${(i * 37) % 100}%`, animationDelay: `${(i % 6) * 0.6}s` }} />
        ))}
      </div>

      <div className="intro-content">
        {/* Símbolo modular */}
        <svg
          className="intro-symbol"
          viewBox="0 0 46 49"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          {/* 5 módulos do símbolo SíndicoLab — centralizados no hub */}
          <path className="intro-mod" d="M29.0818 15.661H14.5567V30.2308H14.5357C6.50791 30.215 0 23.6992 0 15.6636C0 7.62797 6.52369 1.09375 14.5672 1.09375C22.6107 1.09375 29.0818 7.61482 29.0818 15.661Z" fill="#F7FAFF"/>
          <path className="intro-mod" d="M27.9832 17.2402C28.5785 17.2402 29.0611 17.7228 29.0611 18.3181V29.1136C29.0611 29.7074 28.5808 30.1894 27.987 30.1914L17.211 30.2286C16.6142 30.2307 16.1294 29.7475 16.1294 29.1508V18.3181C16.1294 17.7228 16.612 17.2402 17.2072 17.2402H27.9832Z" fill="#20C7F5"/>
          <path className="intro-mod" d="M45.2027 31.9783C45.2027 40.0244 38.6816 46.5481 30.6355 46.5481C22.5893 46.5481 16.1104 39.8614 16.1104 31.8152H23.0916L30.6355 31.7679V23.7428L30.6565 17.248C38.6869 17.2638 45.2027 23.9453 45.2027 31.9809V31.9783Z" fill="#F7FAFF"/>
          <path className="intro-mod" d="M29.2508 48.0005H16.5164C7.59198 48.0005 0.355713 40.7642 0.355713 31.8398H14.589C14.589 40.4592 21.2126 48.0005 29.2508 48.0005Z" fill="#F7FAFF"/>
          <path className="intro-mod" d="M16.3674 0H28.8232C37.461 0 44.4632 7.00225 44.4632 15.64H30.6244C30.6244 6.84711 24.5687 0 16.3674 0Z" fill="#F7FAFF"/>
        </svg>

        {/* Wordmark com máscara horizontal */}
        <div className="intro-wordmark">
          <div className="intro-wordmark-mask">
            <span className="intro-wordmark-sindico">Síndico</span>
            <span className="intro-wordmark-lab">Lab</span>
          </div>
          <span className="intro-lab-glow" aria-hidden />
        </div>

        <p className="intro-phrase-2">O maior coletivo de síndicos profissionais do Brasil</p>
      </div>
    </div>
  );
}
