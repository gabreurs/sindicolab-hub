import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { InstagramIcon as Instagram } from "@/components/icons/SocialIcons";

const stats = [
  { n: "12+", l: "Workshops por ano no CondoHuby" },
  { n: "+100", l: "Síndicos por encontro presencial" },
  { n: "150+", l: "Conteúdos publicados" },
  { n: "+12k", l: "Profissionais impactados" },
];

const tiles = [
  { tag: "Workshop", title: "Inteligência condominial", tone: "from-brand-soft to-cyan-soft" },
  { tag: "Encontro", title: "Síndicos no CondoHuby", tone: "from-secondary to-brand-soft" },
  { tag: "Bastidor", title: "Curadoria editorial", tone: "from-violet/20 to-brand-soft" },
];

export function QuemSomos() {
  return (
    <section id="quem-somos" className="py-24 md:py-32 border-t border-border" aria-labelledby="qs-h">
      <div className="container-x">
        <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-end">
          <div className="md:col-span-6">
            <p className="text-xs text-ink-soft mb-3">Quem é o SíndicoLab</p>
            <h2
              id="qs-h"
              className="font-display text-3xl md:text-5xl text-ink tracking-[-0.035em] leading-[1.02] text-balance"
            >
              Um laboratório vivo do <span className="italic font-normal text-brand">mercado condominial</span>.
            </h2>
            <p className="mt-5 text-ink-soft leading-relaxed max-w-xl">
              Workshops, encontros no CondoHuby, comunidade de síndicos profissionais, conteúdo editorial
              e cursos. O SíndicoLab acontece também — e principalmente — no mundo real.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="/quem-somos" className="btn-ghost">
                Conhecer o SíndicoLab <ArrowUpRight className="w-4 h-4 btn-arrow" />
              </a>
              <a
                href="https://instagram.com/sindicolab"
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                <Instagram className="w-4 h-4" /> @sindicolab
              </a>
            </div>
          </div>

          <div className="md:col-span-6 grid grid-cols-2 gap-3">
            {stats.map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <div className="font-display text-3xl md:text-4xl text-ink tracking-[-0.03em]">{s.n}</div>
                <div className="text-sm text-ink-soft mt-1 leading-snug">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mini galeria editorial */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-3">
          {tiles.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`relative aspect-[4/3] rounded-2xl overflow-hidden border border-border bg-gradient-to-br ${t.tone}`}
            >
              <div className="absolute inset-0 pattern-grid-dark opacity-30" />
              <div className="absolute top-4 left-4 text-[11px] text-ink/70">{t.tag}</div>
              <div className="absolute bottom-4 left-4 right-4 font-display text-xl md:text-2xl text-ink tracking-[-0.02em]">
                {t.title}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
