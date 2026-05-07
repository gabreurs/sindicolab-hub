import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export type Crumb = { label: string; to?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="container-x pt-24 md:pt-28">
      <ol className="text-xs text-ink-soft flex items-center gap-1.5 flex-wrap py-3">
        <li>
          <Link to="/" className="hover:text-ink">Início</Link>
        </li>
        {items.map((c, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronRight className="w-3 h-3 opacity-60" />
            {c.to && i < items.length - 1 ? (
              <Link to={c.to} className="hover:text-ink">{c.label}</Link>
            ) : (
              <span className="text-ink truncate max-w-[40ch]">{c.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
