import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section id="top" className="relative pt-28 md:pt-32 pb-10 md:pb-14 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[60rem] h-[40rem] rounded-full bg-brand-soft blur-3xl opacity-50" />
      </div>

      <div className="container-x text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface-elevated text-[11px] uppercase tracking-[0.18em] text-ink-soft"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand" />
          SíndicoLab
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.08 }}
          className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl leading-[1.05] text-ink text-balance"
        >
          Escolha por onde entrar no{" "}
          <span className="italic text-brand">ecossistema condominial</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
          className="mt-5 text-base md:text-lg text-ink-soft max-w-xl mx-auto text-balance"
        >
          Conteúdo, cursos, materiais e soluções conectadas para síndicos,
          moradores, conselheiros e condomínios.
        </motion.p>
      </div>
    </section>
  );
}
