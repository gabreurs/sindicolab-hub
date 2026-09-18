import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Download, FileText } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { materialsService, type Material } from "@/services/materialsService";

export const Route = createFileRoute("/materiais_/$slug")({
  component: MaterialPage,
});

function MaterialPage() {
  const { slug } = Route.useParams();
  const [material, setMaterial] = useState<Material | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    materialsService
      .getBySlug(slug)
      .then((row) => {
        if (!cancelled) setMaterial(row ?? null);
      })
      .catch(() => undefined)
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return (
    <main className="flex min-h-screen flex-col bg-background text-ink">
      <Header />
      <Breadcrumbs items={[{ label: "Materiais", to: "/materiais" }, { label: material?.title ?? "Material" }]} />

      <section className="border-b border-border bg-secondary/40 pb-14 pt-6 md:pt-8">
        <div className="container-x">
          {loading ? (
            <div className="h-40 max-w-3xl animate-pulse rounded-2xl bg-border/50" />
          ) : material ? (
            <>
              <div className="font-mono text-[10px] tracking-tight text-brand">
                {material.type} · {material.category}
              </div>
              <h1 className="mt-5 max-w-3xl text-balance font-display text-3xl leading-[1.02] tracking-[-0.04em] md:text-5xl">
                {material.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
                {material.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                {material.file_url ? (
                  <a
                    href={material.file_url}
                    // Arquivo enviado pelo console vem embutido: baixa direto,
                    // com o nome original. Links externos seguem abrindo em aba.
                    {...(material.file_url.startsWith("data:")
                      ? { download: (material as any).file_name || material.slug }
                      : { target: "_blank", rel: "noopener noreferrer" })}
                    className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-background transition hover:bg-brand"
                  >
                    <Download className="h-4 w-4" />
                    {material.cta_label || "Baixar material"}
                  </a>
                ) : (
                  <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm text-ink-soft">
                    <FileText className="h-4 w-4" />
                    Arquivo em preparação — publicamos aqui assim que estiver pronto.
                  </div>
                )}
                <Link
                  to="/materiais"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm text-ink-soft transition hover:border-ink hover:text-ink"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Ver todos os materiais
                </Link>
              </div>
            </>
          ) : (
            <>
              <h1 className="font-display text-3xl tracking-[-0.03em] md:text-4xl">Material não encontrado</h1>
              <p className="mt-3 text-ink-soft">
                Esse material pode ter saído do ar ou o endereço está incorreto.
              </p>
              <Link
                to="/materiais"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-background transition hover:bg-brand"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar para os materiais
              </Link>
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
