import { motion } from "framer-motion";
import { Calendar, Users, Mic, ArrowUpRight } from "lucide-react";

const items = [
  { icon: Calendar, n: "12+", label: "Workshops por ano com síndicos e parceiros" },
  { icon: Users, n: "+100", label: "Síndicos por encontro presencial" },
  { icon: Mic, n: "150+", label: "Episódios e conteúdos publicados" },
];

export function QuemSomos() {
  return (
    <section id="quem-somos" className="py-24 md:py-32" aria-labelledby="qs-h">
      <div className="container-x grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <p className="text-[12px] text-ink-soft mb-3">Quem é o SíndicoLab</p>
          <h2 id="qs-h" className="font-display text-3xl md:text-5xl text-ink tracking-[-0.035em] leading-[1.02] text-balance">
            Um ecossistema vivo no mercado condominial brasileiro.
          </h2>
          <p className="mt-5 text-ink-soft leading-relaxed text-balance">
            O SíndicoLab existe no mundo real: workshops, encontros, comunidade,
            curadoria editorial e relacionamento com síndicos profissionais, conselheiros
            e marcas. Aqui, o canal digital encontra o presencial.
          </p>
          <a href="/quem-somos" className="btn-ghost mt-7">
            Conhecer o SíndicoLab
            <ArrowUpRight className="w-4 h-4 btn-arrow" />
          </a>
        </div>

        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={it.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl border border-border bg-card p-5 flex flex-col justify-between min-h-[180px]"
              >
                <Icon className="w-5 h-5 text-brand" />
                <div>
                  <div className="font-display text-3xl text-ink">{it.n}</div>
                  <div className="text-sm text-ink-soft mt-1 leading-snug">{it.label}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
