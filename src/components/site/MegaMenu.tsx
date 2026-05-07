import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, Building2, BookOpen, GraduationCap, Download, Sparkles, Mail } from "lucide-react";
import { useEffect } from "react";
import { Link } from "@tanstack/react-router";

const ease = [0.22, 1, 0.36, 1] as const;

type Item = {
  label: string;
  description: string;
  href: string;
  external?: boolean;
  icon: React.ComponentType<{ className?: string }>;
};

const groups: { title: string; items: Item[] }[] = [
  {
    title: "Para síndicos, moradores e conselheiros",
    items: [
      { label: "Encontrar síndico profissional", description: "Plataforma Quero1Síndico — síndicos avaliados, próximos da sua região.", href: "https://quero1sindico.com/", external: true, icon: Building2 },
      { label: "Baixar materiais gratuitos", description: "Modelos de ata, regimentos, checklists e guias práticos.", href: "/materiais", icon: Download },
      { label: "Acessar cursos para síndicos", description: "SíndicoLab Play — formações em gestão condominial.", href: "/play", icon: GraduationCap },
      { label: "Ler conteúdos do mercado", description: "Portal SíndicoLab: notícias, análises e casos reais.", href: "/portal", icon: BookOpen },
    ],
  },
  {
    title: "Para marcas e parceiros",
    items: [
      { label: "Patrocinar experiências", description: "Mídia kit CondoHuby + SíndicoLab. Workshops e ações com decisores.", href: "/patrocinios", icon: Sparkles },
      { label: "Conhecer o SíndicoLab", description: "História, comunidade e propósito do ecossistema.", href: "/quem-somos", icon: BookOpen },
      { label: "Falar com a equipe", description: "Parcerias, imprensa e relacionamento.", href: "mailto:contato@sindicolab.com", external: true, icon: Mail },
    ],
  },
];

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
            className="fixed inset-0 z-[80] bg-ink/55 backdrop-blur-md"
          />
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease }}
            className="fixed inset-x-0 top-0 z-[90] bg-background border-b border-border/60 shadow-lift max-h-[100dvh] overflow-y-auto"
            role="dialog"
            aria-label="Menu do ecossistema"
          >
            <div className="container-x py-5 flex items-center justify-between">
              <Link to="/" onClick={onClose} className="font-display text-base text-ink">
                Síndico<span style={{ color: "oklch(0.78 0.14 220)" }}>Lab</span>
              </Link>
              <button
                onClick={onClose}
                aria-label="Fechar menu"
                className="grid place-items-center w-10 h-10 rounded-full border border-border hover:bg-secondary transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="container-x pb-14 pt-2">
              {groups.map((g, gi) => (
                <div key={g.title} className={gi > 0 ? "mt-12 pt-10 border-t border-border" : ""}>
                  <div className="text-[11px] uppercase tracking-[0.32em] text-ink-soft mb-6">
                    {g.title}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                    {g.items.map((it, i) => (
                      <MenuItem key={it.label} item={it} index={i} onClose={onClose} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function MenuItem({ item, index, onClose }: { item: Item; index: number; onClose: () => void }) {
  const Icon = item.icon;
  const Wrapper: React.ElementType = item.external ? "a" : Link;
  const props = item.external
    ? { href: item.href, target: item.href.startsWith("mailto:") ? undefined : "_blank", rel: "noreferrer" }
    : { to: item.href };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.05, duration: 0.5, ease }}
    >
      <Wrapper
        {...props}
        onClick={onClose}
        className="group relative block rounded-2xl bg-card border border-border p-5 hover:border-ink hover:shadow-card transition-all h-full"
      >
        <div className="flex items-center justify-between">
          <span className="grid place-items-center w-10 h-10 rounded-xl bg-secondary text-ink group-hover:bg-ink group-hover:text-background transition">
            <Icon className="w-4 h-4" />
          </span>
          <ArrowUpRight className="w-4 h-4 text-ink-soft transition-all group-hover:text-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
        <div className="mt-5 font-display text-[1.05rem] text-ink tracking-[-0.02em] leading-tight">
          {item.label}
        </div>
        <p className="mt-1.5 text-sm text-ink-soft leading-relaxed text-balance">
          {item.description}
        </p>
      </Wrapper>
    </motion.div>
  );
}
