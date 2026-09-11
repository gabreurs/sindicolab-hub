import heroCondominio from "@/assets/v2/hero-condominio.png";

export function HeroV2() {
  return (
    <section className="relative overflow-hidden bg-v2-hero">
      <div className="mx-auto grid w-full max-w-[1536px] grid-cols-1 items-center gap-8 px-5 pb-10 pt-12 md:grid-cols-2 md:gap-4 md:px-10 md:pb-0 md:pt-16">
        {/* Copy */}
        <div className="relative z-10 max-w-[34rem]">
          <h1
            className="font-display text-v2-ink"
            style={{ fontSize: "clamp(2.5rem, 5.2vw, 4.6rem)", lineHeight: 1.02, letterSpacing: "-0.04em" }}
          >
            O universo do
            <br />
            condomínio.
            <br />
            <span className="text-v2-purple">Em um só lugar.</span>
          </h1>
          <p className="mt-6 max-w-[27rem] text-[1.05rem] leading-relaxed text-v2-ink/70">
            Conhecimento, conexões e ferramentas para quem vive a gestão condominial.
          </p>
        </div>

        {/* Render + micro legendas */}
        <div className="relative">
          <img
            src={heroCondominio}
            alt="Maquete 3D de um condomínio residencial moderno"
            width={1280}
            height={1024}
            className="relative z-10 mx-auto w-full max-w-[760px] select-none"
            draggable={false}
          />

          <div className="pointer-events-none absolute right-0 top-4 hidden text-right text-[10px] uppercase leading-[2] tracking-[0.28em] text-v2-ink/45 lg:block">
            Conhecimento
            <br />
            Conexões
            <br />
            Gestão real
          </div>
          <div className="pointer-events-none absolute bottom-16 right-0 hidden text-right text-[10px] uppercase leading-[2] tracking-[0.28em] text-v2-ink/40 lg:block">
            Condomínios mais fortes
            <br />
            Pessoas mais felizes
          </div>
        </div>
      </div>
    </section>
  );
}
