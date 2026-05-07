import { Camera, Play, Briefcase } from "lucide-react";

const links = [
  { label: "Quero1Síndico", href: "https://quero1sindico.com/" },
  { label: "Portal", href: "https://sindicolab.com/" },
  { label: "Play", href: "https://sindicolab.com/play/" },
  { label: "Materiais", href: "https://downloads.sindicolab.com/" },
];

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="container-x flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <span className="grid place-items-center w-7 h-7 rounded-lg bg-ink text-background font-display text-sm font-semibold">
            S
          </span>
          <div className="text-sm text-ink-soft">
            © {new Date().getFullYear()} SíndicoLab — canal do ecossistema condominial.
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="text-ink-soft hover:text-ink transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="#" aria-label="Instagram" className="grid place-items-center w-9 h-9 rounded-full border border-border hover:bg-secondary transition">
            <Camera className="w-4 h-4" />
          </a>
          <a href="#" aria-label="YouTube" className="grid place-items-center w-9 h-9 rounded-full border border-border hover:bg-secondary transition">
            <Play className="w-4 h-4" />
          </a>
          <a href="#" aria-label="LinkedIn" className="grid place-items-center w-9 h-9 rounded-full border border-border hover:bg-secondary transition">
            <Briefcase className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
