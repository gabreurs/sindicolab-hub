import heroCondominio from "@/assets/v2/hero-condominio-pt.png";

export function HeroV2() {
  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <div className="home-hero-shell">
        <div className="home-hero-copy">
          <h1 id="home-hero-title" className="home-hero-title">
            O universo do
            <br />
            condomínio.
            <br />
            <em>Em um só lugar.</em>
          </h1>
          <p className="home-hero-description">
            Conhecimento, conexões e ferramentas para quem vive a gestão
            condominial.
          </p>
        </div>

        <div className="home-hero-visual">
          <div className="home-hero-orbit" aria-hidden>
            <span />
            <span />
            <span />
          </div>
          <img
            src={heroCondominio}
            alt="Maquete do Residencial Jacarandá representando o universo condominial"
            width={1280}
            height={1024}
            className="home-hero-building"
            draggable={false}
            fetchPriority="high"
          />
          <p className="home-hero-label home-hero-label-top" aria-hidden>
            Conhecimento
            <br />
            Conexões
            <br />
            Gestão real
          </p>
          <p className="home-hero-label home-hero-label-bottom" aria-hidden>
            Condomínios mais fortes
            <br />
            Pessoas mais felizes
          </p>
        </div>
      </div>
    </section>
  );
}
