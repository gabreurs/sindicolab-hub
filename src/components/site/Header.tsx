import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const links = [
  { label: "Quero1Síndico", href: "https://quero1sindico.com/", highlight: true },
  { label: "Play", href: "https://sindicolab.com/play/" },
  { label: "Materiais", href: "https://downloads.sindicolab.com/" },
  { label: "Portal", href: "https://sindicolab.com/" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-background/75 border-b border-border/60"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex items-center justify-between h-16">
        <a href="#top" className="flex items-center gap-2.5 group">
          <span className="grid place-items-center w-8 h-8 rounded-lg bg-ink text-background font-display font-semibold text-base group-hover:bg-brand transition-colors">
            S
          </span>
          <span className="font-display text-base tracking-tight text-ink">
            SíndicoLab
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className={`px-3.5 py-1.5 text-sm rounded-full transition-colors ${
                l.highlight
                  ? "text-brand font-medium hover:bg-brand-soft"
                  : "text-ink-soft hover:text-ink hover:bg-secondary"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#caminhos"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-ink text-background text-sm font-medium hover:bg-brand transition-colors"
        >
          Explorar caminhos
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.header>
  );
}
