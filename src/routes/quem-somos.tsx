import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { motion } from "framer-motion";
import { ArrowUpRight, Mic, Users, Calendar, BookOpen, Sparkles } from "lucide-react";
import { InstagramIcon as Instagram } from "@/components/icons/SocialIcons";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/quem-somos")({
  head: () =>
    buildSeo({
      title: "Quem somos — SíndicoLab",
      description:
        "Workshops, encontros no CondoHuby, comunidade de síndicos e conteúdo editorial. Conheça o SíndicoLab — um laboratório vivo do mercado condominial.",
      path: "/quem-somos",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: "Quem somos — SíndicoLab",
        url: "https://sindicolab.com/quem-somos",
      },
    }),
  component: QuemSomosPage,
});

const timeline = [
  { y: "2019", t: "Primeiros encontros de síndicos profissionais com Rafael Bernardes." },
  { y: "2021", t: "Nasce o SíndicoLab como espaço editorial e comunidade." },
  { y: "2023", t: "Workshops mensais no CondoHuby começam a pautar o setor." },
  { y: "2025", t: "Lançamento do Play, Materiais e do hub Quero1Síndico." },
  { y: "2026", t: "Ecossistema integrado: portal, cursos, materiais e patrocínios." },
];

const stats = [
  ["12+", "Workshops por ano"],
  ["+100", "Síndicos por encontro"],
  ["150+", "Conteúdos publicados"],
  ["+12k", "Profissionais impactados"],
];

const fazemos = [
  { i: Calendar, t: "Workshops presenciais", d: "Encontros no CondoHuby que conectam síndicos, conselheiros, marcas e administradoras." },
  { i: BookOpen, t: "Curadoria editorial", d: "Portal com matérias, entrevistas e bastidores do mercado condominial." },
  { i: Mic, t: "Conteúdo em vídeo", d: "Episódios, recortes e bastidores publicados nos canais do SíndicoLab." },
  { i: Sparkles, t: "Cursos no Play", d: "Catálogo de formação contínua para síndicos e profissionais do setor." },
  { i: Users, t: "Comunidade ativa", d: "Rede de síndicos profissionais que trocam pautas, casos e oportunidades." },
];

const galeria = [
  "Workshop Inteligência condominial",
  "Encontro de síndicos · CondoHuby",
  "Bastidor — produção de conteúdo",
  "Workshop jurídico de alta performance",
  "Encontro temático — captação",
  "Edição especial — fim de ano",
  "Bastidor — gravação Play",
  "Encontro com administradoras",
];

function QuemSomosPage() {
  return (
    <main className="min-h-screen bg-background text-ink flex flex-col">
      <Header />
      <Breadcrumbs items={[{ label: "Quem somos" }]} />

      {/* Hero */}
      <section className="relative pt-6 md:pt-10 pb-16 overflow-hidden">
        <div className="absolute -top-28 -left-16 w-[26rem] h-[26rem] rounded-full bg-brand-soft opacity-55 -z-10 hero-blob" />
        <div className="container-x grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <p className="text-xs text-ink-soft">Quem é o SíndicoLab</p>
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mt-4 font-display text-4xl md:text-7xl tracking-[-0.04em] leading-[0.98] text-balance"
            >
              Um laboratório vivo do{" "}
              <span className="italic font-normal text-brand">mercado condominial</span>.
            </motion.h1>
            <p className="mt-6 max-w-xl text-ink-soft text-base md:text-lg leading-relaxed">
              Workshops, encontros, comunidade, conteúdo e relacionamento com síndicos profissionais,
              conselheiros, administradoras e marcas que pautam o setor.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-card">
              <p className="text-xs text-ink-soft">Fundador</p>
              <div className="mt-4 flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand to-violet" />
                <div>
                  <div className="font-display text-xl tracking-[-0.02em]">Rafael Bernardes</div>
                  <div className="text-sm text-ink-soft">Síndico profissional · curador · host</div>
                </div>
              </div>
              <p className="mt-5 text-sm text-ink-soft leading-relaxed">
                Criador do Quero1Síndico e articulador do ecossistema SíndicoLab no mercado
                condominial brasileiro.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Galeria */}
      <section className="border-t border-border py-16">
        <div className="container-x">
          <div className="flex items-end justify-between mb-8 gap-6">
            <h2 className="font-display text-2xl md:text-4xl tracking-[-0.03em]">
              Workshops e encontros no CondoHuby
            </h2>
            <span className="text-xs text-ink-soft hidden md:inline">Edição contínua</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {galeria.map((label, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="aspect-[4/5] rounded-xl bg-gradient-to-br from-brand-soft via-cyan-soft to-secondary relative overflow-hidden group border border-border"
              >
                <div className="absolute inset-0 pattern-grid-dark opacity-40 group-hover:opacity-20 transition" />
                <div className="absolute bottom-3 left-3 right-3 text-[12px] text-ink/80 leading-snug">
                  {label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* O que fazemos */}
      <section className="border-t border-border py-20">
        <div className="container-x">
          <h2 className="font-display text-2xl md:text-4xl tracking-[-0.03em] mb-10">
            O que o SíndicoLab faz
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {fazemos.map(({ i: Icon, t, d }) => (
              <div
                key={t}
                className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-3 min-h-[180px]"
              >
                <Icon className="w-5 h-5 text-brand" />
                <div className="font-display text-xl tracking-[-0.02em]">{t}</div>
                <div className="text-sm text-ink-soft leading-relaxed">{d}</div>
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

      {/* Comunidade e conteúdo */}
      <section className="border-t border-border py-20">
        <div className="container-x grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-border bg-card p-8 md:p-10">
            <p className="text-xs text-ink-soft">Comunidade</p>
            <h3 className="mt-3 font-display text-2xl md:text-3xl tracking-[-0.03em]">
              Síndicos profissionais que pautam o setor
            </h3>
            <p className="mt-4 text-ink-soft leading-relaxed">
              Uma rede que cresce a cada workshop, encontro e edição. Decisores reais, com
              orçamento, processos e responsabilidade na ponta.
            </p>
            <a href="/quero1sindico" className="btn-ghost mt-6">
              Conhecer Quero1Síndico <ArrowUpRight className="w-4 h-4 btn-arrow" />
            </a>
          </div>

          <div className="rounded-3xl border border-border bg-card p-8 md:p-10">
            <p className="text-xs text-ink-soft">Conteúdo</p>
            <h3 className="mt-3 font-display text-2xl md:text-3xl tracking-[-0.03em]">
              Portal, vídeos e cursos
            </h3>
            <p className="mt-4 text-ink-soft leading-relaxed">
              Matérias editoriais, episódios em vídeo e um catálogo de cursos que profissionalizam o
              dia a dia do síndico.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="/portal" className="btn-ghost">
                Ler o Portal <ArrowUpRight className="w-4 h-4 btn-arrow" />
              </a>
              <a href="/play" className="btn-ghost">
                Ver cursos no Play <ArrowUpRight className="w-4 h-4 btn-arrow" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-t border-border py-20">
        <div className="container-x">
          <h2 className="font-display text-2xl md:text-4xl tracking-[-0.03em] mb-10">
            Linha do tempo
          </h2>
          <ol className="relative border-l border-border ml-3 space-y-8">
            {timeline.map((t) => (
              <li key={t.y} className="pl-6 relative">
                <div className="absolute -left-[6px] w-3 h-3 rounded-full bg-brand mt-1.5" />
                <div className="text-xs text-brand font-mono">{t.y}</div>
                <div className="mt-1 font-display text-lg md:text-xl tracking-[-0.02em] text-balance">
                  {t.t}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA final */}
      <section className="border-t border-border py-20 bg-ink text-background">
        <div className="container-x flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <h2 className="font-display text-3xl md:text-5xl tracking-[-0.035em] max-w-2xl text-balance">
            Quer participar do próximo workshop ou patrocinar uma edição?
          </h2>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://instagram.com/sindicolab"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-background/30 text-background hover:bg-background hover:text-ink transition"
            >
              <Instagram className="w-4 h-4" /> @sindicolab
            </a>
            <a
              href="/play"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-background/30 text-background hover:bg-background hover:text-ink transition"
            >
              Ver cursos
            </a>
            <a
              href="/patrocinios"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-background text-ink font-medium hover:bg-brand hover:text-background transition shrink-0"
            >
              Falar com a equipe <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
