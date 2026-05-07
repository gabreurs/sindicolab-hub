import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { BrandMark } from "./BrandMark";
import { getLenis } from "./SmoothScroll";

const ease = [0.22, 1, 0.36, 1] as const;

export function MegaMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    if (open) {
      document.documentElement.classList.add("no-scroll");
      document.body.classList.add("no-scroll");
      getLenis()?.stop();
    } else {
      document.documentElement.classList.remove("no-scroll");
      document.body.classList.remove("no-scroll");
      getLenis()?.start();
    }
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("no-scroll");
      document.body.classList.remove("no-scroll");
      getLenis()?.start();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-ink/60 backdrop-blur-md"
            aria-hidden
          />
          <motion.div
            ref={panelRef}
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease }}
            data-lenis-prevent
            className="mega-menu-overlay fixed inset-0 z-[90] bg-background border-b border-border/60 shadow-lift overflow-y-auto scrollbar-none overscroll-contain"
            role="dialog"
            aria-modal="true"
            aria-label="Menu do SíndicoLab"
          >
            {/* Bar */}
            <div className="container-x py-5 flex items-center justify-between">
              <Link to="/" onClick={onClose} aria-label="SíndicoLab — home">
                <BrandMark size={30} tone="dark" />
              </Link>
              <button
                onClick={onClose}
                aria-label="Fechar menu"
                className="grid place-items-center w-10 h-10 rounded-full border border-border hover:bg-secondary transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="container-x pb-16 pt-2">
              {/* Hero grid: Quero1Síndico (col-7) + Patrocínios (col-5) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                <FeaturedQ1S onClose={onClose} />
                <FeaturedSponsorship onClose={onClose} />
              </div>

              {/* Secondary navigation */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                <SmallCard
                  delay={0.18}
                  to="/portal"
                  eyebrow="Portal"
                  title="Ler conteúdos sobre condomínios"
                  description="Gestão, segurança, comportamento, assembleias e casos reais."
                  preview={<EditorialPreview />}
                  onClose={onClose}
                />
                <SmallCard
                  delay={0.22}
                  to="/play"
                  eyebrow="Play"
                  title="Fazer cursos para síndicos"
                  description="Aulas e formações para profissionalizar a gestão condominial."
                  preview={<CoursesPreview />}
                  onClose={onClose}
                />
                <SmallCard
                  delay={0.26}
                  to="/materiais"
                  eyebrow="Materiais"
                  title="Baixar materiais para condomínio"
                  description="Modelos, checklists, guias e documentos prontos para usar."
                  preview={<LibraryPreview />}
                  onClose={onClose}
                />
                <SmallCard
                  delay={0.30}
                  to="/quem-somos"
                  eyebrow="Quem somos"
                  title="Conhecer o SíndicoLab"
                  description="Workshops, encontros, comunidade e atuação no setor."
                  preview={<GalleryPreview />}
                  onClose={onClose}
                />
                <SmallCard
                  delay={0.34}
                  href="mailto:contato@sindicolab.com"
                  eyebrow="Contato"
                  title="Falar com a equipe"
                  description="Parcerias, dúvidas, projetos e relacionamento."
                  preview={<ContactPreview />}
                  onClose={onClose}
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ───────────────────── Featured: Quero1Síndico ───────────────────── */
function FeaturedQ1S({ onClose }: { onClose: () => void }) {
  return (
    <motion.a
      href="https://quero1sindico.com/?utm_source=sindicolab&utm_medium=megamenu&utm_campaign=q1s_featured"
      target="_blank"
      rel="noreferrer"
      onClick={onClose}
      initial={{ opacity: 0, scale: 0.985, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.05, duration: 0.55, ease }}
      className="group relative lg:col-span-7 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#08122b] via-[#0a1f4a] to-[#061029] text-background min-h-[360px] md:min-h-[440px] cursor-glow"
      aria-label="Encontrar síndico profissional no Quero1Síndico"
    >
      {/* bg glow */}
      <div className="absolute -top-32 -right-20 w-[36rem] h-[36rem] rounded-full bg-cyan/30 blur-[140px]" />
      <div className="absolute inset-0 pattern-grid opacity-[0.18]" />

      <div className="relative h-full grid md:grid-cols-2 gap-6 p-7 md:p-10">
        {/* Copy */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-[10px] tracking-tight font-mono text-cyan/90">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-blink" />
              Quero1Síndico
            </div>
            <h3 className="mt-5 font-display text-3xl md:text-5xl tracking-[-0.035em] leading-[1.0] text-balance">
              Encontrar síndico profissional
            </h3>
            <p className="mt-4 text-white/65 text-sm md:text-base max-w-md leading-relaxed">
              Conheça síndicos profissionais avaliados e conecte seu condomínio a uma gestão mais
              preparada.
            </p>
          </div>

          <div className="mt-8">
            <span className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-background text-ink font-medium text-sm group-hover:bg-cyan transition">
              Acessar Quero1Síndico
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>

        {/* Mini interface preview */}
        <div className="relative hidden md:block">
          <Q1SInterfacePreview />
        </div>
      </div>
    </motion.a>
  );
}

function Q1SInterfacePreview() {
  const cards = [
    { n: "RC", name: "Rafael C.", area: "Zona Sul · 4.9★", price: "Disponível" },
    { n: "MA", name: "Marina A.", area: "Centro · 4.8★", price: "Em 3 dias" },
    { n: "JS", name: "Júlia S.", area: "Zona Norte · 4.9★", price: "Disponível" },
  ];
  return (
    <div className="absolute inset-0 flex flex-col gap-3 [mask-image:linear-gradient(to_bottom,black_70%,transparent)]">
      {/* Search bar */}
      <div className="rounded-xl bg-white/[0.06] border border-white/10 px-4 py-3 flex items-center gap-3 backdrop-blur-sm">
        <div className="w-2 h-2 rounded-full bg-cyan" />
        <span className="text-xs text-white/70 font-mono">Buscar síndicos · São Paulo, SP</span>
        <span className="ml-auto text-[10px] text-white/40 font-mono">128 resultados</span>
      </div>
      {/* Filter chips */}
      <div className="flex gap-2 flex-wrap">
        {["Disponível agora", "Avaliação 4.5+", "Próximo a você", "Edifício alto"].map((c, i) => (
          <span
            key={c}
            className={`text-[10px] font-mono px-2.5 py-1 rounded-full border ${
              i === 0
                ? "bg-cyan text-ink border-cyan"
                : "border-white/15 text-white/60"
            }`}
          >
            {c}
          </span>
        ))}
      </div>
      {/* Mini cards */}
      <div className="space-y-2 mt-1">
        {cards.map((c, i) => (
          <div
            key={c.name}
            className="flex items-center gap-3 rounded-xl bg-white/[0.04] border border-white/10 p-2.5 group-hover:translate-x-0.5 transition-transform"
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <div className="grid place-items-center w-9 h-9 rounded-lg bg-gradient-to-br from-cyan to-brand text-ink font-display text-xs">
              {c.n}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm text-background truncate">{c.name}</div>
              <div className="text-[10px] text-white/50">{c.area}</div>
            </div>
            <div className="text-[10px] font-mono text-cyan">{c.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────── Featured: Patrocínios ───────────────────── */
function FeaturedSponsorship({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.985, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.12, duration: 0.55, ease }}
      className="lg:col-span-5"
    >
      <Link
        to="/patrocinios"
        onClick={onClose}
        className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-deep via-[#0e0820] to-[#08040f] text-background min-h-[360px] md:min-h-[440px] cursor-glow"
        aria-label="Ver mídia kit de patrocínios CondoHuby × SíndicoLab"
      >
        <div className="absolute -top-20 -right-10 w-[28rem] h-[28rem] rounded-full bg-violet/40 blur-[120px]" />
        <div className="absolute inset-0 pattern-windows opacity-20" />

        <div className="relative h-full p-7 md:p-10 flex flex-col justify-between">
          <div>
            <div className="text-[10px] tracking-tight font-mono text-violet">
              Mídia Kit · CondoHuby × SíndicoLab
            </div>
            <h3 className="mt-5 font-display text-2xl md:text-4xl tracking-[-0.035em] leading-[1.02] text-balance">
              Patrocinar experiências condominiais
            </h3>
            <p className="mt-3 text-white/65 text-sm md:text-base max-w-sm leading-relaxed">
              Aproxime sua marca de síndicos, gestores e decisores do mercado condominial.
            </p>
          </div>

          {/* mini stats */}
          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-5">
            {[
              ["+12k", "Decisores"],
              ["+50", "Workshops"],
              ["+150", "Conteúdos"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-2xl tracking-[-0.03em] bg-clip-text text-transparent bg-gradient-to-br from-white to-violet/70">
                  {n}
                </div>
                <div className="text-[10px] text-white/50 mt-0.5">{l}</div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <span className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/25 text-sm group-hover:bg-white/10 transition">
              Ver mídia kit
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ───────────────────── Small Cards ───────────────────── */
function SmallCard({
  to,
  href,
  eyebrow,
  title,
  description,
  preview,
  delay,
  onClose,
}: {
  to?: string;
  href?: string;
  eyebrow: string;
  title: string;
  description: string;
  preview: React.ReactNode;
  delay: number;
  onClose: () => void;
}) {
  const inner = (
    <>
      <div className="aspect-[16/9] rounded-xl overflow-hidden bg-secondary border border-border relative">
        {preview}
      </div>
      <div className="mt-4 text-[10px] tracking-tight text-brand font-mono">{eyebrow}</div>
      <div className="mt-1.5 font-display text-base text-ink tracking-[-0.02em] leading-snug text-balance">
        {title}
      </div>
      <p className="mt-1.5 text-xs text-ink-soft leading-relaxed">{description}</p>
      <div className="mt-3 inline-flex items-center gap-1 text-xs text-ink-soft group-hover:text-ink transition">
        Acessar
        <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </>
  );

  const className =
    "group relative block rounded-2xl bg-card border border-border p-4 hover:border-ink hover:-translate-y-0.5 hover:shadow-card transition-all h-full cursor-glow";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease }}
    >
      {to ? (
        <Link to={to} onClick={onClose} className={className}>
          {inner}
        </Link>
      ) : (
        <a
          href={href}
          onClick={onClose}
          className={className}
          {...(href?.startsWith("mailto:") ? {} : { target: "_blank", rel: "noreferrer" })}
        >
          {inner}
        </a>
      )}
    </motion.div>
  );
}

/* ───────────────────── Mini Previews ───────────────────── */
function EditorialPreview() {
  return (
    <div className="absolute inset-0 p-3 flex flex-col gap-1.5 bg-background">
      <div className="h-2 w-1/3 bg-ink/80 rounded" />
      <div className="h-1.5 w-2/3 bg-ink-soft/40 rounded" />
      <div className="h-1.5 w-1/2 bg-ink-soft/30 rounded" />
      <div className="mt-auto grid grid-cols-3 gap-1">
        <div className="h-8 rounded bg-gradient-to-br from-brand-soft to-cyan-soft" />
        <div className="h-8 rounded bg-secondary" />
        <div className="h-8 rounded bg-secondary" />
      </div>
    </div>
  );
}

function CoursesPreview() {
  return (
    <div className="absolute inset-0 bg-[#0a0b12] p-3 flex flex-col gap-2">
      <div className="flex gap-1.5">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex-1 aspect-video rounded bg-gradient-to-br from-brand-deep via-violet-deep to-[#0a0b12] border border-white/10 transition-transform group-hover:-translate-y-0.5"
            style={{ transitionDelay: `${i * 60}ms` }}
          />
        ))}
      </div>
      <div className="flex gap-1.5">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex-1 aspect-video rounded bg-white/[0.06] border border-white/10"
          />
        ))}
      </div>
    </div>
  );
}

function LibraryPreview() {
  return (
    <div className="absolute inset-0 p-3 grid grid-cols-3 gap-1.5 bg-background">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="rounded bg-secondary border border-border flex flex-col p-1.5 gap-0.5"
        >
          <div className="h-1 w-full bg-brand/60 rounded" />
          <div className="h-1 w-2/3 bg-ink-soft/30 rounded" />
        </div>
      ))}
    </div>
  );
}

function GalleryPreview() {
  return (
    <div className="absolute inset-0 grid grid-cols-3 gap-0.5">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-gradient-to-br from-brand-soft via-cyan-soft to-secondary"
        />
      ))}
    </div>
  );
}

function ContactPreview() {
  return (
    <div className="absolute inset-0 bg-ink p-3 flex flex-col justify-end">
      <div className="text-[9px] font-mono text-cyan tracking-tight">→ contato</div>
      <div className="text-xs text-background mt-1 truncate">contato@sindicolab.com</div>
      <div className="mt-2 h-1 w-1/2 bg-cyan/60 rounded" />
    </div>
  );
}
