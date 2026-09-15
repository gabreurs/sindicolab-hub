import { useEffect, useRef, type ReactNode } from "react";

export function PortalMotion({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cleanup = () => undefined;
    let cancelled = false;
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([gsapModule, triggerModule]) => {
      if (cancelled) return;
      const gsap = gsapModule.gsap;
      const ScrollTrigger = triggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      const context = gsap.context(() => {
        gsap.fromTo(".portal-lead-grid > *", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power3.out" });
        ScrollTrigger.batch("[data-portal-reveal]", {
          start: "top 92%",
          once: true,
          onEnter: (elements) => gsap.fromTo(elements, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, stagger: 0.05, ease: "power2.out", clearProps: "transform,opacity" }),
        });
      }, root);
      cleanup = () => context.revert();
    });
    return () => { cancelled = true; cleanup(); };
  }, []);

  return <div ref={rootRef}>{children}</div>;
}