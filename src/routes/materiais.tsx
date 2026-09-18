import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { useEffect, useMemo, useState } from "react";
import { Search, Download, FileText, ListChecks, BookOpen, Sheet, FileSignature, Mail } from "lucide-react";
import { buildSeo } from "@/lib/seo";
import { materialsService } from "@/services/materialsService";
import { captureNewsletterEmail } from "@/services/newsletterService";
import { matchesSearch } from "@/lib/searchText";

export const Route = createFileRoute("/materiais")({
  head: () =>
    buildSeo({
      title: "E-books e estudos para condomínio — Publicações exclusivas | SíndicoLab",
      description:
        "E-books e estudos únicos e exclusivos para o mercado condominial. Conteúdos e publicações desenvolvidos especialmente para o setor condominial.",
      path: "/materiais",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "E-books e estudos para o mercado condominial",
        url: "https://sindicolab.com/materiais",
        inLanguage: "pt-BR",
      },
    }),
  component: MateriaisPage,
});

type MaterialType = "Modelo" | "Checklist" | "Guia" | "Planilha" | "E-book";
type Item = { tag: string; title: string; type: MaterialType; slug: string };

/** Mesmo padrão de slug usado na biblioteca gerida pelo painel. */
const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/** Lista base — permanece como garantia caso a biblioteca não responda. */
const fallbackSeeds: Array<Omit<Item, "slug">> = [
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

const fallbackItems: Item[] = fallbackSeeds.map((it) => ({ ...it, slug: slugify(it.title) }));

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
  const [items, setItems] = useState<Item[]>(fallbackItems);
  const [email, setEmail] = useState("");
  const [mailError, setMailError] = useState<string | null>(null);

  // A biblioteca é gerida no painel; a lista fixa segue como reserva.
  useEffect(() => {
    let cancelled = false;
    materialsService
      .list()
      .then((rows) => {
        if (cancelled || rows.length === 0) return;
        setItems(
          rows.map((m) => ({
            tag: m.category,
            title: m.title,
            type: (m.type as MaterialType) ?? "Guia",
            slug: m.slug,
          })),
        );
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleMaterialsNewsletter(e: React.FormEvent) {
    e.preventDefault();
    setMailError(null);
    const result = await captureNewsletterEmail(email);
    if (!result.ok) {
      setMailError("Digite um e-mail válido para continuar.");
      return;
    }
    window.open(result.redirectTo, "_blank", "noopener,noreferrer");
  }

  const filtered = useMemo(
    () =>
      items.filter(
        (i) =>
          (f === "Todos" || i.type === f) &&
          matchesSearch(q, i.title, i.tag, i.type),
      ),
    [q, f, items],
  );

  return (
    <main className="min-h-screen bg-background text-ink flex flex-col">
      <Header />
      <Breadcrumbs items={[{ label: "Materiais" }]} />

      {/* Hero utilitário com busca */}
      <section className="pt-6 md:pt-8 pb-12 border-b border-border bg-secondary/40">
        <div className="container-x">
          <div className="text-[10px] tracking-tight text-brand font-mono">
            Biblioteca · E-books e estudos exclusivos
          </div>
          <h1 className="mt-5 font-display text-4xl md:text-6xl tracking-[-0.04em] leading-[0.98] max-w-3xl text-balance">
            E-books e estudos únicos e exclusivos para o mercado condominial.
          </h1>
          <p className="mt-5 max-w-2xl text-ink-soft text-base md:text-lg leading-relaxed">
            Conteúdos e publicações desenvolvidos especialmente para o setor
            condominial — para apoiar decisões, aprofundar temas e acelerar a
            sua atuação.
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
                <Link
                  key={it.slug}
                  to="/materiais/$slug"
                  params={{ slug: it.slug }}
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
                      <Download className="w-3.5 h-3.5" /> Ver material
                    </div>
                  </div>
                </Link>
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
          <form onSubmit={handleMaterialsNewsletter} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="flex-1 px-4 py-3 rounded-full border border-white/20 bg-white/5 text-background placeholder:text-white/40 focus:outline-none focus:border-cyan"
            />
            <button className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-cyan text-ink font-medium hover:bg-background transition">
              Inscrever
            </button>
          </form>
          {mailError && (
            <p role="alert" className="text-xs text-red-300 md:col-start-2">
              {mailError}
            </p>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
