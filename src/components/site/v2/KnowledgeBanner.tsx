import { ArrowRight, Users } from "lucide-react";
import { Link } from "@tanstack/react-router";
import heroCondominio from "@/assets/v2/hero-condominio.webp";
import { EXTERNAL_LINKS } from "@/config/external-links";
import { BrandMark } from "@/components/site/BrandMark";

export function KnowledgeBanner() {
  return (
    <section className="home-row">
      <div className="site-container">
        <div
          className="hp knowledge-banner relative overflow-hidden rounded-xl bg-v2-nav"
          data-motion="banner"
          style={{ animationDelay: "900ms" }}
        >
          {/* imagem ambiente ao fundo */}
          <img
            src={heroCondominio}
            alt=""
            aria-hidden
            loading="lazy"
            decoding="async"
            className="pointer-events-none absolute -bottom-10 left-0 h-[220%] w-auto max-w-none opacity-[0.14]"
            draggable={false}
          />
          <img
            src={heroCondominio}
            alt=""
            aria-hidden
            loading="lazy"
            decoding="async"
            className="pointer-events-none absolute -bottom-10 right-0 hidden h-[220%] w-auto max-w-none opacity-[0.14] md:block"
            draggable={false}
          />

          <div className="knowledge-banner-content relative grid items-center gap-5 px-6 py-5 text-left lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:px-10 lg:py-[2.2svh]">
            <div className="flex items-center justify-center gap-4 lg:justify-start">
              <BrandMark size={34} variant="white-purple" className="hidden shrink-0 lg:inline-flex" />
              <div>
              <p className="font-display leading-tight text-background" style={{ fontSize: "clamp(1.2rem, 2.8svh, 1.75rem)" }}>
                Conhecimento que <span className="text-v2-purple-light">transforma</span> a gestão.
              </p>
              <p className="mt-1 text-sm text-background/65">Aprenda, troque experiências e fortaleça sua rede.</p>
              </div>
            </div>

            <Link to="/academy" className="knowledge-banner-action">
              Conheça nossos cursos
              <ArrowRight className="h-4 w-4" />
            </Link>

            <a href={EXTERNAL_LINKS.WHATSAPP_GROUP} target="_blank" rel="noopener noreferrer" className="knowledge-banner-action knowledge-banner-action-primary">
              <Users className="h-4 w-4" />
              Entre no grupo de síndicos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
