import { Link } from "@tanstack/react-router";
import { memo, useState } from "react";
import { ArrowUpRight, Bookmark, BookmarkCheck, Clock, Info, Star } from "lucide-react";
import { CourseCoverPlaceholder } from "./CourseCoverPlaceholder";
import { CourseCheckoutDialog } from "./CourseCheckoutDialog";
import { Badge, Progress } from "./ui";
import { durationLabel, levelLabel, type AcademyCourse } from "./types";
import { trackCheckoutClick } from "@/services/analyticsService";

type Props = {
  course: AcademyCourse;
  categoryName?: string | null;
  percent?: number;
  rating?: { avg: number; count: number };
  inMyList?: boolean;
  onToggleList?: (id: string) => void;
  /** "rail" = largura fixa em carrossel, "grid" = ocupa a coluna. */
  variant?: "rail" | "grid";
};

/**
 * CourseCard 2.0 — card ÚNICO de curso da plataforma.
 * A capa real manda; o resto é metadado denso e legível. Não existe
 * (nem pode existir) variante por organização.
 *
 * Exceção de modelo comercial (não de marca): curso com checkout externo
 * abre a ficha rápida em popup, porque a compra acontece fora da Academy.
 */
export const CourseCard = memo(function CourseCard({
  course,
  categoryName,
  percent = 0,
  rating,
  inMyList = false,
  onToggleList,
}: Props) {
  const duration = durationLabel(course.duration_minutes);
  const level = levelLabel(course.level);
  const started = percent > 0;
  const done = percent >= 100;
  const isCheckout = !!course.external_checkout_url;
  const [open, setOpen] = useState(false);

  const media = (
    <div className="ax-card-media">
      {course.cover_url ? (
        <img src={course.cover_url} alt="" aria-hidden loading="lazy" decoding="async" />
      ) : (
        <CourseCoverPlaceholder
          title={course.title}
          category={categoryName}
          showTitle={false}
          className="absolute inset-0 h-full w-full"
        />
      )}

      <div className="absolute left-2 top-2 flex flex-wrap gap-1.5">
        {course.is_required && <Badge tone="accent">Obrigatório</Badge>}
        {done ? <Badge tone="done">Concluído</Badge> : started ? <Badge tone="progress">Em andamento</Badge> : null}
      </div>

      {started && !done && (
        <div className="ax-card-overlay">
          <Progress percent={percent} />
        </div>
      )}
    </div>
  );

  return (
    <article className="ax-card group/card">
      {isCheckout ? media : (
        <Link
          to="/academy/curso/$courseSlug"
          params={{ courseSlug: course.slug }}
          className="block focus-visible:outline-none"
          aria-label={course.title}
        >
          {media}
        </Link>
      )}

      {onToggleList && (
        <button
          type="button"
          onClick={() => onToggleList(course.id)}
          data-active={inMyList ? "true" : "false"}
          className="ax-iconbtn ax-card-save"
          data-size="sm"
          aria-label={inMyList ? "Remover da minha lista" : "Salvar na minha lista"}
          title={inMyList ? "Remover da minha lista" : "Salvar na minha lista"}
        >
          {inMyList ? <BookmarkCheck size={15} /> : <Bookmark size={15} />}
        </button>
      )}

      <div className="ax-card-body">
        {categoryName && <p className="ax-eyebrow truncate">{categoryName}</p>}
        <h3 className="ax-card-title">
          {isCheckout ? course.title : (
            <Link to="/academy/curso/$courseSlug" params={{ courseSlug: course.slug }}>
              {course.title}
            </Link>
          )}
        </h3>
        <div className="ax-meta flex flex-wrap items-center gap-x-2.5 gap-y-1">
          {duration && (
            <span className="inline-flex items-center gap-1">
              <Clock size={12} className="shrink-0" />
              {duration}
            </span>
          )}
          {level && <span>{level}</span>}
          {rating && rating.count > 0 && (
            <span className="inline-flex items-center gap-1">
              <Star size={12} className="shrink-0" style={{ color: "var(--tenant-accent)" }} />
              {rating.avg.toFixed(1)}
            </span>
          )}
          {started && !done && <span style={{ color: "var(--tenant-accent)" }}>{percent}%</span>}
        </div>

        {isCheckout && (
          <div className="ax-card-commerce">
            <div>
              <span className="ax-meta">Investimento</span>
              <p className="ax-card-price">
                {course.price_brl ? `R$ ${course.price_brl.toLocaleString("pt-BR")}` : "Consulte o valor"}
              </p>
            </div>
            <div className="ax-card-actions">
              <a
                href={course.external_checkout_url ?? undefined}
                target="_blank"
                rel="noopener"
                onClick={() => trackCheckoutClick(course, "catalog_card")}
                className="ax-btn flex-1"
                data-variant="primary"
                data-size="sm"
              >
                Comprar <ArrowUpRight size={14} />
              </a>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="ax-btn flex-1"
                data-variant="outline"
                data-size="sm"
              >
                <Info size={14} /> Detalhes
              </button>
            </div>
          </div>
        )}
      </div>

      {open && (
        <CourseCheckoutDialog course={course} categoryName={categoryName} onClose={() => setOpen(false)} />
      )}
    </article>
  );
});
