import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/quem-somos")({
  head: () => ({
    meta: [
      { title: "Quem é o SíndicoLab — Ecossistema condominial brasileiro" },
      {
        name: "description",
        content:
          "Conheça o SíndicoLab: workshops, comunidade, curadoria editorial e relacionamento no mercado condominial brasileiro.",
      },
      { property: "og:title", content: "Quem é o SíndicoLab" },
      {
        property: "og:description",
        content: "História, propósito e comunidade do SíndicoLab.",
      },
    ],
  }),
  component: QuemSomosPage,
});

function QuemSomosPage() {
  return (
    <PageShell
      eyebrow="Quem é o SíndicoLab"
      title={
        <>
          Um ecossistema vivo no{" "}
          <span className="text-gradient-lab italic font-normal">mercado condominial brasileiro</span>.
        </>
      }
      description="O SíndicoLab existe no mundo real: workshops, encontros, comunidade, curadoria editorial e relacionamento com síndicos profissionais, conselheiros e marcas."
    >
      <section className="py-20 md:py-28 border-t border-border">
        <div className="container-x grid md:grid-cols-3 gap-6">
          {[
            ["12+", "Workshops por ano com síndicos e parceiros"],
            ["+100", "Síndicos por encontro presencial"],
            ["150+", "Episódios e conteúdos publicados"],
          ].map(([n, l]) => (
            <div key={l} className="rounded-2xl border border-border bg-card p-6 min-h-[180px] flex flex-col justify-between">
              <div className="text-[10px] uppercase tracking-[0.3em] text-brand">SíndicoLab</div>
              <div>
                <div className="font-display text-3xl text-ink">{n}</div>
                <div className="text-sm text-ink-soft mt-1 leading-snug">{l}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
