import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const word = "SíndicoLab".split("");

export function IntroLoader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1900);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
          className="fixed inset-0 z-[100] grid place-items-center bg-background"
        >
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: -40 }}
            transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
            className="relative flex items-end gap-[0.04em] font-display text-[14vw] md:text-[8.5vw] leading-none text-ink overflow-hidden pb-2"
            aria-label="SíndicoLab"
          >
            {word.map((ch, i) => (
              <motion.span
                key={i}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.05 + i * 0.045,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block"
              >
                {ch}
              </motion.span>
            ))}
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.7, duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
              className="origin-left ml-2 inline-block w-[0.6em] h-[0.08em] bg-brand mb-[0.18em]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.4 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-ink-soft"
          >
            Ecossistema condominial
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
