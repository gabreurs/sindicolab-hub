const sponsors = [
  "CondoHuby",
  "BBZ",
  "Focus Media",
  "CBE",
  "Atlas Schindler",
  "Síndico Advanced",
  "DGT",
  "Guarida",
  "Studio Marqo",
];

export function Sponsors() {
  const items = [...sponsors, ...sponsors];
  return (
    <section className="py-16 md:py-20 border-y border-border/70 bg-surface relative overflow-hidden">
      <div className="container-x mb-8 flex items-end justify-between gap-6">
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-ink-soft mb-2">
            · Apoiadores do ecossistema
          </div>
          <h2 className="font-display text-2xl md:text-3xl text-ink max-w-xl text-balance">
            Marcas que constroem o futuro condominial junto com a gente.
          </h2>
        </div>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-surface to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-surface to-transparent z-10" />
        <div className="overflow-hidden">
          <div className="flex w-max animate-marquee gap-12 md:gap-16 items-center py-2">
            {items.map((s, i) => (
              <div
                key={i}
                className="font-display text-2xl md:text-3xl text-ink-soft/70 hover:text-ink transition-colors whitespace-nowrap tracking-tight"
              >
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
