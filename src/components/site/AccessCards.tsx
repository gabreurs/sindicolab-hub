import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, FileText, Download } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useRef } from "react";


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
            Acesse a plataforma de síndicos profissionais, cursos, e-books e
            estudos exclusivos, portal de conteúdos e experiências do SíndicoLab.
          </p>
        </div>

        <CardQuero1 />

        <div className="grid-equal mt-5 grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch auto-rows-fr">
          <CardPortal className="md:col-span-7 h-full" />
          <CardPlay className="md:col-span-5 h-full" />
          <CardMateriais className="md:col-span-12 h-full" />
        </div>
      </div>
    </section>
  );
}

// Cursor-aware glow — escreve CSS vars direto no DOM via rAF.
// Zero re-render React: o style bind antigo (useMotionValue + style prop)
// forçava o card inteiro a recompor a cada mousemove, derrubando FPS no
// card Q1S (com backdrop-blur + radial-gradients pesados).
function useCursor() {
  const frame = useRef(0);
  const last = useRef<{ x: number; y: number; el: HTMLElement } | null>(null);
  const flush = () => {
    frame.current = 0;
    const d = last.current;
    if (!d) return;
    d.el.style.setProperty("--mx", `${d.x}px`);
    d.el.style.setProperty("--my", `${d.y}px`);
  };
  function onMove(e: React.MouseEvent<HTMLElement>) {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    last.current = { x: e.clientX - r.left, y: e.clientY - r.top, el };
    if (frame.current) return;
    frame.current = requestAnimationFrame(flush);
  }
  return { onMove };
}

/* ================================ Q1S — identidade do repo Síndico Finder ================================
   Navy profundo #0a0e1a, glass branco translúcido, accent azul #1976d2, mini-busca com selects + cards de síndicos. */
function CardQuero1() {
  const { onMove } = useCursor();
  return (
    <motion.a
      href="https://quero1sindico.com/?utm_source=sindicolab&utm_medium=home_card&utm_campaign=q1s_hero"
      target="_blank"
      rel="noreferrer"
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.85, ease }}
      whileHover={{ y: -4 }}
      className="cursor-glow group relative overflow-hidden rounded-3xl text-white access-q1s-card min-h-[440px] md:min-h-[560px] grid md:grid-cols-12 cursor-pointer shadow-lift"
      aria-label="Quero1Síndico — encontrar síndico profissional"
    >
      {/* Q1S gradient mesh from repo */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 20% 30%, hsla(215,45%,25%,0.45) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 80% 70%, hsla(215,35%,22%,0.35) 0%, transparent 60%), linear-gradient(155deg, hsl(220 25% 5%) 0%, hsl(220 22% 3%) 100%)",
        }}
      />
      {/* subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute -top-40 -right-32 w-[26rem] h-[26rem] rounded-full blur-2xl" style={{ background: "hsla(215, 80%, 50%, 0.18)" }} />

      {/* LEFT — copy */}
      <div className="relative md:col-span-7 p-7 md:p-12 lg:p-14 flex flex-col z-10">
        <div className="flex items-center gap-3 text-[12px]">
          <span className="text-white/45 font-mono">01 / 05</span>
          <span className="h-px flex-1 bg-white/10" />
          <span className="inline-flex items-center gap-1.5 text-white/70">
            <span className="w-1.5 h-1.5 rounded-full bg-[hsl(215,80%,55%)]" />
            quero1sindico.com
          </span>
        </div>

        <h3 className="mt-auto font-display text-4xl md:text-6xl lg:text-[5rem] leading-[0.96] tracking-[-0.04em] text-white">
          Encontre o <span style={{ color: "hsl(215, 80%, 62%)" }}>síndico profissional</span> ideal para o seu condomínio.
        </h3>
        <p className="mt-6 text-base md:text-[1.05rem] text-white/65 max-w-xl leading-relaxed">
          Marketplace de síndicos avaliados, com busca por especialidade,
          cidade e região. Conecte seu condomínio a uma gestão mais preparada.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <span
            className="inline-flex items-center gap-2 h-11 px-5 rounded-lg text-[13px] font-medium text-white shadow-[0_8px_24px_-8px_hsla(215,80%,50%,0.6)]"
            style={{ background: "linear-gradient(135deg, hsl(215 80% 50%) 0%, hsl(215 70% 58%) 100%)" }}
          >
            Buscar síndico
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
          <span className="text-xs font-mono text-white/40">+150 profissionais avaliados</span>
        </div>
      </div>

      {/* RIGHT — Q1S product mini-preview */}
      <div className="relative md:col-span-5 hidden md:flex z-10 p-8 lg:p-10 items-center">
        <div className="w-full space-y-3">
          {/* Filters bar (HeroFilters miniature) */}
          <div
            className="rounded-xl p-3 border"
            style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.06)" }}
          >
            <div className="grid grid-cols-2 gap-2">
              {[
                { l: "Especialidade", v: "Comercial" },
                { l: "Cidade", v: "São Paulo" },
                { l: "Região", v: "Pinheiros" },
                { l: "", v: "Buscar →", primary: true },
              ].map((f, i) => (
                <div
                  key={i}
                  className={`h-10 rounded-lg flex items-center px-3 text-[12px] ${
                    f.primary
                      ? "text-white font-medium justify-center"
                      : "text-white/60 justify-between bg-white/[0.05] border border-white/[0.06]"
                  }`}
                  style={
                    f.primary
                      ? { background: "linear-gradient(135deg, hsl(215 80% 50%), hsl(215 70% 58%))" }
                      : undefined
                  }
                >
                  {!f.primary && <span className="text-white/35 text-[10px] tracking-wider">{f.l}</span>}
                  <span>{f.v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sindico cards (SindicoCard miniature) */}
          {[
            { n: "Mariana Costa", c: "Pinheiros, SP", esp: ["Residencial", "Comercial"], y: 12 },
            { n: "Rodrigo Almeida", c: "Vila Mariana, SP", esp: ["Misto"], y: 8 },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 + i * 0.1, duration: 0.5, ease }}
              className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-3 flex items-center gap-3"
            >
              <div
                className="w-12 h-12 rounded-lg shrink-0 relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, hsl(${215 + i * 8} 60% 35%), hsl(${220 + i * 5} 30% 18%))` }}
              >
                <span className="absolute top-1 left-1 inline-flex items-center gap-0.5 bg-black/55 text-[8px] text-white/85 px-1.5 py-0.5 rounded-full">
                  {s.y}a
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[13px] text-white truncate" style={{ fontWeight: 480 }}>
                  {s.n}
                </div>
                <div className="text-[11px] text-white/50 flex items-center gap-1">
                  <MapPin className="w-2.5 h-2.5" style={{ color: "hsl(215, 80%, 60%)" }} /> {s.c}
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {s.esp.map((e) => (
                    <span
                      key={e}
                      className="text-[9px] px-1.5 py-0.5 rounded-full"
                      style={{ background: "hsla(215, 80%, 50%, 0.12)", color: "hsl(215, 80%, 75%)" }}
                    >
                      {e}
                    </span>
                  ))}
                </div>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-white/40 shrink-0" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

/* ================================ Portal ================================ */
function CardPortal({ className = "" }: { className?: string }) {
  const { onMove } = useCursor();
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease }}
      whileHover={{ y: -3 }}
      className={className}
    >
      <Link to="/portal" className="cursor-glow group relative block overflow-hidden rounded-3xl glass access-mini-card min-h-[340px] md:min-h-[400px] h-full shadow-card hover:shadow-lift transition-shadow"
        onMouseMove={onMove}
      >
        <div className="grid md:grid-cols-2 h-full">
          <div className="p-7 md:p-9 flex flex-col">
            <div className="flex items-center justify-between text-[12px] text-ink-soft">
              <span>02 / 05 · Portal de conteúdo condominial</span>
              <ArrowUpRight className="w-4 h-4 text-ink-soft group-hover:text-ink transition" />
            </div>
            <h3 className="mt-auto font-display text-[1.5rem] md:text-[1.7rem] lg:text-[1.9rem] text-ink tracking-[-0.03em] leading-[1.05] text-balance" style={{ overflowWrap: "anywhere", hyphens: "auto" }}>
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
          <div className="relative glass-tile border-l border-border p-6 flex flex-col gap-2">
            <div className="text-[10px] font-medium text-brand tracking-tight">Em alta no mercado</div>
            <div className="rounded-xl glass-tile p-4 mt-1">
              <div className="text-[10px] tracking-tight text-brand">Segurança condominial</div>
              <div className="mt-1.5 font-display text-[0.95rem] text-ink leading-snug">
                Eclusa inteligente: como prédios estão frustrando assaltos
              </div>
            </div>
            <div className="rounded-xl glass-tile p-4">
              <div className="text-[10px] tracking-tight text-violet">Casos reais</div>
              <div className="mt-1.5 font-display text-[0.95rem] text-ink leading-snug">
                O fenômeno das vagas de garagem em assembleias
              </div>
            </div>
            <div className="rounded-xl glass-tile p-4">
              <div className="text-[10px] tracking-tight text-cyan">Gestão</div>
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
  const { onMove } = useCursor();
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease, delay: 0.05 }}
      whileHover={{ y: -3 }}
      className={className}
    >
      <Link to="/play" className="cursor-glow group relative block overflow-hidden rounded-3xl text-background access-mini-card min-h-[340px] md:min-h-[400px] h-full shadow-card hover:shadow-lift transition-shadow"
        onMouseMove={onMove}
      >
        <div className="absolute inset-0" style={{ background: "linear-gradient(150deg, oklch(0.1 0.02 255) 0%, oklch(0.18 0.08 245) 60%, oklch(0.3 0.14 230) 100%)" }} />
        <div className="absolute inset-0 pattern-grid opacity-50" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-cyan/25 blur-2xl" />

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
              <div key={c} className="shrink-0 w-32 rounded-xl bg-background/10 border border-background/15 p-3">
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
  const { onMove } = useCursor();
  const docs = [
    { tag: "E-BOOK", title: "Gestão condominial de alta performance" },
    { tag: "ESTUDO", title: "Panorama do síndico profissional 2025" },
    { tag: "E-BOOK", title: "Assembleias híbridas na prática" },
  ];
  const transition = { duration: 0.5, ease } as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease, delay: 0.1 }}
      className={className}
    >
      <motion.div
        whileHover="hover"
        whileFocus="hover"
        initial="rest"
        animate="rest"
        variants={{ rest: { y: 0, scale: 1 }, hover: { y: -4, scale: 1.01 } }}
        transition={transition}
        className="h-full"
      >
        <Link
          to="/materiais"
          aria-label="Acessar e-books e estudos exclusivos do mercado condominial"
          className="cursor-glow group relative block overflow-hidden rounded-3xl glass access-mini-card md:min-h-[400px] h-full shadow-card hover:shadow-lift transition-shadow focus-visible:ring-2 focus-visible:ring-brand"
          onMouseMove={onMove}
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background:
                "radial-gradient(220px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklab, var(--brand) 18%, transparent), transparent 70%)",
            }}
          />

          <div className="relative h-full p-6 md:p-9 flex flex-col gap-4 md:gap-5">
            {/* topo: número + ícone download */}
            <div className="flex items-center justify-between text-[12px] text-ink-soft">
              <span>04 / 05</span>
              <motion.span
                variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
                transition={transition}
                className="grid place-items-center w-9 h-9 rounded-full bg-secondary group-hover:bg-ink group-hover:text-background transition-colors"
              >
                <motion.span
                  variants={{ rest: { y: 0 }, hover: { y: 2 } }}
                  transition={transition}
                  className="inline-flex"
                >
                  <Download className="w-3.5 h-3.5" />
                </motion.span>
              </motion.span>
            </div>

            {/* eyebrow */}
            <div className="text-[12px] text-ink-soft">E-books e estudos exclusivos</div>

            {/* título */}
            <h3 className="font-display text-2xl md:text-[1.9rem] text-ink tracking-[-0.03em] leading-[1.05] text-balance">
              E-books e estudos únicos e exclusivos para o mercado condominial.
            </h3>

            {/* área visual contida da pilha — só desktop pra não empurrar conteúdo no mobile */}
            <div
              className="materials-stack-viewport relative w-full overflow-hidden rounded-2xl hidden md:block"
              style={{ height: 140 }}
            >
              {docs.map((d, i) => {
                const restY = i * 6;
                const restScale = 1 - i * 0.025;
                const hoverY = (i - 1) * 14;
                const hoverRot = (i - 1) * 1;
                return (
                  <motion.div
                    key={d.tag + i}
                    variants={{
                      rest: { y: restY, scale: restScale, rotate: 0, opacity: i === 0 ? 1 : 0.92 },
                      hover: { y: hoverY, scale: 1, rotate: hoverRot, opacity: 1 },
                    }}
                    transition={{ ...transition, delay: i * 0.04 }}
                    className="absolute left-3 right-3 top-3 rounded-xl glass-tile p-3 shadow-soft"
                    style={{ zIndex: 3 - i }}
                  >
                    <div className="flex items-center gap-2 text-[10px] tracking-tight text-brand font-medium">
                      <FileText className="w-3 h-3" /> {d.tag}
                    </div>
                    <div className="mt-1 text-sm text-ink leading-snug truncate">{d.title}</div>
                  </motion.div>
                );
              })}
            </div>

            {/* descrição */}
            <p className="text-xs text-ink-soft leading-relaxed">
              Conteúdos e publicações desenvolvidos especialmente para o setor condominial.
            </p>

            {/* CTA */}
            <div className="inline-flex items-center gap-1.5 text-sm font-medium text-ink relative mt-auto">
              <span className="relative">
                Acessar e-books e estudos
                <motion.span
                  variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                  transition={transition}
                  style={{ originX: 0 }}
                  className="absolute left-0 -bottom-0.5 h-px w-full bg-ink"
                />
              </span>
              <motion.span
                variants={{ rest: { x: 0 }, hover: { x: 4 } }}
                transition={transition}
                className="inline-flex"
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
              </motion.span>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}


