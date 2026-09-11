import heroCondominio from "@/assets/v2/hero-condominio-pt.png";

/**
 * Hero da home — bloco superior da primeira tela.
 * Altura controlada pelo HomeEntry (~44svh). Título grande à esquerda,
 * empreendimento 3D grande ao centro/direita, sem espaço morto.
 */
export function HeroV2() {
  return (
    <div className="relative w-full">
      <div className="mx-auto grid w-full max-w-[1536px] grid-cols-1 items-center gap-3 px-5 md:grid-cols-[0.88fr_1.32fr] md:px-10">
        {/* Copy */}
        <div className="relative z-10 max-w-[36rem]">
          <h1
            className="font-display text-v2-ink"
            style={{
              fontSize: "clamp(2rem, 5.6svh, 4.2rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.045em",
            }}
          >
            O universo do
            <br />
            condomínio.
            <br />
            <span className="text-v2-purple">Em um só lugar.</span>
          </h1>
          <p
            className="mt-3 max-w-[29rem] leading-snug text-v2-ink/70"
            style={{ fontSize: "clamp(0.88rem, 2svh, 1.1rem)" }}
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
            style={{ height: "min(41svh, 520px)", objectFit: "contain" }}
            draggable={false}
          />

          <div className="pointer-events-none absolute right-0 top-1 z-20 hidden text-right text-[10px] uppercase leading-[2] tracking-[0.28em] text-v2-ink/45 xl:block">
            Conhecimento
            <br />
            Conexões
            <br />
            Gestão real
          </div>
          <div className="pointer-events-none absolute bottom-1 right-0 z-20 hidden text-right text-[10px] uppercase leading-[2] tracking-[0.28em] text-v2-ink/40 xl:block">
            Condomínios mais fortes
            <br />
            Pessoas mais felizes
          </div>
        </div>
      </div>
    </div>
  );
}
