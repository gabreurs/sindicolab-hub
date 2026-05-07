import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { BrandMark } from "./BrandMark";

export function IntroLoader() {
  const [show, setShow] = useState(true);
  const [phase, setPhase] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("sl-intro-seen")) {
      setShow(false);
      return;
    }
    const t1 = setTimeout(() => setPhase(1), 700);
    const t2 = setTimeout(() => setPhase(2), 1400);
    const t3 = setTimeout(() => {
      setShow(false);
      try { sessionStorage.setItem("sl-intro-seen", "1"); } catch {}
    }, 1900);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
          className="fixed inset-0 z-[100] overflow-hidden"
          aria-hidden
        >
          {/* Wipe layer that lifts off */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: phase >= 2 ? "-100%" : 0 }}
            transition={{ duration: 0.85, ease: [0.83, 0, 0.17, 1] }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: "var(--gradient-ink)" }}
          >
            {/* ambient gradients */}
            <div className="absolute -top-32 -left-32 w-[36rem] h-[36rem] rounded-full opacity-40 blur-[120px]" style={{ background: "var(--gradient-lab)" }} />
            <div className="absolute -bottom-32 -right-32 w-[36rem] h-[36rem] rounded-full opacity-30 blur-[120px]" style={{ background: "oklch(0.55 0.22 295)" }} />

            {/* Logo reveal via mask */}
            <div className="relative">
              <motion.div
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: phase >= 1 ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }}
                transition={{ duration: 0.85, ease: [0.65, 0, 0.35, 1] }}
              >
                <BrandMark size={72} tone="light" animated />
              </motion.div>

              {/* Lab glow underline */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: phase >= 1 ? 1 : 0 }}
                transition={{ delay: 0.4, duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
                className="origin-right h-[2px] mt-3 ml-auto rounded-full"
                style={{ background: "linear-gradient(to right, transparent, oklch(0.78 0.14 220))", width: "60%" }}
              />
            </div>
          </motion.div>

          {/* Background of wipe destination */}
          <div className="absolute inset-0 -z-10 bg-background" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
