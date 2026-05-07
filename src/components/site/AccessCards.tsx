import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import quero1Img from "@/assets/quero1sindico.jpg";
import portalImg from "@/assets/portal.jpg";
import playImg from "@/assets/play.jpg";
import materiaisImg from "@/assets/materiais.jpg";

const ease = [0.22, 1, 0.36, 1] as const;

type Card = {
  number: string;
  title: string;
  headline: string;
  description: string;
  cta: string;
  href: string;
  image: string;
  tone: "ink" | "cream" | "white" | "sand";
};

const cards: Card[] = [
  {
    number: "02",
    title: "Portal SíndicoLab",
    headline: "Conteúdo e visão para o mercado condominial.",
    description: "Artigos, ideias e conteúdos do SíndicoLab.",
    cta: "Acessar portal",
    href: "https://sindicolab.com/",
    image: portalImg,
    tone: "white",
  },
  {
    number: "03",
    title: "SíndicoLab Play",
    headline: "Aprenda mais sobre gestão condominial.",
    description: "Cursos e conteúdos para quem quer evoluir no mercado.",
    cta: "Ver cursos",
    href: "https://sindicolab.com/play/",
    image: playImg,
    tone: "ink",
  },
  {
    number: "04",
    title: "Materiais e Downloads",
    headline: "Baixe conteúdos úteis para o dia a dia.",
    description: "Guias, modelos e materiais práticos para síndicos, conselheiros e moradores.",
    cta: "Ver materiais",
    href: "https://downloads.sindicolab.com/",
    image: materiaisImg,
    tone: "cream",
  },
];

export function AccessCards() {
  return (
    <section id="caminhos" className="relative pb-20 md:pb-28 -mt-6">
      <div className="container-x">
        <div className="flex items-end justify-between mb-8 md:mb-10">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-ink-soft mb-2">
              · Caminhos
            </div>
            <h2 className="font-display text-3xl md:text-5xl text-ink max-w-2xl text-balance">
              Quatro entradas para o ecossistema.
            </h2>
          </div>
          <div className="hidden md:block text-sm text-ink-soft max-w-xs text-right">
            Cada destino é um pedaço do SíndicoLab. Comece pelo principal.
          </div>
        </div>

        {/* Featured Quero1Síndico */}
        <Featured />

        {/* Modular grid */}
        <div className="mt-4 md:mt-5 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
          <AccessCard card={cards[0]} className="md:col-span-7" delay={0.1} />
          <AccessCard card={cards[1]} className="md:col-span-5" delay={0.18} />
          <AccessCard card={cards[2]} className="md:col-span-12" delay={0.26} wide />
        </div>
      </div>
    </section>
  );
}

function Featured() {
  return (
    <motion.a
      href="https://quero1sindico.com/"
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-3xl bg-ink text-background min-h-[440px] md:min-h-[520px] grid md:grid-cols-12 cursor-pointer shadow-lift"
    >
      <div className="relative md:col-span-7 p-7 md:p-12 flex flex-col z-10">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-background/60">01 / 04</span>
          <span className="h-px flex-1 bg-background/15" />
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand text-brand-foreground text-[10px] uppercase tracking-[0.2em] font-semibold">
            <span className="w-1 h-1 rounded-full bg-brand-foreground animate-blink" />
            Produto principal
          </span>
        </div>

        <h3 className="mt-auto font-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.92] text-balance">
          Quero<span className="text-brand">1</span>Síndico
        </h3>
        <p className="mt-5 text-lg md:text-xl text-background/85 max-w-md text-balance">
          Encontre um síndico profissional para o seu condomínio.
        </p>
        <p className="mt-3 text-sm text-background/60 max-w-md">
          Plataforma para aproximar condomínios, moradores e conselheiros de síndicos profissionais.
        </p>

        <div className="mt-7">
          <span className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-brand text-brand-foreground font-medium shadow-brand group-hover:brightness-110 transition">
            Conhecer o Quero1Síndico
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>

      <div className="relative md:col-span-5 min-h-[260px] md:min-h-0 overflow-hidden">
        <img
          src={quero1Img}
          alt="Quero1Síndico"
          loading="lazy"
          width={1280}
          height={960}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/40 to-transparent md:from-ink/80 md:via-transparent" />
      </div>
    </motion.a>
  );
}

function AccessCard({
  card,
  className = "",
  delay = 0,
  wide = false,
}: {
  card: Card;
  className?: string;
  delay?: number;
  wide?: boolean;
}) {
  const tones = {
    ink: "bg-ink text-background",
    cream: "bg-brand-soft text-ink",
    sand: "bg-accent text-ink",
    white: "bg-card text-ink border border-border",
  } as const;

  const muted = card.tone === "ink" ? "text-background/70" : "text-ink-soft";
  const numCol = card.tone === "ink" ? "text-background/45" : "text-ink-soft/70";

  return (
    <motion.a
      href={card.href}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease, delay }}
      whileHover={{ y: -4 }}
      className={`group relative overflow-hidden rounded-3xl shadow-card hover:shadow-lift transition-all min-h-[300px] ${tones[card.tone]} ${className}`}
    >
      <div className={`relative h-full p-6 md:p-8 flex ${wide ? "md:flex-row md:items-end md:gap-10" : "flex-col"}`}>
        {/* image */}
        <div className={`relative overflow-hidden rounded-2xl mb-6 ${wide ? "md:mb-0 md:w-[42%] aspect-[4/3]" : "h-40"}`}>
          <img
            src={card.image}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.08]"
          />
        </div>

        <div className={`flex-1 flex flex-col ${wide ? "" : ""}`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-mono ${numCol}`}>{card.number} / 04</span>
            <span className="grid place-items-center w-10 h-10 rounded-full bg-background/15 backdrop-blur-sm group-hover:bg-brand group-hover:text-brand-foreground transition-all">
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>

          <h3 className="mt-6 font-display text-2xl md:text-3xl leading-tight text-balance">
            {card.title}
          </h3>
          <p className={`mt-2 text-base ${muted} max-w-md text-balance`}>{card.headline}</p>
          <p className={`mt-2 text-sm ${muted} opacity-80 max-w-md`}>{card.description}</p>

          <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium">
            {card.cta}
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </div>
    </motion.a>
  );
}
