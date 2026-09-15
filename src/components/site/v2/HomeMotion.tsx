import { useEffect, useRef, type ReactNode } from "react";

export function HomeMotion({ children }: { children: ReactNode }) {
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
      root.classList.add("home-motion-ready");

      const context = gsap.context(() => {
        gsap.fromTo(
          "[data-motion='headline-line']",
          { yPercent: 105, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.09, ease: "power3.out" },
        );
        gsap.fromTo(
          "[data-motion='hero-support']",
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, delay: 0.28, stagger: 0.08, ease: "power2.out" },
        );
        gsap.fromTo(
          "[data-motion='hero-visual']",
          { y: 18, scale: 0.97, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, duration: 0.9, delay: 0.12, ease: "power3.out" },
        );

        gsap.to("[data-motion='hero-visual']", {
          yPercent: 7,
          ease: "none",
          scrollTrigger: { trigger: ".home-hero", start: "top top", end: "bottom top", scrub: 0.6 },
        });
        gsap.to(".home-hero-orbit", {
          rotate: 18,
          ease: "none",
          scrollTrigger: { trigger: ".home-hero", start: "top top", end: "bottom top", scrub: 0.8 },
        });

        ScrollTrigger.batch("[data-motion='access-card']", {
          start: "top 92%",
          once: true,
          onEnter: (elements) =>
            gsap.fromTo(
              elements,
              { y: 22, opacity: 0, scale: 0.975 },
              { y: 0, opacity: 1, scale: 1, duration: 0.58, stagger: 0.07, ease: "power3.out", clearProps: "transform" },
            ),
        });
        gsap.utils.toArray<HTMLElement>("[data-motion='card-icon']").forEach((icon) => {
          gsap.to(icon, {
            y: -5,
            ease: "none",
            scrollTrigger: { trigger: icon, start: "top bottom", end: "bottom top", scrub: 1.2 },
          });
        });
        gsap.fromTo(
          "[data-motion='banner']",
          { clipPath: "inset(0 0 100% 0 round var(--radius-card))", y: 18 },
          {
            clipPath: "inset(0 0 0% 0 round var(--radius-card))",
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: "[data-motion='banner']", start: "top 90%", once: true },
          },
        );
      }, root);

      cleanup = () => {
        context.revert();
        root.classList.remove("home-motion-ready");
      };
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return <div ref={rootRef}>{children}</div>;
}