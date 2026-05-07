import { useEffect } from "react";
import Lenis from "lenis";

let lenisInstance: Lenis | null = null;
let lenisRefs = 0;
let rafId = 0;

export function getLenis() {
  return lenisInstance;
}

export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    lenisRefs += 1;
    if (!lenisInstance) {
      lenisInstance = new Lenis({
        duration: 0.9,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      const tick = (time: number) => {
        lenisInstance?.raf(time);
        rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
    }

    return () => {
      lenisRefs -= 1;
      if (lenisRefs <= 0 && lenisInstance) {
        if (rafId) cancelAnimationFrame(rafId);
        lenisInstance.destroy();
        lenisInstance = null;
        lenisRefs = 0;
      }
    };
  }, []);

  return null;
}
