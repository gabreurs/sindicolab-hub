import { useEffect } from "react";
import Lenis from "lenis";

let lenisInstance: Lenis | null = null;
let lenisRefs = 0;

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
        wheelMultiplier: 1,
      });
      const raf = (time: number) => {
        lenisInstance?.raf(time);
        (lenisInstance as unknown as { _rafId?: number })._rafId =
          requestAnimationFrame(raf);
      };
      (lenisInstance as unknown as { _rafId?: number })._rafId =
        requestAnimationFrame(raf);
    }

    return () => {
      lenisRefs -= 1;
      if (lenisRefs <= 0 && lenisInstance) {
        const id = (lenisInstance as unknown as { _rafId?: number })._rafId;
        if (id) cancelAnimationFrame(id);
        lenisInstance.destroy();
        lenisInstance = null;
        lenisRefs = 0;
      }
    };
  }, []);

  return null;
}

