import { useEffect, useState } from "react";

/**
 * Edge blur global — camada fixa na borda inferior da viewport.
 * Some automaticamente quando o footer entra em cena (não cobre links/copyright).
 * pointer-events: none, sempre atrás de header/menu/search.
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
      // footer pode montar depois (rota nova) — tenta novamente
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
