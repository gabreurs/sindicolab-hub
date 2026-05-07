import { Play, FileText, BookOpen, Download, Video, Layers } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "./Reveal";

const items = [
  { icon: Play, tag: "Play", title: "Aulas e episódios", desc: "Trilhas em vídeo para evolução contínua." },
  { icon: BookOpen, tag: "Cursos", title: "Formações completas", desc: "Programas estruturados de ponta a ponta." },
  { icon: Download, tag: "Downloads", title: "Materiais ricos", desc: "Guias práticos para baixar e aplicar." },
  { icon: FileText, tag: "Conteúdo", title: "Artigos e análises", desc: "Repertório editorial sobre o mercado." },
  { icon: Video, tag: "Vídeos", title: "Bastidores e cases", desc: "Histórias reais de gestão condominial." },
  { icon: Layers, tag: "Trilhas", title: "Jornadas de aprendizado", desc: "Caminhos guiados por nível e perfil." },
];

export function Conteudos() {
  return (
    <section className="py-20 md:py-32">
      <div className="container-x">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <div className="text-xs uppercase tracking-[0.2em] text-brand font-semibold">
                Riqueza do ecossistema
              </div>
              <h2 className="mt-3 font-display text-4xl md:text-6xl text-ink leading-[1.05] text-balance">
                Conteúdo, cursos e{" "}
                <span className="italic">materiais</span>.
              </h2>
            </div>
            <p className="text-ink-soft md:max-w-sm">
              Mais do que um site: um hub vivo, com produção contínua para todo o mercado.
            </p>
          </div>
        </Reveal>

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((it) => (
            <StaggerItem key={it.title}>
              <div className="group h-full p-6 rounded-2xl bg-card border border-border hover:border-brand hover:shadow-card transition-all duration-500">
                <div className="flex items-center justify-between">
                  <div className="grid place-items-center w-11 h-11 rounded-xl bg-secondary text-ink group-hover:bg-brand group-hover:text-brand-foreground transition-colors">
                    <it.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-ink-soft">
                    {it.tag}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl text-ink">{it.title}</h3>
                <p className="mt-1.5 text-sm text-ink-soft">{it.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
