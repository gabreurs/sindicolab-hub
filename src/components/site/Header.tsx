import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Menu } from "lucide-react";
import { MegaMenu } from "./MegaMenu";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 1.9 }}
        className={`fixed inset-x-0 top-0 z-[70] transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-xl bg-background/70 border-b border-border/60"
            : "bg-transparent"
        }`}
      >
        <div className="container-x flex items-center justify-between h-[68px]">
          <a href="#top" className="flex items-center gap-2.5 group">
            <span className="grid place-items-center w-9 h-9 rounded-xl bg-ink text-background font-display font-semibold text-base group-hover:bg-brand transition-colors">
              S
            </span>
            <span className="font-display text-base text-ink hidden sm:inline">
              SíndicoLab
            </span>
          </a>

          <div className="flex items-center gap-2">
            <a
              href="https://quero1sindico.com/"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-ink hover:bg-secondary transition-colors"
            >
              Quero1Síndico
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => setOpen(true)}
              aria-label="Abrir menu"
              className="group inline-flex items-center gap-2 pl-4 pr-2 py-2 rounded-full bg-ink text-background hover:bg-brand transition-colors"
            >
              <span className="text-sm font-medium">Explorar</span>
              <span className="grid place-items-center w-7 h-7 rounded-full bg-background/15">
                <Menu className="w-3.5 h-3.5" />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <MegaMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
