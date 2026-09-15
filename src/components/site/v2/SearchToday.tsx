import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import iconBlog from "@/assets/v2/icon-blog.webp";
import iconNewsletter from "@/assets/v2/icon-newsletter.webp";
import iconDownloads from "@/assets/v2/icon-downloads.webp";
import iconAgenda from "@/assets/v2/icon-agenda.webp";
import iconSindico from "@/assets/v2/icon-sindico.webp";
import iconInstagram from "@/assets/v2/icon-instagram.webp";
import iconYoutube from "@/assets/v2/icon-youtube.webp";
import iconAcademy from "@/assets/v2/icon-academy.webp";
import { EXTERNAL_LINKS } from "@/config/external-links";

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
  { title: "Newsletter", desc: ["Uma nova perspectiva", "na sua caixa de entrada"], icon: iconNewsletter, href: EXTERNAL_LINKS.SUBSTACK },
  { title: "Downloads", desc: ["Materiais para aplicar", "na sua gestão"], icon: iconDownloads, to: "/materiais" },
  { title: "Agenda de eventos", desc: ["Encontros para aprender", "e se conectar"], icon: iconAgenda, to: "/eventos" },
  { title: "SíndicoLab Academy", desc: ["Sua trilha de cursos", "em um só lugar"], icon: iconAcademy, to: "/academy" },
  {
    title: "Quero um síndico",
    desc: ["Encontre o profissional", "para seu condomínio"],
    icon: iconSindico,
    href: EXTERNAL_LINKS.QUERO1SINDICO,
  },
  {
    title: "YouTube SíndicoLab",
    desc: ["Vídeos e lives sobre", "gestão condominial"],
    icon: iconYoutube,
    href: EXTERNAL_LINKS.YOUTUBE,
  },
  {
    title: "Instagram SíndicoLab",
    desc: ["Acompanhe nossas", "conversas"],
    icon: iconInstagram,
    href: EXTERNAL_LINKS.INSTAGRAM,
    featured: true,
  },
];

export function SearchToday() {
  return (
    <section id="produtos" className="home-row" aria-labelledby="procura-h">
      <div className="site-container">
        <h2
          id="procura-h"
          className="hp font-display tracking-[-0.03em] text-v2-ink"
          style={{ fontSize: "clamp(1.35rem, 2.6svh, 1.85rem)", animationDelay: "440ms" }}
        >
          O que você procura hoje?
        </h2>

        <div
          className="home-access-grid grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-4"
          style={{ marginTop: "clamp(0.75rem, 1.6svh, 1.5rem)" }}
        >
          {items.map((it, i) => (
            <Card key={it.title} item={it} delay={520 + i * 65} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ item, delay }: { item: Item; delay: number }) {
  const featured = !!item.featured;

  const inner = (
    <div
      style={{ minHeight: "clamp(84px, 12svh, 146px)" }}
      className={`home-access-card group flex h-full items-center gap-4 rounded-xl px-5 py-4 transition-[transform,box-shadow] duration-300 md:gap-5 md:px-6 ${
        featured
          ? "bg-v2-card-featured text-white shadow-[0_18px_40px_-24px_rgba(124,58,237,0.75)] hover:-translate-y-1"
          : "border border-v2-line bg-white shadow-[0_10px_30px_-26px_rgba(27,11,46,0.5)] hover:-translate-y-1 hover:shadow-[0_18px_40px_-26px_rgba(27,11,46,0.45)]"
      }`}
    >
      <img
        src={item.icon}
        alt=""
        aria-hidden
        data-motion="card-icon"
        decoding="async"
        width={256}
        height={256}
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

  const wrapper = "hp block h-full";
  const style = { animationDelay: `${delay}ms` };

  if (item.to) {
    return (
      <Link to={item.to} aria-label={item.title} className={wrapper} data-motion="access-card" style={style}>
        {inner}
      </Link>
    );
  }
  const isInternal = !!item.href && (item.href.startsWith("#") || item.href.startsWith("/"));
  return (
    <a
      href={item.href}
      target={isInternal ? undefined : "_blank"}
      rel={isInternal ? undefined : "noopener noreferrer"}
      aria-label={item.title}
      data-motion="access-card"
      className={wrapper}
      style={style}
    >
      {inner}
    </a>
  );
}
