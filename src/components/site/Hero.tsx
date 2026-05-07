import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Plus } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;
const baseDelay = 1.85;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);
  const blur = useTransform(scrollYProgress, [0.6, 1], [0, 6]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-[94vh] md:min-h-screen flex items-center pt-28 md:pt-32 pb-20 overflow-hidden"
    >
      {/* ambient backdrop */}
      <motion.div style={{ y }} className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-lines opacity-60" />
        <div className="absolute -top-40 -right-32 w-[44rem] h-[44rem] rounded-full bg-brand-soft blur-[120px] opacity-80" />
        <div className="absolute top-1/2 -left-32 w-[34rem] h-[34rem] rounded-full bg-cyan-soft blur-[120px] opacity-70" />
      </motion.div>

      <motion.div style={{ scale, opacity, filter }} className="container-x w-full">
        {/* micro label */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: baseDelay, duration: 0.6, ease }}
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.4em] text-ink-soft"
        >
          <Plus className="w-3 h-3 text-brand" strokeWidth={2.5} />
          Síndico profissional, cursos e materiais
        </motion.div>

        {/* H1 with SEO-driven, animated reveal */}
        <h1 className="mt-7 font-display text-[10vw] sm:text-6xl md:text-[5.5rem] lg:text-[6.6rem] leading-[0.96] text-ink max-w-[18ch] tracking-[-0.04em]">
          <Line delay={baseDelay + 0.1}>Síndico profissional,</Line>
          <Line delay={baseDelay + 0.2}>
            cursos e <span className="text-gradient-lab italic font-normal">materiais</span>
          </Line>
          <Line delay={baseDelay + 0.3}>para condomínio.</Line>
        </h1>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 items-end">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: baseDelay + 0.55, duration: 0.6, ease }}
            className="md:col-span-6 text-base md:text-lg text-ink-soft max-w-xl text-balance leading-relaxed"
          >
            O <strong className="text-ink font-medium">SíndicoLab</strong> conecta quem busca
            síndico profissional, cursos para síndicos, materiais para condomínio e
            conteúdo de gestão condominial em um só ecossistema.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: baseDelay + 0.7, duration: 0.6, ease }}
            className="md:col-span-6 flex flex-wrap items-center gap-3 md:justify-end"
          >
            <a
              href="https://quero1sindico.com/"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-ink text-background font-medium hover:bg-brand transition-colors shadow-card"
            >
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inset-0 rounded-full bg-cyan animate-blink" />
              </span>
              Encontrar síndico profissional
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#caminhos"
              className="inline-flex items-center gap-1.5 px-4 py-3 text-sm font-medium text-ink hover:text-brand transition-colors"
            >
              Ver o ecossistema
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </div>

        {/* meta strip */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: baseDelay + 0.85, duration: 0.6, ease }}
          className="mt-14 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border"
        >
          {[
            ["+150", "síndicos profissionais"],
            ["+80", "materiais práticos"],
            ["+30", "cursos e formações"],
            ["1", "ecossistema condominial"],
          ].map(([n, l]) => (
            <div key={l} className="bg-background p-5 md:p-6">
              <div className="font-display text-2xl md:text-3xl text-ink">{n}</div>
              <div className="text-xs md:text-sm text-ink-soft mt-1">{l}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* bottom blur reveal hint */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}

function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ delay, duration: 0.9, ease }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}
