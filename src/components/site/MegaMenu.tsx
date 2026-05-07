import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect } from "react";
import quero1Img from "@/assets/quero1sindico.jpg";
import portalImg from "@/assets/portal.jpg";
import playImg from "@/assets/play.jpg";
import materiaisImg from "@/assets/materiais.jpg";

type Item = {
  title: string;
  desc: string;
  long: string;
  cta: string;
  href: string;
  image: string;
};

const items: Item[] = [
  {
    title: "SíndicoLab Play",
    desc: "Cursos e conteúdos para evoluir na gestão condominial.",
    long: "Aulas, formações e repertório para síndicos, conselheiros e profissionais.",
    cta: "Ver cursos",
    href: "https://sindicolab.com/play/",
    image: playImg,
  },
  {
    title: "Materiais e Downloads",
    desc: "Guias, modelos e conteúdos úteis para o dia a dia.",
    long: "Baixe materiais práticos para apoiar reuniões, decisões e gestão.",
    cta: "Ver materiais",
    href: "https://downloads.sindicolab.com/",
    image: materiaisImg,
  },
  {
    title: "Portal SíndicoLab",
    desc: "Conteúdo, ideias e visão para o mercado condominial.",
    long: "Artigos, reflexões e conteúdos do portal.",
    cta: "Acessar portal",
    href: "https://sindicolab.com/",
    image: portalImg,
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

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
            transition={{ duration: 0.4 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-ink/40 backdrop-blur-md"
          />
          <motion.div
            initial={{ y: "-2%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-2%", opacity: 0 }}
            transition={{ duration: 0.55, ease }}
            className="fixed inset-x-0 top-0 z-[90] bg-background border-b border-border/60 shadow-lift"
          >
            <div className="container-x py-5 flex items-center justify-between">
              <span className="font-display text-base text-ink">SíndicoLab</span>
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
                <div className="text-[10px] uppercase tracking-[0.3em] text-ink-soft mb-3">
                  Explore o ecossistema
                </div>
                <h2 className="font-display text-3xl md:text-5xl text-ink leading-[1.05]">
                  Escolha o ambiente certo para conteúdo, formação, materiais e soluções.
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5">
                <FeaturedItem onClose={onClose} />

                <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 md:gap-5">
                  {items.map((it, i) => (
                    <MenuCard key={it.title} item={it} index={i} onClose={onClose} />
                  ))}
                </div>
              </div>

              <motion.a
                href="mailto:contato@sindicolab.com"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-6 group flex items-center justify-between gap-4 rounded-2xl border border-border bg-surface px-5 py-4 hover:bg-secondary transition"
              >
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-ink-soft mb-1">
                    Fale com o SíndicoLab
                  </div>
                  <div className="font-display text-lg text-ink">
                    Parcerias, projetos e relacionamento com o ecossistema.
                  </div>
                </div>
                <span className="grid place-items-center w-11 h-11 rounded-full bg-ink text-background group-hover:bg-brand transition">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </motion.a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function FeaturedItem({ onClose }: { onClose: () => void }) {
  return (
    <motion.a
      href="https://quero1sindico.com/"
      target="_blank"
      rel="noreferrer"
      onClick={onClose}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.6, ease }}
      whileHover={{ y: -3 }}
      className="group lg:col-span-7 relative overflow-hidden rounded-3xl bg-ink text-background min-h-[320px] md:min-h-[420px] cursor-pointer"
    >
      <img
        src={quero1Img}
        alt=""
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-ink via-ink/70 to-ink/10" />

      <div className="relative h-full p-7 md:p-10 flex flex-col">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-brand animate-blink" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-background/80">
            Produto principal
          </span>
        </div>

        <h3 className="mt-auto font-display text-4xl md:text-6xl leading-[0.95] text-balance">
          Quero<span className="text-brand">1</span>Síndico
        </h3>
        <p className="mt-4 text-base md:text-lg text-background/85 max-w-md text-balance">
          Encontre um síndico profissional para o seu condomínio.
        </p>
        <p className="mt-2 text-sm text-background/65 max-w-md">
          Plataforma para aproximar condomínios, moradores e conselheiros de síndicos profissionais.
        </p>

        <div className="mt-6">
          <span className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-brand text-brand-foreground font-medium shadow-brand group-hover:brightness-110 transition">
            Conhecer o produto
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </motion.a>
  );
}

function MenuCard({ item, index, onClose }: { item: Item; index: number; onClose: () => void }) {
  return (
    <motion.a
      href={item.href}
      target="_blank"
      rel="noreferrer"
      onClick={onClose}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.18 + index * 0.07, duration: 0.55, ease }}
      whileHover={{ y: -3 }}
      className="group relative overflow-hidden rounded-2xl bg-card border border-border p-5 flex gap-4 items-start hover:shadow-card transition-shadow"
    >
      <div className="shrink-0 w-16 h-16 md:w-14 md:h-14 rounded-xl overflow-hidden bg-secondary">
        <img src={item.image} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <div className="font-display text-lg text-ink">{item.title}</div>
          <ArrowUpRight className="w-4 h-4 text-ink-soft transition-all group-hover:text-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
        <p className="mt-1 text-sm text-ink-soft text-balance">{item.desc}</p>
        <div className="mt-2 text-xs font-medium text-brand opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
          {item.cta} →
        </div>
      </div>
    </motion.a>
  );
}
