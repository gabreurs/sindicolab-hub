import { useEffect } from "react";
import { X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { CourseCoverPlaceholder } from "./CourseCoverPlaceholder";
import { Eyebrow } from "./ui";
import type { AcademyCourse } from "./types";
import { trackCheckoutClick } from "@/services/analyticsService";

type Props = {
  course: AcademyCourse;
  categoryName?: string | null;
  onClose: () => void;
};

const brl = (v: number) => `R$ ${v.toLocaleString("pt-BR")}`;

/**
 * Ficha rápida do curso vendido em checkout externo (SíndicoLab, B2C).
 * Esclarece o curso antes de mandar o visitante — logado ou não — para a
 * Kiwify, sem inventar etapas de matrícula que não existem nesse modelo.
 */
export function CourseCheckoutDialog({ course, categoryName, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={course.title}
    >
      <button
        type="button"
        aria-label="Fechar"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
        style={{ background: "rgba(8,8,12,0.72)", backdropFilter: "blur(6px)" }}
      />
      <div
        className="ax-panel-raised relative w-full max-w-[560px] overflow-hidden"
        style={{ maxHeight: "92vh", overflowY: "auto" }}
      >
        <div className="relative aspect-video w-full overflow-hidden">
          {course.cover_url ? (
            <img
              src={course.cover_url}
              alt=""
              aria-hidden
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <CourseCoverPlaceholder
              title={course.title}
              category={categoryName}
              showTitle={false}
              className="absolute inset-0 h-full w-full"
            />
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="ax-iconbtn absolute right-2 top-2"
            data-size="sm"
          >
            <X size={15} />
          </button>
        </div>

        <div className="p-6">
          {categoryName && <Eyebrow>{categoryName}</Eyebrow>}
          <h2 className="ax-h3 mt-2">{course.title}</h2>
          {course.description && <p className="ax-body mt-3 text-[14px]">{course.description}</p>}
          {course.access_label && <p className="ax-meta mt-3">{course.access_label}</p>}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {course.external_checkout_url && (
              <a
                href={course.external_checkout_url}
                target="_blank"
                rel="noopener"
                onClick={() => trackCheckoutClick(course, "course_dialog")}
                className="ax-btn"
                data-variant="primary"
                data-size="lg"
              >
                {course.price_brl ? `Comprar · ${brl(course.price_brl)}` : "Comprar acesso"}
              </a>
            )}
            <Link
              to="/academy/curso/$courseSlug"
              params={{ courseSlug: course.slug }}
              className="ax-btn"
              data-variant="outline"
              data-size="lg"
              onClick={onClose}
            >
              Ver mais detalhes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
