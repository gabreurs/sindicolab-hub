import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export type Crumb = { label: string; to?: string };

type Tone = "light" | "dark" | "mediakit";

export function Breadcrumbs({
  items,
  tone = "light",
  className = "",
}: {
  items: Crumb[];
  tone?: Tone;
  className?: string;
}) {
  const toneClass =
    tone === "dark"
      ? "text-white/55 [&_a:hover]:text-white [&_span:last-child]:text-white/90"
      : tone === "mediakit"
      ? "text-[hsl(var(--mk-fg))]/55 [&_a:hover]:text-[hsl(var(--mk-fg))] [&_span:last-child]:text-[hsl(var(--mk-fg))]"
      : "text-ink-soft [&_a:hover]:text-ink [&_span:last-child]:text-ink";

  return (
    <nav
      aria-label="Breadcrumb"
      className={`container-x page-breadcrumbs ${toneClass} ${className}`}
    >
      <ol className="text-xs flex items-center gap-1.5 flex-wrap py-3">
        <li>
          <Link to="/" className="opacity-80 hover:opacity-100 transition">
            Início
          </Link>
        </li>
        {items.map((c, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronRight className="w-3 h-3 opacity-50" />
            {c.to && i < items.length - 1 ? (
              <Link to={c.to} className="opacity-80 hover:opacity-100 transition">
                {c.label}
              </Link>
            ) : (
              <span className="truncate max-w-[40ch]">{c.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
