import { create } from "zustand";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search as SearchIcon, X, ArrowUpRight, Building2, BookOpen, GraduationCap, Download, Sparkles, FileText } from "lucide-react";
import Fuse from "fuse.js";
import { Link } from "@tanstack/react-router";
import { searchIndex, popularSearches, trackSearch, type SearchItem } from "@/data/searchIndex";

type SearchStore = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export const useSearch = create<SearchStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((s) => ({ isOpen: !s.isOpen })),
}));

const categoryIcons: Record<SearchItem["category"], React.ComponentType<{ className?: string }>> = {
  Produto: Building2,
  Portal: BookOpen,
  Cursos: GraduationCap,
  Materiais: Download,
  Patrocínios: Sparkles,
  Páginas: FileText,
  Tema: SearchIcon,
};

const fuse = new Fuse(searchIndex, {
  includeScore: true,
  threshold: 0.4,
  ignoreLocation: true,
  keys: [
    { name: "title", weight: 0.5 },
    { name: "keywords", weight: 0.4 },
    { name: "description", weight: 0.2 },
  ],
});

const SYNONYMS: Record<string, string[]> = {
  "sindico": ["síndico"],
  "predio": ["prédio", "condomínio"],
  "reuniao": ["reunião", "assembleia"],
  "votacao": ["votação", "assembleia"],
  "aula": ["curso"],
  "treinamento": ["curso"],
  "formacao": ["formação", "curso"],
  "guia": ["material"],
  "checklist": ["material"],
  "modelo": ["material"],
};

function expandQuery(q: string) {
  const lower = q.toLowerCase();
  const extra: string[] = [];
  Object.entries(SYNONYMS).forEach(([k, v]) => {
    if (lower.includes(k)) extra.push(...v);
  });
  return extra.length ? `${q} ${extra.join(" ")}` : q;
}

export function GlobalSearch() {
  const { isOpen, close, toggle } = useSearch();
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Cmd/Ctrl + K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
      if (e.key === "Escape" && isOpen) close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close, toggle]);

  // body scroll lock + autofocus
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 30);
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setDebounced("");
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // debounce
  useEffect(() => {
    const t = setTimeout(() => setDebounced(query.trim()), 220);
    return () => clearTimeout(t);
  }, [query]);

  const results = useMemo(() => {
    if (!debounced) return [] as SearchItem[];
    const expanded = expandQuery(debounced);
    const r = fuse.search(expanded).map((x) => ({
      item: x.item,
      // combine score with priority — lower is better in fuse
      total: (x.score ?? 1) - x.item.priority / 200,
    }));
    r.sort((a, b) => a.total - b.total);
    return r.slice(0, 9).map((x) => x.item);
  }, [debounced]);

  const grouped = useMemo(() => {
    const g: Record<string, SearchItem[]> = {};
    results.forEach((r) => {
      g[r.category] ??= [];
      g[r.category].push(r);
    });
    return g;
  }, [results]);

  useEffect(() => { setActiveIdx(0); }, [debounced]);

  function onKeyDownInput(e: React.KeyboardEvent) {
    if (!results.length) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActiveIdx((i) => Math.min(i + 1, results.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActiveIdx((i) => Math.max(i - 1, 0)); }
    else if (e.key === "Enter") {
      e.preventDefault();
      const r = results[activeIdx];
      if (r) handleNavigate(r);
    }
  }

  function handleNavigate(r: SearchItem) {
    trackSearch(debounced, { id: r.id, href: r.href });
    close();
    if (r.type === "external") window.open(r.href, "_blank", "noopener,noreferrer");
    else window.location.href = r.href;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            className="fixed inset-0 z-[120] bg-ink/60 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.985 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 -translate-x-1/2 top-[10vh] z-[130] w-[min(720px,92vw)] rounded-3xl bg-background border border-border shadow-lift overflow-hidden"
            role="dialog"
            aria-label="Busca global SíndicoLab"
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
              <SearchIcon className="w-5 h-5 text-ink-soft shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDownInput}
                placeholder="Buscar síndico profissional, cursos, materiais, conteúdos…"
                className="flex-1 bg-transparent outline-none text-[1.05rem] placeholder:text-ink-soft text-ink"
                aria-label="Campo de busca"
              />
              <kbd className="hidden md:inline-flex px-1.5 py-0.5 rounded-md bg-secondary text-[10px] font-mono text-ink-soft border border-border">ESC</kbd>
              <button onClick={close} className="grid place-items-center w-8 h-8 rounded-full hover:bg-secondary md:hidden" aria-label="Fechar busca">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-3">
              {!debounced && (
                <div className="p-3">
                  <div className="text-[11px] uppercase tracking-[0.3em] text-ink-soft mb-3 px-2">
                    Buscas populares
                  </div>
                  <ul className="grid gap-1">
                    {popularSearches.map((p) => (
                      <li key={p.label}>
                        {p.external ? (
                          <a href={p.href} target="_blank" rel="noreferrer" onClick={close} className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl hover:bg-secondary transition group">
                            <span className="text-sm text-ink">{p.label}</span>
                            <ArrowUpRight className="w-4 h-4 text-ink-soft group-hover:text-ink" />
                          </a>
                        ) : (
                          <Link to={p.href} onClick={close} className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl hover:bg-secondary transition group">
                            <span className="text-sm text-ink">{p.label}</span>
                            <ArrowUpRight className="w-4 h-4 text-ink-soft group-hover:text-ink" />
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {debounced && results.length === 0 && (
                <div className="p-6 text-sm text-ink-soft">
                  <p className="text-ink mb-3">Não encontramos exatamente isso, mas estes caminhos podem ajudar:</p>
                  <div className="grid gap-2">
                    {popularSearches.slice(0, 4).map((p) =>
                      p.external ? (
                        <a key={p.label} href={p.href} target="_blank" rel="noreferrer" onClick={close} className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl bg-secondary hover:bg-accent transition">
                          <span className="text-sm text-ink">{p.label}</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      ) : (
                        <Link key={p.label} to={p.href} onClick={close} className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl bg-secondary hover:bg-accent transition">
                          <span className="text-sm text-ink">{p.label}</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </Link>
                      )
                    )}
                  </div>
                </div>
              )}

              {debounced && results.length > 0 && (
                <div className="p-2">
                  {Object.entries(grouped).map(([cat, items]) => (
                    <div key={cat} className="mb-3 last:mb-0">
                      <div className="text-[11px] uppercase tracking-[0.28em] text-ink-soft px-3 py-2">{cat}</div>
                      <ul>
                        {items.map((r) => {
                          const idx = results.indexOf(r);
                          const active = idx === activeIdx;
                          const Icon = categoryIcons[r.category];
                          return (
                            <li key={r.id}>
                              <button
                                onMouseEnter={() => setActiveIdx(idx)}
                                onClick={() => handleNavigate(r)}
                                className={`w-full text-left flex items-center gap-3 px-3 py-3 rounded-xl transition ${active ? "bg-secondary" : "hover:bg-secondary/60"}`}
                              >
                                <span className={`grid place-items-center w-9 h-9 rounded-lg ${active ? "bg-ink text-background" : "bg-background border border-border text-ink-soft"}`}>
                                  <Icon className="w-4 h-4" />
                                </span>
                                <span className="flex-1 min-w-0">
                                  <span className="block text-sm font-medium text-ink truncate">{r.title}</span>
                                  <span className="block text-xs text-ink-soft truncate">{r.description}</span>
                                </span>
                                <ArrowUpRight className="w-4 h-4 text-ink-soft" />
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-border px-4 py-2.5 flex items-center justify-between text-[11px] text-ink-soft">
              <span className="flex items-center gap-3">
                <span><kbd className="font-mono">↑↓</kbd> navegar</span>
                <span><kbd className="font-mono">↵</kbd> abrir</span>
              </span>
              <span>Busca SíndicoLab</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
