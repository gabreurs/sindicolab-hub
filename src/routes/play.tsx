import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { motion } from "framer-motion";
import { Play, Clock, Award, Users, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/play")({
  head: () => ({
    meta: [
      { title: "SíndicoLab Play — Cursos para síndicos e treinamentos condominiais" },
      {
        name: "description",
        content:
          "Plataforma de cursos para síndicos profissionais, conselheiros e equipes de condomínio. Trilhas de finanças, jurídico, manutenção e liderança.",
      },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "SíndicoLab Play — Cursos para síndicos" },
      {
        property: "og:description",
        content:
          "Catálogo de cursos e trilhas para profissionais do mercado condominial brasileiro.",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://sindicolab.com/play" }],
  }),
  component: PlayPage,
});

const trails = ["Em destaque", "Continue aprendendo", "Para síndicos novos", "Treinamentos para equipe", "Jurídico", "Finanças"];

const featured = {
  title: "Síndico profissional do zero ao primeiro condomínio",
  meta: "Trilha completa · 8h · Certificado",
  desc:
    "Do conceito à atuação prática: contratação, primeiros 90 dias, prestação de contas e relacionamento com conselho.",
};

const courseRows = [
  {
    title: "Em destaque",
    items: [
      { t: "Finanças condominiais", d: "6h", l: "Gestão" },
      { t: "Direito condominial aplicado", d: "10h", l: "Jurídico" },
      { t: "Comunicação em assembleia", d: "4h", l: "Liderança" },
      { t: "Manutenções obrigatórias", d: "5h", l: "Operação" },
    ],
  },
  {
    title: "Continue aprendendo",
    items: [
      { t: "Cobrança e inadimplência", d: "3h", l: "Finanças" },
      { t: "Contratos com prestadores", d: "4h", l: "Jurídico" },
      { t: "Câmeras e LGPD em condomínio", d: "2h", l: "Tecnologia" },
      { t: "Liderança de zeladoria", d: "3h", l: "Equipe" },
    ],
  },
  {
    title: "Treinamentos para equipe",
    items: [
      { t: "Atendimento de portaria", d: "2h", l: "Equipe" },
      { t: "Limpeza e padrão técnico", d: "3h", l: "Equipe" },
      { t: "Emergências em condomínio", d: "2h", l: "Segurança" },
      { t: "Comunicação com moradores", d: "2h", l: "Equipe" },
    ],
  },
];

function PlayPage() {
  return (
    <main className="min-h-screen bg-[#0a0b12] text-background flex flex-col">
      <Header />

      {/* Hero cinematográfico */}
      <section className="relative pt-28 md:pt-36 pb-16 overflow-hidden bg-[#0a0b12]">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-deep/40 via-[#0a0b12] to-brand-deep/30" />
        <div className="absolute inset-0 pattern-windows opacity-20" />
        <div
          aria-hidden
          className="absolute -top-40 right-0 w-[40rem] h-[40rem] rounded-full bg-brand/30 blur-[140px]"
        />

        <div className="container-x relative">
          <div className="text-[10px] uppercase tracking-[0.4em] text-cyan font-mono">
            SíndicoLab Play · Curso em destaque
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mt-5 font-display text-4xl md:text-7xl tracking-[-0.04em] leading-[0.98] max-w-3xl text-balance"
          >
            {featured.title}
          </motion.h1>
          <p className="mt-5 max-w-xl text-white/70 leading-relaxed">{featured.desc}</p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-background text-ink font-medium hover:bg-cyan transition">
              <Play className="w-4 h-4 fill-current" /> Assistir aula 1
            </button>
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition">
              + Minha lista
            </button>
            <div className="flex items-center gap-5 text-xs text-white/60 ml-2">
              <span className="inline-flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> 8h</span>
              <span className="inline-flex items-center gap-1.5"><Award className="w-3.5 h-3.5" /> Certificado</span>
              <span className="inline-flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> 1.2k alunos</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trilhas rail */}
      <section className="border-y border-white/10 bg-[#0a0b12]">
        <div className="container-x py-4 flex gap-6 overflow-x-auto">
          {trails.map((t, i) => (
            <button
              key={t}
              className={`text-sm whitespace-nowrap transition ${
                i === 0 ? "text-background border-b-2 border-cyan pb-3" : "text-white/50 hover:text-white pb-3"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      {/* Carrosséis */}
      {courseRows.map((row) => (
        <section key={row.title} className="bg-[#0a0b12] py-10">
          <div className="container-x">
            <div className="flex items-end justify-between mb-5">
              <h2 className="font-display text-xl md:text-2xl tracking-[-0.02em]">{row.title}</h2>
              <button className="inline-flex items-center text-xs text-white/60 hover:text-white">
                Ver tudo <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {row.items.map((c, i) => (
                <article
                  key={c.t}
                  className="group cursor-pointer rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-cyan/60 transition"
                >
                  <div className="aspect-video relative bg-gradient-to-br from-brand-deep via-violet-deep to-[#0a0b12] overflow-hidden">
                    <div className="absolute inset-0 pattern-grid opacity-20" />
                    <div className="absolute top-3 left-3 text-[9px] font-mono uppercase tracking-[0.25em] text-cyan bg-black/40 px-2 py-0.5 rounded">
                      {c.l}
                    </div>
                    <div className="absolute bottom-3 right-3 grid place-items-center w-10 h-10 rounded-full bg-cyan text-ink opacity-0 group-hover:opacity-100 transition">
                      <Play className="w-4 h-4 fill-current" />
                    </div>
                    <div className="absolute bottom-3 left-3 text-[10px] font-mono text-white/70">EP {i + 1}</div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-sm md:text-base tracking-[-0.01em] leading-snug">{c.t}</h3>
                    <div className="mt-2 text-[11px] text-white/50 inline-flex items-center gap-1.5">
                      <Clock className="w-3 h-3" /> {c.d}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA Treinamentos B2B */}
      <section className="bg-gradient-to-br from-brand-deep to-violet-deep py-20">
        <div className="container-x grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-cyan font-mono">Para administradoras</div>
            <h2 className="mt-3 font-display text-3xl md:text-5xl tracking-[-0.035em] leading-[1.02] text-balance">
              Treinamentos para a sua equipe condominial
            </h2>
            <p className="mt-4 text-white/80 max-w-md">
              Trilhas customizadas para zeladoria, portaria, conselho e equipes de administradoras.
            </p>
          </div>
          <div className="md:justify-self-end">
            <a
              href="mailto:contato@sindicolab.com"
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
