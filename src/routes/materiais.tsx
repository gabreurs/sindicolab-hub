import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { Download } from "lucide-react";

export const Route = createFileRoute("/materiais")({
  head: () => ({
    meta: [
      { title: "Materiais para condomínio — Modelos, atas e checklists | SíndicoLab" },
      {
        name: "description",
        content:
          "Baixe materiais para condomínio: modelos de ata, regimentos, comunicados, checklists e guias práticos para a rotina do síndico.",
      },
      { property: "og:title", content: "Materiais e Downloads SíndicoLab" },
      {
        property: "og:description",
        content: "Modelos prontos e materiais práticos para condomínios.",
      },
    ],
  }),
  component: MateriaisPage,
});

const items = [
  { tag: "Modelo", title: "Modelo de ata de assembleia condominial" },
  { tag: "Modelo", title: "Modelo de convocação de assembleia" },
  { tag: "Checklist", title: "Checklist de transição de síndico" },
  { tag: "Guia", title: "Guia prático de prestação de contas" },
  { tag: "Modelo", title: "Modelo de regimento interno" },
  { tag: "Checklist", title: "Checklist de manutenção predial" },
];

function MateriaisPage() {
  return (
    <PageShell
      eyebrow="Materiais e Downloads"
      title={
        <>
          Materiais para <span className="text-gradient-lab italic font-normal">condomínio</span>, prontos para usar.
        </>
      }
      description="Modelos de ata, regimentos, comunicados, checklists e guias práticos para apoiar a rotina do síndico, do conselho e da administração condominial."
      cta={{
        label: "Baixar materiais para condomínio",
        href: "https://downloads.sindicolab.com/",
        external: true,
      }}
    >
      <section className="py-20 md:py-28 border-t border-border" aria-labelledby="downloads-h">
        <div className="container-x">
          <h2 id="downloads-h" className="font-display text-2xl md:text-4xl text-ink mb-10 tracking-[-0.03em]">
            Downloads em destaque
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {items.map((it) => (
              <a
                key={it.title}
                href="https://downloads.sindicolab.com/"
                target="_blank"
                rel="noreferrer"
                className="group rounded-2xl border border-border bg-card p-6 hover:shadow-card hover:-translate-y-1 transition-all flex flex-col"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-brand">{it.tag}</span>
                  <span className="grid place-items-center w-9 h-9 rounded-full bg-secondary group-hover:gradient-lab group-hover:text-background transition-colors">
                    <Download className="w-4 h-4" />
                  </span>
                </div>
                <h3 className="mt-6 font-display text-lg text-ink tracking-[-0.02em] text-balance">
                  {it.title}
                </h3>
                <span className="mt-6 text-xs font-mono text-ink-soft">PDF · Acesso livre</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
