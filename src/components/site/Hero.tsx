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
      {/* ambient backdrop — leve, sem parallax pesado em mobile */}
      <motion.div style={{ y }} className="pointer-events-none absolute inset-0 -z-10 hero-blobs">
        <div className="absolute -top-32 -right-40 w-[42rem] h-[42rem] rounded-full bg-brand-soft opacity-80 hero-blob" />
        <div className="absolute top-1/3 -left-40 w-[32rem] h-[32rem] rounded-full bg-cyan-soft opacity-60 hero-blob" />
      </motion.div>

      {/* Brand orbital badge — discreet editorial seal */}
      <OrbitalBrandBadge />

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

function OrbitalBrandBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.05, duration: 1.2, ease }}
      className="absolute top-20 right-4 md:top-16 md:right-8 lg:top-12 lg:right-10 w-[140px] h-[140px] md:w-[200px] md:h-[200px] lg:w-[220px] lg:h-[220px] z-[5] pointer-events-none"
      aria-hidden
    >
      <div className="absolute inset-0 animate-orbit-slow">
        <svg viewBox="0 0 200 200" className="w-full h-full text-ink/45">
          <defs>
            <path
              id="brand-orbit"
              d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"
            />
          </defs>
          <text
            fontSize="8"
            letterSpacing="3.5"
            fill="currentColor"
            fontFamily="Mona Sans, Albert Sans, sans-serif"
            fontWeight="500"
          >
            <textPath href="#brand-orbit" startOffset="0%">
              SÍNDICOLAB • GESTÃO CONDOMINIAL • SÍNDICO PROFISSIONAL •
            </textPath>
          </text>
        </svg>
      </div>
    </motion.div>
  );
}
