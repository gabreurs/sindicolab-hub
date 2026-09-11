import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import heroCondominio from "@/assets/v2/hero-condominio.png";

/**
 * Hero da home — nova porta de entrada.
 * Ocupa exatamente uma tela (100svh), descontando o header fixo de 72px.
 * Nada de scroll dentro da primeira dobra: tudo cabe em 1920x1080.
 */
export function HeroV2() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-v2-hero pt-[72px]">
      <div className="mx-auto grid w-full max-w-[1536px] grid-cols-1 items-center gap-6 px-5 pb-8 md:grid-cols-[1fr_1.05fr] md:gap-4 md:px-10 md:pb-0">
        {/* Copy */}
        <div className="relative z-10 max-w-[34rem]">
          <p className="mb-4 text-[10px] uppercase tracking-[0.28em] text-v2-ink/45">
            Ecossistema condominial brasileiro
          </p>
          <h1
            className="font-display text-v2-ink"
            style={{
              fontSize: "clamp(2.1rem, 4.4vw, 4rem)",
              lineHeight: 1.03,
              letterSpacing: "-0.04em",
            }}
          >
            O universo do
            <br />
            condomínio.
            <br />
            <span className="text-v2-purple">Em um só lugar.</span>
          </h1>
          <p className="mt-5 max-w-[27rem] text-[clamp(0.95rem,1.1vw,1.05rem)] leading-relaxed text-v2-ink/70">
            Conhecimento, conexões e ferramentas para quem vive a gestão
            condominial: conteúdo, cursos, materiais e síndicos profissionais.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="https://quero1sindico.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-v2-purple px-6 py-3 text-[0.95rem] font-semibold text-white transition-colors hover:bg-v2-purple-light"
            >
              Encontrar síndico
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              to="/play"
              className="inline-flex items-center gap-2.5 rounded-full border border-v2-line px-6 py-3 text-[0.95rem] font-semibold text-v2-ink transition-colors hover:bg-white"
            >
              Conheça os cursos
            </Link>
          </div>
        </div>

        {/* Render + micro legendas */}
        <div className="relative">
          <img
            src={heroCondominio}
            alt="Maquete 3D de um condomínio residencial moderno"
            width={1280}
            height={1024}
            className="relative z-10 mx-auto w-full max-w-[720px] select-none"
            style={{ maxHeight: "min(62svh, 620px)", objectFit: "contain" }}
            draggable={false}
          />

          <div className="pointer-events-none absolute right-0 top-2 z-20 hidden text-right text-[10px] uppercase leading-[2] tracking-[0.28em] text-v2-ink/45 lg:block">
            Conhecimento
            <br />
            Conexões
            <br />
            Gestão real
          </div>
          <div className="pointer-events-none absolute bottom-4 right-0 z-20 hidden text-right text-[10px] uppercase leading-[2] tracking-[0.28em] text-v2-ink/40 lg:block">
            Condomínios mais fortes
            <br />
            Pessoas mais felizes
          </div>
        </div>
      </div>
    </section>
  );
}
