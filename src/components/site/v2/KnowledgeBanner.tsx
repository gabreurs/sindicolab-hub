import { ArrowRight, Users } from "lucide-react";
import { Link } from "@tanstack/react-router";
import heroCondominio from "@/assets/v2/hero-condominio.webp";
import { EXTERNAL_LINKS } from "@/config/external-links";
import symbolWhiteBlue from "@/assets/brand/symbol-white-blue.svg";

export function KnowledgeBanner() {
  return (
    <section className="home-row">
      <div className="mx-auto w-full max-w-[1536px] px-5 md:px-10">
        <div
          className="hp relative overflow-hidden rounded-[1.35rem] bg-v2-nav"
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

          <div className="knowledge-banner-content relative grid items-center gap-5 px-6 py-5 text-center md:grid-cols-[minmax(0,1fr)_auto_auto] md:px-10 md:text-left md:py-[2.2svh]">
            <div className="flex items-center justify-center gap-4 md:justify-start">
              <img src={symbolWhiteBlue} alt="" aria-hidden className="hidden h-11 w-auto shrink-0 sm:block" />
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
