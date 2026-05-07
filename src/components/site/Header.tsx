import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search } from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";
import { MegaMenu } from "./MegaMenu";
import { BrandMark } from "./BrandMark";
import { useSearch } from "./GlobalSearch";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const search = useSearch();
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Off-home pages always show the solid header so it doesn't sit
  // transparent over colored heroes (Play/Patrocínios/etc).
  const solid = scrolled || !isHome;

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: isHome ? 0.6 : 0 }}
        className={`fixed inset-x-0 top-0 z-[70] transition-all duration-500 ${
          solid
            ? "backdrop-blur-xl bg-background/80 border-b border-border/60"
            : "bg-transparent"
        }`}
        data-route={isHome ? "home" : "page"}
      >
        <div className="container-x flex items-center justify-between h-[72px]">
          <Link to="/" aria-label="SíndicoLab — home" className="shrink-0">
            <BrandMark size={30} />
          </Link>

          <nav className="hidden md:flex items-center gap-1 text-[0.92rem]">
            <a
              href="https://quero1sindico.com/"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 rounded-full text-ink hover:bg-secondary transition"
            >
              Encontrar síndico
            </a>
            <Link to="/play" className="px-3 py-2 rounded-full text-ink-soft hover:text-ink hover:bg-secondary transition">
              Cursos
            </Link>
            <Link to="/materiais" className="px-3 py-2 rounded-full text-ink-soft hover:text-ink hover:bg-secondary transition">
              Materiais
            </Link>
            <Link to="/portal" className="px-3 py-2 rounded-full text-ink-soft hover:text-ink hover:bg-secondary transition">
              Portal
            </Link>
            <Link to="/patrocinios" className="px-3 py-2 rounded-full text-ink-soft hover:text-ink hover:bg-secondary transition">
              Patrocinar
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={search.open}
              aria-label="Abrir busca"
              className="group inline-flex items-center gap-2 pl-3 pr-1.5 py-1.5 rounded-full bg-secondary hover:bg-accent transition text-sm text-ink-soft hover:text-ink"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Buscar</span>
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-md bg-background border border-border text-[10px] font-mono text-ink-soft ml-1">
                ⌘K
              </kbd>
            </button>

            <button
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Fechar menu" : "Abrir menu do ecossistema"}
              aria-expanded={open}
              className="group inline-flex items-center gap-2.5 pl-4 pr-1.5 py-1.5 rounded-full bg-ink text-background hover:opacity-95 transition"
            >
              <span className="text-sm font-medium hidden sm:inline">Menu</span>
              <span className="relative grid place-items-center w-9 h-9 rounded-full bg-background/15 overflow-hidden">
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
        </div>
      </motion.header>

      <MegaMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
