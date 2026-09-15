import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search } from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";
import logoSindicoLab from "@/assets/logo-sindicolab.svg";
import { MegaMenu } from "./MegaMenu";
import { BrandMark } from "./BrandMark";
import { useSearch } from "./GlobalSearch";
import { SessionMenu } from "./SessionMenu";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const search = useSearch();
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const isDarkPage = pathname === "/academy";

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
        className="site-header fixed inset-x-0 top-0 z-[70]"
        data-route={isHome ? "home" : "page"}
        data-scrolled={scrolled ? "true" : "false"}
      >
        <div
          className={`site-header-shell mx-auto flex w-full max-w-[1536px] items-center justify-between box-border ${
            solid ? (isDarkPage ? "glass-dark glass-nav" : "glass glass-nav") : "bg-transparent"
          }`}
          style={{
            height: scrolled ? "calc(var(--header-h) - 8px)" : "var(--header-h)",
            paddingInline: "clamp(1rem, 3.2vw, 2.5rem)",
            gap: "clamp(0.5rem, 1.6vw, 1.25rem)",
          }}
        >
          <Link
            to="/"
            aria-label="SíndicoLab — home"
            className="flex min-w-0 flex-1 shrink items-center overflow-hidden md:flex-none"
          >
            {/* Mobile: only the official logo image — no extra wordmark/text */}
            <img
              src={logoSindicoLab}
              alt="SíndicoLab"
              className="block md:hidden w-full max-w-full h-auto shrink"
              style={{
                width: "clamp(126px, 42vw, 185px)",
                maxWidth: "100%",
                objectFit: "contain",
                objectPosition: "left center",
                filter: isDarkPage && solid ? "none" : "invert(1)",
              }}
              draggable={false}
            />
            {/* Desktop: fixed size */}
            <span className="hidden md:inline-flex items-center">
              <BrandMark size={30} tone={isDarkPage && solid ? "light" : "dark"} />
            </span>
          </Link>

          <nav
            className="header-nav hidden min-w-0 shrink xl:flex items-center"
            style={{ gap: "clamp(0.05rem, 0.35vw, 0.35rem)", fontSize: "clamp(0.82rem, 0.95vw, 0.94rem)" }}
          >
            <Link to="/academy" className={`nav-link inline-flex items-center h-10 px-3 rounded-full whitespace-nowrap leading-none transition ${isDarkPage && solid ? "text-white/70 hover:text-white hover:bg-white/10" : "text-ink-soft hover:text-ink hover:bg-secondary"}`}>
              Academy
            </Link>
            <Link to="/eventos" className={`nav-link inline-flex items-center h-10 px-3 rounded-full whitespace-nowrap leading-none transition ${isDarkPage && solid ? "text-white/70 hover:text-white hover:bg-white/10" : "text-ink-soft hover:text-ink hover:bg-secondary"}`}>
              Eventos
            </Link>
            <Link to="/academy" className={`nav-link inline-flex items-center h-10 px-3 rounded-full whitespace-nowrap leading-none transition ${isDarkPage && solid ? "text-white/70 hover:text-white hover:bg-white/10" : "text-ink-soft hover:text-ink hover:bg-secondary"}`}>
              Cursos
            </Link>
            <Link to="/quem-somos" className={`nav-link inline-flex items-center h-10 px-3 rounded-full whitespace-nowrap leading-none transition ${isDarkPage && solid ? "text-white/70 hover:text-white hover:bg-white/10" : "text-ink-soft hover:text-ink hover:bg-secondary"}`}>
              Quem somos
            </Link>
          </nav>


          <div className="flex items-center gap-2 flex-none shrink-0" style={{ minWidth: "max-content" }}>
            <SessionMenu dark={isDarkPage && solid} />
            <button
              onClick={search.open}
              aria-label="Abrir busca"
              className="group inline-flex items-center justify-center gap-2 min-w-[44px] min-h-[44px] shrink-0 pl-3 pr-1.5 py-1.5 rounded-full bg-secondary hover:bg-accent transition text-sm text-ink-soft hover:text-ink"
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
              className="group inline-flex items-center gap-2.5 min-w-[44px] min-h-[44px] shrink-0 pl-4 pr-1.5 py-1.5 rounded-full bg-ink text-background hover:opacity-95 transition"
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
