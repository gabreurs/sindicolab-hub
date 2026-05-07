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
          titulo: "Que tal um treinamento para sua equipe?",
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
    <main className="min-h-screen bg-[#0a0b12] text-background flex flex-col">
      <Header />

      {/* HERO cinematográfico — curso em destaque */}
      <section className="relative pt-28 md:pt-36 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-deep/50 via-[#0a0b12] to-brand-deep/40" />
        <div
          aria-hidden
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: `url(${cursoEmDestaque.capa})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(60px) saturate(120%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b12] via-[#0a0b12]/85 to-[#0a0b12]/30" />

        <div className="container-x relative grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] tracking-tight text-cyan font-mono">
              <Flame className="w-3.5 h-3.5" /> {cursoEmDestaque.destaque ?? "Curso em destaque"}
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mt-5 font-display text-4xl md:text-7xl tracking-[-0.04em] leading-[0.95] max-w-3xl text-balance"
            >
              {cursoEmDestaque.titulo}
            </motion.h1>
            <p className="mt-5 max-w-xl text-white/75 leading-relaxed text-base md:text-lg">
              {cursoEmDestaque.resumo}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={cursoEmDestaque.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-background text-ink font-medium hover:bg-cyan transition"
              >
                Ver curso <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href={`#curso-${cursoEmDestaque.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition"
              >
                Mais informações
              </a>
              <div className="flex items-center gap-5 text-xs text-white/60 ml-1">
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
            </div>

            <p className="mt-6 text-[11px] tracking-tight text-white/40 font-mono">
              Compra e acesso pela plataforma oficial · Kiwify / Hotmart
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative justify-self-center lg:justify-self-end"
          >
            <div className="aspect-[3/4] w-[260px] md:w-[340px] rounded-2xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] ring-1 ring-white/10">
              <img
                src={cursoEmDestaque.capa}
                alt={cursoEmDestaque.titulo}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trilhas */}
      <section className="border-y border-white/10 sticky top-[60px] z-30 bg-[#0a0b12]/85 backdrop-blur">
        <div className="container-x py-3 flex gap-2 md:gap-6 overflow-x-auto scrollbar-none">
          {trilhas.map((t) => {
            const ativo = t === trilha;
            return (
              <button
                key={t}
                onClick={() => setTrilha(t)}
                className={`text-xs md:text-sm whitespace-nowrap px-3 py-2 rounded-full transition ${
                  ativo
                    ? "bg-background text-ink font-medium"
                    : "text-white/55 hover:text-white"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </section>

      {/* Carrosséis */}
      {rows.map((row) => (
        <Carousel key={row.titulo} titulo={row.titulo} cursos={row.lista} />
      ))}

      {/* Treinamentos para equipe (B2B) */}
      <section className="bg-gradient-to-br from-brand-deep to-violet-deep py-20 mt-6">
        <div className="container-x grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="text-[10px] tracking-tight text-cyan font-mono">
              Para administradoras
            </div>
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
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-background text-ink font-medium hover:bg-cyan transition"
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
    <section className="py-8 md:py-10">
      <div className="container-x">
        <div className="flex items-end justify-between mb-5">
          <h2 className="font-display text-xl md:text-2xl tracking-[-0.02em]">{titulo}</h2>
          <div className="hidden md:flex gap-2">
            <button
              aria-label="Anterior"
              onClick={() => scroll(-1)}
              className="w-9 h-9 grid place-items-center rounded-full border border-white/15 text-white/70 hover:border-white/40 hover:text-white transition"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
            </button>
            <button
              aria-label="Próximo"
              onClick={() => scroll(1)}
              className="w-9 h-9 grid place-items-center rounded-full border border-white/15 text-white/70 hover:border-white/40 hover:text-white transition"
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
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group relative shrink-0 w-[180px] md:w-[220px] snap-start rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-cyan/60 transition"
    >
      <div className="aspect-[3/4] relative overflow-hidden">
        <img
          src={curso.capa}
          alt={curso.titulo}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/0 to-black/0" />
        {curso.preco && (
          <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur text-[10px] font-mono text-cyan">
            {curso.preco}
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="font-display text-sm md:text-base leading-tight text-white text-balance line-clamp-2">
            {curso.titulo}
          </h3>
          <div className="mt-1.5 flex items-center gap-2 text-[10px] text-white/70">
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
        </div>
      </div>
      <div className="p-3 flex items-center justify-between">
        <span className="text-[10px] tracking-tight text-white/50 font-mono">
          {curso.categoria}
        </span>
        <span className="inline-flex items-center gap-1 text-[11px] text-cyan opacity-0 group-hover:opacity-100 transition">
          Ver curso <ArrowUpRight className="w-3 h-3" />
        </span>
      </div>
    </motion.a>
  );
}
