import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { destinations } from "@/lib/destinations";

const ease = [0.22, 1, 0.36, 1] as const;

const accentMap = {
  brand: "from-brand to-violet",
  cyan: "from-cyan to-brand",
  violet: "from-violet to-brand",
  ink: "from-ink to-ink",
} as const;

export function MegaMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const featured = destinations[0];
  const rest = destinations.slice(1);

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
            className="fixed inset-0 z-[80] bg-ink/50 backdrop-blur-md"
          />
          <motion.div
            initial={{ y: "-3%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-3%", opacity: 0 }}
            transition={{ duration: 0.5, ease }}
            className="fixed inset-x-0 top-0 z-[90] bg-background border-b border-border/60 shadow-lift max-h-[100dvh] overflow-y-auto"
            role="dialog"
            aria-label="Navegação principal"
          >
            <div className="container-x py-5 flex items-center justify-between">
              <Link to="/" onClick={onClose} className="font-display text-base text-ink">
                Síndico<span className="text-brand">Lab</span>
              </Link>
              <button
                onClick={onClose}
                aria-label="Fechar menu"
                className="grid place-items-center w-10 h-10 rounded-full border border-border hover:bg-secondary transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="container-x pb-12 md:pb-16 pt-2">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.5, ease }}
                className="mb-8 md:mb-10 max-w-2xl"
              >
                <div className="text-[10px] uppercase tracking-[0.4em] text-ink-soft mb-3">
                  + Ecossistema SíndicoLab
                </div>
                <h2 className="font-display text-2xl md:text-4xl text-ink leading-[1.1] text-balance">
                  Encontre síndico profissional, cursos, materiais e conteúdo de gestão
                  condominial.
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5">
                <FeaturedItem item={featured} onClose={onClose} />
                <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 md:gap-4">
                  {rest.map((it, i) => (
                    <MenuRow key={it.key} item={it} index={i} onClose={onClose} accent={accentMap[it.accent]} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function FeaturedItem({
  item,
  onClose,
}: {
  item: (typeof destinations)[number];
  onClose: () => void;
}) {
  return (
    <motion.a
      href={item.href}
      target="_blank"
      rel="noreferrer"
      onClick={onClose}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.6, ease }}
      whileHover={{ y: -3 }}
      className="group lg:col-span-7 relative overflow-hidden rounded-3xl bg-ink text-background min-h-[340px] md:min-h-[440px] cursor-pointer"
    >
      <div className="absolute inset-0 gradient-lab opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-tr from-ink via-ink/70 to-transparent" />
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-cyan/30 blur-3xl" />

      <div className="relative h-full p-7 md:p-10 flex flex-col">
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-blink" />
          <span className="text-[10px] uppercase tracking-[0.4em] text-background/80">
            Produto principal · {item.number}
          </span>
        </div>

        <h3 className="mt-auto font-display text-4xl md:text-6xl leading-[0.95] text-balance">
          Quero<span className="text-cyan">1</span>Síndico
        </h3>
        <p className="mt-4 text-base md:text-lg text-background/85 max-w-md text-balance">
          {item.short}
        </p>
        <p className="mt-2 text-sm text-background/65 max-w-md">{item.description}</p>

        <div className="mt-6 flex items-center gap-3">
          <span className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-background text-ink font-medium group-hover:bg-cyan transition">
            {item.cta}
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </motion.a>
  );
}

function MenuRow({
  item,
  index,
  onClose,
  accent,
}: {
  item: (typeof destinations)[number];
  index: number;
  onClose: () => void;
  accent: string;
}) {
  const Wrapper: React.ElementType = item.external ? "a" : Link;
  const props = item.external
    ? { href: item.href, target: "_blank", rel: "noreferrer" }
    : { to: item.href };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.18 + index * 0.06, duration: 0.5, ease }}
    >
      <Wrapper
        {...props}
        onClick={onClose}
        className="group relative block overflow-hidden rounded-2xl bg-card border border-border p-5 hover:border-border-strong transition-all"
      >
        <div className="flex items-start gap-4">
          <span
            className={`shrink-0 grid place-items-center w-11 h-11 rounded-xl bg-gradient-to-br ${accent} text-background font-display text-sm`}
          >
            {item.number}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <div className="font-display text-lg text-ink">{item.title}</div>
              <ArrowUpRight className="w-4 h-4 text-ink-soft transition-all group-hover:text-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <p className="mt-0.5 text-sm text-ink-soft text-balance">{item.short}</p>
            <div className="mt-2 text-xs font-medium text-brand opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
              {item.cta} →
            </div>
          </div>
        </div>
      </Wrapper>
    </motion.div>
  );
}
