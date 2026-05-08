import { create } from "zustand";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search as SearchIcon, X, ArrowUpRight, Building2, BookOpen, GraduationCap, Download, Sparkles, FileText } from "lucide-react";
import Fuse from "fuse.js";
import { Link } from "@tanstack/react-router";
import { searchIndex, popularSearches, trackSearch, type SearchItem } from "@/data/searchIndex";
import { getLenis } from "@/components/site/SmoothScroll";


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
  const titleId = "global-search-title";
  const lastTrigger = useRef<HTMLElement | null>(null);

  // Cmd/Ctrl + K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (!isOpen) lastTrigger.current = document.activeElement as HTMLElement;
        toggle();
      }
      if (e.key === "Escape" && isOpen) close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close, toggle]);

  // body scroll lock real + Lenis pause + autofocus + focus return
  useEffect(() => {
    if (isOpen) {
      if (!lastTrigger.current) lastTrigger.current = document.activeElement as HTMLElement;
      const scrollY = window.scrollY;
      const body = document.body;
      const html = document.documentElement;
      body.dataset.scrollY = String(scrollY);
      body.style.position = "fixed";
      body.style.top = `-${scrollY}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";
      body.style.overflow = "hidden";
      html.style.overscrollBehavior = "none";
      getLenis()?.stop();
      // focus instantâneo (sem cooldown perceptível)
      requestAnimationFrame(() => inputRef.current?.focus());
      return () => {
        const y = Number(body.dataset.scrollY ?? "0");
        body.style.position = "";
        body.style.top = "";
        body.style.left = "";
        body.style.right = "";
        body.style.width = "";
        body.style.overflow = "";
        html.style.overscrollBehavior = "";
        delete body.dataset.scrollY;
        window.scrollTo(0, y);
        getLenis()?.start();
        setQuery("");
        setDebounced("");
        lastTrigger.current?.focus?.();
        lastTrigger.current = null;
      };
    }
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
            transition={{ duration: 0.2 }}
            onClick={close}
            className="fixed inset-0 z-[200] bg-ink/55 md:backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.985 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 -translate-x-1/2 top-[8vh] md:top-[12vh] z-[210] w-[min(760px,94vw)] max-h-[84vh] rounded-3xl bg-background border border-border shadow-lift overflow-hidden flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 md:px-6 pt-4 pb-3 border-b border-border">
              <div>
                <div id={titleId} className="font-display text-base md:text-lg text-ink tracking-[-0.01em]">
                  Buscar no SíndicoLab
                </div>
                <div className="text-[12px] text-ink-soft mt-0.5">
                  Síndico profissional, cursos, materiais e gestão condominial
                </div>
              </div>
              <button
                onClick={close}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background hover:bg-secondary text-ink px-3 h-11 min-w-[44px] min-h-[44px] transition"
                aria-label="Fechar busca"
              >
                <X className="w-4 h-4" />
                <span className="text-sm font-medium hidden sm:inline">Fechar</span>
              </button>
            </div>

            {/* Search field */}
            <div className="flex items-center gap-3 px-5 md:px-6 py-4 border-b border-border bg-secondary/40">
              <SearchIcon className="w-5 h-5 text-ink-soft shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDownInput}
                placeholder="Busque por síndico profissional, cursos ou materiais"
                className="flex-1 bg-transparent outline-none text-[1.05rem] md:text-lg placeholder:text-ink-soft text-ink"
                aria-label="Campo de busca"
                aria-controls="global-search-results"
              />
            </div>

            {/* Body */}
            <div id="global-search-results" className="flex-1 overflow-y-auto overscroll-contain p-3 md:p-4">
              {!debounced && (
                <div className="p-2">
                  <div className="px-3 pt-1 pb-3 font-display text-[1.05rem] text-ink">
                    O que você procura?
                  </div>
                  <ul className="grid gap-1.5">
                    {popularSearches.map((p, i) => {
                      const desc = POPULAR_DESCRIPTIONS[p.label] ?? "";
                      const Inner = (
                        <>
                          <span className="grid place-items-center w-10 h-10 rounded-lg bg-secondary text-ink-soft group-hover:bg-ink group-hover:text-background transition shrink-0">
                            <SearchIcon className="w-4 h-4" />
                          </span>
                          <span className="flex-1 min-w-0">
                            <span className="block text-[0.95rem] font-medium text-ink">{p.label}</span>
                            {desc && <span className="block text-xs text-ink-soft mt-0.5">{desc}</span>}
                          </span>
                          <ArrowUpRight className="w-4 h-4 text-ink-soft group-hover:text-ink group-hover:translate-x-0.5 transition" />
                        </>
                      );
                      return (
                        <motion.li
                          key={p.label}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.04 * i, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        >
                          {p.external ? (
                            <a href={p.href} target="_blank" rel="noreferrer" onClick={close} className="group flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-secondary transition">
                              {Inner}
                            </a>
                          ) : (
                            <Link to={p.href} onClick={close} className="group flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-secondary transition">
                              {Inner}
                            </Link>
                          )}
                        </motion.li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {debounced && results.length === 0 && (
                <div className="p-4">
                  <p className="text-ink font-medium">Não encontramos exatamente isso.</p>
                  <p className="text-sm text-ink-soft mt-1.5 max-w-md">
                    Tente buscar por síndico profissional, assembleia, curso para síndico, materiais para condomínio ou gestão condominial.
                  </p>
                  <div className="grid gap-2 mt-4">
                    {popularSearches.slice(0, 3).map((p) =>
                      p.external ? (
                        <a key={p.label} href={p.href} target="_blank" rel="noreferrer" onClick={close} className="group flex items-center justify-between gap-3 px-3 py-3 rounded-xl bg-secondary hover:bg-accent transition">
                          <span className="text-sm text-ink">{p.label}</span>
                          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
                        </a>
                      ) : (
                        <Link key={p.label} to={p.href} onClick={close} className="group flex items-center justify-between gap-3 px-3 py-3 rounded-xl bg-secondary hover:bg-accent transition">
                          <span className="text-sm text-ink">{p.label}</span>
                          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
                        </Link>
                      )
                    )}
                  </div>
                </div>
              )}

              {debounced && results.length > 0 && (
                <div className="p-1">
                  {Object.entries(grouped).map(([cat, items]) => (
                    <div key={cat} className="mb-3 last:mb-0">
                      <div className="text-[11px] tracking-tight text-ink-soft px-3 py-2 font-medium">{cat}</div>
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
                                className={`w-full text-left flex items-center gap-3 px-3 py-3 rounded-xl transition group ${active ? "bg-brand-soft" : "hover:bg-secondary"}`}
                              >
                                <span className={`grid place-items-center w-10 h-10 rounded-lg shrink-0 transition ${active ? "bg-ink text-background" : "bg-background border border-border text-ink-soft"}`}>
                                  <Icon className="w-4 h-4" />
                                </span>
                                <span className="flex-1 min-w-0">
                                  <span className="block text-[0.95rem] font-medium text-ink truncate">{r.title}</span>
                                  <span className="block text-xs text-ink-soft truncate">{r.description}</span>
                                </span>
                                <ArrowUpRight className={`w-4 h-4 text-ink-soft transition ${active ? "translate-x-0.5 text-ink" : "group-hover:translate-x-0.5"}`} />
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

            {/* Footer with keyboard hints (secondary) */}
            <div className="border-t border-border px-4 md:px-5 py-2.5 flex items-center justify-between text-[11px] text-ink-soft">
              <span className="flex items-center gap-3">
                <span><kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-secondary border border-border">↑↓</kbd> navegar</span>
                <span><kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-secondary border border-border">↵</kbd> abrir</span>
                <span className="hidden sm:inline"><kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-secondary border border-border">Esc</kbd> fechar</span>
              </span>
              <span>Busca SíndicoLab</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

const POPULAR_DESCRIPTIONS: Record<string, string> = {
  "Encontrar síndico profissional": "Acesse o Quero1Síndico",
  "Baixar materiais para condomínio": "Guias, modelos e checklists gratuitos",
  "Ver cursos para síndicos": "Aulas e formações no SíndicoLab Play",
  "Ler conteúdo sobre gestão condominial": "Portal com notícias, segurança e casos reais",
  "Patrocinar experiências condominiais": "Mídia kit, workshops e relacionamento",
};
