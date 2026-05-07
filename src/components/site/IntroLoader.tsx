import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const word = "SíndicoLab".split("");

export function IntroLoader() {
  const [show, setShow] = useState(true);
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    const a = setTimeout(() => setReveal(true), 1100);
    const b = setTimeout(() => setShow(false), 1750);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink text-background overflow-hidden"
        >
          {/* gradient sweep */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ delay: 0.4, duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
            className="absolute inset-y-0 w-1/2 gradient-lab opacity-30 blur-3xl"
          />

          <div className="relative flex flex-col items-center gap-4">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="text-[10px] uppercase tracking-[0.5em] text-background/50"
            >
              + Ecossistema condominial
            </motion.span>

            <div
              className="font-display text-[14vw] md:text-[7.5vw] leading-none flex items-center"
              aria-label="SíndicoLab"
            >
              {word.map((ch, i) => {
                const isLab = i >= 7;
                return (
                  <span key={i} className="inline-block overflow-hidden">
                    <motion.span
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      transition={{
                        duration: 0.8,
                        delay: 0.15 + i * 0.04,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={`inline-block ${isLab ? "text-cyan" : ""}`}
                    >
                      {ch}
                    </motion.span>
                  </span>
                );
              })}
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: reveal ? 1 : 0.4 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="origin-left h-[2px] w-40 gradient-lab rounded-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
