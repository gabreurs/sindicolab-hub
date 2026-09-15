import { Header } from "./Header";
import { Footer } from "./Footer";
import { motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

export function PageShell({
  eyebrow,
  title,
  description,
  cta,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  cta?: { label: string; href: string; external?: boolean };
  children?: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-background text-ink flex flex-col">
      <Header />

      <section className="page-shell-hero relative overflow-hidden">
        <div className="absolute -top-28 -right-16 w-[28rem] h-[28rem] rounded-full bg-brand-soft opacity-55 -z-10 hero-blob" />
        <div className="absolute top-1/2 -left-28 w-[22rem] h-[22rem] rounded-full bg-cyan-soft opacity-45 -z-10 hero-blob" />

        <div className="container-x">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="inline-flex items-center gap-2 text-[11px] tracking-tight text-ink-soft"
          >
            <Plus className="w-3 h-3 text-brand" strokeWidth={2.5} />
            {eyebrow}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.05 }}
            className="mt-6 font-display text-4xl md:text-7xl text-ink text-balance tracking-[-0.04em] leading-[0.98] max-w-4xl"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.15 }}
            className="mt-6 max-w-2xl text-base md:text-lg text-ink-soft text-balance leading-relaxed"
          >
            {description}
          </motion.p>

          {cta && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.25 }}
              className="mt-8"
            >
              <a
                href={cta.href}
                target={cta.external ? "_blank" : undefined}
                rel={cta.external ? "noreferrer" : undefined}
                className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-ink text-background font-medium hover:bg-brand transition-colors shadow-card"
              >
                {cta.label}
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </motion.div>
          )}
        </div>
      </section>

      {children}

      <Footer />
    </main>
  );
}
