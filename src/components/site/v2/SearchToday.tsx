import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import iconBlog from "@/assets/v2/icon-blog.png";
import iconNewsletter from "@/assets/v2/icon-newsletter.png";
import iconDownloads from "@/assets/v2/icon-downloads.png";
import iconAgenda from "@/assets/v2/icon-agenda.png";
import iconSindico from "@/assets/v2/icon-sindico.png";
import iconInstagram from "@/assets/v2/icon-instagram.png";

type Item = {
  title: string;
  desc: string[];
  icon: string;
  to?: string;
  href?: string;
  featured?: boolean;
};

const items: Item[] = [
  { title: "Blog", desc: ["Ideias que movimentam", "o mercado"], icon: iconBlog, to: "/portal" },
  {
    title: "Newsletter",
    desc: ["Uma nova perspectiva", "na sua caixa de entrada"],
    icon: iconNewsletter,
    href: "https://instagram.com/sindicolab",
    featured: true,
  },
  { title: "Downloads", desc: ["Materiais para aplicar", "na sua gestão"], icon: iconDownloads, to: "/materiais" },
  { title: "Agenda de eventos", desc: ["Encontros para aprender", "e se conectar"], icon: iconAgenda, to: "/quem-somos" },
  {
    title: "Quero um síndico",
    desc: ["Encontre o profissional", "para seu condomínio"],
    icon: iconSindico,
    href: "https://quero1sindico.com/",
  },
  {
    title: "Instagram SíndicoLab",
    desc: ["Acompanhe nossas", "conversas"],
    icon: iconInstagram,
    href: "https://instagram.com/sindicolab",
  },
];

export function SearchToday() {
  return (
    <section id="produtos" className="bg-v2-section pb-4 pt-4 lg:pb-[1.2svh] lg:pt-0" aria-labelledby="procura-h">
      <div className="mx-auto w-full max-w-[1536px] px-5 md:px-10">
        <h2
          id="procura-h"
          className="font-display tracking-[-0.03em] text-v2-ink"
          style={{ fontSize: "clamp(1.35rem, 2.6svh, 1.85rem)" }}
        >
          O que você procura hoje?
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" style={{ marginTop: "clamp(0.75rem, 1.6svh, 1.5rem)" }}>
          {items.map((it) => (
            <Card key={it.title} item={it} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ item }: { item: Item }) {
  const featured = !!item.featured;

  const inner = (
    <div
      style={{ minHeight: "clamp(84px, 12svh, 146px)" }}
      className={`group flex h-full items-center gap-4 rounded-[1.35rem] px-5 py-4 transition-all duration-300 md:gap-5 md:px-6 ${
        featured
          ? "bg-v2-card-featured text-white shadow-[0_18px_40px_-24px_rgba(124,58,237,0.75)] hover:-translate-y-1"
          : "border border-v2-line bg-white shadow-[0_10px_30px_-26px_rgba(27,11,46,0.5)] hover:-translate-y-1 hover:shadow-[0_18px_40px_-26px_rgba(27,11,46,0.45)]"
      }`}
    >
      <img
        src={item.icon}
        alt=""
        aria-hidden
        loading="lazy"
        width={816}
        height={816}
        className="shrink-0 select-none object-contain transition-transform duration-300 group-hover:scale-[1.04]"
        style={{ height: "clamp(60px, 8.2svh, 104px)", width: "clamp(60px, 8.2svh, 104px)" }}
        draggable={false}
      />
      <div className="min-w-0 flex-1">
        <h3
          className={`font-display tracking-[-0.03em] ${
            featured ? "text-white" : "text-v2-ink"
          }`}
          style={{ fontSize: "clamp(1.05rem, 2.2svh, 1.35rem)" }}
        >
          {item.title}
        </h3>
        <p
          className={`mt-1 leading-snug ${
            featured ? "text-white/85" : "text-v2-ink/60"
          }`}
          style={{ fontSize: "clamp(0.8rem, 1.7svh, 0.95rem)" }}
        >
          {item.desc[0]}
          <br />
          {item.desc[1]}
        </p>
        <ArrowRight
          className={`mt-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 ${
            featured ? "text-white" : "text-v2-purple"
          }`}
          strokeWidth={2}
        />
      </div>
    </div>
  );

  if (item.to) {
    return (
      <Link to={item.to} aria-label={item.title} className="block h-full">
        {inner}
      </Link>
    );
  }
  return (
    <a href={item.href} target="_blank" rel="noreferrer" aria-label={item.title} className="block h-full">
      {inner}
    </a>
  );
}
