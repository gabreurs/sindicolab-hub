/**
 * Sponsors — Carrossel interativo (Embla) com sistema visual unificado.
 *
 * Regras:
 * - Todos os cards compartilham a mesma superfície, altura, padding, borda e raio.
 * - Logos são normalizados (bbox alpha) — a "logo-stage" equaliza o peso visual.
 * - Logos monocromáticos claros (Atlas, CondoHuby) recebem uma "placa" interna
 *   escura padronizada (mesmo tamanho e raio para todos que a usam), em vez de
 *   escurecer o card inteiro.
 * - Mobile: ~1.15 slide/vez, swipe nativo (Embla) + scroll-snap fallback.
 * - Sem autoplay agressivo — carrossel manual, respeita prefers-reduced-motion.
 * - Sem overflow no body: overflow-hidden apenas no viewport interno.
 */
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import atlasLogo from "@/assets/parceiros/atlas-schindler.png.asset.json";
import bbzLogo from "@/assets/parceiros/bbz.png.asset.json";
import condohubyLogo from "@/assets/parceiros/condohuby.png.asset.json";
import focusLogo from "@/assets/parceiros/focus-media.png.asset.json";
import mlgLogo from "@/assets/parceiros/mlg.png.asset.json";
import damasLogo from "@/assets/parceiros/damas-reis.png.asset.json";

type Partner = {
  name: string;
  src: string;
  /** Logo com pintura clara/monocromática — precisa de placa escura interna. */
  needsDarkPlate?: boolean;
  /** Ajuste de escala fino por marca (0..1 do stage). Padrão: 0.78. */
  scale?: number;
  /** Caption opcional (usado apenas quando o asset é só símbolo, não assinatura). */
  caption?: string;
};

const partners: Partner[] = [
  { name: "Atlas Schindler", src: atlasLogo.url, needsDarkPlate: true, scale: 0.72 },
  { name: "BBZ", src: bbzLogo.url, scale: 0.62 },
  { name: "CondoHuby", src: condohubyLogo.url, needsDarkPlate: true, scale: 0.72 },
  { name: "Focus Media", src: focusLogo.url, scale: 0.7 },
  {
    name: "MLG Pinturas & Construções",
    src: mlgLogo.url,
    scale: 0.6,
    caption: "MLG Pinturas & Construções",
  },
  { name: "Damas e Reis da Limpeza — Diluidores", src: damasLogo.url, scale: 0.82 },
];

export function Sponsors() {
  const [prefersReduced, setPrefersReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setPrefersReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    dragFree: false,
    containScroll: "trimSnaps",
    duration: prefersReduced ? 0 : 22,
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSel = () => {
      setSelected(emblaApi.selectedScrollSnap());
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };
    setSnaps(emblaApi.scrollSnapList());
    onSel();
    emblaApi.on("select", onSel);
    emblaApi.on("reInit", onSel);
    return () => {
      emblaApi.off("select", onSel);
      emblaApi.off("reInit", onSel);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section
      className="py-16 md:py-24 border-y border-border/70 bg-surface"
      aria-labelledby="sponsors-h"
    >
      <div className="container-x mb-8 md:mb-10 grid md:grid-cols-12 gap-6 items-end">
        <div className="md:col-span-7">
          <p className="text-[12px] text-ink-soft mb-3">Apoiadores e parceiros</p>
          <h2
            id="sponsors-h"
            className="font-display text-2xl md:text-4xl text-ink max-w-2xl text-balance tracking-[-0.03em]"
          >
            Marcas que constroem o mercado condominial junto com o SíndicoLab.
          </h2>
        </div>
        <p className="md:col-span-5 text-sm text-ink-soft md:text-right max-w-md md:ml-auto leading-relaxed">
          Administradoras, fornecedores e parceiros institucionais que apoiam o
          ecossistema condominial brasileiro.
        </p>
      </div>

      {/* Wrapper full-bleed controlado — nunca provoca overflow do body */}
      <div
        className="relative min-w-0"
        role="region"
        aria-roledescription="carousel"
        aria-label="Apoiadores e parceiros"
      >
        <div className="container-x">
          <div className="relative min-w-0">
            {/* Viewport */}
            <div
              ref={emblaRef}
              className="overflow-hidden min-w-0 -mx-1 md:-mx-2"
            >
              {/* Track */}
              <ul className="flex touch-pan-y" style={{ backfaceVisibility: "hidden" }}>
                {partners.map((p, i) => (
                  <li
                    key={p.name}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${i + 1} de ${partners.length}: ${p.name}`}
                    className="shrink-0 grow-0 px-1 md:px-2 basis-[86%] xs:basis-[78%] sm:basis-[55%] md:basis-[42%] lg:basis-[32%] xl:basis-[28%]"
                  >
                    <PartnerCard partner={p} />
                  </li>
                ))}
              </ul>
            </div>

            {/* Setas desktop */}
            <div className="hidden md:flex absolute -top-16 right-0 gap-2">
              <button
                type="button"
                onClick={scrollPrev}
                disabled={!canPrev}
                aria-label="Slide anterior"
                className="h-11 w-11 rounded-full border border-border bg-background hover:bg-brand-soft hover:border-border-strong transition-colors flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5 text-ink" />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                disabled={!canNext}
                aria-label="Próximo slide"
                className="h-11 w-11 rounded-full border border-border bg-background hover:bg-brand-soft hover:border-border-strong transition-colors flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5 text-ink" />
              </button>
            </div>
          </div>

          {/* Indicadores */}
          {snaps.length > 1 && (
            <div className="mt-6 flex items-center justify-center gap-1.5">
              {snaps.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => emblaApi?.scrollTo(i)}
                  aria-label={`Ir para o slide ${i + 1}`}
                  aria-current={i === selected}
                  className={`h-1.5 rounded-full transition-all ${
                    i === selected ? "w-6 bg-ink" : "w-1.5 bg-ink/25 hover:bg-ink/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function PartnerCard({ partner }: { partner: Partner }) {
  const scale = partner.scale ?? 0.78;
  return (
    <div
      className="group relative h-[140px] md:h-[156px] rounded-3xl border border-border bg-background/70 backdrop-blur-[2px] px-5 py-4 flex flex-col items-center justify-center transition-colors hover:border-border-strong hover:bg-background"
      aria-label={partner.name}
    >
      {/* Logo stage — área útil equalizada */}
      <div className="relative flex-1 w-full flex items-center justify-center min-h-0">
        {partner.needsDarkPlate ? (
          <div
            className="flex items-center justify-center rounded-xl bg-[#0f172a] px-5"
            style={{ width: "82%", height: "72%" }}
          >
            <img
              src={partner.src}
              alt={partner.name}
              loading="lazy"
              decoding="async"
              className="w-auto h-auto"
              style={{
                maxWidth: "100%",
                maxHeight: `${Math.round(scale * 100)}%`,
                objectFit: "contain",
              }}
            />
          </div>
        ) : (
          <img
            src={partner.src}
            alt={partner.name}
            loading="lazy"
            decoding="async"
            className="w-auto h-auto"
            style={{
              maxWidth: `${Math.round(scale * 100)}%`,
              maxHeight: `${Math.round(scale * 100)}%`,
              objectFit: "contain",
            }}
          />
        )}
      </div>
      {partner.caption && (
        <p className="mt-1 text-[11px] leading-tight text-ink-soft text-center tracking-tight">
          {partner.caption}
        </p>
      )}
    </div>
  );
}
