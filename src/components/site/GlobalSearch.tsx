import { create } from "zustand";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search as SearchIcon,
  X,
  ArrowUpRight,
  Building2,
  BookOpen,
  GraduationCap,
  Download,
  FileText,
} from "lucide-react";
import Fuse from "fuse.js";
import { Link, useNavigate } from "@tanstack/react-router";
import { searchIndex, popularSearches, trackSearch, type SearchItem } from "@/data/searchIndex";
import { getLenis } from "@/components/site/SmoothScroll";
import { lockNativeScroll, unlockNativeScroll } from "@/lib/scroll-lock";
import { IconButton } from "@/components/ui/icon-button";
import { normalizeSearchText } from "@/lib/searchText";

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
  Páginas: FileText,
  Tema: SearchIcon,
};

const searchableIndex = searchIndex.map((item) => ({
  item,
  title: normalizeSearchText(item.title),
  keywords: normalizeSearchText(item.keywords),
  description: normalizeSearchText(item.description),
}));

const fuse = new Fuse(searchableIndex, {
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
  sindico: ["síndico"],
  predio: ["prédio", "condomínio"],
  reuniao: ["reunião", "assembleia"],
  votacao: ["votação", "assembleia"],
  aula: ["curso"],
  treinamento: ["curso"],
  formacao: ["formação", "curso"],
  guia: ["material"],
  checklist: ["material"],
  modelo: ["material"],
};

function expandQuery(q: string) {
  const lower = normalizeSearchText(q);
  const extra: string[] = [];
  Object.entries(SYNONYMS).forEach(([k, v]) => {
    if (lower.includes(k)) extra.push(...v);
  });
  return extra.length ? normalizeSearchText(`${q} ${extra.join(" ")}`) : lower;
}

export function GlobalSearch() {
  const { isOpen, close, toggle } = useSearch();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const titleId = "global-search-title";
  const lastTrigger = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close, toggle]);

  // body scroll lock real + Lenis pause + autofocus + focus return
  useEffect(() => {
    if (isOpen) {
      if (!lastTrigger.current) lastTrigger.current = document.activeElement as HTMLElement;
      lockNativeScroll("global-search");
      getLenis()?.stop();
      // focus instantâneo (sem cooldown perceptível)
      requestAnimationFrame(() => inputRef.current?.focus());
      return () => {
        unlockNativeScroll("global-search");
        getLenis()?.start();
        setQuery("");
        lastTrigger.current?.focus?.();
        lastTrigger.current = null;
      };
    }
  }, [isOpen]);

  const normalizedQuery = normalizeSearchText(query);

  const results = useMemo(() => {
    if (!normalizedQuery) return [] as SearchItem[];
    const expanded = expandQuery(normalizedQuery);
    const direct = searchableIndex
      .filter((entry) =>
        `${entry.title} ${entry.keywords} ${entry.description}`.includes(normalizedQuery),
      )
      .sort((a, b) => b.item.priority - a.item.priority)
      .map((entry) => entry.item);
    const directIds = new Set(direct.map((item) => item.id));
    const fuzzy = fuse
      .search(expanded)
      .map((x) => ({
        item: x.item.item,
        total: (x.score ?? 1) - x.item.item.priority / 200,
      }))
      .filter((result) => !directIds.has(result.item.id));
    fuzzy.sort((a, b) => a.total - b.total);
    return [...direct, ...fuzzy.map((result) => result.item)].slice(0, 9);
  }, [normalizedQuery]);

  const grouped = useMemo(() => {
    const g: Record<string, SearchItem[]> = {};
    results.forEach((r) => {
      g[r.category] ??= [];
      g[r.category].push(r);
    });
    return g;
  }, [results]);

  useEffect(() => {
    setActiveIdx(0);
  }, [normalizedQuery]);

  function onKeyDownInput(e: React.KeyboardEvent) {
    const itemCount = normalizedQuery ? results.length : popularSearches.length;
    if (!itemCount) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, itemCount - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (normalizedQuery) {
        const result = results[activeIdx];
        if (result) handleNavigate(result);
      } else {
        const popular = popularSearches[activeIdx];
        if (popular) handlePopularNavigate(popular);
      }
    }
  }

  function handleNavigate(r: SearchItem) {
    trackSearch(query.trim(), { id: r.id, href: r.href });
    close();
    if (r.type === "external") window.open(r.href, "_blank", "noopener,noreferrer");
    else navigate({ to: r.href as any });
  }

  function handlePopularNavigate(item: (typeof popularSearches)[number]) {
    close();
    if (item.external) window.open(item.href, "_blank", "noopener,noreferrer");
    else navigate({ to: item.href as any });
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            onClick={close}
            className="fixed inset-0 z-[200] bg-ink/60"
          />
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.14, ease: "easeOut" }}
            className="fixed inset-x-3 top-3 z-[210] max-h-[calc(100dvh-1.5rem)] overflow-hidden rounded-xl border border-border bg-background shadow-lift sm:left-1/2 sm:right-auto sm:top-[10vh] sm:w-[min(720px,92vw)] sm:-translate-x-1/2 flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 md:px-6 pt-4 pb-3 border-b border-border">
              <div>
                <div
                  id={titleId}
                  className="font-display text-base md:text-lg text-ink tracking-[-0.01em]"
                >
                  Buscar no SíndicoLab
                </div>
                <div className="text-[12px] text-ink-soft mt-0.5">
                  Síndico profissional, cursos, materiais e gestão condominial
                </div>
              </div>
              <IconButton
                onClick={close}
                label="Fechar busca"
                className="border border-border bg-background text-ink transition hover:bg-secondary"
              >
                <X className="w-4 h-4" />
              </IconButton>
            </div>

            {/* Search field */}
            <div className="flex items-center gap-3 px-5 md:px-6 py-4 border-b border-border bg-secondary/40">
              <SearchIcon className="w-5 h-5 text-ink-soft shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDownInput}
                placeholder="Digite um tema, problema, curso ou material"
                className="flex-1 bg-transparent outline-none text-[1.05rem] md:text-lg placeholder:text-ink-soft text-ink"
                aria-label="Campo de busca"
                aria-controls="global-search-results"
              />
            </div>

            {/* Body */}
            <div
              id="global-search-results"
              className="flex-1 overflow-y-auto overscroll-contain p-3 md:p-4"
            >
              {!normalizedQuery && (
                <div className="p-2">
                  <div className="px-3 pt-1 pb-3 font-display text-[1.05rem] text-ink">
                    Como o SíndicoLab pode ajudar hoje?
                  </div>
                  <ul className="grid gap-1.5">
                    {popularSearches.map((p, i) => {
                      const desc = POPULAR_DESCRIPTIONS[p.label] ?? "";
                      const active = i === activeIdx;
                      const Inner = (
                        <>
                          <span className="grid place-items-center w-10 h-10 rounded-lg bg-secondary text-ink-soft group-hover:bg-ink group-hover:text-background transition shrink-0">
                            <SearchIcon className="w-4 h-4" />
                          </span>
                          <span className="flex-1 min-w-0">
                            <span className="block text-[0.95rem] font-medium text-ink">
                              {p.label}
                            </span>
                            {desc && (
                              <span className="block text-xs text-ink-soft mt-0.5">{desc}</span>
                            )}
                          </span>
                          <ArrowUpRight className="w-4 h-4 text-ink-soft group-hover:text-ink group-hover:translate-x-0.5 transition" />
                        </>
                      );
                      return (
                        <li key={p.label}>
                          {p.external ? (
                            <a
                              href={p.href}
                              target="_blank"
                              rel="noreferrer"
                              onClick={close}
                              onMouseEnter={() => setActiveIdx(i)}
                              className={`group flex items-center gap-3 px-3 py-3 rounded-xl transition ${active ? "bg-brand-soft" : "hover:bg-secondary"}`}
                            >
                              {Inner}
                            </a>
                          ) : (
                            <Link
                              to={p.href}
                              onClick={close}
                              onMouseEnter={() => setActiveIdx(i)}
                              className={`group flex items-center gap-3 px-3 py-3 rounded-xl transition ${active ? "bg-brand-soft" : "hover:bg-secondary"}`}
                            >
                              {Inner}
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {normalizedQuery && results.length === 0 && (
                <div className="p-4">
                  <p className="text-ink font-medium">Não encontramos exatamente isso.</p>
                  <p className="text-sm text-ink-soft mt-1.5 max-w-md">
                    Tente buscar por síndico profissional, assembleia, curso para síndico, materiais
                    para condomínio ou gestão condominial.
                  </p>
                  <div className="grid gap-2 mt-4">
                    {popularSearches.slice(0, 3).map((p) =>
                      p.external ? (
                        <a
                          key={p.label}
                          href={p.href}
                          target="_blank"
                          rel="noreferrer"
                          onClick={close}
                          className="group flex items-center justify-between gap-3 px-3 py-3 rounded-xl bg-secondary hover:bg-accent transition"
                        >
                          <span className="text-sm text-ink">{p.label}</span>
                          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
                        </a>
                      ) : (
                        <Link
                          key={p.label}
                          to={p.href}
                          onClick={close}
                          className="group flex items-center justify-between gap-3 px-3 py-3 rounded-xl bg-secondary hover:bg-accent transition"
                        >
                          <span className="text-sm text-ink">{p.label}</span>
                          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
                        </Link>
                      ),
                    )}
                  </div>
                </div>
              )}

              {normalizedQuery && results.length > 0 && (
                <div className="p-1">
                  {Object.entries(grouped).map(([cat, items]) => (
                    <div key={cat} className="mb-3 last:mb-0">
                      <div className="text-[11px] tracking-tight text-ink-soft px-3 py-2 font-medium">
                        {cat}
                      </div>
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
                                <span
                                  className={`grid place-items-center w-10 h-10 rounded-lg shrink-0 transition ${active ? "bg-ink text-background" : "bg-background border border-border text-ink-soft"}`}
                                >
                                  <Icon className="w-4 h-4" />
                                </span>
                                <span className="flex-1 min-w-0">
                                  <span className="block text-[0.95rem] font-medium text-ink truncate">
                                    {r.title}
                                  </span>
                                  <span className="block text-xs text-ink-soft truncate">
                                    {r.description}
                                  </span>
                                </span>
                                <ArrowUpRight
                                  className={`w-4 h-4 text-ink-soft transition ${active ? "translate-x-0.5 text-ink" : "group-hover:translate-x-0.5"}`}
                                />
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

const POPULAR_DESCRIPTIONS: Record<string, string> = {
  "Resolver uma demanda de gestão": "Modelos, checklists, guias e materiais práticos",
  "Desenvolver minha carreira": "Cursos para síndicos, conselheiros e equipes",
  "Acompanhar o mercado condominial": "Notícias, análises e conteúdos do setor",
  "Encontrar síndico profissional": "Acesse o Quero1Síndico",
  "Conhecer eventos e conexões": "Encontros e experiências para o mercado condominial",
};
