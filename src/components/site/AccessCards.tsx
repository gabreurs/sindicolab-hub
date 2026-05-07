import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Download, GraduationCap, Mail } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import quero1Img from "@/assets/quero1sindico.jpg";

type Card = {
  title: string;
  eyebrow?: string;
  headline: string;
  description: string;
  cta: string;
  href: string;
  external?: boolean;
  featured?: boolean;
  Icon?: ComponentType<SVGProps<SVGSVGElement>>;
  tone: "brand" | "ink" | "sand" | "cream" | "white";
};

const cards: Card[] = [
  {
    title: "Quero1Síndico",
    eyebrow: "Produto principal",
    headline: "Encontre um síndico profissional para o seu condomínio.",
    description:
      "Uma plataforma feita para aproximar condomínios, moradores e conselheiros de síndicos profissionais.",
    cta: "Conhecer o Quero1Síndico",
    href: "https://quero1sindico.com/",
    external: true,
    featured: true,
    tone: "brand",
  },
  {
    title: "Portal SíndicoLab",
    headline: "Conteúdo e visão para o mercado condominial.",
    description: "Acesse artigos, ideias e conteúdos do SíndicoLab.",
    cta: "Acessar portal",
    href: "https://sindicolab.com/",
    external: true,
    Icon: BookOpen,
    tone: "ink",
  },
  {
    title: "SíndicoLab Play",
    headline: "Cursos para evoluir na gestão condominial.",
    description: "Aulas e conteúdos para síndicos, conselheiros e profissionais do setor.",
    cta: "Ver cursos",
    href: "https://sindicolab.com/play/",
    external: true,
    Icon: GraduationCap,
    tone: "sand",
  },
  {
    title: "Materiais e Downloads",
    headline: "Guias e conteúdos para o seu dia a dia.",
    description: "Baixe materiais práticos para apoiar decisões, reuniões e gestão.",
    cta: "Ver materiais",
    href: "https://downloads.sindicolab.com/",
    external: true,
    Icon: Download,
    tone: "cream",
  },
  {
    title: "Fale com o SíndicoLab",
    headline: "Parcerias, projetos e relacionamento.",
    description: "Entre em contato para construir algo com o ecossistema.",
    cta: "Falar com a equipe",
    href: "mailto:contato@sindicolab.com",
    Icon: Mail,
    tone: "white",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function AccessCards() {
  return (
    <section id="caminhos" className="pb-24 md:pb-32">
      <div className="container-x">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-5 auto-rows-[minmax(0,1fr)]">
          {/* Featured: Quero1Síndico */}
          <FeaturedCard card={cards[0]} />

          {/* Portal — wide */}
          <AccessCard card={cards[1]} className="md:col-span-3 md:row-span-1" delay={0.1} />

          {/* Play */}
          <AccessCard card={cards[2]} className="md:col-span-3" delay={0.18} />

          {/* Materiais */}
          <AccessCard card={cards[3]} className="md:col-span-4" delay={0.26} />

          {/* Contato */}
          <AccessCard card={cards[4]} className="md:col-span-2" delay={0.34} />
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({ card }: { card: Card }) {
  return (
    <motion.a
      href={card.href}
      target={card.external ? "_blank" : undefined}
      rel={card.external ? "noreferrer" : undefined}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease }}
      whileHover={{ y: -4 }}
      className="group relative md:col-span-6 overflow-hidden rounded-3xl bg-ink text-background p-6 md:p-10 min-h-[360px] md:min-h-[420px] shadow-lift cursor-pointer"
    >
      {/* image side */}
      <div className="absolute inset-y-0 right-0 w-full md:w-1/2 opacity-90">
        <img
          src={quero1Img}
          alt=""
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          width={1280}
          height={896}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 md:via-ink/40 to-transparent md:to-ink/0" />
      </div>

      <div className="relative z-10 max-w-xl flex flex-col h-full">
        <div className="inline-flex w-fit items-center gap-2 px-2.5 py-1 rounded-full bg-brand text-brand-foreground text-[10px] uppercase tracking-[0.18em] font-semibold">
          {card.eyebrow}
        </div>
        <h2 className="mt-5 font-display text-3xl md:text-5xl leading-[1.05] text-balance">
          {card.title}
        </h2>
        <p className="mt-4 text-lg md:text-xl text-background/85 max-w-md text-balance">
          {card.headline}
        </p>
        <p className="mt-3 text-sm text-background/65 max-w-md">
          {card.description}
        </p>

        <div className="mt-auto pt-8">
          <span className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-brand text-brand-foreground font-medium shadow-brand group-hover:brightness-110 transition">
            {card.cta}
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </motion.a>
  );
}

function AccessCard({
  card,
  className = "",
  delay = 0,
}: {
  card: Card;
  className?: string;
  delay?: number;
}) {
  const tones: Record<Card["tone"], string> = {
    brand: "bg-brand text-brand-foreground",
    ink: "bg-ink text-background",
    sand: "bg-accent text-ink",
    cream: "bg-brand-soft text-ink",
    white: "bg-card text-ink border border-border",
  };
  const Icon = card.Icon;
  const muted = card.tone === "ink" ? "text-background/70" : "text-ink-soft";
  const subtle = card.tone === "ink" ? "text-background/55" : "text-ink-soft/80";

  return (
    <motion.a
      href={card.href}
      target={card.external ? "_blank" : undefined}
      rel={card.external ? "noreferrer" : undefined}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease, delay }}
      whileHover={{ y: -4 }}
      className={`group relative overflow-hidden rounded-3xl p-6 md:p-7 min-h-[260px] flex flex-col shadow-card hover:shadow-lift transition-shadow cursor-pointer ${tones[card.tone]} ${className}`}
    >
      <div className="flex items-start justify-between">
        {Icon && (
          <span className="grid place-items-center w-11 h-11 rounded-2xl bg-background/15 backdrop-blur-sm">
            <Icon className="w-5 h-5" />
          </span>
        )}
        <ArrowUpRight className="w-5 h-5 opacity-60 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>

      <div className="mt-6">
        <h3 className="font-display text-2xl md:text-[1.75rem] leading-tight">
          {card.title}
        </h3>
        <p className={`mt-2 text-base ${muted} text-balance`}>{card.headline}</p>
      </div>

      <div className="mt-auto pt-5">
        <p className={`text-sm ${subtle} max-w-md`}>{card.description}</p>
        <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 group-hover:underline">
          {card.cta}
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </motion.a>
  );
}
