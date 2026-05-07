import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { motion } from "framer-motion";
import { ArrowUpRight, Award, Clock, Flame, ChevronRight } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { cursos, cursoEmDestaque, trilhas, type Curso } from "@/data/cursos";

export const Route = createFileRoute("/play")({
  head: () => ({
    meta: [
      { title: "SíndicoLab Play — Catálogo de cursos para síndicos e equipes" },
      {
        name: "description",
        content:
          "Catálogo de cursos do SíndicoLab Play: gestão condominial, jurídico, captação, equipe e materiais. Compra e acesso pelas plataformas oficiais (Kiwify/Hotmart).",
      },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "SíndicoLab Play — Cursos para síndicos" },
      {
        property: "og:description",
        content:
          "Vitrine completa dos cursos do SíndicoLab para síndicos profissionais, conselheiros, zeladoria, portaria e administradoras.",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://sindicolab.com/play" }],
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
    <main className="min-h-screen bg-[#0a0b12] text-background flex flex-col overflow-x-hidden">
      <Header />

      {/* HERO Netflix-style — background full-width, overlay escuro, conteúdo à esquerda */}
      <section
        className="relative min-h-[72svh] md:min-h-[80svh] flex items-end overflow-hidden"
        aria-label="Curso em destaque"
      >
        {/* background image full-width */}
        <img
          src={cursoEmDestaque.capa}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* overlay escuro: bottom→top + left→right */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b12] via-[#0a0b12]/80 to-[#0a0b12]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0b12] via-[#0a0b12]/70 to-transparent" />

        <div className="relative container-x pt-32 md:pt-40 pb-12 md:pb-16">
          <div className="inline-flex items-center gap-2 text-xs text-cyan">
            <Flame className="w-3.5 h-3.5" /> {cursoEmDestaque.destaque ?? "Curso em destaque"}
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4 font-display text-4xl md:text-6xl lg:text-7xl tracking-[-0.04em] leading-[0.98] max-w-3xl text-balance"
          >
            {cursoEmDestaque.titulo}
          </motion.h1>
          <p className="mt-5 max-w-xl text-white/80 leading-relaxed text-base md:text-lg">
            {cursoEmDestaque.resumo}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/70">
            {cursoEmDestaque.acesso && (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> {cursoEmDestaque.acesso}
              </span>
            )}
            {cursoEmDestaque.certificado && (
              <span className="inline-flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" /> Certificado
              </span>
            )}
            {cursoEmDestaque.preco && (
              <span className="font-mono text-cyan">{cursoEmDestaque.preco}</span>
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={cursoEmDestaque.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-background text-ink font-medium hover:bg-cyan transition"
            >
              Ver curso <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href={`#curso-${cursoEmDestaque.slug}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-white/25 text-white hover:bg-white/10 transition"
            >
              Mais informações
            </a>
          </div>

          <p className="mt-5 text-[11px] text-white/45">
            Compra e acesso pela plataforma oficial — Kiwify / Hotmart.
          </p>
        </div>
      </section>

      {/* Submenu de trilhas — abaixo da hero, sticky com altura fixa */}
      <nav
        aria-label="Trilhas"
        className="sticky top-16 md:top-[72px] z-20 border-y border-white/10 bg-[#0a0b12]/92 backdrop-blur"
      >
        <div className="container-x py-3">
          <div className="flex gap-2 md:gap-3 overflow-x-auto scrollbar-none -mx-1 px-1">
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

      <div
        ref={ref}
        className="flex gap-4 md:gap-5 overflow-x-auto px-[max(1rem,calc((100vw-1280px)/2+1rem))] pb-4 scroll-smooth snap-x scrollbar-none"
      >
        {cursos.map((c) => (
          <CursoCard key={c.slug} curso={c} />
        ))}
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
      className="group relative shrink-0 w-[260px] md:w-[320px] snap-start rounded-md overflow-hidden bg-white/5 border border-white/10 hover:border-cyan/60 transition"
    >
      {/* thumb 16:9 — capa inteira sem corte: blur de fundo + contain por cima */}
      <div className="course-thumb relative aspect-video bg-[#050812] overflow-hidden">
        <img
          src={curso.capa}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-40"
        />
        <img
          src={curso.capa}
          alt={curso.titulo}
          loading="lazy"
          decoding="async"
          className="relative z-[1] w-full h-full object-contain"
        />
        {curso.preco && (
          <div className="absolute z-[2] top-2 right-2 px-2 py-0.5 rounded bg-black/65 backdrop-blur text-[10px] font-mono text-cyan">
            {curso.preco}
          </div>
        )}
      </div>

      <div className="p-3.5">
        <div className="text-[11px] text-white/55">{curso.categoria}</div>
        <h3 className="mt-1.5 font-display text-base leading-tight text-white text-balance line-clamp-2">
          {curso.titulo}
        </h3>
        <div className="mt-2 flex items-center justify-between text-[11px] text-white/65">
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
