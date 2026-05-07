import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { Reveal } from "./Reveal";
import quero1Img from "@/assets/quero1sindico.jpg";

const beneficios = [
  "Conexão entre moradores, conselheiros e síndicos profissionais",
  "Apoio estratégico em momentos de assembleia e troca de gestão",
  "Frente comercial principal do ecossistema SíndicoLab",
  "Visibilidade real para profissionais que querem se posicionar",
];

export function Quero1Destaque() {
  return (
    <section id="quero1sindico" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-brand-soft/40 to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] rounded-full bg-brand/10 blur-3xl" />
      </div>

      <div className="container-x">
        <Reveal>
          <div className="rounded-[2.5rem] overflow-hidden bg-ink text-background shadow-lift relative">
            <div className="grid lg:grid-cols-12">
              <div className="lg:col-span-7 p-8 md:p-16 relative">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/15 border border-brand/30 text-brand-soft text-xs font-medium uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                  Destaque do ecossistema
                </div>

                <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[1.02] text-balance">
                  O produto que transforma{" "}
                  <span className="italic text-brand-soft">interesse</span> em{" "}
                  <span className="italic text-brand-soft">ação</span>.
                </h2>

                <p className="mt-6 text-background/75 text-lg max-w-xl">
                  O Quero1Síndico é a frente mais comercial do ecossistema. Ele
                  aproxima quem precisa contratar de quem pode oferecer uma gestão
                  profissional — com clareza, contexto e velocidade.
                </p>

                <ul className="mt-8 space-y-3">
                  {beneficios.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-background/85">
                      <span className="mt-0.5 grid place-items-center w-5 h-5 rounded-full bg-brand text-brand-foreground shrink-0">
                        <Check className="w-3 h-3" />
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 flex flex-wrap gap-3">
                  <a
                    href="https://quero1sindico.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-brand text-brand-foreground font-medium shadow-brand hover:brightness-110 transition"
                  >
                    Visitar Quero1Síndico
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                  <a
                    href="https://quero1sindico.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-background/20 text-background/90 hover:bg-background/10 transition"
                  >
                    Entender como funciona
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-[640px]">
                <motion.img
                  initial={{ scale: 1.08 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                  src={quero1Img}
                  alt="Quero1Síndico em destaque"
                  width={1200}
                  height={1400}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-ink/10 to-ink/60 lg:to-ink/30" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
