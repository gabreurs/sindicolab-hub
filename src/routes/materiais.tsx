import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { useMemo, useState } from "react";
import { Search, Download, FileText, ListChecks, BookOpen, Sheet, FileSignature, Mail } from "lucide-react";

export const Route = createFileRoute("/materiais")({
  head: () => ({
    meta: [
      { title: "Materiais para condomínio — Modelos, atas e checklists | SíndicoLab" },
      {
        name: "description",
        content:
          "Biblioteca de materiais para condomínio: modelos de ata, regimentos, checklists, guias práticos e planilhas para a rotina do síndico.",
      },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Biblioteca de materiais para condomínio" },
      {
        property: "og:description",
        content:
          "Modelos, checklists, guias e planilhas prontas para condomínios e síndicos profissionais.",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://sindicolab.com/materiais" }],
  }),
  component: MateriaisPage,
});

type Item = { tag: string; title: string; type: "Modelo" | "Checklist" | "Guia" | "Planilha" | "E-book" };

const items: Item[] = [
  { tag: "Assembleia", title: "Modelo de ata de assembleia condominial", type: "Modelo" },
  { tag: "Assembleia", title: "Modelo de convocação de assembleia", type: "Modelo" },
  { tag: "Transição", title: "Checklist de transição de síndico", type: "Checklist" },
  { tag: "Finanças", title: "Guia prático de prestação de contas", type: "Guia" },
  { tag: "Regimento", title: "Modelo de regimento interno", type: "Modelo" },
  { tag: "Manutenção", title: "Checklist de manutenção predial NBR 5674", type: "Checklist" },
  { tag: "Finanças", title: "Planilha de previsão orçamentária", type: "Planilha" },
  { tag: "Assembleia", title: "Guia para assembleias híbridas", type: "Guia" },
  { tag: "Comunicação", title: "Modelo de comunicado a moradores", type: "Modelo" },
  { tag: "Liderança", title: "E-book: Os 90 primeiros dias do síndico", type: "E-book" },
  { tag: "Cobrança", title: "Checklist de cobrança e inadimplência", type: "Checklist" },
  { tag: "Segurança", title: "Planilha de controle de portaria", type: "Planilha" },
];

const typeIcon: Record<Item["type"], typeof FileText> = {
  Modelo: FileSignature,
  Checklist: ListChecks,
  Guia: BookOpen,
  Planilha: Sheet,
  "E-book": FileText,
};

const filters: Array<"Todos" | Item["type"]> = ["Todos", "Modelo", "Checklist", "Guia", "Planilha", "E-book"];

function MateriaisPage() {
  const [q, setQ] = useState("");
  const [f, setF] = useState<(typeof filters)[number]>("Todos");

  const filtered = useMemo(
    () =>
      items.filter(
        (i) =>
          (f === "Todos" || i.type === f) &&
          (q === "" || i.title.toLowerCase().includes(q.toLowerCase()) || i.tag.toLowerCase().includes(q.toLowerCase())),
      ),
    [q, f],
  );

  return (
    <main className="min-h-screen bg-background text-ink flex flex-col">
      <Header />
      <Breadcrumbs items={[{ label: "Materiais" }]} />

      {/* Hero utilitário com busca */}
      <section className="pt-6 md:pt-8 pb-12 border-b border-border bg-secondary/40">
        <div className="container-x">
          <div className="text-[10px] tracking-tight text-brand font-mono">
            Biblioteca · Materiais para condomínio
          </div>
          <h1 className="mt-5 font-display text-4xl md:text-6xl tracking-[-0.04em] leading-[0.98] max-w-3xl text-balance">
            Modelos, checklists e guias prontos para o seu condomínio
          </h1>
          <p className="mt-5 max-w-2xl text-ink-soft text-base md:text-lg leading-relaxed">
            Materiais práticos baixados por milhares de síndicos. Use, adapte e leve para a sua próxima
            assembleia ou rotina administrativa.
          </p>

          <div className="mt-8 flex items-center gap-3 max-w-2xl bg-background border border-border rounded-2xl px-5 py-4 shadow-soft">
            <Search className="w-5 h-5 text-ink-soft" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar por ata, checklist, regimento, manutenção…"
              className="flex-1 bg-transparent outline-none text-ink placeholder:text-ink-soft/60"
            />
            <span className="text-xs font-mono text-ink-soft hidden md:inline">{filtered.length} resultados</span>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {filters.map((ft) => (
              <button
                key={ft}
                onClick={() => setF(ft)}
                className={`text-xs tracking-tight rounded-full px-3 py-1.5 border transition ${
                  f === ft ? "bg-ink text-background border-ink" : "border-border text-ink-soft hover:border-ink hover:text-ink"
                }`}
              >
                {ft}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lista densa de materiais */}
      <section className="py-14 border-b border-border">
        <div className="container-x">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((it) => {
              const Icon = typeIcon[it.type];
              return (
                <a
                  key={it.title}
                  href="https://downloads.sindicolab.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-xl border border-border bg-card p-5 hover:shadow-card hover:-translate-y-0.5 transition flex items-start gap-4"
                >
                  <div className="grid place-items-center w-12 h-12 rounded-lg bg-secondary text-ink-soft group-hover:bg-ink group-hover:text-background transition shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-[10px] tracking-tight font-mono">
                      <span className="text-brand">{it.type}</span>
                      <span className="text-ink-soft">· {it.tag}</span>
                    </div>
                    <h3 className="mt-2 font-display text-base md:text-lg tracking-[-0.02em] leading-snug text-balance">
                      {it.title}
                    </h3>
                    <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-ink-soft group-hover:text-ink">
                      <Download className="w-3.5 h-3.5" /> Baixar PDF
                    </div>
                  </div>
                </a>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-ink-soft">
              Nenhum material encontrado para a sua busca.
            </div>
          )}
        </div>
      </section>

      {/* Receba por e-mail */}
      <section className="bg-ink text-background py-16">
        <div className="container-x grid md:grid-cols-2 gap-8 items-center">
          <div>
            <Mail className="w-5 h-5 text-cyan" />
            <h2 className="mt-3 font-display text-3xl md:text-4xl tracking-[-0.03em] text-balance">
              Receba novos materiais para condomínio por e-mail
            </h2>
            <p className="mt-3 text-white/70 max-w-md">
              Toda semana, novos modelos, checklists e guias práticos para a sua rotina de síndico.
            </p>
          </div>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              placeholder="seu@email.com"
              className="flex-1 px-4 py-3 rounded-full border border-white/20 bg-white/5 text-background placeholder:text-white/40 focus:outline-none focus:border-cyan"
            />
            <button className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-cyan text-ink font-medium hover:bg-background transition">
              Inscrever
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
