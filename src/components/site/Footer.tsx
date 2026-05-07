import { ArrowUpRight, Instagram, Youtube, Linkedin } from "lucide-react";

const cols = [
  {
    title: "Ecossistema",
    links: [
      { label: "SíndicoLab", href: "https://sindicolab.com/" },
      { label: "Quero1Síndico", href: "https://quero1sindico.com/" },
      { label: "Cursos & Play", href: "https://sindicolab.com/play/" },
      { label: "Materiais", href: "https://downloads.sindicolab.com/" },
    ],
  },
  {
    title: "Conteúdos",
    links: [
      { label: "Artigos", href: "#" },
      { label: "Vídeos", href: "#" },
      { label: "Trilhas", href: "#" },
      { label: "Cases", href: "#" },
    ],
  },
  {
    title: "Acessos",
    links: [
      { label: "Para condomínios", href: "#" },
      { label: "Para síndicos", href: "#" },
      { label: "Para parceiros", href: "#" },
      { label: "Imprensa", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-ink text-background pt-20 pb-10 mt-10">
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-12 pb-16 border-b border-background/10">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2">
              <span className="grid place-items-center w-9 h-9 rounded-xl bg-brand text-brand-foreground font-display font-semibold text-lg">
                S
              </span>
              <span className="font-display text-lg">SíndicoLab</span>
            </div>
            <h3 className="mt-8 font-display text-3xl md:text-5xl leading-[1.05] text-balance max-w-md">
              Pronto para entrar no ecossistema?
            </h3>
            <a
              href="https://quero1sindico.com/"
              target="_blank"
              rel="noreferrer"
              className="mt-8 group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-brand text-brand-foreground font-medium hover:brightness-110 transition"
            >
              Começar pelo Quero1Síndico
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            {cols.map((c) => (
              <div key={c.title}>
                <div className="text-xs uppercase tracking-[0.2em] text-background/50 font-semibold">
                  {c.title}
                </div>
                <ul className="mt-5 space-y-3">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        target={l.href.startsWith("http") ? "_blank" : undefined}
                        rel="noreferrer"
                        className="text-background/80 hover:text-brand-soft transition-colors"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-sm text-background/60">
          <div>© {new Date().getFullYear()} SíndicoLab. O canal do mercado condominial.</div>
          <div className="flex items-center gap-3">
            <a href="#" className="grid place-items-center w-9 h-9 rounded-full border border-background/15 hover:bg-background/10 transition" aria-label="Instagram"><Instagram className="w-4 h-4" /></a>
            <a href="#" className="grid place-items-center w-9 h-9 rounded-full border border-background/15 hover:bg-background/10 transition" aria-label="YouTube"><Youtube className="w-4 h-4" /></a>
            <a href="#" className="grid place-items-center w-9 h-9 rounded-full border border-background/15 hover:bg-background/10 transition" aria-label="LinkedIn"><Linkedin className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
