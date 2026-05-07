import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/play")({
  head: () => ({
    meta: [
      { title: "SíndicoLab Play — Cursos para síndicos e gestão condominial" },
      {
        name: "description",
        content:
          "Cursos para síndicos, conselheiros e profissionais do setor condominial. Formações práticas em gestão, finanças, jurídico e liderança.",
      },
      { property: "og:title", content: "SíndicoLab Play — Cursos para síndicos" },
      {
        property: "og:description",
        content: "Formações em gestão condominial para síndicos e profissionais.",
      },
    ],
  }),
  component: PlayPage,
});

const courses = [
  { level: "Fundamentos", title: "Síndico profissional do zero ao primeiro condomínio", duration: "8h" },
  { level: "Gestão", title: "Finanças e orçamento condominial na prática", duration: "6h" },
  { level: "Jurídico", title: "Direito condominial aplicado à rotina do síndico", duration: "10h" },
  { level: "Liderança", title: "Comunicação e conduta em assembleias", duration: "4h" },
];

function PlayPage() {
  return (
    <PageShell
      eyebrow="SíndicoLab Play"
      title={
        <>
          Cursos para síndicos e <span className="text-gradient-lab italic font-normal">gestão condominial</span>.
        </>
      }
      description="Formações práticas para síndicos, conselheiros e profissionais que querem evoluir tecnicamente e ampliar a atuação no mercado condominial."
      cta={{ label: "Acessar cursos para síndicos", href: "https://sindicolab.com/play/", external: true }}
    >
      <section className="py-20 md:py-28 border-t border-border" aria-labelledby="cursos-h">
        <div className="container-x">
          <h2 id="cursos-h" className="font-display text-2xl md:text-4xl text-ink mb-10 tracking-[-0.03em]">
            Trilhas de formação
          </h2>
          <div className="divide-y divide-border border border-border rounded-3xl overflow-hidden">
            {courses.map((c, i) => (
              <a
                key={c.title}
                href="https://sindicolab.com/play/"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-6 p-6 md:p-7 bg-card hover:bg-surface transition"
              >
                <div className="flex items-center gap-6 min-w-0">
                  <span className="font-mono text-xs text-ink-soft">0{i + 1}</span>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-brand">{c.level}</div>
                    <div className="mt-1 font-display text-lg md:text-xl text-ink truncate tracking-[-0.02em]">
                      {c.title}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-xs font-mono text-ink-soft">{c.duration}</span>
                  <span className="grid place-items-center w-10 h-10 rounded-full border border-border group-hover:bg-ink group-hover:text-background group-hover:border-ink transition">
                    →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
