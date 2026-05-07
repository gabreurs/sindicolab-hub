import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";
import { gsap } from "gsap";

/**
 * SVGPageTransition — overlay fixo na viewport que cobre/revela a tela
 * usando 3 paths SVG com stroke-dasharray/stroke-dashoffset, ao estilo
 * referência Next.js + GSAP (porém adaptada para TanStack Router).
 *
 * Lógica:
 *  - na primeira render, não anima.
 *  - quando o pathname muda, executa LEAVE (paths desenham e engrossam,
 *    cobrindo a tela) seguido de ENTER (continuam o stroke para fora,
 *    revelando a nova página).
 *  - paths são medidos com getTotalLength() e os dash offsets são
 *    resetados ao fim, evitando memory leak.
 */
export function SVGPageTransition() {
  const overlay = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const path1 = useRef<SVGPathElement>(null);
  const path2 = useRef<SVGPathElement>(null);
  const path3 = useRef<SVGPathElement>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const prev = useRef(pathname);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      prev.current = pathname;
      return;
    }
    if (pathname === prev.current) return;
    prev.current = pathname;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const paths = [path1.current, path2.current, path3.current].filter(
      (p): p is SVGPathElement => !!p,
    );
    const o = overlay.current;
    if (!o || paths.length === 0) return;

    const ctx = gsap.context(() => {
      o.classList.add("is-active");

      paths.forEach((p) => {
        const len = p.getTotalLength();
        p.style.strokeDasharray = `${len}`;
        p.style.strokeDashoffset = `${len}`;
        p.style.strokeWidth = "0";
      });

      const tl = gsap.timeline({
        onComplete: () => {
          paths.forEach((p) => {
            p.style.strokeDashoffset = `${p.getTotalLength()}`;
            p.style.strokeWidth = "0";
          });
          o.classList.remove("is-active");
        },
      });

      // LEAVE — strokes desenham e engrossam até cobrir a tela
      tl.to(
        paths,
        {
          strokeDashoffset: 0,
          duration: 0.55,
          ease: "power2.inOut",
          stagger: 0.05,
        },
        0,
      ).to(
        paths,
        {
          strokeWidth: 220,
          duration: 0.55,
          ease: "power2.inOut",
          stagger: 0.05,
        },
        0.15,
      );

      // ENTER — strokes continuam para fora, revelando a próxima página
      tl.to(
        paths,
        {
          strokeDashoffset: (i, t) => -(t as SVGPathElement).getTotalLength(),
          duration: 0.55,
          ease: "power2.inOut",
          stagger: 0.05,
        },
        ">-0.05",
      ).to(
        paths,
        {
          strokeWidth: 0,
          duration: 0.45,
          ease: "power2.inOut",
          stagger: 0.05,
        },
        "<0.1",
      );
    }, overlay);

    return () => ctx.revert();
  }, [pathname]);

  return (
    <div ref={overlay} aria-hidden className="page-transition-overlay">
      <svg
        ref={svg}
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 3 ondas diagonais nas cores da marca SíndicoLab (azul, ciano, violeta) */}
        <path
          ref={path1}
          d="M -120 980 Q 360 720 720 820 T 1560 700"
          stroke="oklch(0.55 0.21 258)"
        />
        <path
          ref={path2}
          d="M -120 1040 Q 360 800 720 880 T 1560 760"
          stroke="oklch(0.78 0.14 220)"
        />
        <path
          ref={path3}
          d="M -120 1100 Q 360 880 720 940 T 1560 820"
          stroke="oklch(0.32 0.16 290)"
        />
      </svg>
    </div>
  );
}
