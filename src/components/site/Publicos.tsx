import { Building2, Home, Users, Briefcase, Handshake } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "./Reveal";

const publicos = [
  { icon: Building2, title: "Condomínios", desc: "Acessam um ecossistema completo de informação, formação e gestão." },
  { icon: Home, title: "Moradores", desc: "Descobrem alternativas claras de gestão e participam melhor das decisões." },
  { icon: Users, title: "Conselheiros", desc: "Chegam mais preparados em assembleias com repertório e referências." },
  { icon: Briefcase, title: "Síndicos profissionais", desc: "Se posicionam, geram demanda e ampliam autoridade no mercado." },
  { icon: Handshake, title: "Parceiros & mercado", desc: "Encontram um hub vivo para conectar produtos, marcas e iniciativas." },
];

export function Publicos() {
  return (
    <section className="py-20 md:py-32">
      <div className="container-x">
        <Reveal>
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.2em] text-brand font-semibold">
              Para quem é
            </div>
            <h2 className="mt-3 font-display text-4xl md:text-6xl text-ink leading-[1.05] text-balance">
              Pensado para cada{" "}
              <span className="italic">ponto do mercado</span>.
            </h2>
            <p className="mt-4 text-ink-soft text-lg">
              O ecossistema foi desenhado para atender diferentes papéis dentro do
              universo condominial — com clareza para cada um deles.
            </p>
          </div>
        </Reveal>

        <Stagger className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {publicos.map((p) => (
            <StaggerItem key={p.title}>
              <div className="group h-full p-7 rounded-3xl bg-card border border-border hover:border-border-strong hover:shadow-card transition-all duration-500">
                <div className="grid place-items-center w-12 h-12 rounded-2xl bg-secondary text-ink group-hover:bg-brand group-hover:text-brand-foreground transition-colors">
                  <p.icon className="w-5 h-5" />
                </div>
                <h3 className="mt-5 font-display text-2xl text-ink">{p.title}</h3>
                <p className="mt-2 text-ink-soft">{p.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
