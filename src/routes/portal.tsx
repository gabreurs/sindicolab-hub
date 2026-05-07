import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import {
  ArrowUpRight,
  Clock,
  TrendingUp,
  PlayCircle,
  Camera as InstagramIcon,
  Play as YoutubeIcon,
  GraduationCap,
} from "lucide-react";
import { articles, type Article } from "@/data/articles";

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

const get = (slug: string) => articles.find((a) => a.slug === slug)!;

const manchete = get("10-desafios-sindico-2026");
const segundas = [get("novo-perfil-sindico-2026"), get("como-conduzir-assembleia")];
const ultimas = [
  get("portaria-remota-o-que-avaliar"),
  get("camera-ia-lgpd"),
  get("pets-barulho-condominio"),
  get("plano-evacuacao"),
  get("reduziu-conta-agua"),
  get("como-conduzir-assembleia"),
];

const trending = [
  { slug: "10-desafios-sindico-2026", text: "10 desafios do síndico em 2026" },
  { slug: "novo-perfil-sindico-2026", text: "Novo perfil do síndico profissional" },
  { slug: "camera-ia-lgpd", text: "Câmeras com IA em áreas comuns" },
  { slug: "portaria-remota-o-que-avaliar", text: "Portaria remota: o que avaliar" },
  { slug: "reduziu-conta-agua", text: "Caso real: -38% na conta de água" },
];

const seguranca = [
  get("portaria-remota-o-que-avaliar"),
  get("camera-ia-lgpd"),
  get("plano-evacuacao"),
];
const gestao = [get("reduziu-conta-agua"), get("novo-perfil-sindico-2026"), get("10-desafios-sindico-2026")];
const comportamento = [get("pets-barulho-condominio"), get("como-conduzir-assembleia")];

function PortalPage() {
  return (
    <main className="min-h-screen bg-background text-ink flex flex-col overflow-x-hidden">
      <Header />
      <Breadcrumbs items={[{ label: "Portal" }]} />

      {/* PRIMEIRA DOBRA — manchete + 2 destaques + sidebar */}
      <section>
        <div className="container-x py-8 md:py-10 grid lg:grid-cols-[2.2fr_1fr] gap-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
            {/* Manchete principal */}
            <ArticleCard a={manchete} variant="hero" className="md:col-span-2" />
            {segundas.map((s) => (
              <ArticleCard key={s.slug} a={s} variant="medium" />
            ))}
          </div>

          {/* Sidebar — em alta + YouTube + patrocinador */}
          <aside className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="text-xs text-brand mb-4 inline-flex items-center gap-2 font-medium">
                <TrendingUp className="w-3.5 h-3.5" /> Em alta no mercado condominial
              </div>
              <ol className="space-y-3.5">
                {trending.map((t, i) => (
                  <li key={t.slug}>
                    <Link
                      to="/portal/$slug"
                      params={{ slug: t.slug }}
                      className="flex gap-3 group"
                    >
                      <span className="font-display text-2xl text-ink-soft/40 group-hover:text-brand transition w-8 shrink-0 leading-none">
                        0{i + 1}
                      </span>
                      <span className="text-sm leading-snug group-hover:text-brand transition">
                        {t.text}
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-xl bg-ink text-background p-5">
              <YoutubeIcon className="w-5 h-5 text-cyan" />
              <div className="mt-3 text-xs text-cyan">Assista ao SíndicoLab</div>
              <div className="mt-3 aspect-video rounded-md overflow-hidden bg-black/40 grid place-items-center">
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

            <SponsorSlot variant="light" />
          </aside>
        </div>
      </section>

      {/* ÚLTIMAS NOTÍCIAS */}
      <section id="ultimas" className="bg-secondary/30">
        <div className="container-x py-12 grid lg:grid-cols-[2fr_1fr] gap-10">
          <div>
            <div className="flex items-end justify-between mb-6">
              <h2 className="font-display text-2xl md:text-3xl tracking-[-0.03em]">Últimas notícias</h2>
              <span className="text-xs text-ink-soft">Atualizado agora</span>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {ultimas.map((g) => (
                <ArticleCard key={g.slug} a={g} variant="row" />
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-xl bg-gradient-to-br from-[#FDC468] via-[#DF4F75] to-[#5B51D8] text-background p-6">
              <InstagramIcon className="w-6 h-6" />
              <h3 className="mt-4 font-display text-2xl leading-tight tracking-[-0.02em]">
                As discussões também acontecem no Instagram
              </h3>
              <p className="mt-3 text-sm text-background/90 leading-relaxed">
                Bastidores, comentários e debates com síndicos profissionais e moradores.
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
            <SponsorSlot variant="dark" />
          </aside>
        </div>
      </section>

      <Editoria id="seguranca" titulo="Segurança condominial" itens={seguranca} />
      <Editoria id="gestao" titulo="Gestão condominial" itens={gestao} />
      <Editoria id="comportamento" titulo="Comportamento condominial" itens={comportamento} />

      {/* VÍDEOS */}
      <section id="videos" className="bg-ink text-background">
        <div className="container-x py-12">
          <div className="flex items-end justify-between mb-6">
            <h2 className="font-display text-2xl md:text-3xl tracking-[-0.03em]">Vídeos SíndicoLab</h2>
            <a
              href="https://www.youtube.com/@sindicolab"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-cyan hover:underline inline-flex items-center gap-1"
            >
              Ver canal <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              "Bastidor — encontro de síndicos no CondoHub",
              "Caso real: prestação de contas que virou processo",
              "Workshop ao vivo: jurídico de alta performance",
            ].map((t) => (
              <a key={t} href="https://www.youtube.com/@sindicolab" target="_blank" rel="noreferrer" className="group">
                <div className="aspect-video rounded-md overflow-hidden bg-black/40 relative grid place-items-center border border-white/10 group-hover:border-white/30 transition">
                  <PlayCircle className="w-10 h-10 text-white/70 group-hover:scale-110 transition" />
                </div>
                <h3 className="mt-3 font-display text-base leading-snug group-hover:text-cyan transition text-balance">{t}</h3>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Banners internos */}
      <section className="bg-secondary/30">
        <div className="container-x py-12 grid md:grid-cols-3 gap-5">
          <Link to="/play" className="rounded-xl bg-background p-6 hover:shadow-card transition group border border-border">
            <GraduationCap className="w-5 h-5 text-brand" />
            <span className="mt-3 block text-xs text-brand font-medium">SíndicoLab Play</span>
            <h3 className="mt-1 font-display text-xl tracking-[-0.02em] text-balance">
              Cursos para síndicos profissionais
            </h3>
            <p className="mt-2 text-sm text-ink-soft">Certificado e 90 dias de acesso.</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-ink group-hover:text-brand transition">
              Ver cursos <ArrowUpRight className="w-4 h-4" />
            </span>
          </Link>
          <Link to="/materiais" className="rounded-xl bg-background p-6 hover:shadow-card transition group border border-border">
            <span className="text-xs text-brand font-medium">Materiais para síndicos</span>
            <h3 className="mt-1 font-display text-xl tracking-[-0.02em] text-balance">
              Modelos, checklists e guias
            </h3>
            <p className="mt-2 text-sm text-ink-soft">Documentos prontos para o dia a dia.</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-ink group-hover:text-brand transition">
              Ver materiais <ArrowUpRight className="w-4 h-4" />
            </span>
          </Link>
          <Link to="/patrocinios" className="rounded-xl bg-background p-6 hover:shadow-card transition group border border-dashed border-border">
            <span className="text-xs text-ink-soft">Espaço comercial</span>
            <h3 className="mt-1 font-display text-xl tracking-[-0.02em] text-balance">
              Patrocine este espaço
            </h3>
            <p className="mt-2 text-sm text-ink-soft">Mídia condominial segmentada.</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-ink group-hover:text-brand transition">
              Ver mídia kit <ArrowUpRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ArticleCard({
  a,
  variant,
  className = "",
}: {
  a: Article;
  variant: "hero" | "medium" | "row" | "small";
  className?: string;
}) {
  if (variant === "row") {
    return (
      <Link
        to="/portal/$slug"
        params={{ slug: a.slug }}
        className={`group flex gap-4 ${className}`}
      >
        <div className="w-32 h-24 shrink-0 rounded-md overflow-hidden bg-secondary">
          <img src={a.image} alt={a.imageAlt} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition" />
        </div>
        <div className="min-w-0">
          <span className="text-[11px] text-brand font-medium">{a.category}</span>
          <h3 className="mt-1 font-display text-base md:text-lg tracking-[-0.015em] leading-snug group-hover:text-brand transition text-balance">
            {a.title}
          </h3>
          <div className="mt-1.5 text-xs text-ink-soft inline-flex items-center gap-2">
            <Clock className="w-3.5 h-3.5" /> {a.readTime}
            <span>· {a.author}</span>
          </div>
        </div>
      </Link>
    );
  }
  if (variant === "hero") {
    return (
      <Link to="/portal/$slug" params={{ slug: a.slug }} className={`group block ${className}`}>
        <div className="aspect-[16/9] rounded-xl overflow-hidden">
          <img src={a.image} alt={a.imageAlt} loading="eager" className="w-full h-full object-cover group-hover:scale-[1.02] transition duration-500" />
        </div>
        <div className="mt-5">
          <span className="px-2 py-0.5 rounded bg-ink text-background text-[10px] font-medium">{a.category}</span>
        </div>
        <h2 className="mt-3 font-display text-3xl md:text-5xl tracking-[-0.035em] leading-[1.02] text-balance group-hover:text-brand transition">
          {a.title}
        </h2>
        <p className="mt-3 text-ink-soft text-base md:text-lg leading-relaxed max-w-2xl">{a.excerpt}</p>
        <div className="mt-3 flex items-center gap-4 text-xs text-ink-soft">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> {a.readTime} de leitura
          </span>
          <span>Por {a.author}</span>
          <span>· {a.publishedAt}</span>
        </div>
      </Link>
    );
  }
  // medium
  return (
    <Link to="/portal/$slug" params={{ slug: a.slug }} className={`group ${className}`}>
      <div className="aspect-[16/10] rounded-lg overflow-hidden bg-secondary">
        <img src={a.image} alt={a.imageAlt} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
      </div>
      <span className="mt-4 block text-[11px] text-brand font-medium">{a.category}</span>
      <h3 className="mt-1.5 font-display text-xl md:text-2xl tracking-[-0.02em] leading-snug text-balance group-hover:text-brand transition">
        {a.title}
      </h3>
      <p className="mt-2 text-sm text-ink-soft leading-relaxed">{a.excerpt}</p>
      <div className="mt-2 text-xs text-ink-soft inline-flex items-center gap-1.5">
        <Clock className="w-3.5 h-3.5" /> {a.readTime}
      </div>
    </Link>
  );
}

function Editoria({ id, titulo, itens }: { id: string; titulo: string; itens: Article[] }) {
  return (
    <section id={id}>
      <div className="container-x py-12">
        <div className="flex items-end justify-between mb-6">
          <h2 className="font-display text-2xl md:text-3xl tracking-[-0.03em]">{titulo}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {itens.map((it) => (
            <Link key={it.slug} to="/portal/$slug" params={{ slug: it.slug }} className="group">
              <div className="aspect-[16/10] rounded-lg overflow-hidden bg-secondary">
                <img src={it.image} alt={it.imageAlt} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <h3 className="mt-3 font-display text-lg tracking-[-0.02em] leading-snug group-hover:text-brand transition text-balance">
                {it.title}
              </h3>
              <div className="mt-1.5 text-xs text-ink-soft inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> {it.readTime}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function SponsorSlot({ variant = "light" }: { variant?: "light" | "dark" }) {
  const dark = variant === "dark";
  return (
    <Link
      to="/patrocinios"
      className={`block rounded-xl border border-dashed p-5 transition ${
        dark
          ? "bg-ink text-background border-white/15 hover:border-white/35"
          : "bg-card text-ink border-border hover:border-ink"
      }`}
    >
      <span className={`text-[11px] ${dark ? "text-white/60" : "text-ink-soft"}`}>Espaço para patrocinador</span>
      <div className="mt-2 font-display text-lg tracking-[-0.02em]">Sua marca aqui</div>
      <p className={`mt-1.5 text-sm ${dark ? "text-white/70" : "text-ink-soft"}`}>
        Mídia condominial segmentada para marcas e administradoras.
      </p>
    </Link>
  );
}
