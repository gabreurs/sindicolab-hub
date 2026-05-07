/**
 * SponsorsMarquee — placeholders SVG monocromáticos com hover color reveal.
 * Não usa bolinhas com inicial — usa logos estilizados.
 */
import { sponsors } from "@/lib/destinations";

export function Sponsors() {
  const items = [...sponsors, ...sponsors];
  return (
    <section
      className="py-20 md:py-28 border-y border-border/70 bg-surface relative overflow-hidden"
      aria-labelledby="sponsors-h"
    >
      <div className="container-x mb-12 grid md:grid-cols-12 gap-6 items-end">
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

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-surface to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-surface to-transparent z-10" />
        <div className="overflow-hidden">
          <div className="flex w-max animate-marquee gap-3 items-center py-2">
            {items.map((s, i) => (
              <SponsorTile key={i} name={s} index={i % sponsors.length} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const tints = [
  "oklch(0.55 0.21 258)",
  "oklch(0.55 0.22 295)",
  "oklch(0.78 0.14 220)",
  "oklch(0.5 0.18 200)",
  "oklch(0.6 0.18 280)",
];

function SponsorTile({ name, index }: { name: string; index: number }) {
  const tint = tints[index % tints.length];
  return (
    <div
      className="group relative flex items-center gap-3 px-7 py-5 min-w-[210px] rounded-2xl bg-background border border-border hover:border-border-strong hover:shadow-card transition-all"
      style={{ "--tint": tint } as React.CSSProperties}
    >
      <svg width="28" height="28" viewBox="0 0 28 28" className="shrink-0 text-ink-soft/55 group-hover:text-[var(--tint)] transition-colors">
        {/* simple geometric mark per index */}
        {index % 4 === 0 && <rect x="4" y="4" width="20" height="20" rx="6" stroke="currentColor" strokeWidth="2.2" fill="none" />}
        {index % 4 === 1 && <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="2.2" fill="none" />}
        {index % 4 === 2 && <path d="M4 22 L14 4 L24 22 Z" stroke="currentColor" strokeWidth="2.2" fill="none" />}
        {index % 4 === 3 && <>
          <rect x="4" y="4" width="9" height="20" rx="2" stroke="currentColor" strokeWidth="2.2" fill="none" />
          <rect x="15" y="9" width="9" height="15" rx="2" stroke="currentColor" strokeWidth="2.2" fill="none" />
        </>}
      </svg>
      <span className="font-display text-[1.05rem] text-ink-soft/75 group-hover:text-ink transition-colors tracking-[-0.02em] whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}
