import { motion } from "framer-motion";
import { Reveal, Stagger, StaggerItem } from "./Reveal";

const layers = [
  { tag: "Canal", title: "SíndicoLab", desc: "A estrutura principal e a marca guarda-chuva.", tone: "ink" },
  { tag: "Produto", title: "Quero1Síndico", desc: "O coração comercial do ecossistema.", tone: "brand" },
  { tag: "Formação", title: "Cursos & Play", desc: "Repertório e desenvolvimento.", tone: "soft" },
  { tag: "Nutrição", title: "Materiais", desc: "Guias, downloads e apoio.", tone: "soft" },
  { tag: "Autoridade", title: "Conteúdo", desc: "Posicionamento de mercado.", tone: "soft" },
  { tag: "Aquisição", title: "Campanhas", desc: "Atração e geração de demanda.", tone: "soft" },
  { tag: "Conversão", title: "Relacionamento", desc: "Jornada até a decisão.", tone: "soft" },
] as const;

export function Ecossistema() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="container-x">
        <Reveal>
          <div className="max-w-3xl">
            <div className="text-xs uppercase tracking-[0.2em] text-brand font-semibold">
              Como funciona
            </div>
            <h2 className="mt-3 font-display text-4xl md:text-6xl text-ink leading-[1.05] text-balance">
              Um canal. Vários{" "}
              <span className="italic text-brand">pontos de entrada</span>.
            </h2>
            <p className="mt-5 text-ink-soft text-lg max-w-2xl">
              O SíndicoLab funciona como a estrutura principal. Dentro dele, o
              Quero1Síndico aparece como produto central, enquanto cursos, materiais e
              conteúdos fortalecem a jornada, a autoridade e o relacionamento com o
              mercado.
            </p>
          </div>
        </Reveal>

        <Stagger className="mt-14 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {layers.map((l, i) => (
            <StaggerItem key={l.title}>
              <motion.div
                whileHover={{ y: -4 }}
                className={`relative h-44 md:h-56 rounded-2xl p-4 flex flex-col justify-between border transition-shadow ${
                  l.tone === "brand"
                    ? "bg-brand text-brand-foreground border-brand shadow-brand"
                    : l.tone === "ink"
                    ? "bg-ink text-background border-ink"
                    : "bg-card text-ink border-border hover:shadow-card"
                }`}
                style={{ marginTop: `${(i % 3) * 8}px` }}
              >
                <div className={`text-[10px] uppercase tracking-[0.18em] ${
                  l.tone === "soft" ? "text-ink-soft" : "opacity-70"
                }`}>
                  {l.tag}
                </div>
                <div>
                  <div className="font-display text-xl leading-tight">{l.title}</div>
                  <div className={`mt-1.5 text-xs ${
                    l.tone === "soft" ? "text-ink-soft" : "opacity-80"
                  }`}>
                    {l.desc}
                  </div>
                </div>
                {l.tone === "brand" && (
                  <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-background text-ink text-[9px] font-bold uppercase tracking-wider shadow-soft">
                    Core
                  </div>
                )}
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
