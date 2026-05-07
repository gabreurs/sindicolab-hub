import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { destinations } from "@/lib/destinations";

const ease = [0.22, 1, 0.36, 1] as const;

export function AccessCards() {
  const featured = destinations[0];
  const portal = destinations[1];
  const play = destinations[2];
  const materiais = destinations[3];

  return (
    <section id="caminhos" className="relative pb-24 md:pb-32" aria-labelledby="caminhos-h">
      <div className="container-x">
        <div className="flex items-end justify-between gap-6 mb-8 md:mb-10">
          <div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-ink-soft mb-2">
              + Caminhos do ecossistema
            </div>
            <h2
              id="caminhos-h"
              className="font-display text-3xl md:text-5xl text-ink max-w-2xl text-balance tracking-[-0.03em]"
            >
              Quatro entradas. Um único ecossistema condominial.
            </h2>
          </div>
          <p className="hidden md:block text-sm text-ink-soft max-w-xs text-right">
            Síndico profissional, conteúdo, formação e materiais — escolha por onde
            entrar.
          </p>
        </div>

        {/* Featured Quero1Síndico */}
        <Featured />

        <div className="mt-4 md:mt-5 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
          <AccessCard item={portal} className="md:col-span-7" delay={0.05} />
          <AccessCard item={play} className="md:col-span-5" delay={0.12} variant="cyan" />
          <AccessCard item={materiais} className="md:col-span-12" delay={0.18} wide />
        </div>
      </div>
    </section>
  );
}

function Featured() {
  const f = destinations[0];
  return (
    <motion.a
      href={f.href}
      target="_blank"
      rel="noreferrer"
      aria-label={`${f.title} — ${f.cta}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.85, ease }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-3xl bg-ink text-background min-h-[480px] md:min-h-[560px] grid md:grid-cols-12 cursor-pointer shadow-lift"
    >
      {/* gradient art */}
      <div className="absolute inset-0 gradient-lab opacity-95" />
      <div className="absolute inset-0 bg-gradient-to-br from-ink/85 via-ink/35 to-transparent" />
      <div className="absolute -bottom-32 -right-20 w-[40rem] h-[40rem] rounded-full bg-cyan/30 blur-3xl" />
      <div className="absolute top-10 right-10 w-72 h-72 rounded-full border border-background/15" />
      <div className="absolute top-20 right-20 w-72 h-72 rounded-full border border-background/10" />

      <div className="relative md:col-span-8 p-7 md:p-12 lg:p-14 flex flex-col z-10">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-background/65">{f.number} / 05</span>
          <span className="h-px flex-1 bg-background/15" />
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan text-ink text-[10px] uppercase tracking-[0.25em] font-semibold">
            <span className="w-1 h-1 rounded-full bg-ink animate-blink" />
            Produto principal
          </span>
        </div>

        <h3 className="mt-auto font-display text-5xl md:text-7xl lg:text-[6rem] leading-[0.92] text-balance tracking-[-0.04em]">
          Quero<span className="text-cyan">1</span>Síndico
        </h3>
        <p className="mt-5 text-lg md:text-xl text-background/90 max-w-md text-balance">
          {f.short}
        </p>
        <p className="mt-3 text-sm text-background/65 max-w-md">{f.description}</p>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-background text-ink font-medium group-hover:bg-cyan transition">
            {f.cta}
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
          <span className="text-xs uppercase tracking-[0.3em] text-background/55">
            quero1sindico.com
          </span>
        </div>
      </div>

      <div className="relative md:col-span-4 hidden md:block z-10">
        <div className="absolute inset-0 flex flex-col justify-end p-10 gap-3">
          {["Síndico avaliado", "Cobertura nacional", "Suporte SíndicoLab"].map((t, i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease }}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-background/10 backdrop-blur-md border border-background/15 text-xs text-background w-fit ml-auto"
            >
              <span className="w-1 h-1 rounded-full bg-cyan" />
              {t}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

function AccessCard({
  item,
  className = "",
  delay = 0,
  wide = false,
  variant = "white",
}: {
  item: (typeof destinations)[number];
  className?: string;
  delay?: number;
  wide?: boolean;
  variant?: "white" | "cyan" | "ink";
}) {
  const tones = {
    white: "bg-card text-ink border border-border",
    cyan: "bg-ink text-background",
    ink: "bg-ink text-background",
  } as const;

  const isDark = variant !== "white";
  const muted = isDark ? "text-background/70" : "text-ink-soft";
  const numCol = isDark ? "text-background/45" : "text-ink-soft/70";

  const Wrapper: React.ElementType = item.external ? "a" : Link;
  const linkProps = item.external
    ? { href: item.href, target: "_blank", rel: "noreferrer" }
    : { to: item.href };

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease, delay }}
      whileHover={{ y: -4 }}
      className={className}
    >
      <Wrapper
        {...linkProps}
        aria-label={`${item.title} — ${item.cta}`}
        className={`group relative block overflow-hidden rounded-3xl shadow-card hover:shadow-lift transition-all min-h-[300px] ${tones[variant]}`}
      >
        {variant === "cyan" && (
          <>
            <div className="absolute inset-0 gradient-lab opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-br from-ink/70 via-transparent to-transparent" />
          </>
        )}

        <div
          className={`relative h-full p-6 md:p-8 flex ${
            wide ? "md:flex-row md:items-end md:gap-10" : "flex-col"
          }`}
        >
          <div className={`flex-1 flex flex-col ${wide ? "md:max-w-xl" : ""}`}>
            <div className="flex items-center justify-between">
              <span className={`text-xs font-mono ${numCol}`}>{item.number} / 05</span>
              <span className="grid place-items-center w-10 h-10 rounded-full bg-background/15 backdrop-blur-sm border border-background/10 group-hover:bg-background group-hover:text-ink transition-all">
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>

            <h3 className="mt-6 font-display text-2xl md:text-3xl leading-tight text-balance tracking-[-0.03em]">
              {item.title}
            </h3>
            <p className={`mt-2 text-base ${muted} max-w-md text-balance`}>{item.short}</p>
            <p className={`mt-2 text-sm ${muted} opacity-75 max-w-md`}>{item.description}</p>

            <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium">
              {item.cta}
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>

          {wide && (
            <div className="hidden md:flex flex-col gap-2 md:w-72 shrink-0">
              {["Modelos de ata", "Checklists prontos", "Guias práticos"].map((t) => (
                <div
                  key={t}
                  className={`flex items-center justify-between rounded-xl border ${
                    isDark ? "border-background/15" : "border-border"
                  } px-4 py-3 text-sm`}
                >
                  <span>{t}</span>
                  <span className={`text-xs font-mono ${numCol}`}>PDF</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </Wrapper>
    </motion.div>
  );
}
