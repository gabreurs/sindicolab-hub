import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import logoSrc from "@/assets/logo-sindicolab.svg";

/**
 * Intro loader: dark brand backdrop, real SíndicoLab logo revealed via clip-path.
 * Short (~1100ms), then wipes up to reveal the home. Skipped if reduced motion or already seen.
 */
export function IntroLoader() {
  const [show, setShow] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || sessionStorage.getItem("sl-intro-seen")) {
      setShow(false);
      return;
    }
    const t1 = setTimeout(() => setRevealed(true), 120);
    const t2 = setTimeout(() => setExit(true), 1100);
    const t3 = setTimeout(() => {
      setShow(false);
      try { sessionStorage.setItem("sl-intro-seen", "1"); } catch {}
    }, 1700);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-hidden pointer-events-none"
          aria-hidden
        >
          {/* Wipe layer that lifts off */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: exit ? "-101%" : 0 }}
            transition={{ duration: 0.85, ease: [0.83, 0, 0.17, 1] }}
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background:
                "radial-gradient(120% 80% at 50% 40%, oklch(0.18 0.08 260) 0%, oklch(0.1 0.04 255) 60%, oklch(0.07 0.02 250) 100%)",
            }}
          >
            {/* ambient brand glow */}
            <div className="absolute -top-40 -left-40 w-[40rem] h-[40rem] rounded-full opacity-40 blur-[140px]" style={{ background: "oklch(0.55 0.22 262)" }} />
            <div className="absolute -bottom-40 -right-40 w-[40rem] h-[40rem] rounded-full opacity-30 blur-[140px]" style={{ background: "oklch(0.55 0.22 295)" }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[20rem] rounded-full opacity-20 blur-[120px]" style={{ background: "oklch(0.78 0.14 220)" }} />

            {/* Logo reveal via clip-path mask */}
            <div className="relative">
              <motion.div
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: revealed ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }}
                transition={{ duration: 0.95, ease: [0.65, 0, 0.35, 1] }}
                className="will-change-[clip-path]"
              >
                <img
                  src={logoSrc}
                  alt="SíndicoLab"
                  className="h-9 sm:h-11 md:h-12 w-auto"
                  draggable={false}
                />
              </motion.div>
              {/* cyan glow streak under the logo */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: revealed ? 1 : 0, opacity: revealed ? 0.85 : 0 }}
                transition={{ delay: 0.45, duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
                className="origin-left h-[2px] mt-3 rounded-full"
                style={{
                  background:
                    "linear-gradient(to right, transparent, oklch(0.78 0.14 220) 40%, oklch(0.55 0.22 295) 80%, transparent)",
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
