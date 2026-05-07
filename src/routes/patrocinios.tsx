import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { Sparkles, Users, Calendar, Mic } from "lucide-react";

export const Route = createFileRoute("/patrocinios")({
  head: () => ({
    meta: [
      { title: "Patrocínios — Mídia kit CondoHuby + SíndicoLab" },
      {
        name: "description",
        content:
          "Patrocine experiências, workshops e conteúdo para síndicos, conselheiros e profissionais do mercado condominial brasileiro.",
      },
      { property: "og:title", content: "Patrocínios SíndicoLab + CondoHuby" },
      {
        property: "og:description",
        content: "Conecte sua marca a decisores do mercado condominial.",
      },
    ],
  }),
  component: PatrociniosPage,
});

const formats = [
  { icon: Calendar, tag: "Workshops", title: "Encontros presenciais com síndicos profissionais" },
  { icon: Users, tag: "Comunidade", title: "Acesso a uma rede ativa de decisores condominiais" },
  { icon: Mic, tag: "Conteúdo", title: "Coproduções editoriais e episódios temáticos" },
  { icon: Sparkles, tag: "Ativações", title: "Experiências de marca curadas pelo CondoHuby" },
];

function PatrociniosPage() {
  return (
    <PageShell
      eyebrow="Mídia kit · CondoHuby + SíndicoLab"
      title={
        <>
          Patrocine experiências com{" "}
          <span className="text-gradient-lab italic font-normal">decisores do mercado condominial</span>.
        </>
      }
      description="Aproxime sua marca de síndicos, conselheiros e gestores condominiais por meio de workshops, conteúdos e ativações com curadoria."
      cta={{ label: "Falar com a equipe comercial", href: "mailto:contato@sindicolab.com", external: true }}
    >
      <section className="py-20 md:py-28 border-t border-border" aria-labelledby="formatos-h">
        <div className="container-x">
          <h2 id="formatos-h" className="font-display text-2xl md:text-4xl text-ink mb-10 tracking-[-0.03em]">
            Formatos de patrocínio
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {formats.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.tag} className="rounded-2xl border border-border bg-card p-6 min-h-[200px] flex flex-col justify-between">
                  <Icon className="w-5 h-5 text-brand" />
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.3em] text-brand">{f.tag}</div>
                    <h3 className="mt-2 font-display text-lg text-ink tracking-[-0.02em] text-balance">
                      {f.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
