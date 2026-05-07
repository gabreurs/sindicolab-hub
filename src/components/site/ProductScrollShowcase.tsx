import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Product = {
  num: string;
  category: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  external?: boolean;
  accent: string; // tailwind gradient classes for media
  bg: string; // background gradient for card
  visualLabel: string;
};

const products: Product[] = [
  {
    num: "01",
    category: "Plataforma de síndicos profissionais",
    title: "Encontre síndico profissional para o seu condomínio",
    description:
      "Conheça síndicos profissionais avaliados e conecte seu condomínio a uma gestão mais preparada, transparente e moderna.",
    cta: "Encontrar síndico profissional",
    href: "https://quero1sindico.com/",
    external: true,
    accent: "from-brand via-brand-deep to-violet-deep",
    bg: "from-[oklch(0.97_0.02_240)] to-[oklch(0.93_0.04_250)]",
    visualLabel: "Quero1Síndico",
  },
  {
    num: "02",
    category: "Conteúdo editorial condominial",
    title: "Portal SíndicoLab: leitura para quem decide no condomínio",
    description:
      "Análises, casos reais e bastidores de gestão condominial — uma redação dedicada a quem vive o dia a dia do síndico.",
    cta: "Acessar Portal",
    href: "/portal",
    accent: "from-ink via-[oklch(0.32_0.04_260)] to-brand-deep",
    bg: "from-[oklch(0.96_0.01_90)] to-[oklch(0.92_0.02_70)]",
    visualLabel: "Portal",
  },
  {
    num: "03",
    category: "Educação para síndicos",
    title: "SíndicoLab Play: cursos para profissionalizar a gestão",
    description:
      "Trilhas de aprendizado com especialistas, voltadas para síndicos, conselheiros e equipes de administração.",
    cta: "Ver cursos",
    href: "/play",
    accent: "from-violet-deep via-brand to-cyan",
    bg: "from-[oklch(0.95_0.03_300)] to-[oklch(0.9_0.06_290)]",
    visualLabel: "Play",
  },
  {
    num: "04",
    category: "Biblioteca utilitária",
    title: "Materiais e Downloads prontos para o seu condomínio",
    description:
      "Modelos de documentos, checklists e guias para assembleia — tudo o que o síndico precisa, em um só lugar.",
    cta: "Explorar materiais",
    href: "/materiais",
    accent: "from-cyan via-brand to-brand-deep",
    bg: "from-[oklch(0.96_0.02_200)] to-[oklch(0.92_0.05_210)]",
    visualLabel: "Materiais",
  },
  {
    num: "05",
    category: "Marcas + ecossistema condominial",
    title: "Patrocínios e Experiências CondoHuby + SíndicoLab",
    description:
      "Conecte sua marca a milhares de síndicos por meio de experiências, conteúdos e ativações com curadoria.",
    cta: "Patrocinar experiências",
    href: "/patrocinios",
    accent: "from-violet-deep via-violet-deep to-brand",
    bg: "from-[oklch(0.94_0.04_320)] to-[oklch(0.88_0.07_310)]",
    visualLabel: "CondoHuby",
  },
];

export function ProductScrollShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Lenis (only one instance globally — guard against duplicates)
    let lenis: Lenis | null = null;
    let raf = 0;
    if (!reduced && !(window as any).__lenisGlobal) {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      (window as any).__lenisGlobal = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => {
        lenis!.raf(time);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      gsap.ticker.lagSmoothing(0);
    }

    const ctx = gsap.context(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target as HTMLElement;
            const media = el.querySelector<HTMLElement>("[data-media]");
            const text = el.querySelector<HTMLElement>("[data-text]");
            const cta = el.querySelector<HTMLElement>("[data-cta]");
            const num = el.querySelector<HTMLElement>("[data-num]");
            const card = el.querySelector<HTMLElement>("[data-card]");
            if (!media || !text || !cta || !card) return;

            // Mask reveal on first intersect
            gsap.fromTo(
              card,
              { clipPath: "inset(0 100% 0 0)" },
              {
                clipPath: "inset(0 0% 0 0)",
                duration: 1.1,
                ease: "power3.out",
              }
            );

            // Scrubbed expansion as user scrolls through item
            gsap.fromTo(
              media,
              { width: "32%", scale: 0.96, filter: "blur(6px)" },
              {
                width: "100%",
                scale: 1,
                filter: "blur(0px)",
                ease: "none",
                scrollTrigger: {
                  trigger: el,
                  start: "top 75%",
                  end: "bottom 30%",
                  scrub: 0.6,
                },
              }
            );

            gsap.fromTo(
              card,
              { minHeight: "55vh" },
              {
                minHeight: "85vh",
                ease: "none",
                scrollTrigger: {
                  trigger: el,
                  start: "top 80%",
                  end: "center 40%",
                  scrub: 0.6,
                },
              }
            );

            gsap.fromTo(
              text,
              { y: 40, opacity: 0.4 },
              {
                y: 0,
                opacity: 1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: el,
                  start: "top 70%",
                  end: "top 30%",
                  scrub: 0.5,
                },
              }
            );

            gsap.fromTo(
              cta,
              { y: 18, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.6,
                delay: 0.5,
                ease: "power2.out",
              }
            );

            if (num) {
              gsap.fromTo(
                num,
                { letterSpacing: "0em", opacity: 0.4 },
                {
                  letterSpacing: "0.04em",
                  opacity: 1,
                  ease: "none",
                  scrollTrigger: {
                    trigger: el,
                    start: "top 80%",
                    end: "center 50%",
                    scrub: true,
                  },
                }
              );
            }

            // Active state — scale neighbors down via parent class toggle
            ScrollTrigger.create({
              trigger: el,
              start: "top 60%",
              end: "bottom 40%",
              onToggle: (self) => {
                el.dataset.active = self.isActive ? "true" : "false";
                if (self.isActive) {
                  itemRefs.current.forEach((other) => {
                    if (other && other !== el) {
                      other.dataset.dimmed = "true";
                    }
                  });
                } else {
                  itemRefs.current.forEach((other) => {
                    if (other) other.dataset.dimmed = "false";
                  });
                }
              },
            });

            observer.unobserve(el);
          });
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
      );

      itemRefs.current.forEach((el) => el && observer.observe(el));

      return () => observer.disconnect();
    }, sectionRef);

    return () => {
      ctx.revert();
      if (lenis) {
        cancelAnimationFrame(raf);
        lenis.destroy();
        delete (window as any).__lenisGlobal;
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="solucoes"
      className="relative bg-background py-24 md:py-32"
    >
      <div className="container-x mb-16 md:mb-24 max-w-5xl">
        <div className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground mb-5">
          Ecossistema · 05 frentes
        </div>
        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl tracking-[-0.035em] leading-[1.02] text-ink">
          Soluções para síndicos, condomínios e gestão condominial.
        </h2>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
          Cada produto do SíndicoLab resolve uma camada do dia a dia condominial — explore rolando.
        </p>
      </div>

      <div className="container-x flex flex-col gap-10 md:gap-16">
        {products.map((p, i) => (
          <ProductRow
            key={p.num}
            product={p}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
          />
        ))}
      </div>
    </section>
  );
}

import { forwardRef } from "react";

const ProductRow = forwardRef<HTMLDivElement, { product: Product }>(
  ({ product }, ref) => {
    return (
      <div
        ref={ref}
        data-product
        data-active="false"
        data-dimmed="false"
        className="group relative transition-[filter,transform,opacity] duration-700 will-change-transform data-[dimmed=true]:scale-[0.985] data-[dimmed=true]:opacity-70 data-[dimmed=true]:blur-[1.5px]"
      >
        <div
          data-card
          className={`relative overflow-hidden rounded-[28px] md:rounded-[40px] bg-gradient-to-br ${product.bg} border border-ink/5 shadow-lift`}
          style={{ minHeight: "55vh" }}
        >
          {/* Organic moving background */}
          <div className="absolute inset-0 opacity-60 pointer-events-none">
            <div className={`absolute -top-1/3 -right-1/4 w-[70%] h-[140%] rounded-full bg-gradient-to-br ${product.accent} opacity-25 blur-3xl animate-[pulse_8s_ease-in-out_infinite]`} />
            <div className={`absolute -bottom-1/3 -left-1/4 w-[60%] h-[120%] rounded-full bg-gradient-to-tr ${product.accent} opacity-15 blur-3xl`} />
          </div>

          <div className="relative h-full grid lg:grid-cols-12 gap-8 p-8 md:p-12 lg:p-16">
            {/* Text */}
            <div data-text className="lg:col-span-5 flex flex-col justify-between gap-10">
              <div className="flex items-baseline gap-5">
                <span data-num className="font-display text-5xl md:text-6xl text-ink/30 tabular-nums">
                  {product.num}
                </span>
                <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-ink/55">
                  {product.category}
                </span>
              </div>

              <div>
                <h3 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-[-0.03em] leading-[1.05] text-ink max-w-xl">
                  {product.title}
                </h3>
                <p className="mt-5 text-base md:text-lg text-ink/70 leading-relaxed max-w-md">
                  {product.description}
                </p>

                <div data-cta className="mt-8">
                  <a
                    href={product.href}
                    target={product.external ? "_blank" : undefined}
                    rel={product.external ? "noreferrer" : undefined}
                    className="group/cta inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-ink text-background text-sm font-medium hover:bg-brand-deep transition-colors"
                  >
                    {product.cta}
                    <span className="relative w-4 h-4 overflow-hidden">
                      <ArrowUpRight className="absolute inset-0 w-4 h-4 transition-transform duration-500 group-hover/cta:translate-x-4 group-hover/cta:-translate-y-4" />
                      <ArrowUpRight className="absolute inset-0 w-4 h-4 -translate-x-4 translate-y-4 transition-transform duration-500 group-hover/cta:translate-x-0 group-hover/cta:translate-y-0" />
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* Media */}
            <div className="lg:col-span-7 relative flex items-center justify-end">
              <div
                data-media
                className={`relative aspect-[4/3] lg:aspect-[16/11] rounded-[20px] md:rounded-[28px] overflow-hidden bg-gradient-to-br ${product.accent} shadow-xl will-change-transform`}
                style={{ width: "32%" }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)]" />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="text-center text-background/95">
                    <div className="text-[10px] uppercase tracking-[0.4em] opacity-70 mb-3">
                      {product.visualLabel}
                    </div>
                    <div className="font-display text-5xl md:text-7xl tracking-[-0.04em]">
                      {product.num}
                    </div>
                  </div>
                </div>
                {/* Grain overlay */}
                <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence baseFrequency='0.9'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
ProductRow.displayName = "ProductRow";
