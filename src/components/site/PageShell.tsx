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

      <section className="relative pt-36 md:pt-44 pb-20 md:pb-28 overflow-hidden">
        <div className="absolute -top-32 -right-20 w-[40rem] h-[40rem] rounded-full bg-brand-soft blur-[120px] opacity-70 -z-10" />
        <div className="absolute top-1/2 -left-32 w-[30rem] h-[30rem] rounded-full bg-cyan-soft blur-[120px] opacity-60 -z-10" />

        <div className="container-x">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.4em] text-ink-soft"
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
