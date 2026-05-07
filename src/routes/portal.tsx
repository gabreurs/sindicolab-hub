import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/portal")({
  head: () => ({
    meta: [
      { title: "Portal SíndicoLab — Conteúdo de gestão condominial" },
      {
        name: "description",
        content:
          "Conteúdos, artigos e análises sobre gestão condominial, síndico profissional, assembleias e o mercado condominial brasileiro.",
      },
      { property: "og:title", content: "Portal SíndicoLab" },
      {
        property: "og:description",
        content: "Conteúdo de gestão condominial e mercado para síndicos e conselheiros.",
      },
    ],
  }),
  component: PortalPage,
});

const tracks = [
  { tag: "Gestão", title: "Boas práticas de administração de condomínio" },
  { tag: "Assembleia", title: "Como conduzir uma assembleia condominial eficiente" },
  { tag: "Mercado", title: "Tendências do mercado condominial brasileiro" },
  { tag: "Síndico profissional", title: "O que esperar de um síndico profissional" },
  { tag: "Jurídico", title: "Decisões e responsabilidades do síndico" },
  { tag: "Finanças", title: "Orçamento condominial sem surpresas" },
];

function PortalPage() {
  return (
    <PageShell
      eyebrow="Portal SíndicoLab"
      title={
        <>
          Conteúdo de gestão condominial,
          <br />
          mercado e <span className="text-gradient-lab italic font-normal">síndico profissional</span>.
        </>
      }
      description="Artigos, análises e referências para síndicos, conselheiros e profissionais que querem entender, decidir e evoluir no mercado condominial."
      cta={{ label: "Ler conteúdo condominial", href: "https://sindicolab.com/", external: true }}
    >
      <section className="py-20 md:py-28 border-t border-border" aria-labelledby="trilhas-h">
        <div className="container-x">
          <div className="flex items-end justify-between mb-10">
            <h2 id="trilhas-h" className="font-display text-2xl md:text-4xl text-ink tracking-[-0.03em]">
              Trilhas de conteúdo
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {tracks.map((t) => (
              <article
                key={t.title}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 hover:shadow-card transition-shadow"
              >
                <div className="text-[10px] uppercase tracking-[0.3em] text-brand">{t.tag}</div>
                <h3 className="mt-4 font-display text-xl text-ink tracking-[-0.02em] text-balance">
                  {t.title}
                </h3>
                <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft group-hover:text-ink transition">
                  Em breve
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
