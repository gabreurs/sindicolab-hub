import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
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
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 1.7 }}
        className={`fixed inset-x-0 top-0 z-[70] transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-xl bg-background/75 border-b border-border/60"
            : "bg-transparent"
        }`}
      >
        <div className="container-x flex items-center justify-between h-[68px]">
          <Link to="/" className="flex items-center gap-2.5 group">
            <span className="relative grid place-items-center w-9 h-9 rounded-[10px] overflow-hidden bg-ink text-background font-display font-semibold text-base">
              <span className="absolute inset-0 gradient-lab opacity-90" />
              <span className="relative">S</span>
            </span>
            <span className="font-display text-base text-ink hidden sm:inline">
              Síndico<span className="text-brand">Lab</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 text-sm">
            <HeaderLink to="/portal">Portal</HeaderLink>
            <HeaderLink to="/play">Play</HeaderLink>
            <HeaderLink to="/materiais">Materiais</HeaderLink>
            <a
              href="https://quero1sindico.com/"
              target="_blank"
              rel="noreferrer"
              className="ml-2 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-ink hover:bg-secondary transition-colors font-medium"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand animate-blink" />
              Quero1Síndico
            </a>
          </nav>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            className="group inline-flex items-center gap-2.5 pl-4 pr-1.5 py-1.5 rounded-full bg-ink text-background hover:bg-brand transition-colors"
          >
            <span className="text-sm font-medium">Menu</span>
            <span className="relative grid place-items-center w-9 h-9 rounded-full bg-background/15">
              <AnimatePresence mode="wait">
                {open ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-4 h-4" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="m"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-4 h-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </button>
        </div>
      </motion.header>

      <MegaMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function HeaderLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="px-3 py-2 rounded-full text-ink-soft hover:text-ink hover:bg-secondary transition-colors"
      activeProps={{ className: "px-3 py-2 rounded-full text-ink bg-secondary" }}
    >
      {children}
    </Link>
  );
}
