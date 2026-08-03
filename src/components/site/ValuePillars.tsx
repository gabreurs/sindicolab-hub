import { motion } from "framer-motion";
import { Building2, GraduationCap, FileText, Users } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const items = [
  {
    icon: Building2,
    title: "Gestão condominial",
    text: "Repertório, casos e ferramentas para conduzir um condomínio com clareza, técnica e responsabilidade.",
  },
  {
    icon: Users,
    title: "Síndicos profissionais",
    text: "Profissionais qualificados para condomínios que buscam mais governança, transparência e resultado.",
  },
  {
    icon: GraduationCap,
    title: "Formação continuada",
    text: "Cursos para síndicos, conselheiros e profissionais que querem evoluir tecnicamente no setor.",
  },
  {
    icon: FileText,
    title: "Materiais e modelos",
    text: "Modelos de atas, regimentos, comunicados e checklists para acelerar a rotina do condomínio.",
  },
];

export function ValuePillars() {
  return (
    <section className="py-20 md:py-28" aria-labelledby="valor-h">
      <div className="container-x">
        <div className="grid md:grid-cols-12 gap-10 md:gap-6 items-end mb-10 md:mb-14">
          <div className="md:col-span-7">
            <div className="text-[10px] tracking-tight text-ink-soft mb-2">
              + Por que SíndicoLab
            </div>
            <h2
              id="valor-h"
              className="font-display text-3xl md:text-5xl text-ink text-balance tracking-[-0.03em]"
            >
              Um ecossistema pensado para o mercado condominial brasileiro.
            </h2>
          </div>
          <p className="md:col-span-5 text-base text-ink-soft text-balance">
            Conteúdo, formação, materiais e o Quero1Síndico — quatro frentes coordenadas
            para apoiar quem decide pelo condomínio.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.06, duration: 0.6, ease }}
              className="glass rounded-3xl p-7 md:p-8 group transition-colors"
            >
              <span className="grid place-items-center w-11 h-11 rounded-xl bg-secondary text-ink group-hover:gradient-lab group-hover:text-background transition-all">
                <it.icon className="w-5 h-5" strokeWidth={1.6} />
              </span>
              <h3 className="mt-6 font-display text-xl text-ink tracking-[-0.02em]">
                {it.title}
              </h3>
              <p className="mt-2 text-sm text-ink-soft leading-relaxed">{it.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
