import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/quem-somos")({
  head: () => ({
    meta: [
      { title: "Quem somos — SíndicoLab, ecossistema do mercado condominial" },
      {
        name: "description",
        content:
          "O SíndicoLab nasceu para profissionalizar o mercado condominial brasileiro: workshops, conteúdo, cursos e relacionamento com síndicos profissionais.",
      },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Quem é o SíndicoLab" },
      {
        property: "og:description",
        content: "Workshops, comunidade e curadoria editorial no mercado condominial.",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://sindicolab.com/quem-somos" }],
  }),
  component: QuemSomosPage,
});

const timeline = [
  { y: "2019", t: "Primeiros encontros de síndicos profissionais com Rafael Bernardes." },
  { y: "2021", t: "Nasce o SíndicoLab como espaço editorial e de comunidade." },
  { y: "2023", t: "Workshops mensais no CondoHub começam a pautar o mercado." },
  { y: "2025", t: "Lançamento do Play, Materiais e do hub Quero1Síndico." },
  { y: "2026", t: "Ecossistema integrado: portal, cursos, materiais e patrocínios." },
];

const stats = [
  ["12+", "Workshops por ano com síndicos e parceiros"],
  ["+100", "Síndicos por encontro presencial"],
  ["150+", "Episódios e conteúdos publicados"],
  ["+12k", "Profissionais impactados anualmente"],
];

function QuemSomosPage() {
  return (
    <main className="min-h-screen bg-background text-ink flex flex-col">
      <Header />

      {/* Hero humano */}
      <section className="relative pt-32 md:pt-44 pb-20 overflow-hidden">
        <div className="absolute -top-32 -left-20 w-[36rem] h-[36rem] rounded-full bg-brand-soft blur-[120px] opacity-70 -z-10" />
        <div className="container-x grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <div className="text-[10px] uppercase tracking-[0.4em] text-brand font-mono">
              Quem é o SíndicoLab
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mt-6 font-display text-4xl md:text-7xl tracking-[-0.04em] leading-[0.98] text-balance"
            >
              Um laboratório vivo do{" "}
              <span className="text-gradient-lab italic font-normal">mercado condominial</span>.
            </motion.h1>
            <p className="mt-6 max-w-xl text-ink-soft text-base md:text-lg leading-relaxed">
              Existimos no mundo real: workshops, encontros, comunidade, conteúdo e relacionamento
              com síndicos profissionais, conselheiros, administradoras e marcas que pautam o setor.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-card">
              <div className="text-[10px] uppercase tracking-[0.3em] text-brand font-mono">Fundador</div>
              <div className="mt-4 flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand to-violet" />
                <div>
                  <div className="font-display text-xl tracking-[-0.02em]">Rafael Bernardes</div>
                  <div className="text-sm text-ink-soft">Fundador · Curadoria · Host dos workshops</div>
                </div>
              </div>
              <p className="mt-5 text-sm text-ink-soft leading-relaxed">
                Síndico profissional, criador do Quero1Síndico e articulador do ecossistema SíndicoLab
                no mercado condominial brasileiro.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Galeria de eventos */}
      <section className="border-t border-border py-16">
        <div className="container-x">
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-display text-2xl md:text-4xl tracking-[-0.03em]">
              Workshops e encontros no CondoHub
            </h2>
            <span className="text-xs uppercase tracking-[0.3em] text-ink-soft hidden md:inline">
              Edição contínua
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div
                key={i}
                className="aspect-[4/5] rounded-xl bg-gradient-to-br from-brand-soft via-cyan-soft to-secondary relative overflow-hidden group"
              >
                <div className="absolute inset-0 pattern-grid-dark opacity-40 group-hover:opacity-20 transition" />
                <div className="absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.25em] text-ink/60 font-mono">
                  Edição {String(i + 1).padStart(2, "0")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-t border-border py-16 bg-secondary/40">
        <div className="container-x grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(([n, l]) => (
            <div key={l}>
              <div className="font-display text-4xl md:text-5xl tracking-[-0.04em]">{n}</div>
              <div className="mt-2 text-sm text-ink-soft max-w-[20ch] leading-snug">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="border-t border-border py-20">
        <div className="container-x">
          <h2 className="font-display text-2xl md:text-4xl tracking-[-0.03em] mb-10">Linha do tempo</h2>
          <ol className="relative border-l border-border ml-3 space-y-8">
            {timeline.map((t) => (
              <li key={t.y} className="pl-6">
                <div className="absolute -left-[6px] w-3 h-3 rounded-full bg-brand mt-1.5" />
                <div className="text-[10px] uppercase tracking-[0.3em] text-brand font-mono">{t.y}</div>
                <div className="mt-1 font-display text-lg md:text-xl tracking-[-0.02em] text-balance">
                  {t.t}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-20 bg-ink text-background">
        <div className="container-x flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <h2 className="font-display text-3xl md:text-5xl tracking-[-0.035em] max-w-2xl text-balance">
            Quer participar do próximo workshop ou patrocinar uma edição?
          </h2>
          <a
            href="mailto:contato@sindicolab.com"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-background text-ink font-medium hover:bg-brand hover:text-background transition shrink-0"
          >
            Falar com a equipe <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
