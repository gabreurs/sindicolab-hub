import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CalendarDays, Clock, MapPin, Monitor, ArrowUpRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { buildSeo } from "@/lib/seo";
import { eventsService, type SiteEvent } from "@/services/eventsService";

export const Route = createFileRoute("/eventos")({
  head: () =>
    buildSeo({
      title: "Eventos para síndicos — encontros, lives e workshops | SíndicoLab",
      description:
        "Agenda de eventos do SíndicoLab: workshops, lives e encontros presenciais para síndicos, equipes de condomínio e administradoras.",
      path: "/eventos",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Agenda de eventos SíndicoLab",
        url: "https://sindicolab.com/eventos",
        inLanguage: "pt-BR",
      },
    }),
  component: EventosPage,
});

export function formatEventDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function EventosPage() {
  const [upcoming, setUpcoming] = useState<SiteEvent[]>([]);
  const [past, setPast] = useState<SiteEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    eventsService
      .listSplit()
      .then(({ upcoming: u, past: p }) => {
        if (cancelled) return;
        setUpcoming(u);
        setPast(p);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="min-h-screen bg-background text-ink flex flex-col">
      <Header />
      <Breadcrumbs items={[{ label: "Eventos" }]} />

      <section className="pt-6 md:pt-8 pb-12 border-b border-border bg-secondary/40">
        <div className="container-x">
          <div className="text-[10px] tracking-tight text-brand font-mono">
            Agenda · Encontros do ecossistema
          </div>
          <h1 className="mt-5 font-display text-4xl md:text-6xl tracking-[-0.04em] leading-[0.98] max-w-3xl text-balance">
            Eventos para quem vive a gestão condominial.
          </h1>
          <p className="mt-5 max-w-2xl text-ink-soft text-base md:text-lg leading-relaxed">
            Workshops, lives e encontros presenciais para aprender com quem está
            no dia a dia dos condomínios — e conhecer gente do setor.
          </p>
        </div>
      </section>

      <section className="py-14 border-b border-border">
        <div className="container-x">
          <h2 className="font-display text-2xl md:text-3xl tracking-[-0.03em]">Próximos eventos</h2>

          {loading ? (
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-52 rounded-xl border border-border bg-secondary/40 animate-pulse" />
              ))}
            </div>
          ) : upcoming.length === 0 ? (
            <p className="mt-6 text-ink-soft">
              Nenhum evento com data aberta agora. Acompanhe nossas redes para saber do próximo.
            </p>
          ) : (
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((ev) => (
                <EventCard key={ev.id} event={ev} />
              ))}
            </div>
          )}
        </div>
      </section>

      {past.length > 0 && (
        <section className="py-14 border-b border-border">
          <div className="container-x">
            <h2 className="font-display text-2xl md:text-3xl tracking-[-0.03em]">Eventos realizados</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {past.map((ev) => (
                <EventCard key={ev.id} event={ev} realizado />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}

function EventCard({ event, realizado }: { event: SiteEvent; realizado?: boolean }) {
  return (
    <Link
      to="/eventos/$slug"
      params={{ slug: event.slug }}
      className="group flex flex-col rounded-xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:shadow-card"
    >
      <div className="flex items-center gap-2 text-[10px] font-mono tracking-tight">
        <span className={realizado ? "text-ink-soft" : "text-brand"}>
          {realizado ? "Realizado" : event.format === "online" ? "Online" : "Presencial"}
        </span>
        {event.city && <span className="text-ink-soft">· {event.city}</span>}
      </div>

      <h3 className="mt-2 font-display text-lg tracking-[-0.02em] leading-snug text-balance">
        {event.title}
      </h3>
      <p className="mt-2 text-sm text-ink-soft leading-relaxed line-clamp-3">{event.short_description}</p>

      <dl className="mt-4 space-y-1.5 text-xs text-ink-soft">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-3.5 w-3.5" />
          {formatEventDate(event.starts_at)}
        </div>
        {event.time_label && (
          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5" />
            {event.time_label}
          </div>
        )}
        {event.location && (
          <div className="flex items-center gap-2">
            {event.format === "online" ? <Monitor className="h-3.5 w-3.5" /> : <MapPin className="h-3.5 w-3.5" />}
            {event.location}
          </div>
        )}
      </dl>

      <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-ink group-hover:text-brand">
        Ver detalhes
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  );
}
