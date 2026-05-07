import { Heart, ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

const cols = [
  {
    label: "Ecossistema",
    items: [
      { label: "Quero1Síndico", href: "https://quero1sindico.com/", external: true },
      { label: "Portal SíndicoLab", href: "/portal" },
      { label: "SíndicoLab Play", href: "/play" },
      { label: "Materiais e Downloads", href: "/materiais" },
    ],
  },
  {
    label: "Institucional",
    items: [
      { label: "Sobre o SíndicoLab", href: "/portal" },
      { label: "Parcerias", href: "mailto:contato@sindicolab.com", external: true },
      { label: "Imprensa", href: "mailto:imprensa@sindicolab.com", external: true },
      { label: "Contato", href: "mailto:contato@sindicolab.com", external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative bg-ink text-background pt-20 md:pt-28 pb-10 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/50 to-transparent" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[60rem] h-[60rem] rounded-full bg-brand/15 blur-3xl pointer-events-none" />

      <div className="container-x relative">
        <div className="grid md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-5">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <span className="relative grid place-items-center w-10 h-10 rounded-[10px] overflow-hidden font-display font-semibold">
                <span className="absolute inset-0 gradient-lab" />
                <span className="relative">S</span>
              </span>
              <span className="font-display text-xl">
                Síndico<span className="text-cyan">Lab</span>
              </span>
            </Link>
            <p className="mt-5 text-sm text-background/65 max-w-sm leading-relaxed">
              O ecossistema brasileiro de síndico profissional, cursos, materiais e
              conteúdo para gestão condominial.
            </p>

            <a
              href="https://quero1sindico.com/"
              target="_blank"
              rel="noreferrer"
              className="group mt-7 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-background/10 border border-background/15 text-sm hover:bg-cyan hover:text-ink hover:border-cyan transition-all"
            >
              Encontrar síndico profissional
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {cols.map((c) => (
            <div key={c.label} className="md:col-span-3">
              <div className="text-[10px] uppercase tracking-[0.35em] text-background/45 mb-4">
                {c.label}
              </div>
              <ul className="space-y-2.5 text-sm">
                {c.items.map((it) => (
                  <li key={it.label}>
                    {it.external ? (
                      <a
                        href={it.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-background/80 hover:text-cyan transition-colors"
                      >
                        {it.label}
                      </a>
                    ) : (
                      <Link to={it.href} className="text-background/80 hover:text-cyan transition-colors">
                        {it.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-1" />
        </div>

        <div className="mt-16 pt-6 border-t border-background/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-background/55">
          <div>© {new Date().getFullYear()} SíndicoLab. Todos os direitos reservados.</div>
          <a
            href="https://studiomarqo.com"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-1.5 hover:text-background transition-colors"
          >
            Feito com
            <Heart className="w-3.5 h-3.5 fill-cyan text-cyan group-hover:scale-110 transition-transform" />
            por <span className="font-semibold tracking-wide text-background/80">STUDIO MARQO</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
