import { ArrowUpRight } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "./Reveal";

const jornadas = [
  { perfil: "Sou morador", goal: "Quero conhecer alternativas de gestão.", cta: "Ver Quero1Síndico", href: "https://quero1sindico.com/" },
  { perfil: "Sou conselheiro", goal: "Quero chegar preparado na assembleia.", cta: "Acessar materiais", href: "https://downloads.sindicolab.com/" },
  { perfil: "Sou síndico", goal: "Quero me posicionar no mercado.", cta: "Entrar no canal", href: "https://sindicolab.com/" },
  { perfil: "Quero aprender", goal: "Quero entender o universo condominial.", cta: "Explorar cursos", href: "https://sindicolab.com/play/" },
];

export function Jornadas() {
  return (
    <section className="py-20 md:py-32 bg-surface">
      <div className="container-x">
        <Reveal>
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.2em] text-brand font-semibold">
              Jornadas
            </div>
            <h2 className="mt-3 font-display text-4xl md:text-6xl text-ink leading-[1.05] text-balance">
              Por onde você quer começar?
            </h2>
          </div>
        </Reveal>

        <Stagger className="mt-12 grid sm:grid-cols-2 gap-4">
          {jornadas.map((j) => (
            <StaggerItem key={j.perfil}>
              <a
                href={j.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-6 p-6 md:p-8 rounded-3xl bg-card border border-border hover:border-ink hover:bg-ink hover:text-background transition-all duration-500"
              >
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-ink-soft group-hover:text-background/60">
                    {j.perfil}
                  </div>
                  <div className="mt-2 font-display text-2xl md:text-3xl leading-tight">
                    {j.goal}
                  </div>
                  <div className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand group-hover:text-brand-soft">
                    {j.cta}
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
                <div className="hidden sm:grid place-items-center w-14 h-14 rounded-full border border-border-strong group-hover:border-background/30 transition-colors">
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
