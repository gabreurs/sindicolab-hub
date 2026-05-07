import { motion, useMotionValue } from "framer-motion";
import { ArrowUpRight, Search, MapPin, Star, FileText, Play, Download, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ease = [0.22, 1, 0.36, 1] as const;

export function AccessCards() {
  return (
    <section id="produtos" className="relative pt-8 pb-28 md:pb-36" aria-labelledby="produtos-h">
      <div className="container-x">
        <div className="grid md:grid-cols-12 gap-6 items-end mb-10 md:mb-14">
          <div className="md:col-span-8">
            <p className="text-[12px] text-ink-soft mb-3">Soluções do ecossistema</p>
            <h2
              id="produtos-h"
              className="font-display text-3xl md:text-5xl lg:text-[3.6rem] text-ink max-w-3xl text-balance tracking-[-0.035em] leading-[1.02]"
            >
              Soluções para síndicos, condomínios e gestão condominial.
            </h2>
          </div>
          <p className="md:col-span-4 text-sm md:text-[0.95rem] text-ink-soft md:text-right max-w-sm md:ml-auto leading-relaxed">
            Acesse a plataforma de síndicos profissionais, cursos, materiais
            gratuitos, portal de conteúdos e experiências do SíndicoLab.
          </p>
        </div>

        <CardQuero1 />

        <div className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-5">
          <CardPortal className="md:col-span-7" />
          <CardPlay className="md:col-span-5" />
          <CardMateriais className="md:col-span-5" />
          <CardPatrocinios className="md:col-span-7" />
        </div>
      </div>
    </section>
  );
}

// Cursor-aware glow hook
function useCursor() {
  const mx = useMotionValue("50%");
  const my = useMotionValue("50%");
  function onMove(e: React.MouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(`${e.clientX - r.left}px`);
    my.set(`${e.clientY - r.top}px`);
  }
  return { mx, my, onMove };
}

/* ================================ Q1S ================================ */
function CardQuero1() {
  const { mx, my, onMove } = useCursor();
  return (
    <motion.a
      href="https://quero1sindico.com/"
      target="_blank"
      rel="noreferrer"
      onMouseMove={onMove}
      style={{ "--mx": mx, "--my": my } as React.CSSProperties}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.85, ease }}
      whileHover={{ y: -4 }}
      className="cursor-glow group relative overflow-hidden rounded-3xl text-background min-h-[520px] md:min-h-[580px] grid md:grid-cols-12 cursor-pointer shadow-lift"
      aria-label="Quero1Síndico — encontrar síndico profissional"
    >
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, oklch(0.13 0.022 255) 0%, oklch(0.18 0.06 258) 60%, oklch(0.25 0.12 262) 100%)" }} />
      <div className="absolute inset-0 pattern-grid opacity-60" />
      <div className="absolute -top-32 -right-32 w-[36rem] h-[36rem] rounded-full bg-brand/30 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 w-[28rem] h-[28rem] rounded-full bg-cyan/20 blur-3xl" />

      <div className="relative md:col-span-7 p-7 md:p-12 lg:p-14 flex flex-col z-10">
        <div className="flex items-center gap-3 text-[12px]">
          <span className="text-background/55 font-mono">01 / 05</span>
          <span className="h-px flex-1 bg-background/15" />
          <span className="text-background/70">Plataforma de síndicos profissionais</span>
        </div>

        <h3 className="mt-auto font-display text-5xl md:text-7xl lg:text-[5.6rem] leading-[0.94] tracking-[-0.045em]">
          Encontre um <span style={{ color: "oklch(0.78 0.14 220)" }}>síndico profissional</span> para o seu condomínio.
        </h3>
        <p className="mt-6 text-base md:text-[1.05rem] text-background/80 max-w-xl leading-relaxed">
          Conheça síndicos profissionais avaliados, próximos da sua região, e conecte
          seu condomínio a uma gestão mais preparada com o Quero1Síndico.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <span className="btn-primary" style={{ background: "oklch(0.99 0.003 240)", color: "var(--ink)" }}>
            Encontrar síndico profissional
            <ArrowUpRight className="w-4 h-4 btn-arrow" />
          </span>
          <span className="text-xs font-mono text-background/55">quero1sindico.com</span>
        </div>
      </div>

      {/* Right preview: search interface */}
      <div className="relative md:col-span-5 hidden md:block z-10 p-8">
        <div className="absolute inset-0 bg-gradient-to-l from-background/0 via-background/0 to-transparent" />
        <div className="relative h-full flex flex-col justify-center gap-3">
          <div className="rounded-2xl bg-background/10 backdrop-blur-md border border-background/15 p-4">
            <div className="flex items-center gap-2 text-xs text-background/65">
              <Search className="w-3.5 h-3.5" /> Todas as especialidades
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-background/65">
              <MapPin className="w-3.5 h-3.5" /> São Paulo · Grande SP
            </div>
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: "oklch(0.78 0.14 220)", color: "var(--ink)" }}>
              Buscar síndico
              <ArrowUpRight className="w-3 h-3" />
            </div>
          </div>
          {[
            { name: "Síndico verificado", region: "Pinheiros · 4.9", c: "oklch(0.78 0.14 220)" },
            { name: "Síndico verificado", region: "Vila Mariana · 4.8", c: "oklch(0.55 0.21 258)" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 + i * 0.1, duration: 0.5, ease }}
              className="flex items-center gap-3 rounded-xl bg-background/8 backdrop-blur-md border border-background/15 p-3"
            >
              <div className="w-9 h-9 rounded-full" style={{ background: s.c }} />
              <div className="flex-1 min-w-0">
                <div className="text-sm text-background">{s.name}</div>
                <div className="text-xs text-background/60 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" /> {s.region}
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-background/55" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

/* ================================ Portal ================================ */
function CardPortal({ className = "" }: { className?: string }) {
  const { mx, my, onMove } = useCursor();
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease }}
      whileHover={{ y: -3 }}
      className={className}
    >
      <Link to="/portal" className="cursor-glow group relative block overflow-hidden rounded-3xl bg-card border border-border min-h-[420px] shadow-card hover:shadow-lift transition-shadow"
        onMouseMove={onMove}
        style={{ "--mx": mx, "--my": my } as React.CSSProperties}
      >
        <div className="grid md:grid-cols-2 h-full">
          <div className="p-7 md:p-9 flex flex-col">
            <div className="flex items-center justify-between text-[12px] text-ink-soft">
              <span>02 / 05 · Portal de conteúdo condominial</span>
              <ArrowUpRight className="w-4 h-4 text-ink-soft group-hover:text-ink transition" />
            </div>
            <h3 className="mt-auto font-display text-2xl md:text-[1.9rem] text-ink tracking-[-0.03em] leading-[1.05] text-balance">
              Leia conteúdos sobre gestão, segurança e comportamento condominial.
            </h3>
            <p className="mt-3 text-sm text-ink-soft leading-relaxed text-balance">
              Notícias, análises e casos reais para síndicos, conselheiros e moradores.
            </p>
            <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink">
              Acessar portal <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
          {/* Editorial preview */}
          <div className="relative bg-secondary border-l border-border p-6 flex flex-col gap-2">
            <div className="text-[10px] font-medium text-brand uppercase tracking-[0.25em]">Em alta no mercado</div>
            <div className="rounded-xl bg-background border border-border p-4 mt-1">
              <div className="text-[10px] uppercase tracking-[0.2em] text-brand">Segurança condominial</div>
              <div className="mt-1.5 font-display text-[0.95rem] text-ink leading-snug">
                Eclusa inteligente: como prédios estão frustrando assaltos
              </div>
            </div>
            <div className="rounded-xl bg-background border border-border p-4">
              <div className="text-[10px] uppercase tracking-[0.2em] text-violet">Casos reais</div>
              <div className="mt-1.5 font-display text-[0.95rem] text-ink leading-snug">
                O fenômeno das vagas de garagem em assembleias
              </div>
            </div>
            <div className="rounded-xl bg-background border border-border p-4">
              <div className="text-[10px] uppercase tracking-[0.2em] text-cyan">Gestão</div>
              <div className="mt-1.5 font-display text-[0.95rem] text-ink leading-snug">
                Vitória do mercado de sindicatura profissional
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ================================ Play ================================ */
function CardPlay({ className = "" }: { className?: string }) {
  const { mx, my, onMove } = useCursor();
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease, delay: 0.05 }}
      whileHover={{ y: -3 }}
      className={className}
    >
      <Link to="/play" className="cursor-glow group relative block overflow-hidden rounded-3xl text-background min-h-[420px] shadow-card hover:shadow-lift transition-shadow"
        onMouseMove={onMove}
        style={{ "--mx": mx, "--my": my } as React.CSSProperties}
      >
        <div className="absolute inset-0" style={{ background: "linear-gradient(150deg, oklch(0.1 0.02 255) 0%, oklch(0.18 0.08 245) 60%, oklch(0.3 0.14 230) 100%)" }} />
        <div className="absolute inset-0 pattern-grid opacity-50" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-cyan/30 blur-3xl" />

        <div className="relative h-full p-7 md:p-9 flex flex-col z-10">
          <div className="flex items-center justify-between text-[12px]">
            <span className="text-background/65 font-mono">03 / 05</span>
            <span className="grid place-items-center w-9 h-9 rounded-full bg-background/15 group-hover:bg-cyan group-hover:text-ink transition">
              <Play className="w-3.5 h-3.5 fill-current" />
            </span>
          </div>
          <div className="text-[12px] text-background/65 mt-2">Cursos para síndicos</div>

          <h3 className="mt-auto font-display text-2xl md:text-[1.9rem] tracking-[-0.03em] leading-[1.05] text-balance">
            Faça cursos para síndicos e evolua na gestão condominial.
          </h3>

          {/* mini carousel */}
          <div className="mt-5 flex gap-2 overflow-hidden">
            {["Inteligência Condominial", "Captação de Clientes", "Conselheiros", "Finanças"].map((c, i) => (
              <div key={c} className="shrink-0 w-32 rounded-xl bg-background/10 backdrop-blur-md border border-background/15 p-3">
                <div className="aspect-video rounded-md mb-2" style={{ background: `linear-gradient(135deg, oklch(0.${4 + i} 0.${15 + i} ${220 + i * 10}), oklch(0.3 0.18 280))` }} />
                <div className="text-[11px] text-background/85 leading-tight">{c}</div>
              </div>
            ))}
          </div>
          <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-background">
            Ver cursos para síndicos <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ================================ Materiais ================================ */
function CardMateriais({ className = "" }: { className?: string }) {
  const { mx, my, onMove } = useCursor();
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease, delay: 0.1 }}
      whileHover={{ y: -3 }}
      className={className}
    >
      <Link to="/materiais" className="cursor-glow group relative block overflow-hidden rounded-3xl bg-card border border-border min-h-[420px] shadow-card hover:shadow-lift transition-shadow"
        onMouseMove={onMove}
        style={{ "--mx": mx, "--my": my } as React.CSSProperties}
      >
        <div className="relative h-full p-7 md:p-9 flex flex-col">
          <div className="flex items-center justify-between text-[12px] text-ink-soft">
            <span>04 / 05</span>
            <span className="grid place-items-center w-9 h-9 rounded-full bg-secondary group-hover:bg-ink group-hover:text-background transition">
              <Download className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="text-[12px] text-ink-soft mt-2">Materiais gratuitos para condomínio</div>

          <h3 className="mt-6 font-display text-2xl md:text-[1.9rem] text-ink tracking-[-0.03em] leading-[1.05] text-balance">
            Baixe materiais para síndicos e condomínios.
          </h3>

          {/* stacked docs */}
          <div className="mt-auto relative h-32">
            {[
              { tag: "Modelo", title: "Ata de assembleia condominial", rotate: -3 },
              { tag: "Checklist", title: "Manutenção predial trimestral", rotate: 1 },
              { tag: "Guia", title: "Prestação de contas em 7 passos", rotate: 4 },
            ].map((d, i) => (
              <div
                key={i}
                className="absolute inset-x-2 rounded-xl bg-background border border-border p-3 shadow-soft"
                style={{
                  bottom: i * 18,
                  transform: `rotate(${d.rotate}deg)`,
                  zIndex: 3 - i,
                }}
              >
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-brand">
                  <FileText className="w-3 h-3" /> {d.tag}
                </div>
                <div className="mt-1 text-sm text-ink leading-snug">{d.title}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink">
            Baixar materiais gratuitos <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ================================ Patrocínios ================================ */
function CardPatrocinios({ className = "" }: { className?: string }) {
  const { mx, my, onMove } = useCursor();
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease, delay: 0.15 }}
      whileHover={{ y: -3 }}
      className={className}
    >
      <Link to="/patrocinios" className="cursor-glow group relative block overflow-hidden rounded-3xl text-background min-h-[420px] shadow-card hover:shadow-lift transition-shadow"
        onMouseMove={onMove}
        style={{ "--mx": mx, "--my": my } as React.CSSProperties}
      >
        <div className="absolute inset-0 gradient-mediakit" />
        <div className="absolute -top-20 -right-20 w-[28rem] h-[28rem] rounded-full opacity-40 blur-3xl" style={{ background: "oklch(0.55 0.22 295)" }} />
        <div className="absolute inset-0 pattern-windows opacity-30" />

        <div className="relative h-full p-7 md:p-9 flex flex-col z-10">
          <div className="flex items-center justify-between text-[12px]">
            <span className="text-background/65 font-mono">05 / 05</span>
            <span className="grid place-items-center w-9 h-9 rounded-full bg-background/15 group-hover:bg-background group-hover:text-ink transition">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="text-[12px] text-background/70 mt-2">Mídia, workshops e patrocínio condominial</div>

          <h3 className="mt-auto font-display text-2xl md:text-[2rem] tracking-[-0.03em] leading-[1.05] text-balance">
            Patrocine experiências com decisores do mercado condominial.
          </h3>
          <p className="mt-3 text-sm text-background/75 max-w-md leading-relaxed">
            Aproxime sua marca de síndicos, gestores e profissionais em workshops e ações
            de relacionamento com o CondoHuby + SíndicoLab.
          </p>

          {/* metric chips */}
          <div className="mt-6 grid grid-cols-3 gap-2">
            {[["+100", "síndicos por workshop"], ["12+", "encontros por ano"], ["05", "formatos"]].map(([n, l]) => (
              <div key={l} className="rounded-xl bg-background/10 backdrop-blur-md border border-background/15 p-3">
                <div className="font-display text-xl">{n}</div>
                <div className="text-[10px] text-background/70 leading-tight">{l}</div>
              </div>
            ))}
          </div>
          <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium">
            Ver mídia kit <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
