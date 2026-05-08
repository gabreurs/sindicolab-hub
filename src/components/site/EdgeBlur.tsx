import { useEffect, useState } from "react";

/**
 * Edge blur global — fade translúcido na borda inferior da viewport.
 * Sem backdrop-filter pesado; apenas gradient suave que esmaece os elementos
 * abaixo da dobra. Some quando o footer entra em cena.
 *
 * Em mobile a intensidade é reduzida via CSS (height menor, sem blur).
 */
export function ViewportGlassEdges() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let observer: IntersectionObserver | null = null;
    let footerEl: HTMLElement | null = null;

    const attach = () => {
      footerEl = document.querySelector("footer");
      if (!footerEl) return false;
      observer = new IntersectionObserver(
        ([entry]) => setHidden(entry.isIntersecting),
        { threshold: 0.02, rootMargin: "0px 0px -40px 0px" }
      );
      observer.observe(footerEl);
      return true;
    };

    if (!attach()) {
      const id = window.setInterval(() => {
        if (attach()) window.clearInterval(id);
      }, 250);
      return () => {
        window.clearInterval(id);
        observer?.disconnect();
      };
    }

    return () => observer?.disconnect();
  }, []);

  return <div className={`edge-blur-bottom${hidden ? " is-hidden" : ""}`} aria-hidden />;
}

export const EdgeBlur = ViewportGlassEdges;
