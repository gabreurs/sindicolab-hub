import heroCondominio from "@/assets/v2/hero-condominio-pt.webp";

export function HeroV2() {
  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <div className="home-hero-shell">
        <div className="home-hero-copy">
          <h1 id="home-hero-title" className="home-hero-title">
            <span className="hp home-headline-line" data-motion="headline-line" style={{ animationDelay: "60ms" }}>
              O universo do
            </span>
            <span className="hp home-headline-line" data-motion="headline-line" style={{ animationDelay: "160ms" }}>
              condomínio.
            </span>
            <span className="hp home-headline-line" data-motion="headline-line" style={{ animationDelay: "260ms" }}>
              <em>Em um só lugar.</em>
            </span>
          </h1>
          <p className="home-hero-description hp" data-motion="hero-support" style={{ animationDelay: "380ms" }}>
            Conhecimento, conexões e ferramentas para quem vive a gestão
            condominial.
          </p>
        </div>

        <div className="home-hero-visual" data-motion="hero-visual">
          <div className="home-hero-orbit hp" style={{ animationDelay: "260ms" }} aria-hidden>
            <span />
            <span />
            <span />
          </div>
          <div className="home-hero-building-wrap hp" style={{ animationDelay: "140ms" }}>
            <img
              src={heroCondominio}
              alt="Maquete do Residencial Jacarandá representando o universo condominial"
              width={1280}
              height={1024}
              className="home-hero-building"
              draggable={false}
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <p className="home-hero-label home-hero-label-top hp" style={{ animationDelay: "460ms" }} aria-hidden>
            Conhecimento
            <br />
            Conexões
            <br />
            Gestão real
          </p>
          <p className="home-hero-label home-hero-label-bottom hp" style={{ animationDelay: "520ms" }} aria-hidden>
            Condomínios mais fortes
            <br />
            Pessoas mais felizes
          </p>
        </div>
      </div>
    </section>
  );
}
