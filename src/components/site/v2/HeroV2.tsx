import heroCondominio from "@/assets/v2/hero-condominio-pt.png";

/**
 * Hero da home — bloco superior da primeira tela.
 * Não define altura própria: quem controla a proporção é o HomeEntry,
 * que empacota hero + cards + faixa de cursos dentro de 100svh.
 */
export function HeroV2() {
  return (
    <div className="relative">
      <div className="mx-auto grid w-full max-w-[1536px] grid-cols-1 items-center gap-4 px-5 md:grid-cols-[1fr_1.15fr] md:px-10">
        {/* Copy */}
        <div className="relative z-10 max-w-[34rem]">
          <h1
            className="font-display text-v2-ink"
            style={{
              fontSize: "clamp(1.9rem, 4.6svh, 3.4rem)",
              lineHeight: 1.04,
              letterSpacing: "-0.04em",
            }}
          >
            O universo do
            <br />
            condomínio.
            <br />
            <span className="text-v2-purple">Em um só lugar.</span>
          </h1>
          <p
            className="mt-4 max-w-[27rem] leading-relaxed text-v2-ink/70"
            style={{ fontSize: "clamp(0.88rem, 1.9svh, 1.05rem)" }}
          >
            Conhecimento, conexões e ferramentas para quem vive a gestão
            condominial.
          </p>
        </div>

        {/* Render + micro legendas */}
        <div className="relative">
          <img
            src={heroCondominio}
            alt="Maquete 3D de um condomínio residencial moderno"
            width={1280}
            height={1024}
            className="relative z-10 mx-auto w-full select-none"
            style={{ maxHeight: "min(33svh, 400px)", objectFit: "contain" }}
            draggable={false}
          />

          <div className="pointer-events-none absolute right-0 top-2 z-20 hidden text-right text-[10px] uppercase leading-[2] tracking-[0.28em] text-v2-ink/45 xl:block">
            Conhecimento
            <br />
            Conexões
            <br />
            Gestão real
          </div>
          <div className="pointer-events-none absolute bottom-2 right-0 z-20 hidden text-right text-[10px] uppercase leading-[2] tracking-[0.28em] text-v2-ink/40 xl:block">
            Condomínios mais fortes
            <br />
            Pessoas mais felizes
          </div>
        </div>
      </div>
    </div>
  );
}
