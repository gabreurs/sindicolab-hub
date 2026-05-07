import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
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

const segundas = [
  {
    cat: "Mercado",
    title: "O novo perfil do síndico profissional brasileiro em 2026",
    excerpt: "Pesquisa anual mostra alta de profissionalização e redução do síndico morador.",
    read: "8 min",
  },
  {
    cat: "Assembleias",
    title: "Como conduzir uma assembleia sem rachar o prédio",
    excerpt: "Roteiro de mediação, votação e atas para reuniões com pautas polêmicas.",
    read: "6 min",
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
  { cat: "Segurança", title: "Portaria remota: o que avaliar antes de implantar", read: "5 min", autor: "Redação" },
  { cat: "Manutenção", title: "Calendário de manutenções obrigatórias por NBR", read: "7 min", autor: "Redação" },
  { cat: "Comportamento", title: "Pets, barulho e convivência em condomínio", read: "4 min", autor: "Camila Reis" },
  { cat: "Tecnologia", title: "Aplicativos de comunicação que realmente funcionam", read: "5 min", autor: "Redação" },
  { cat: "Casos reais", title: "Como um síndico reduziu 38% da conta de água", read: "6 min", autor: "Lucas Vieira" },
  { cat: "Jurídico", title: "Multas e advertências: o que diz a Lei 14.905/24", read: "9 min", autor: "Dr. Paulo S." },
];

const seguranca = [
  { title: "Portaria remota x portaria presencial: comparativo real", read: "8 min" },
  { title: "Câmeras com IA: o que a LGPD permite (e o que não)", read: "6 min" },
  { title: "Plano de evacuação: o que todo síndico precisa ter pronto", read: "5 min" },
];
const gestao = [
  { title: "Prestação de contas digital: ferramentas e padrões", read: "7 min" },
  { title: "Como negociar com fornecedores recorrentes", read: "5 min" },
  { title: "Indicadores que todo conselho deveria acompanhar", read: "6 min" },
];
const comportamento = [
  { title: "O síndico como mediador de conflitos", read: "4 min" },
  { title: "Convivência multigeracional em condomínios verticais", read: "6 min" },
  { title: "Quando chamar a polícia? Limites em áreas comuns", read: "5 min" },
];

function PortalPage() {
  return (
    <main className="min-h-screen bg-background text-ink flex flex-col overflow-x-hidden">
      <Header />

      {/* sem faixa de blog — portal vai direto para a manchete */}
      <div className="pt-24 md:pt-28" />

      {/* PRIMEIRA DOBRA — manchete + 2 destaques + sidebar */}
      <section className="border-b border-border">
        <div className="container-x py-8 md:py-10 grid lg:grid-cols-[2.2fr_1fr] gap-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Manchete principal */}
            <article className="md:col-span-2 group cursor-pointer">
              <div className="aspect-[16/9] rounded-lg bg-gradient-to-br from-ink via-violet-deep to-brand-deep relative overflow-hidden">
                <div className="absolute inset-0 pattern-windows opacity-40" />
                <div className="absolute top-4 left-4">
                  <span className="px-2 py-0.5 rounded bg-background text-ink text-[10px] font-medium">
                    {manchete.cat}
                  </span>
                </div>
              </div>
              <h2 className="mt-5 font-display text-3xl md:text-5xl tracking-[-0.035em] leading-[1.02] text-balance group-hover:text-brand transition">
                {manchete.title}
              </h2>
              <p className="mt-3 text-ink-soft text-base md:text-lg leading-relaxed max-w-2xl">
                {manchete.excerpt}
              </p>
              <div className="mt-3 flex items-center gap-4 text-xs text-ink-soft">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> {manchete.read} de leitura
                </span>
                <span>Por {manchete.autor}</span>
                <span>· hoje</span>
              </div>
            </article>

            {/* Duas matérias fortes */}
            {segundas.map((s) => (
              <article key={s.title} className="group cursor-pointer border-t border-border pt-5">
                <div className="aspect-[16/10] rounded-lg bg-gradient-to-br from-secondary to-brand-soft mb-4 overflow-hidden relative">
                  <div className="absolute inset-0 pattern-grid-dark opacity-30" />
                </div>
                <span className="text-[11px] text-brand">{s.cat}</span>
                <h3 className="mt-1.5 font-display text-xl md:text-2xl tracking-[-0.02em] leading-snug text-balance group-hover:text-brand transition">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed">{s.excerpt}</p>
                <div className="mt-2 text-xs text-ink-soft inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> {s.read}
                </div>
              </article>
            ))}
          </div>

          {/* Sidebar — em alta + YouTube + patrocinador */}
          <aside className="space-y-5">
            <div className="rounded-lg border border-border bg-card p-5">
              <div className="text-xs text-brand mb-4 inline-flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5" /> Em alta no mercado condominial
              </div>
              <ol className="space-y-3">
                {trending.map((t, i) => (
                  <li key={t} className="flex gap-3 group cursor-pointer border-t border-border pt-3 first:border-t-0 first:pt-0">
                    <span className="font-display text-2xl text-ink-soft/50 group-hover:text-brand transition w-8 shrink-0 leading-none">
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
            <div className="rounded-lg border border-border bg-ink text-background p-5">
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

            {/* Patrocinador */}
            <SponsorSlot variant="light" />
          </aside>
        </div>
      </section>

      {/* ÚLTIMAS NOTÍCIAS — densidade editorial */}
      <section id="ultimas" className="border-b border-border">
        <div className="container-x py-12 grid lg:grid-cols-[2fr_1fr] gap-10">
          <div>
            <div className="flex items-end justify-between mb-6 border-b border-border pb-3">
              <h2 className="font-display text-2xl md:text-3xl tracking-[-0.03em]">Últimas notícias</h2>
              <span className="text-xs text-ink-soft">Atualizado agora</span>
            </div>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
              {ultimas.map((g) => (
                <article key={g.title} className="border-t border-border pt-4 group cursor-pointer flex gap-4">
                  <div className="w-24 h-24 shrink-0 rounded-md bg-gradient-to-br from-secondary to-brand-soft relative overflow-hidden">
                    <div className="absolute inset-0 pattern-grid-dark opacity-30" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] text-brand">{g.cat}</span>
                    <h3 className="mt-1 font-display text-base md:text-lg tracking-[-0.015em] leading-snug group-hover:text-brand transition text-balance">
                      {g.title}
                    </h3>
                    <div className="mt-1.5 text-xs text-ink-soft inline-flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5" /> {g.read}
                      <span>· {g.autor}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="space-y-5">
            {/* Instagram */}
            <div className="rounded-lg border border-border bg-gradient-to-br from-[#FDC468] via-[#DF4F75] to-[#5B51D8] text-background p-6">
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

            {/* Patrocinador 2 */}
            <SponsorSlot variant="dark" />
          </aside>
        </div>
      </section>

      {/* EDITORIAS — Segurança / Gestão / Comportamento */}
      <Editoria id="seguranca" titulo="Segurança condominial" itens={seguranca} />
      <Editoria id="gestao" titulo="Gestão condominial" itens={gestao} />
      <Editoria id="comportamento" titulo="Comportamento condominial" itens={comportamento} />

      {/* VÍDEOS */}
      <section id="videos" className="border-b border-border bg-ink text-background">
        <div className="container-x py-12">
          <div className="flex items-end justify-between mb-6 border-b border-white/10 pb-3">
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

      {/* Banners internos: Play + Materiais + Patrocínio */}
      <section className="border-b border-border bg-secondary/40">
        <div className="container-x py-12 grid md:grid-cols-3 gap-5">
          <Link to="/play" className="rounded-lg border border-border bg-background p-6 hover:border-ink transition group">
            <GraduationCap className="w-5 h-5 text-brand" />
            <span className="mt-3 block text-xs text-brand">SíndicoLab Play</span>
            <h3 className="mt-1 font-display text-xl tracking-[-0.02em] text-balance">
              Aprimore-se como síndico
            </h3>
            <p className="mt-2 text-sm text-ink-soft">
              Cursos com certificado e 90 dias de acesso.
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-ink group-hover:text-brand transition">
              Ver cursos <ArrowUpRight className="w-4 h-4" />
            </span>
          </Link>
          <Link to="/materiais" className="rounded-lg border border-border bg-background p-6 hover:border-ink transition group">
            <span className="text-xs text-brand">Materiais gratuitos</span>
            <h3 className="mt-1 font-display text-xl tracking-[-0.02em] text-balance">
              Modelos, checklists e guias
            </h3>
            <p className="mt-2 text-sm text-ink-soft">
              Documentos prontos para o dia a dia do síndico.
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-ink group-hover:text-brand transition">
              Ver materiais <ArrowUpRight className="w-4 h-4" />
            </span>
          </Link>
          <Link to="/patrocinios" className="rounded-lg border border-dashed border-border bg-background p-6 hover:border-ink transition group">
            <span className="text-xs text-ink-soft">Espaço comercial</span>
            <h3 className="mt-1 font-display text-xl tracking-[-0.02em] text-balance">
              Patrocine este espaço
            </h3>
            <p className="mt-2 text-sm text-ink-soft">
              Mídia condominial segmentada para marcas e administradoras.
            </p>
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

function Editoria({ id, titulo, itens }: { id: string; titulo: string; itens: { title: string; read: string }[] }) {
  return (
    <section id={id} className="border-b border-border">
      <div className="container-x py-12">
        <div className="flex items-end justify-between mb-6 border-b border-border pb-3">
          <h2 className="font-display text-2xl md:text-3xl tracking-[-0.03em]">{titulo}</h2>
          <a href={`#${id}`} className="text-xs text-ink-soft hover:text-ink">Ver tudo</a>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {itens.map((it) => (
            <article key={it.title} className="group cursor-pointer">
              <div className="aspect-[16/10] rounded-md bg-gradient-to-br from-secondary to-brand-soft mb-3 overflow-hidden relative">
                <div className="absolute inset-0 pattern-grid-dark opacity-30" />
              </div>
              <h3 className="font-display text-lg tracking-[-0.02em] leading-snug group-hover:text-brand transition text-balance">
                {it.title}
              </h3>
              <div className="mt-1.5 text-xs text-ink-soft inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> {it.read}
              </div>
            </article>
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
      className={`block rounded-lg border border-dashed p-5 transition ${
        dark
          ? "bg-ink text-background border-white/15 hover:border-white/35"
          : "bg-card text-ink border-border hover:border-ink"
      }`}
    >
      <span className={`text-[11px] ${dark ? "text-white/60" : "text-ink-soft"}`}>Espaço para patrocinador</span>
      <div className="mt-2 font-display text-lg tracking-[-0.02em]">Sua marca aqui</div>
      <p className={`mt-1.5 text-sm ${dark ? "text-white/70" : "text-ink-soft"}`}>
        Mídia condominial segmentada — workshops, conteúdo e relacionamento.
      </p>
      <span className={`mt-3 inline-flex items-center gap-1.5 text-sm ${dark ? "text-cyan" : "text-brand"}`}>
        Ver mídia kit <ArrowUpRight className="w-4 h-4" />
      </span>
    </Link>
  );
}
