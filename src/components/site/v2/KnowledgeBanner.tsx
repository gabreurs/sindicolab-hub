import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import heroCondominio from "@/assets/v2/hero-condominio.webp";

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

          <div className="relative flex flex-col items-center gap-4 px-6 py-5 text-center md:flex-row md:justify-center md:gap-10 md:px-10 md:py-[2.2svh]">
            <p
              className="font-display leading-tight tracking-[-0.03em] text-white"
              style={{ fontSize: "clamp(1.2rem, 2.8svh, 1.75rem)" }}
            >
              Conhecimento que <span className="text-v2-purple-light">transforma</span> a gestão.
            </p>

            <Link
              to="/play"
              className="inline-flex items-center gap-3 rounded-full border border-white/45 px-7 py-3 text-[0.95rem] font-semibold text-white transition-colors hover:bg-white/10"
            >
              Conheça nossos cursos
              <ArrowRight className="h-4 w-4" />
            </Link>

            <div className="hidden items-center gap-6 lg:flex">
              <span className="h-12 w-px bg-white/25" />
              <span className="text-[10px] uppercase leading-[2] tracking-[0.28em] text-white/70">
                Pessoas
                <br />
                Condomínios
                <br />
                Cidades melhores
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
