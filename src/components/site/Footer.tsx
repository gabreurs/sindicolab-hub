import { Heart } from "lucide-react";

const links = [
  { label: "Quero1Síndico", href: "https://quero1sindico.com/" },
  { label: "Portal", href: "https://sindicolab.com/" },
  { label: "Play", href: "https://sindicolab.com/play/" },
  { label: "Materiais", href: "https://downloads.sindicolab.com/" },
  { label: "Contato", href: "mailto:contato@sindicolab.com" },
];

export function Footer() {
  return (
    <footer className="py-12 md:py-16 bg-background">
      <div className="container-x">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6 items-start">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <span className="grid place-items-center w-9 h-9 rounded-xl bg-ink text-background font-display font-semibold">
                S
              </span>
              <span className="font-display text-lg text-ink">SíndicoLab</span>
            </div>
            <p className="mt-4 text-sm text-ink-soft max-w-sm">
              Canal de acesso ao ecossistema condominial: produto, conteúdo, cursos e materiais.
            </p>
          </div>

          <nav className="md:col-span-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="text-ink-soft hover:text-ink transition-colors py-1"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="md:col-span-3 md:text-right text-sm text-ink-soft">
            contato@sindicolab.com
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-ink-soft">
          <div>© {new Date().getFullYear()} SíndicoLab. Todos os direitos reservados.</div>
          <a
            href="https://studiomarqo.com"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-1.5 hover:text-ink transition-colors"
          >
            Feito com
            <Heart className="w-3.5 h-3.5 fill-brand text-brand group-hover:scale-110 transition-transform" />
            por <span className="font-semibold tracking-wide">STUDIO MARQO</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
