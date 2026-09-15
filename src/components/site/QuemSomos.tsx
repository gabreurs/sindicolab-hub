import { motion } from "framer-motion";
import { ArrowUpRight, Brain, MessageSquare, Sparkles } from "lucide-react";
import { InstagramIcon as Instagram } from "@/components/icons/SocialIcons";
import logoSindicolab from "@/assets/brand/logo-white-purple.svg";
import logoCondohuby from "@/assets/midia-kit/brand/logo-condohuby.svg";

const stats = [
  { n: "12+", l: "Workshops por ano no CondoHuby" },
  { n: "+100", l: "Síndicos por encontro presencial" },
  { n: "150+", l: "Conteúdos publicados" },
  { n: "+12k", l: "Profissionais impactados" },
];

const tiles = [
  {
    tag: "Workshop",
    title: "Inteligência artificial para síndicos",
    bullets: ["Automação de rotinas administrativas", "Prompts prontos para comunicação", "Casos reais de gestão predial"],
    tone: "from-violet-600/30 to-fuchsia-600/20",
    icon: Brain,
  },
  {
    tag: "Encontro",
    title: "Síndicos no CondoHuby",
    bullets: ["Networking com síndicos profissionais", "Trocas de experiência práticas", "Convidados de referência do setor"],
    tone: "from-cyan-600/25 to-blue-600/20",
    icon: MessageSquare,
  },
  {
    tag: "Bastidor",
    title: "Curadoria editorial SíndicoLab",
    bullets: ["Análises semanais do mercado", "Guias e materiais exclusivos", "Tendências para decisores"],
    tone: "from-indigo-600/30 to-violet-600/20",
    icon: Sparkles,
  },
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

        {/* Cards de experiência */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4">
          {tiles.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0B0C14] p-6 md:p-7"
            >
              {/* Glow gradient */}
              <div
                className={`pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br ${t.tone} opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-60`}
                aria-hidden="true"
              />
              <div className="absolute inset-0 opacity-[0.03] pattern-grid-light" aria-hidden="true" />

              <div className="relative">
                {/* Header logos */}
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={logoSindicolab} alt="" className="h-4 w-auto" />
                    <span className="text-white/20">×</span>
                    <img src={logoCondohuby} alt="" className="h-4 w-auto" />
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/70">
                    {t.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-2xl md:text-[28px] leading-[1.05] tracking-[-0.02em] text-balance">
                  <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                    {t.title}
                  </span>
                </h3>

                {/* Bullets */}
                <ul className="mt-5 space-y-2.5">
                  {t.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-white/60">
                      <t.icon className="mt-0.5 h-4 w-4 shrink-0 text-brand/80" strokeWidth={1.5} />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Abstract visual element */}
                <div className="mt-7 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((n) => (
                      <div
                        key={n}
                        className="h-8 w-8 rounded-full border-2 border-[#0B0C14] bg-gradient-to-br from-surface to-border"
                      />
                    ))}
                  </div>
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 border border-white/10 text-brand/80">
                    <t.icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
