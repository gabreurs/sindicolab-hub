import { useEffect, useState } from "react";

export type MotionLevel = "full" | "medium" | "light" | "none";

/**
 * Retorna nível de motion permitido com base em viewport e prefers-reduced-motion.
 * - desktop ≥1024px: "full"
 * - tablet 768–1023: "medium"
 * - mobile <768: "light"
 * - reduced-motion: "none"
 */
export function useMotionLevel(): MotionLevel {
  const [lvl, setLvl] = useState<MotionLevel>(() => {
    if (typeof window === "undefined") return "light";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "none";
    if (window.matchMedia("(max-width: 767px)").matches) return "light";
    if (window.matchMedia("(max-width: 1023px)").matches) return "medium";
    return "full";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const tablet = window.matchMedia("(max-width: 1023px)");
    const mobile = window.matchMedia("(max-width: 767px)");

    const compute = () => {
      if (reduced.matches) return setLvl("none");
      if (mobile.matches) return setLvl("light");
      if (tablet.matches) return setLvl("medium");
      setLvl("full");
    };
    compute();
    reduced.addEventListener("change", compute);
    tablet.addEventListener("change", compute);
    mobile.addEventListener("change", compute);
    return () => {
      reduced.removeEventListener("change", compute);
      tablet.removeEventListener("change", compute);
      mobile.removeEventListener("change", compute);
    };
  }, []);

  return lvl;
}

export const isHeavyMotionAllowed = (lvl: MotionLevel) => lvl === "full";
