import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, TrendingUp, Mail, PlayCircle } from "lucide-react";

export const Route = createFileRoute("/portal")({
  head: () => ({
    meta: [
      { title: "Portal SíndicoLab — Notícias e conteúdo de gestão condominial" },
      {
        name: "description",
        content:
          "Portal de notícias e análises sobre gestão condominial, segurança, assembleias, comportamento, tecnologia e mercado condominial brasileiro.",
      },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Portal SíndicoLab — Conteúdo condominial de referência" },
      {
        property: "og:description",
        content:
          "Manchetes, casos reais e análises do mercado condominial para síndicos profissionais e conselheiros.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Portal SíndicoLab" },
      { name: "twitter:description", content: "Conteúdo editorial de gestão condominial." },
    ],
    links: [{ rel: "canonical", href: "https://sindicolab.com/portal" }],
  }),
  component: PortalPage,
});

const categories = [
  "Gestão condominial",
  "Segurança condominial",
  "Comportamento",
  "Assembleias",
  "Casos reais",
  "Tecnologia",
  "Manutenção",
  "Mercado",
];

const trending = [
  "Reajuste de taxa condominial em 2026",
  "Síndico profissional: regulamentação avança",
  "Câmeras com IA em áreas comuns",
  "Inadimplência: o que mudou na cobrança",
  "Assembleias híbridas: validade jurídica",
];

const featured = [
  {
    cat: "Mercado condominial",
    title: "O novo perfil do síndico profissional brasileiro em 2026",
    excerpt:
      "Pesquisa inédita mostra como a profissionalização avançou no último ano, quanto ganham os síndicos e onde estão concentrados.",
    read: "8 min",
  },
  {
    cat: "Assembleias",
    title: "Como conduzir uma assembleia condominial sem rachar o prédio",
    excerpt: "Roteiro, atas, votação e mediação de conflitos com base em casos reais.",
    read: "6 min",
  },
];

const grid = [
  { cat: "Segurança", title: "Portaria remota: o que avaliar antes de implantar", read: "5 min" },
  { cat: "Manutenção", title: "Calendário de manutenções obrigatórias por NBR", read: "7 min" },
  { cat: "Comportamento", title: "Pets, barulho e convivência em condomínio", read: "4 min" },
  { cat: "Tecnologia", title: "Aplicativos de comunicação que realmente funcionam", read: "5 min" },
  { cat: "Casos reais", title: "Como um síndico reduziu 38% da conta de água", read: "6 min" },
  { cat: "Jurídico", title: "Multas e advertências: o que diz a Lei 14.905/24", read: "9 min" },
];

function PortalPage() {
  return (
    <main className="min-h-screen bg-background text-ink flex flex-col">
      <Header />

      {/* Editorial top bar */}
      <section className="pt-32 md:pt-36 border-b border-border">
        <div className="container-x py-6">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-full bg-ink text-background text-[10px] uppercase tracking-[0.3em] font-mono">
                Portal
              </span>
              <span className="text-xs text-ink-soft hidden md:inline">
                Edição diária · Mercado condominial brasileiro
              </span>
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs text-ink-soft">
              <TrendingUp className="w-3.5 h-3.5 text-brand" />
              Em alta agora
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 overflow-x-auto pb-1">
            {categories.map((c) => (
              <button
                key={c}
                className="text-xs uppercase tracking-[0.2em] text-ink-soft hover:text-ink border border-border hover:border-ink rounded-full px-3 py-1.5 transition"
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Hero — manchete + sidebar */}
      <section className="border-b border-border">
        <div className="container-x py-10 md:py-14 grid lg:grid-cols-3 gap-10">
          <motion.article
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 group cursor-pointer"
          >
            <div className="aspect-[16/9] rounded-2xl bg-gradient-to-br from-ink via-violet-deep to-brand-deep relative overflow-hidden">
              <div className="absolute inset-0 pattern-windows opacity-40" />
              <div className="absolute bottom-6 left-6 right-6 text-background">
                <span className="text-[10px] uppercase tracking-[0.3em] opacity-80">Capa · Mercado</span>
              </div>
            </div>
            <div className="mt-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-brand font-mono">
                Reportagem especial
              </span>
              <h1 className="mt-3 font-display text-3xl md:text-5xl tracking-[-0.035em] leading-[1.02] text-balance">
                Os 10 maiores desafios do síndico profissional em 2026
              </h1>
              <p className="mt-4 text-ink-soft text-base md:text-lg leading-relaxed max-w-2xl">
                Inadimplência, segurança, ESG, sucessão, tecnologia e o futuro das assembleias híbridas no
                mercado condominial brasileiro.
              </p>
              <div className="mt-5 flex items-center gap-4 text-xs text-ink-soft">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> 12 min de leitura
                </span>
                <span>Por Redação SíndicoLab</span>
              </div>
            </div>
          </motion.article>

          <aside className="space-y-5">
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="text-[10px] uppercase tracking-[0.3em] text-brand mb-4 inline-flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5" /> Em alta no mercado condominial
              </div>
              <ol className="space-y-3">
                {trending.map((t, i) => (
                  <li key={t} className="flex gap-3 group cursor-pointer">
                    <span className="font-display text-2xl text-ink-soft/60 group-hover:text-brand transition w-7 shrink-0">
                      0{i + 1}
                    </span>
                    <span className="text-sm leading-snug text-ink group-hover:text-brand transition">
                      {t}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-2xl border border-border bg-ink text-background p-5">
              <PlayCircle className="w-5 h-5 text-cyan" />
              <div className="mt-3 text-[10px] uppercase tracking-[0.3em] text-cyan">Vídeo em destaque</div>
              <h3 className="mt-2 font-display text-lg leading-snug">
                Síndicos respondem: o caso mais difícil que já enfrentei
              </h3>
              <Link
                to="/play"
                className="mt-4 inline-flex items-center gap-1.5 text-sm text-cyan hover:underline"
              >
                Ver no SíndicoLab Play <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Featured grid */}
      <section className="border-b border-border">
        <div className="container-x py-14">
          <div className="grid md:grid-cols-2 gap-6">
            {featured.map((f) => (
              <article key={f.title} className="group cursor-pointer">
                <div className="aspect-[16/10] rounded-xl bg-gradient-to-br from-brand-soft to-cyan-soft mb-5 overflow-hidden relative">
                  <div className="absolute inset-0 pattern-grid-dark opacity-40" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-brand font-mono">{f.cat}</span>
                <h2 className="mt-2 font-display text-2xl md:text-3xl tracking-[-0.03em] leading-tight text-balance group-hover:text-brand transition">
                  {f.title}
                </h2>
                <p className="mt-3 text-ink-soft leading-relaxed">{f.excerpt}</p>
                <div className="mt-3 text-xs text-ink-soft inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> {f.read}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Latest news list */}
      <section className="border-b border-border">
        <div className="container-x py-14">
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-display text-2xl md:text-4xl tracking-[-0.03em]">Últimas notícias</h2>
            <span className="text-xs uppercase tracking-[0.3em] text-ink-soft">Atualizado agora</span>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {grid.map((g) => (
              <article
                key={g.title}
                className="border-t border-border pt-5 group cursor-pointer"
              >
                <span className="text-[10px] uppercase tracking-[0.3em] text-brand font-mono">{g.cat}</span>
                <h3 className="mt-2 font-display text-lg tracking-[-0.02em] leading-snug group-hover:text-brand transition text-balance">
                  {g.title}
                </h3>
                <div className="mt-3 text-xs text-ink-soft inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> {g.read}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-b border-border bg-secondary/40">
        <div className="container-x py-16 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <Mail className="w-5 h-5 text-brand" />
            <h2 className="mt-3 font-display text-3xl md:text-4xl tracking-[-0.03em]">
              A pauta condominial da semana, no seu e-mail
            </h2>
            <p className="mt-3 text-ink-soft max-w-md">
              Curadoria das notícias e análises mais relevantes para síndicos e conselheiros.
            </p>
          </div>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              placeholder="seu@email.com"
              className="flex-1 px-4 py-3 rounded-full border border-border bg-background text-ink placeholder:text-ink-soft/60 focus:outline-none focus:border-ink"
            />
            <button className="btn-primary">
              Inscrever-se <ArrowUpRight className="w-4 h-4 btn-arrow" />
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
