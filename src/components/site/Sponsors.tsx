import { sponsors } from "@/lib/destinations";

export function Sponsors() {
  const items = [...sponsors, ...sponsors];
  return (
    <section
      className="py-16 md:py-20 border-y border-border/70 bg-surface relative overflow-hidden"
      aria-labelledby="sponsors-h"
    >
      <div className="container-x mb-10 grid md:grid-cols-12 gap-6 items-end">
        <div className="md:col-span-7">
          <div className="text-[10px] uppercase tracking-[0.4em] text-ink-soft mb-2">
            + Apoiadores e parceiros do ecossistema
          </div>
          <h2
            id="sponsors-h"
            className="font-display text-2xl md:text-4xl text-ink max-w-2xl text-balance tracking-[-0.03em]"
          >
            Marcas que constroem o mercado condominial junto com o SíndicoLab.
          </h2>
        </div>
        <p className="md:col-span-5 text-sm text-ink-soft md:text-right">
          Administradoras, fornecedores e parceiros institucionais que apoiam o
          ecossistema condominial.
        </p>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-surface to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-surface to-transparent z-10" />
        <div className="overflow-hidden">
          <div className="flex w-max animate-marquee gap-4 md:gap-5 items-center py-2">
            {items.map((s, i) => (
              <SponsorPlaceholder key={i} name={s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SponsorPlaceholder({ name }: { name: string }) {
  return (
    <div className="group flex items-center gap-3 px-6 py-4 rounded-2xl bg-background border border-border hover:border-border-strong hover:shadow-card transition-all whitespace-nowrap">
      <span className="grid place-items-center w-8 h-8 rounded-lg gradient-lab text-background font-display text-sm">
        {name.charAt(0)}
      </span>
      <span className="font-display text-lg md:text-xl text-ink tracking-[-0.02em]">
        {name}
      </span>
    </div>
  );
}
