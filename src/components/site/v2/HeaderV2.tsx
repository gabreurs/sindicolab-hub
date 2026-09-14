import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";

const nav = [
  { label: "Conteúdos", to: "/portal" },
  { label: "Cursos", to: "/academy" },
  { label: "Eventos", to: "/quem-somos" },
];

export function HeaderV2() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[70] w-full bg-v2-nav text-white">
      <div className="mx-auto flex h-[62px] w-full max-w-[1536px] items-center justify-between gap-4 px-5 md:px-10">
        <Link to="/" aria-label="SíndicoLab — página inicial" className="shrink-0">
          <span className="font-display text-[1.55rem] leading-none tracking-[-0.03em] text-white">
            Síndico<span className="text-v2-purple-light">Lab</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {nav.map((n) => (
            <Link
              key={n.label}
              to={n.to}
              className="text-[0.95rem] text-white/85 transition-colors hover:text-white"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://instagram.com/sindicolab"
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full bg-v2-purple px-6 py-2.5 text-[0.95rem] font-semibold text-white transition-colors hover:bg-v2-purple-light md:inline-flex"
          >
            Faça parte
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            className="grid h-11 w-11 place-items-center rounded-full bg-white/10 md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-v2-nav px-5 pb-5 pt-2 md:hidden">
          <nav className="flex flex-col">
            {nav.map((n) => (
              <Link
                key={n.label}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-3 text-[1rem] text-white/85"
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <a
            href="https://instagram.com/sindicolab"
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-v2-purple px-6 py-3 text-[0.95rem] font-semibold text-white"
          >
            Faça parte
          </a>
        </div>
      )}
    </header>
  );
}
