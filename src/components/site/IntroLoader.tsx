import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import logoSrc from "@/assets/logo-sindicolab.svg";

/**
 * IntroLoader — abertura curta de marca:
 * - background azul profundo com luzes em drift contínuo (CSS keyframes);
 * - logo real do SíndicoLab + linha cyan revelada;
 * - duração total ~2s, fallback de 2.8s;
 * - skip se prefers-reduced-motion ou já visto na sessão (limpa via ?intro=1).
 */
export function IntroLoader() {
  const [show, setShow] = useState(true);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // ?intro=1 força nova execução (útil em preview/dev)
    const params = new URLSearchParams(window.location.search);
    if (params.get("intro") === "1") {
      try { sessionStorage.removeItem("sl-intro-seen"); } catch {}
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || sessionStorage.getItem("sl-intro-seen")) {
      setShow(false);
      return;
    }

    // timeline: revela (handled via framer-motion) → começa saída em 1.55s → desmonta em 2.1s
    const tExit = window.setTimeout(() => setExit(true), 1550);
    const tEnd = window.setTimeout(() => {
      setShow(false);
      try { sessionStorage.setItem("sl-intro-seen", "1"); } catch {}
    }, 2100);

    // fallback de segurança
    const fallback = window.setTimeout(() => setShow(false), 2800);

    return () => {
      window.clearTimeout(tExit);
      window.clearTimeout(tEnd);
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          animate={{ opacity: exit ? 0 : 1, y: exit ? "-2%" : 0 }}
          transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
          className="intro-loader"
          aria-hidden
        >
          {/* luzes em drift contínuo — CSS keyframes */}
          <span className="intro-bg-light intro-bg-light-a" />
          <span className="intro-bg-light intro-bg-light-b" />
          <span className="intro-bg-light intro-bg-light-c" />

          <div className="intro-content">
            <motion.img
              src={logoSrc}
              alt="SíndicoLab"
              className="intro-logo"
              draggable={false}
              initial={{ opacity: 0, y: 14, scale: 0.985, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            />
            <motion.span
              className="intro-line"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1], delay: 0.65 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
