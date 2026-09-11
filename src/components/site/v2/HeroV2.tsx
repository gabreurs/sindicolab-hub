import {
  ArrowRight,
  BookOpen,
  Building2,
  CalendarDays,
  Download,
  Handshake,
  Mail,
  PlayCircle,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import heroCondominio from "@/assets/v2/hero-condominio-pt.png";
import { Button } from "@/components/ui/button";

const destinations = [
  { label: "Portal", detail: "Notícias e ideias", to: "/portal", icon: BookOpen },
  { label: "Materiais", detail: "Guias e downloads", to: "/materiais", icon: Download },
  { label: "Cursos", detail: "SíndicoLab Play", to: "/play", icon: PlayCircle },
  { label: "Eventos", detail: "Encontros e comunidade", to: "/quem-somos", icon: CalendarDays },
  { label: "Patrocínios", detail: "Conecte sua marca", to: "/patrocinios", icon: Handshake },
] as const;

export function HeroV2() {
  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <div className="home-hero-grid" aria-hidden />
      <div className="home-hero-shell">
        <div className="home-hero-copy">
          <p className="home-hero-kicker">
            <span /> Ecossistema condominial brasileiro
          </p>
          <h1 id="home-hero-title" className="home-hero-title">
            Tudo o que move o
            <br />
            condomínio, <em>conectado.</em>
          </h1>
          <p className="home-hero-description">
            Conteúdo, formação, ferramentas e conexões para transformar a gestão
            e tornar a vida em condomínio melhor.
          </p>

          <div className="home-hero-actions">
            <Button asChild size="lg" className="home-hero-primary">
              <a href="https://quero1sindico.com/" target="_blank" rel="noreferrer">
                <Building2 /> Encontrar um síndico <ArrowRight />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="home-hero-secondary">
              <a href="#newsletter">
                <Mail /> Receber a newsletter
              </a>
            </Button>
          </div>
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
          <p className="home-hero-caption">Pessoas melhores. Condomínios melhores.</p>
        </div>

        <nav className="home-hero-destinations" aria-label="Explore o SíndicoLab">
          {destinations.map(({ label, detail, to, icon: Icon }, index) => (
            <Link key={label} to={to} className="home-destination">
              <span className="home-destination-number">0{index + 1}</span>
              <Icon aria-hidden />
              <span className="home-destination-copy">
                <strong>{label}</strong>
                <small>{detail}</small>
              </span>
              <ArrowRight className="home-destination-arrow" aria-hidden />
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
