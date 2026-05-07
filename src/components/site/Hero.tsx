import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, GraduationCap, Download, Radio, Users } from "lucide-react";
import quero1Img from "@/assets/quero1sindico.jpg";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section id="top" className="relative pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden">
      {/* ambient blur shapes */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-24 w-[40rem] h-[40rem] rounded-full bg-brand-soft blur-3xl opacity-60" />
        <div className="absolute top-1/3 -right-40 w-[34rem] h-[34rem] rounded-full bg-accent blur-3xl opacity-50" />
      </div>

      <div className="container-x grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <div className="lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface-elevated text-xs font-medium text-ink-soft"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand" />
            Novo ecossistema · 2026
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="mt-6 font-display text-[2.6rem] sm:text-5xl lg:text-[4.2rem] leading-[1.02] text-ink text-balance"
          >
            O canal que conecta{" "}
            <span className="italic text-brand">conteúdo</span>, formação e{" "}
            <span className="italic">oportunidades</span> no mercado condominial.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.25 }}
            className="mt-6 text-lg text-ink-soft max-w-xl text-balance"
          >
            Um ecossistema criado para aproximar condomínios, síndicos, conselheiros,
            moradores e soluções em um só lugar.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href="#quero1sindico"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-brand text-brand-foreground font-medium shadow-brand hover:brightness-110 transition"
            >
              Conhecer o Quero1Síndico
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#portas"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-border-strong text-ink hover:bg-secondary transition"
            >
              Explorar o ecossistema
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 flex items-center gap-6 text-xs text-ink-soft"
          >
            <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand" /> Quero1Síndico</div>
            <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-ink/40" /> Cursos</div>
            <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-ink/40" /> Materiais</div>
            <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-ink/40" /> Canal</div>
          </motion.div>
        </div>

        {/* right composition */}
        <div className="lg:col-span-6 relative h-[480px] md:h-[560px]">
          <HeroComposition img={quero1Img} />
        </div>
      </div>
    </section>
  );
}

function HeroComposition({ img }: { img: string }) {
  const float = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease, delay },
  });

  return (
    <div className="absolute inset-0">
      {/* main protagonist card */}
      <motion.div
        {...float(0.2)}
        whileHover={{ y: -4 }}
        className="absolute left-2 top-4 w-[78%] h-[78%] rounded-3xl overflow-hidden shadow-lift bg-card border border-border"
      >
        <img
          src={img}
          alt="Síndico profissional"
          className="absolute inset-0 w-full h-full object-cover"
          width={1024}
          height={1024}
        />
        <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/70 via-black/20 to-transparent text-white">
          <div className="text-[10px] uppercase tracking-[0.18em] opacity-80">Produto principal</div>
          <div className="font-display text-2xl mt-1">Quero1Síndico</div>
          <div className="text-sm opacity-90">Conexão entre decisão e gestão profissional.</div>
        </div>
        <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-brand text-brand-foreground text-[10px] font-semibold tracking-wider uppercase">
          Em destaque
        </div>
      </motion.div>

      {/* floating mini cards */}
      <motion.div
        {...float(0.45)}
        whileHover={{ y: -3, rotate: -1 }}
        className="absolute right-0 top-0 w-44 rounded-2xl bg-card border border-border shadow-card p-4"
      >
        <GraduationCap className="w-5 h-5 text-ink" />
        <div className="mt-3 font-display text-base text-ink">Cursos</div>
        <div className="text-xs text-ink-soft mt-0.5">Formação para síndicos e conselheiros.</div>
      </motion.div>

      <motion.div
        {...float(0.6)}
        whileHover={{ y: -3 }}
        className="absolute right-6 bottom-24 w-48 rounded-2xl bg-ink text-background border border-ink shadow-lift p-4"
      >
        <Download className="w-5 h-5" />
        <div className="mt-3 font-display text-base">Materiais</div>
        <div className="text-xs opacity-70 mt-0.5">Guias e downloads ricos.</div>
      </motion.div>

      <motion.div
        {...float(0.75)}
        whileHover={{ y: -3, rotate: 1 }}
        className="absolute left-12 bottom-2 w-44 rounded-2xl bg-brand-soft border border-brand/20 shadow-card p-4"
      >
        <Radio className="w-5 h-5 text-brand" />
        <div className="mt-3 font-display text-base text-ink">Canal</div>
        <div className="text-xs text-ink-soft mt-0.5">Conteúdo e autoridade.</div>
      </motion.div>

      <motion.div
        {...float(0.9)}
        whileHover={{ y: -3 }}
        className="absolute right-2 bottom-2 w-36 rounded-2xl bg-card border border-border shadow-soft p-3.5"
      >
        <Users className="w-5 h-5 text-ink" />
        <div className="mt-2 font-display text-sm text-ink">Comunidade</div>
      </motion.div>
    </div>
  );
}
