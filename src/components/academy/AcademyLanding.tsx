import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, PlayCircle } from "lucide-react";
import { useAcademyExperience } from "@/lib/tenant/TenantProvider";
import { Eyebrow } from "./ui";
import { durationLabel, levelLabel, type AcademyCourse } from "./types";
import heroBackdrop from "@/assets/v2/hero-condominio.webp";

/**
 * ENTRADA DA ACADEMY (visitante deslogado).
 *
 * Hero ampla e cinematográfica — imagem, gradiente e um destaque real do
 * acervo. Todo dado exibido vem do catálogo da Academy: nenhum curso, preço ou
 * categoria do antigo site institucional aparece aqui. Cursos sem capa entram
 * no destaque com o fundo institucional; nunca emprestamos a capa de outro
 * curso.
 */
export function AcademyLanding({
  courseCount,
  courses = [],
}: {
  courseCount: number;
  courses?: AcademyCourse[];
}) {
  const exp = useAcademyExperience();

  // Destaques: preferimos cursos marcados como destaque que já tenham capa,
  // depois os demais destaques, depois o acervo com capa.
  const highlights = useMemo(() => {
    const seen = new Set<string>();
    const pick = (list: AcademyCourse[]) =>
      list.filter((c) => (seen.has(c.id) ? false : (seen.add(c.id), true)));
    return [
      ...pick(courses.filter((c) => c.is_featured && c.cover_url)),
      ...pick(courses.filter((c) => c.cover_url)),
      ...pick(courses.filter((c) => c.is_featured)),
      ...pick(courses),
    ].slice(0, 4);
  }, [courses]);

  const [i, setI] = useState(0);
  const hero = highlights[Math.min(i, Math.max(highlights.length - 1, 0))];

  return (
    <>
      <section className="ax-hero" data-tone="brand">
        <div className="ax-hero-media" aria-hidden>
          <img src={hero?.cover_url || heroBackdrop} alt="" loading="eager" />
        </div>
        <span className="ax-hero-scrim" aria-hidden />

        <div className="ax-container relative w-full">
          <div className="ax-hero-copy">
            <Eyebrow>{exp.copy.eyebrow}</Eyebrow>
            <h1 className="ax-display mt-3">{exp.copy.title}</h1>
            <p className="ax-body mt-4 max-w-[52ch] text-[16px]">{exp.copy.lead}</p>
            <div className="mt-8 flex flex-wrap items-center gap-2.5">
              <Link
                to="/academy/login"
                search={{ next: "/academy/inicio" }}
                className="ax-btn"
                data-variant="primary"
                data-size="lg"
              >
                {exp.copy.primaryCta} <ArrowRight size={16} />
              </Link>
              <Link to="/academy/catalogo" className="ax-btn" data-variant="outline" data-size="lg">
                Conhecer os conteúdos
              </Link>
            </div>
            <p className="ax-meta mt-6">
              {courseCount > 0
                ? `${courseCount} ${courseCount === 1 ? "curso disponível" : "cursos disponíveis"} no programa`
                : "Programa em publicação"}
            </p>
          </div>

          {/* Destaque real do acervo — título, nível e duração vindos do catálogo. */}
          {hero && (
            <div className="mt-9 max-w-[560px]">
              <div
                className="rounded-[14px] p-4 backdrop-blur-[2px]"
                style={{ background: "var(--ax-veil-strong, rgba(10,10,12,.42))" }}
              >
                <p className="ax-meta">Em destaque na Academy</p>
                <p className="mt-1 text-[17px] font-medium leading-snug" style={{ color: "#fff" }}>
                  {hero.title}
                </p>
                <p className="ax-meta mt-1">
                  {[levelLabel(hero.level), durationLabel(hero.duration_minutes)].filter(Boolean).join(" · ") ||
                    "Curso interativo"}
                </p>
                <Link
                  to="/academy/curso/$courseSlug"
                  params={{ courseSlug: hero.slug }}
                  className="ax-btn mt-3"
                  data-variant="secondary"
                >
                  <PlayCircle size={16} /> Ver o curso
                </Link>
              </div>

              {highlights.length > 1 && (
                <div className="mt-3 flex items-center gap-1.5" role="tablist" aria-label="Destaques">
                  {highlights.map((h, idx) => (
                    <button
                      key={h.id}
                      role="tab"
                      aria-selected={idx === i}
                      aria-label={h.title}
                      onClick={() => setI(idx)}
                      className="h-1.5 rounded-full transition-all"
                      style={{
                        width: idx === i ? 26 : 12,
                        background: idx === i ? "var(--tenant-accent)" : "rgba(255,255,255,.4)",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* COMO ACESSAR — existe apenas para quem ainda está fora da Academy. */}
      <section className="ax-section pt-0">
        <div className="ax-container">
          <span className="ax-accent-bar" aria-hidden />
          <h2 className="ax-h2 mt-4">Como acessar</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {exp.copy.accessSteps.map((s, i2) => (
              <div key={s.title} className="ax-step">
                <span className="ax-step-num">{i2 + 1}</span>
                <div>
                  <p className="ax-card-title">{s.title}</p>
                  <p className="ax-body mt-1 text-[14px]">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
