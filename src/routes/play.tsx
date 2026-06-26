import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Award, Clock, Flame, ChevronRight, ChevronLeft } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { cursos, trilhas, type Curso } from "@/data/cursos";
import { buildSeo } from "@/lib/seo";

const FEATURED_SLUGS = [
  "inteligencia-condominial",
  "inteligencia-condominial-2",
  "como-captar-mais-clientes",
  "conselheiros",
  "sindico-de-alta-performance",
];
const featuredCourses: Curso[] = FEATURED_SLUGS
  .map((s) => cursos.find((c) => c.slug === s))
  .filter(Boolean) as Curso[];

export const Route = createFileRoute("/play")({
  head: () =>
    buildSeo({
      title: "SíndicoLab Play — Catálogo de cursos para síndicos e equipes",
      description:
        "Catálogo de cursos do SíndicoLab Play: gestão condominial, jurídico, captação, equipe e materiais. Compra e acesso pelas plataformas oficiais (Kiwify/Hotmart).",
      path: "/play",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Cursos SíndicoLab Play",
        itemListElement: featuredCourses.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.titulo,
          url: `https://sindicolab.com/play#${c.slug}`,
        })),
      },
    }),
  component: PlayPage,
});

function PlayPage() {
  const [trilha, setTrilha] = useState<(typeof trilhas)[number]>("Em destaque");

  const rows = useMemo(() => {
    if (trilha === "Em destaque") {
      return [
        { titulo: "Mais procurados desta semana", lista: cursos.slice(0, 6) },
        {
          titulo: "Sugestões para um próximo passo",
          lista: cursos.filter((c) => c.categoria === "Para síndicos").slice(0, 6),
        },
        {
          titulo: "Treinamentos para a equipe condominial",
          lista: cursos.filter((c) => c.categoria === "Equipe condominial"),
        },
        {
          titulo: "Para administradoras",
          lista: cursos.filter((c) => c.categoria === "Administradoras"),
        },
        {
          titulo: "Materiais e ferramentas",
          lista: cursos.filter((c) => c.categoria === "Materiais & ferramentas"),
        },
      ].filter((r) => r.lista.length > 0);
    }
    return [{ titulo: trilha, lista: cursos.filter((c) => c.categoria === trilha) }];
  }, [trilha]);

  return (
    <main className="play-page min-h-screen text-background flex flex-col overflow-x-hidden">
      <Header />

      <FeaturedHero items={featuredCourses} />

      {/* Submenu de trilhas — abaixo da hero, sticky com altura fixa */}
      <nav
        aria-label="Trilhas"
        className="play-subnav sticky top-[72px] z-30 border-y border-white/10 bg-[#0a0b12]/96"
      >
        <div className="container-x py-3">
          <div className="horizontal-list flex gap-2 md:gap-3 -mx-1 px-1 snap-x scroll-smooth">
            {trilhas.map((t) => {
              const ativo = t === trilha;
              return (
                <button
                  key={t}
                  onClick={() => setTrilha(t)}
                  className={`text-xs md:text-sm whitespace-nowrap px-3.5 py-2 rounded-md transition ${
                    ativo
                      ? "bg-background text-ink font-medium"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Carrosséis */}
      {rows.map((row) => (
        <Carousel key={row.titulo} titulo={row.titulo} cursos={row.lista} />
      ))}

      {/* Treinamentos para equipe (B2B) */}
      <section className="bg-gradient-to-br from-brand-deep to-violet-deep py-16 md:py-20 mt-6">
        <div className="container-x grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="text-xs text-cyan">Para administradoras</div>
            <h2 className="mt-3 font-display text-3xl md:text-5xl tracking-[-0.035em] leading-[1.02] text-balance">
              Treinamentos para a sua equipe condominial
            </h2>
            <p className="mt-4 text-white/80 max-w-md">
              Trilhas customizadas para zeladoria, portaria, conselho e equipes de administradoras.
              Conteúdo entregue via Kiwify/Hotmart, com selo SíndicoLab.
            </p>
          </div>
          <div className="md:justify-self-end">
            <a
              href="mailto:contato@sindicolab.com?subject=Treinamentos%20SindicoLab%20Play"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-background text-ink font-medium hover:bg-cyan transition"
            >
              Falar com a equipe Play <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Carousel({ titulo, cursos }: { titulo: string; cursos: Curso[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.85), behavior: "smooth" });
  };
  return (
    <section className="py-7 md:py-9">
      <div className="container-x">
        <div className="flex items-end justify-between mb-4">
          <h2 className="font-display text-xl md:text-2xl tracking-[-0.02em]">{titulo}</h2>
          <div className="hidden md:flex gap-2">
            <button
              aria-label="Anterior"
              onClick={() => scroll(-1)}
              className="w-9 h-9 grid place-items-center rounded-md border border-white/15 text-white/70 hover:border-white/40 hover:text-white transition"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
            </button>
            <button
              aria-label="Próximo"
              onClick={() => scroll(1)}
              className="w-9 h-9 grid place-items-center rounded-md border border-white/15 text-white/70 hover:border-white/40 hover:text-white transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden">
        <div className="container-x">
          <div
            ref={ref}
            className="courses-track flex gap-4 md:gap-5 pb-4 -mr-4 md:-mr-6 pr-4 md:pr-6 scroll-smooth snap-x overflow-x-auto"
          >
            {cursos.map((c) => (
              <CursoCard key={c.slug} curso={c} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CursoCard({ curso }: { curso: Curso }) {
  return (
    <motion.a
      id={`curso-${curso.slug}`}
      href={curso.url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="course-card card group relative shrink-0 w-[260px] md:w-[320px] snap-start rounded-md overflow-hidden bg-white/5 border border-white/10 hover:border-cyan/60 transition"
    >
      {/* thumb 16:9 — cover, sem cortar de forma grotesca via object-position center top */}
      <div className="course-thumb">
        <img
          src={curso.capa}
          alt={curso.titulo}
          loading="lazy"
          decoding="async"
          className="course-thumb-cover"
        />
        {curso.preco && (
          <div className="absolute z-[2] top-2 right-2 px-2 py-0.5 rounded bg-black/75 text-[10px] font-mono text-cyan">
            {curso.preco}
          </div>
        )}
      </div>

      <div className="p-3.5 flex flex-col flex-1">
        <div className="text-[11px] text-white/55">{curso.categoria}</div>
        <h3 className="mt-1.5 font-display text-base leading-tight text-white text-balance line-clamp-2">
          {curso.titulo}
        </h3>
        <div className="card-footer mt-2 flex items-center justify-between text-[11px] text-white/65">
          <div className="flex items-center gap-3">
            {curso.certificado && (
              <span className="inline-flex items-center gap-1">
                <Award className="w-3 h-3" /> Certificado
              </span>
            )}
            {curso.acesso && (
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3 h-3" /> 90 dias
              </span>
            )}
          </div>
          <span className="inline-flex items-center gap-1 text-cyan opacity-0 group-hover:opacity-100 transition">
            Ver curso <ArrowUpRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </motion.a>
  );
}

/* ───────────── Featured Hero rotativa ───────────── */
function FeaturedHero({ items }: { items: Curso[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = typeof window !== "undefined"
    ? window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    : false;

  useEffect(() => {
    if (paused || reduced || items.length < 2) return;
    const t = window.setInterval(() => setI((n) => (n + 1) % items.length), 7500);
    return () => window.clearInterval(t);
  }, [paused, reduced, items.length]);

  const c = items[i];
  if (!c) return null;
  const go = (delta: number) => setI((n) => (n + delta + items.length) % items.length);

  return (
    <section
      aria-label="Cursos em destaque"
      className="play-hero relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* crossfade de imagens de fundo */}
      <AnimatePresence mode="sync">
        <motion.div
          key={c.slug}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="play-hero-bg"
          style={{ backgroundImage: `url(${c.capa})` }}
          aria-hidden
        />
      </AnimatePresence>

      <div className="relative z-[2] hidden md:block">
        <Breadcrumbs
          tone="dark"
          items={[{ label: "Play" }]}
          className="!pt-20"
        />
      </div>

      <div className="relative container-x pt-8 md:pt-10 pb-12 md:pb-16 min-h-[clamp(460px,78vh,720px)] flex flex-col justify-end">
        <AnimatePresence mode="wait">
          <motion.div
            key={c.slug}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 text-xs text-cyan">
              <Flame className="w-3.5 h-3.5" /> {c.destaque ?? "Curso em destaque"}
            </div>
            <h1 className="mt-4 font-display text-4xl md:text-6xl tracking-[-0.035em] leading-[1.0] text-balance text-white">
              {c.titulo}
            </h1>
            <p className="mt-4 text-white/85 leading-relaxed text-base md:text-lg max-w-xl">
              {c.resumo}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/75">
              {c.acesso && (
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> {c.acesso}
                </span>
              )}
              {c.certificado && (
                <span className="inline-flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" /> Certificado
                </span>
              )}
              {c.preco && <span className="font-mono text-cyan">{c.preco}</span>}
              <span className="text-white/45">Plataforma: Kiwify / Hotmart</span>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-background text-ink font-medium hover:bg-cyan transition"
              >
                Ver curso <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href={`#curso-${c.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-white/25 text-white hover:bg-white/10 transition"
              >
                Mais informações
              </a>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controles */}
        <div className="mt-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {items.map((it, idx) => (
              <button
                key={it.slug}
                onClick={() => setI(idx)}
                aria-label={`Ir para ${it.titulo}`}
                className={`h-1.5 rounded-full transition-all ${
                  idx === i ? "w-8 bg-cyan" : "w-4 bg-white/25 hover:bg-white/45"
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              aria-label="Curso anterior"
              onClick={() => go(-1)}
              className="w-10 h-10 grid place-items-center rounded-full border border-white/20 text-white/80 hover:border-white/60 hover:text-white transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              aria-label="Próximo curso"
              onClick={() => go(1)}
              className="w-10 h-10 grid place-items-center rounded-full border border-white/20 text-white/80 hover:border-white/60 hover:text-white transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
