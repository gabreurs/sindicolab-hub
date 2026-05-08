import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { PropsWithChildren } from "react";
import { useMotionLevel } from "@/hooks/useMotionLevel";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.02 } },
};
export const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] } },
};
export const itemFade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } },
};
export const itemScale: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

interface Props extends PropsWithChildren {
  id: string;
  index: number;
  total: number;
  tone?: "light" | "dark" | "lavender";
  className?: string;
}

export const DeckSlide = ({ id, index, total, tone = "light", className = "", children }: Props) => {
  const reduce = useReducedMotion();
  const motionLvl = useMotionLevel();
  const animateSlide = !reduce && motionLvl === "full";
  const toneClass =
    tone === "dark" ? "mk-bg-deep" : tone === "lavender" ? "mk-bg-lav" : "";
  return (
    <motion.section
      id={id}
      data-slide-index={index}
      className={`mk-slide relative overflow-hidden flex flex-col min-h-[100svh] ${toneClass} ${className}`}
      initial={animateSlide ? "hidden" : false}
      whileInView={animateSlide ? "show" : undefined}
      viewport={animateSlide ? { amount: 0.25, once: true, margin: "0px 0px -8% 0px" } : undefined}
      variants={animateSlide ? container : undefined}
    >
      {children}
      <div className="pointer-events-none absolute bottom-5 left-5 z-20 select-none font-mono text-[10px] tracking-tight opacity-60 md:bottom-6 md:left-8">
        {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>
    </motion.section>
  );
};
