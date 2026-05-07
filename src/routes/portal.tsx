import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Clock,
  TrendingUp,
  PlayCircle,
  Camera as InstagramIcon,
  Play as YoutubeIcon,
  GraduationCap,
} from "lucide-react";

export const Route = createFileRoute("/portal")({
  head: () => ({
    meta: [
      { title: "Portal SíndicoLab — Notícias do mercado condominial" },
      {
        name: "description",
        content:
          "Manchetes, casos reais e análises do mercado condominial brasileiro. Gestão, segurança, comportamento, tecnologia e cursos para síndicos.",
      },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Portal SíndicoLab — Conteúdo condominial de referência" },
      {
        property: "og:description",
        content:
          "O portal de notícias do mercado condominial: manchetes, vídeos e análises diárias para síndicos profissionais.",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://sindicolab.com/portal" }],
  }),
  component: PortalPage,
});

const manchete = {
  cat: "Reportagem especial",
  title: "Os 10 maiores desafios do síndico profissional em 2026",
  excerpt:
    "Inadimplência, segurança, ESG, sucessão, tecnologia e o futuro das assembleias híbridas no mercado condominial brasileiro.",
  read: "12 min",
  autor: "Redação SíndicoLab",
};

const destaquesTopo = [
  {
    cat: "Mercado",
    title: "O novo perfil do síndico profissional brasileiro em 2026",
    read: "8 min",
  },
  {
    cat: "Assembleias",
    title: "Como conduzir uma assembleia sem rachar o prédio",
    read: "6 min",
  },
  {
    cat: "Segurança",
    title: "Portaria remota: o que avaliar antes de implantar",
    read: "5 min",
  },
];

const trending = [
  "Reajuste de taxa condominial em 2026",
  "Síndico profissional: regulamentação avança",
  "Câmeras com IA em áreas comuns",
  "Inadimplência: o que mudou na cobrança",
  "Assembleias híbridas: validade jurídica",
];

const ultimas = [
  { cat: "Segurança", title: "Portaria remota: o que avaliar antes de implantar", read: "5 min" },
  { cat: "Manutenção", title: "Calendário de manutenções obrigatórias por NBR", read: "7 min" },
  { cat: "Comportamento", title: "Pets, barulho e convivência em condomínio", read: "4 min" },
  { cat: "Tecnologia", title: "Aplicativos de comunicação que realmente funcionam", read: "5 min" },
  { cat: "Casos reais", title: "Como um síndico reduziu 38% da conta de água", read: "6 min" },
  { cat: "Jurídico", title: "Multas e advertências: o que diz a Lei 14.905/24", read: "9 min" },
];

const editorias = [
  { titulo: "Gestão condominial", n: 312 },
  { titulo: "Segurança condominial", n: 184 },
  { titulo: "Comportamento", n: 96 },
  { titulo: "Casos reais", n: 71 },
  { titulo: "Vídeos", n: 58 },
];

function PortalPage() {
  return (
    <main className="min-h-screen bg-background text-ink flex flex-col">
      <Header />

      {/* HERO EDITORIAL — começa direto com matéria */}
      <section className="pt-28 md:pt-32 border-b border-border">
        <div className="container-x py-8 md:py-10 grid lg:grid-cols-[2fr_1fr] gap-10">
          {/* Manchete principal */}
          <motion.article
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="group cursor-pointer"
          >
            <div className="aspect-[16/9] rounded-2xl bg-gradient-to-br from-ink via-violet-deep to-brand-deep relative overflow-hidden">
              <div className="absolute inset-0 pattern-windows opacity-40" />
              <div className="absolute top-5 left-5">
                <span className="px-2.5 py-1 rounded-full bg-background/95 text-ink text-[10px] uppercase tracking-[0.3em] font-mono">
                  Manchete
                </span>
              </div>
              <div className="absolute bottom-6 left-6 right-6 text-background">
                <span className="text-[10px] uppercase tracking-[0.3em] opacity-80">
                  {manchete.cat}
                </span>
              </div>
            </div>
            <h1 className="mt-6 font-display text-3xl md:text-5xl tracking-[-0.035em] leading-[1.02] text-balance group-hover:text-brand transition">
              {manchete.title}
            </h1>
            <p className="mt-4 text-ink-soft text-base md:text-lg leading-relaxed max-w-2xl">
              {manchete.excerpt}
            </p>
            <div className="mt-5 flex items-center gap-4 text-xs text-ink-soft">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> {manchete.read} de leitura
              </span>
              <span>Por {manchete.autor}</span>
              <span>· hoje</span>
            </div>
          </motion.article>

          {/* Sidebar — em alta + YouTube + Instagram + Play */}
          <aside className="space-y-5">
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="text-[10px] uppercase tracking-[0.3em] text-brand mb-4 inline-flex items-center gap-2 font-mono">
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

            {/* YouTube */}
            <div className="rounded-2xl border border-border bg-ink text-background p-5">
              <YoutubeIcon className="w-5 h-5 text-cyan" />
              <div className="mt-3 text-[10px] uppercase tracking-[0.3em] text-cyan font-mono">
                Assista ao SíndicoLab
              </div>
              <div className="mt-3 aspect-video rounded-lg overflow-hidden bg-black/40 grid place-items-center">
                <PlayCircle className="w-12 h-12 text-white/60" />
              </div>
              <h3 className="mt-3 font-display text-lg leading-snug">
                Síndicos respondem: o caso mais difícil que já enfrentei
              </h3>
              <a
                href="https://www.youtube.com/@sindicolab"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm text-cyan hover:underline"
              >
                Ver canal no YouTube <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* Grade editorial — 3 destaques topo */}
      <section className="border-b border-border">
        <div className="container-x py-12">
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-display text-xl md:text-2xl tracking-[-0.02em]">
              Em destaque agora
            </h2>
            <span className="text-[10px] uppercase tracking-[0.3em] text-ink-soft font-mono">
              Edição diária
            </span>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {destaquesTopo.map((f) => (
              <article key={f.title} className="group cursor-pointer">
                <div className="aspect-[16/10] rounded-xl bg-gradient-to-br from-brand-soft to-cyan-soft mb-4 overflow-hidden relative">
                  <div className="absolute inset-0 pattern-grid-dark opacity-40" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-brand font-mono">
                  {f.cat}
                </span>
                <h3 className="mt-2 font-display text-lg md:text-xl tracking-[-0.02em] leading-snug text-balance group-hover:text-brand transition">
                  {f.title}
                </h3>
                <div className="mt-2 text-xs text-ink-soft inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> {f.read}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Últimas notícias + sidebar Instagram/Play */}
      <section className="border-b border-border">
        <div className="container-x py-12 grid lg:grid-cols-[2fr_1fr] gap-10">
          <div>
            <div className="flex items-end justify-between mb-6">
              <h2 className="font-display text-2xl md:text-3xl tracking-[-0.03em]">
                Últimas notícias
              </h2>
              <span className="text-[10px] uppercase tracking-[0.3em] text-ink-soft font-mono">
                Atualizado agora
              </span>
            </div>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
              {ultimas.map((g) => (
                <article
                  key={g.title}
                  className="border-t border-border pt-4 group cursor-pointer"
                >
                  <span className="text-[10px] uppercase tracking-[0.3em] text-brand font-mono">
                    {g.cat}
                  </span>
                  <h3 className="mt-2 font-display text-lg tracking-[-0.02em] leading-snug group-hover:text-brand transition text-balance">
                    {g.title}
                  </h3>
                  <div className="mt-2 text-xs text-ink-soft inline-flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> {g.read}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="space-y-5">
            {/* Instagram */}
            <div className="rounded-2xl border border-border bg-gradient-to-br from-[#FDC468] via-[#DF4F75] to-[#5B51D8] text-background p-6">
              <InstagramIcon className="w-6 h-6" />
              <h3 className="mt-4 font-display text-2xl leading-tight tracking-[-0.02em]">
                O SíndicoLab também está no Instagram
              </h3>
              <p className="mt-3 text-sm text-background/90 leading-relaxed">
                As notícias e debates do mercado condominial também acontecem no Instagram do
                SíndicoLab, com comentários, bastidores e participação ativa de síndicos e
                moradores.
              </p>
              <a
                href="https://www.instagram.com/sindicolab"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
              >
                Acompanhar no Instagram <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* SíndicoLab Play (publicidade interna) */}
            <div className="rounded-2xl border border-border bg-ink text-background p-6">
              <GraduationCap className="w-6 h-6 text-cyan" />
              <div className="mt-3 text-[10px] uppercase tracking-[0.3em] text-cyan font-mono">
                Publicidade · SíndicoLab Play
              </div>
              <h3 className="mt-2 font-display text-2xl leading-tight tracking-[-0.02em]">
                Aprimore-se como síndico
              </h3>
              <p className="mt-3 text-sm text-background/80 leading-relaxed">
                Cursos completos sobre gestão condominial, jurídico, captação e liderança de equipe.
                Certificado e 90 dias de acesso.
              </p>
              <Link
                to="/play"
                className="mt-5 inline-flex items-center gap-1.5 text-sm text-cyan hover:underline"
              >
                Ver cursos do SíndicoLab Play <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Editorias (categorias secundárias) */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="text-[10px] uppercase tracking-[0.3em] text-ink-soft mb-3 font-mono">
                Editorias
              </div>
              <ul className="divide-y divide-border">
                {editorias.map((e) => (
                  <li
                    key={e.titulo}
                    className="flex items-center justify-between py-2.5 cursor-pointer group"
                  >
                    <span className="text-sm text-ink group-hover:text-brand transition">
                      {e.titulo}
                    </span>
                    <span className="text-[11px] font-mono text-ink-soft">{e.n}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Cursos relacionados / Materiais relacionados */}
      <section className="border-b border-border bg-secondary/40">
        <div className="container-x py-14 grid md:grid-cols-2 gap-6">
          <Link
            to="/play"
            className="rounded-2xl border border-border bg-background p-7 hover:border-ink transition group"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand font-mono">
              Cursos relacionados
            </span>
            <h3 className="mt-3 font-display text-2xl md:text-3xl tracking-[-0.03em] text-balance">
              Aprofunde nos temas das matérias
            </h3>
            <p className="mt-3 text-ink-soft">
              Trilhas completas sobre os assuntos mais lidos do portal: jurídico, segurança,
              assembleia e finanças.
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-ink group-hover:text-brand transition">
              Ver SíndicoLab Play <ArrowUpRight className="w-4 h-4" />
            </span>
          </Link>
          <Link
            to="/materiais"
            className="rounded-2xl border border-border bg-background p-7 hover:border-ink transition group"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand font-mono">
              Materiais relacionados
            </span>
            <h3 className="mt-3 font-display text-2xl md:text-3xl tracking-[-0.03em] text-balance">
              Modelos, checklists e guias gratuitos
            </h3>
            <p className="mt-3 text-ink-soft">
              Documentos prontos para o dia a dia do síndico — atas, convocações, planilhas e
              roteiros.
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-ink group-hover:text-brand transition">
              Ver materiais <ArrowUpRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
