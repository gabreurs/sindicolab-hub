import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.93]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.1]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-[96vh] flex items-center pt-28 md:pt-36 pb-24 overflow-hidden"
    >
      {/* ambient backdrop */}
      <motion.div style={{ y }} className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -right-40 w-[48rem] h-[48rem] rounded-full bg-brand-soft blur-[140px] opacity-90" />
        <div className="absolute top-1/3 -left-40 w-[36rem] h-[36rem] rounded-full bg-cyan-soft blur-[120px] opacity-70" />
      </motion.div>

      {/* Orbital seal — straddles header */}
      <OrbitalSeal />

      <motion.div style={{ scale, opacity }} className="container-x w-full relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6, ease }}
          className="text-[12px] text-ink-soft"
        >
          Ecossistema condominial brasileiro
        </motion.p>

        <h1 className="mt-5 font-display text-[10.5vw] sm:text-6xl md:text-[5.4rem] lg:text-[6.2rem] leading-[0.94] text-ink max-w-[20ch] tracking-[-0.045em]">
          <Line delay={1.0}>Síndico profissional,</Line>
          <Line delay={1.1}>cursos e materiais</Line>
          <Line delay={1.2}>
            para <span className="text-gradient-lab">gestão condominial</span>.
          </Line>
        </h1>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 items-end">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.45, duration: 0.6, ease }}
            className="md:col-span-6 text-[1.05rem] md:text-lg text-ink-soft max-w-xl text-balance leading-relaxed"
          >
            O <strong className="text-ink font-medium">SíndicoLab</strong> reúne conteúdo,
            cursos, materiais, experiências e soluções para síndicos, moradores,
            conselheiros e condomínios que buscam uma gestão mais profissional.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6, ease }}
            className="md:col-span-6 flex flex-wrap items-center gap-3 md:justify-end"
          >
            <a href="https://quero1sindico.com/" target="_blank" rel="noreferrer" className="btn-primary">
              Encontrar síndico profissional
              <ArrowUpRight className="w-4 h-4 btn-arrow" />
            </a>
            <a href="#produtos" className="btn-ghost">
              Ver o ecossistema
              <ArrowRight className="w-4 h-4 btn-arrow" />
            </a>
          </motion.div>
        </div>

        {/* meta strip */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.75, duration: 0.7, ease }}
          className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border"
        >
          {[
            ["+150", "síndicos profissionais"],
            ["+80", "materiais práticos"],
            ["+30", "cursos e formações"],
            ["+12", "workshops por ano"],
          ].map(([n, l]) => (
            <div key={l} className="bg-background p-5 md:p-6">
              <div className="font-display text-2xl md:text-3xl text-ink">{n}</div>
              <div className="text-xs md:text-sm text-ink-soft mt-1">{l}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ delay, duration: 0.95, ease }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}

function OrbitalSeal() {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 60]);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.1, duration: 1.4, ease }}
      className="hidden lg:block absolute -top-16 xl:-top-24 right-2 xl:right-8 w-[340px] h-[340px] xl:w-[420px] xl:h-[420px] z-[5] pointer-events-none"
      aria-hidden
    >
      <motion.div style={{ rotate }} className="absolute inset-0 animate-orbit-slow">
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full text-ink/55">
          <defs>
            <path id="circle-text" d="M 100 100 m -86 0 a 86 86 0 1 1 172 0 a 86 86 0 1 1 -172 0" />
          </defs>
          <text fontSize="7.5" letterSpacing="6.5" fill="currentColor" fontFamily="Mona Sans, sans-serif" fontWeight="500">
            <textPath href="#circle-text">
              SÍNDICOLAB    GESTÃO CONDOMINIAL    SÍNDICO PROFISSIONAL    
            </textPath>
          </text>
        </svg>
        <div className="absolute inset-2 rounded-full border border-ink/10" />
        <div className="absolute inset-10 rounded-full border border-ink/5" />
      </motion.div>
      <div className="absolute inset-0 grid place-items-center">
        <div className="relative w-24 h-24 xl:w-28 xl:h-28 rounded-full" style={{ background: "var(--gradient-lab)" }}>
          <div className="absolute -inset-1 rounded-full opacity-50 blur-2xl" style={{ background: "var(--gradient-lab)" }} />
          <div className="absolute inset-1 rounded-full bg-background/15 backdrop-blur-md border border-background/20" />
        </div>
      </div>
    </motion.div>
  );
}
