import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { motion } from "framer-motion";
import { Download, ArrowUpRight, Sparkles, Mic, Calendar, Users } from "lucide-react";

export const Route = createFileRoute("/patrocinios")({
  head: () => ({
    meta: [
      { title: "Mídia Kit — Patrocínios CondoHuby × SíndicoLab" },
      {
        name: "description",
        content:
          "Patrocine workshops, conteúdo e experiências para decisores do mercado condominial brasileiro. Mídia kit CondoHuby × SíndicoLab.",
      },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Mídia Kit CondoHuby × SíndicoLab" },
      {
        property: "og:description",
        content:
          "Conecte sua marca a síndicos, conselheiros e administradoras por meio de patrocínio e mídia condominial.",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://sindicolab.com/patrocinios" }],
  }),
  component: PatrociniosPage,
});

const numbers = [
  { n: "+12k", l: "Síndicos e conselheiros impactados por ano" },
  { n: "+50", l: "Workshops e ativações em condomínios e CondoHub" },
  { n: "+150", l: "Episódios e conteúdos editoriais publicados" },
  { n: "R$ 80bi", l: "Mercado condominial brasileiro endereçável" },
];

const formats = [
  { icon: Calendar, t: "Workshops presenciais", d: "Eventos com curadoria no CondoHub e em capitais." },
  { icon: Mic, t: "Coproduções editoriais", d: "Episódios, séries e reportagens com sua marca." },
  { icon: Users, t: "Mesas com decisores", d: "Encontros fechados com síndicos e administradoras." },
  { icon: Sparkles, t: "Ativações de marca", d: "Branded content, naming e experiências on/off." },
];

function PatrociniosPage() {
  return (
    <main className="min-h-screen bg-[#0e0820] text-background flex flex-col">
      <Header />

      {/* Hero mídia kit roxo profundo */}
      <section className="relative pt-32 md:pt-44 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-deep via-[#0e0820] to-[#08040f]" />
        <div
          aria-hidden
          className="absolute -top-40 -right-20 w-[40rem] h-[40rem] rounded-full bg-violet/40 blur-[140px]"
        />
        <div aria-hidden className="absolute inset-0 pattern-windows opacity-20" />

        <div className="container-x relative">
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] font-mono text-white/70">
            <span className="px-2.5 py-1 rounded-full border border-white/20">Mídia Kit 2026</span>
            <span>CondoHuby × SíndicoLab</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mt-8 font-display text-5xl md:text-8xl tracking-[-0.045em] leading-[0.95] max-w-5xl text-balance"
          >
            Conecte sua marca a quem <span className="italic text-white/70">decide</span> no condomínio.
          </motion.h1>

          <p className="mt-7 max-w-2xl text-white/70 text-lg leading-relaxed">
            Síndicos profissionais, conselheiros, administradoras e gestores de patrimônio.
            O ecossistema mais relevante do mercado condominial brasileiro, agora aberto a parceiros.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="/midia-kit-sindicolab.pdf"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-background text-ink font-medium hover:bg-violet hover:text-background transition"
            >
              <Download className="w-4 h-4" /> Baixar mídia kit
            </a>
            <a
              href="mailto:patrocinios@sindicolab.com"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/25 hover:bg-white/10 transition"
            >
              Falar com a equipe <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Big numbers */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-10">
            {numbers.map((n) => (
              <div key={n.l}>
                <div className="font-display text-4xl md:text-6xl tracking-[-0.04em] bg-clip-text text-transparent bg-gradient-to-br from-white to-violet/70">
                  {n.n}
                </div>
                <div className="mt-2 text-xs text-white/60 leading-snug max-w-[18ch]">{n.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formatos de patrocínio */}
      <section className="bg-[#08040f] border-t border-white/10 py-20">
        <div className="container-x">
          <div className="text-[10px] uppercase tracking-[0.4em] font-mono text-violet">
            Formatos de patrocínio
          </div>
          <h2 className="mt-4 font-display text-3xl md:text-5xl tracking-[-0.035em] max-w-3xl text-balance">
            Da experiência ao vivo ao conteúdo editorial.
          </h2>

          <div className="mt-12 grid md:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
            {formats.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.t}
                  className="bg-[#0e0820] p-8 md:p-10 hover:bg-violet-deep/40 transition group"
                >
                  <Icon className="w-6 h-6 text-violet" />
                  <h3 className="mt-6 font-display text-2xl md:text-3xl tracking-[-0.03em]">{f.t}</h3>
                  <p className="mt-3 text-white/60 leading-relaxed max-w-md">{f.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Workshops + audiência */}
      <section className="bg-[#0e0820] py-20 border-t border-white/10">
        <div className="container-x grid lg:grid-cols-2 gap-14">
          <div>
            <div className="text-[10px] uppercase tracking-[0.4em] font-mono text-violet">Workshops</div>
            <h2 className="mt-4 font-display text-3xl md:text-5xl tracking-[-0.035em] text-balance">
              Encontros que pautam o mercado condominial.
            </h2>
            <p className="mt-5 text-white/60 max-w-md">
              Curadoria CondoHuby + SíndicoLab. Salas fechadas, conteúdo de alto nível e relacionamento
              real com decisores.
            </p>
            <ul className="mt-8 space-y-4 text-white/80">
              {[
                "Síndico Talks — encontros mensais no CondoHub",
                "Mesas executivas para administradoras",
                "Workshops temáticos com marcas patrocinadoras",
                "Cobertura editorial e distribuição multicanal",
              ].map((i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-violet">→</span>
                  {i}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-[0.4em] font-mono text-violet">Audiência</div>
            <h2 className="mt-4 font-display text-3xl md:text-5xl tracking-[-0.035em] text-balance">
              Quem está do outro lado.
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-6">
              {[
                ["72%", "Síndicos profissionais"],
                ["18%", "Conselheiros e moradores ativos"],
                ["10%", "Administradoras e parceiros"],
                ["+25 cidades", "Cobertura nacional"],
              ].map(([n, l]) => (
                <div key={l} className="border border-white/10 rounded-xl p-5 bg-white/[0.02]">
                  <div className="font-display text-2xl md:text-3xl tracking-[-0.03em] text-white">{n}</div>
                  <div className="mt-1 text-xs text-white/55 leading-snug">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="relative bg-gradient-to-br from-violet-deep via-[#0e0820] to-[#08040f] py-24 border-t border-white/10">
        <div className="container-x text-center">
          <h2 className="font-display text-4xl md:text-6xl tracking-[-0.04em] leading-[1.0] max-w-3xl mx-auto text-balance">
            Vamos desenhar a sua próxima ativação no mercado condominial?
          </h2>
          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            <a
              href="/midia-kit-sindicolab.pdf"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-background text-ink font-medium hover:bg-violet hover:text-background transition"
            >
              <Download className="w-4 h-4" /> Baixar mídia kit
            </a>
            <a
              href="mailto:patrocinios@sindicolab.com"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/25 hover:bg-white/10 transition"
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
