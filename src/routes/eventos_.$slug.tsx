import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CalendarDays, Clock, MapPin, Monitor, ArrowLeft, ArrowUpRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { eventsService, type SiteEvent } from "@/services/eventsService";
import { formatEventDate } from "./eventos";

export const Route = createFileRoute("/eventos_/$slug")({
  component: EventoPage,
});

function EventoPage() {
  const { slug } = Route.useParams();
  const [event, setEvent] = useState<SiteEvent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    eventsService
      .getBySlug(slug)
      .then((ev) => {
        if (!cancelled) setEvent(ev);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    if (event) document.title = `${event.title} | Eventos SíndicoLab`;
  }, [event]);

  const past = event ? eventsService.isPast(event) : false;
  const inscricao = event?.sympla_url ?? event?.external_url ?? null;

  return (
    <main className="min-h-screen bg-background text-ink flex flex-col">
      <Header />
      <Breadcrumbs items={[{ label: "Eventos", href: "/eventos" }, { label: event?.title ?? "Evento" }]} />

      {loading ? (
        <section className="container-x py-20">
          <div className="h-8 w-2/3 animate-pulse rounded bg-secondary" />
          <div className="mt-4 h-4 w-1/2 animate-pulse rounded bg-secondary" />
        </section>
      ) : !event ? (
        <section className="container-x py-24 text-center">
          <h1 className="font-display text-3xl tracking-[-0.03em]">Evento não encontrado</h1>
          <p className="mt-3 text-ink-soft">Este evento pode ter saído do ar ou mudado de endereço.</p>
          <Link
            to="/eventos"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm text-background hover:bg-brand"
          >
            <ArrowLeft className="h-4 w-4" /> Ver a agenda
          </Link>
        </section>
      ) : (
        <>
          <section className="pt-6 md:pt-8 pb-12 border-b border-border bg-secondary/40">
            <div className="container-x">
              <div className="text-[10px] font-mono tracking-tight text-brand">
                {past ? "Evento realizado" : event.format === "online" ? "Evento online" : "Evento presencial"}
              </div>
              <h1 className="mt-5 max-w-3xl text-balance font-display text-4xl leading-[0.98] tracking-[-0.04em] md:text-6xl">
                {event.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
                {event.short_description}
              </p>

              {event.cover_url && (
                <img
                  src={event.cover_url}
                  alt={event.title}
                  loading="lazy"
                  className="mt-8 aspect-[16/7] w-full rounded-2xl border border-border object-cover"
                />
              )}

              <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-ink-soft">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  {formatEventDate(event.starts_at)}
                </div>
                {event.time_label && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {event.time_label}
                  </div>
                )}
                {event.location && (
                  <div className="flex items-center gap-2">
                    {event.format === "online" ? <Monitor className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                    {event.location}
                  </div>
                )}
              </dl>

              {inscricao && !past && (
                <a
                  href={inscricao}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-medium text-background shadow-card transition-colors hover:bg-brand"
                >
                  Inscreva-se
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}
            </div>
          </section>

          <section className="border-b border-border py-14">
            <div className="container-x max-w-3xl">
              {event.content.split("\n\n").map((par, i) => (
                <p key={i} className="mb-5 text-base leading-relaxed text-ink-soft last:mb-0">
                  {par}
                </p>
              ))}

              <Link
                to="/eventos"
                className="mt-8 inline-flex items-center gap-2 text-sm text-ink-soft transition hover:text-ink"
              >
                <ArrowLeft className="h-4 w-4" /> Voltar para a agenda
              </Link>
            </div>
          </section>
        </>
      )}

      <Footer />
    </main>
  );
}
