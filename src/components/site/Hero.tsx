import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;
const baseDelay = 2.0;

const words = ["Escolha", "por", "onde", "entrar", "no"];
const accentWords = ["ecossistema", "condominial."];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.2]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-[92vh] md:min-h-screen flex items-center pt-28 md:pt-32 pb-16 overflow-hidden"
    >
      {/* ambient backdrop */}
      <motion.div
        style={{ y }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-40 -right-20 w-[42rem] h-[42rem] rounded-full bg-brand-soft blur-[120px] opacity-70" />
        <div className="absolute top-1/3 -left-20 w-[30rem] h-[30rem] rounded-full bg-accent blur-[120px] opacity-50" />
      </motion.div>

      <motion.div
        style={{ scale, opacity }}
        className="container-x w-full"
      >
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: baseDelay, duration: 0.6, ease }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface-elevated text-[11px] uppercase tracking-[0.3em] text-ink-soft"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand animate-blink" />
          O canal do ecossistema condominial
        </motion.div>

        <h1 className="mt-6 font-display text-[12vw] sm:text-7xl md:text-[7.4rem] lg:text-[8.4rem] leading-[0.92] text-ink max-w-[20ch]">
          {words.map((w, i) => (
            <Word key={i} delay={baseDelay + 0.1 + i * 0.06}>
              {w}{" "}
            </Word>
          ))}
          <br className="hidden md:block" />
          {accentWords.map((w, i) => (
            <Word key={i} delay={baseDelay + 0.5 + i * 0.06} accent>
              {w}{" "}
            </Word>
          ))}
        </h1>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: baseDelay + 0.8, duration: 0.6, ease }}
            className="md:col-span-6 text-base md:text-lg text-ink-soft max-w-xl text-balance"
          >
            Conteúdo, cursos, materiais e soluções conectadas para síndicos,
            moradores, conselheiros e condomínios.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: baseDelay + 0.95, duration: 0.6, ease }}
            className="md:col-span-6 flex md:justify-end"
          >
            <a
              href="#caminhos"
              className="group inline-flex items-center gap-3 text-sm font-medium text-ink"
            >
              <span className="grid place-items-center w-12 h-12 rounded-full border border-border-strong group-hover:bg-ink group-hover:text-background group-hover:border-ink transition-all">
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </span>
              Explorar caminhos
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function Word({
  children,
  delay,
  accent,
}: {
  children: React.ReactNode;
  delay: number;
  accent?: boolean;
}) {
  return (
    <span className="inline-block overflow-hidden align-bottom">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ delay, duration: 0.85, ease }}
        className={`inline-block ${accent ? "text-brand italic font-light" : ""}`}
      >
        {children}
      </motion.span>
    </span>
  );
}
