import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ArrowUpRight, ChevronRight, Clock, TrendingUp } from "lucide-react";
import { articles, getArticle, type ArticleBlock } from "@/data/articles";

export const Route = createFileRoute("/portal/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.article;
    if (!a) {
      return {
        meta: [{ title: "Artigo não encontrado — Portal SíndicoLab" }],
      };
    }
    return {
      meta: [
        { title: `${a.title} — Portal SíndicoLab` },
        { name: "description", content: a.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:title", content: a.title },
        { property: "og:description", content: a.excerpt },
        { property: "og:image", content: a.image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: a.image },
      ],
      links: [{ rel: "canonical", href: `https://sindicolab.com/portal/${a.slug}` }],
    };
  },
  notFoundComponent: () => (
    <main className="min-h-screen grid place-items-center bg-background text-ink">
      <div className="text-center">
        <h1 className="font-display text-4xl">Artigo não encontrado</h1>
        <Link to="/portal" className="mt-4 inline-block text-brand underline">
          Voltar ao Portal
        </Link>
      </div>
    </main>
  ),
  errorComponent: ({ error }) => (
    <main className="min-h-screen grid place-items-center bg-background text-ink">
      <p>{error.message}</p>
    </main>
  ),
  component: ArticlePage,
});

function ArticlePage() {
  const { article: a } = Route.useLoaderData() as { article: (typeof articles)[number] };

  const related = (a.relatedSlugs ?? [])
    .map((s: string) => articles.find((x) => x.slug === s))
    .filter((x): x is (typeof articles)[number] => Boolean(x));

  const maisLidas = articles.filter((x) => x.slug !== a.slug).slice(0, 5);

  return (
    <main className="min-h-screen bg-background text-ink flex flex-col overflow-x-hidden">
      <Header />
      <Breadcrumbs items={[{ label: "Portal", to: "/portal" }, { label: a.category }, { label: a.title }]} />

      <article className="container-x py-6 md:py-10">

        <div className="mt-6 grid lg:grid-cols-[2.2fr_1fr] gap-10">
          <div>
            <span className="text-xs text-brand font-medium uppercase tracking-wide">{a.category}</span>
            <h1 className="mt-2 font-display text-4xl md:text-6xl tracking-[-0.035em] leading-[1.0] text-balance">
              {a.title}
            </h1>
            <p className="mt-4 text-lg md:text-xl text-ink-soft leading-relaxed max-w-2xl">
              {a.excerpt}
            </p>
            <div className="mt-5 text-sm text-ink-soft flex flex-wrap items-center gap-x-4 gap-y-1.5">
              <span>Por <strong className="text-ink">{a.author}</strong></span>
              <span>· {a.publishedAt}</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> {a.readTime} de leitura
              </span>
            </div>

            <figure className="mt-8 rounded-xl overflow-hidden">
              <img
                src={a.image}
                alt={a.imageAlt}
                className="w-full h-auto aspect-[16/9] object-cover"
                loading="eager"
              />
            </figure>

            {/* Corpo */}
            <div className="mt-8 max-w-2xl space-y-5">
              {a.content.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </div>

            {/* CTA Play */}
            <div className="mt-12 rounded-xl border border-border bg-secondary/40 p-6 max-w-2xl">
              <div className="text-xs text-brand font-medium">SíndicoLab Play</div>
              <h3 className="mt-1 font-display text-2xl tracking-[-0.02em] text-balance">
                Aprofunde-se com cursos para síndicos profissionais
              </h3>
              <Link
                to="/play"
                className="mt-4 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-md bg-ink text-background hover:bg-brand transition text-sm font-medium"
              >
                Ver cursos do Play <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Leia também */}
            {related.length > 0 && (
              <div className="mt-12 max-w-2xl">
                <h2 className="font-display text-2xl tracking-[-0.02em] mb-4">Leia também</h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      to="/portal/$slug"
                      params={{ slug: r.slug }}
                      className="group block"
                    >
                      <div className="aspect-[16/10] rounded-lg overflow-hidden">
                        <img src={r.image} alt={r.imageAlt} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition" />
                      </div>
                      <div className="mt-3 text-[11px] text-brand">{r.category}</div>
                      <div className="mt-1 font-display text-base leading-snug group-hover:text-brand transition text-balance">
                        {r.title}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="text-xs text-brand inline-flex items-center gap-2 mb-4">
                <TrendingUp className="w-3.5 h-3.5" /> Mais lidas
              </div>
              <ol className="space-y-3.5">
                {maisLidas.map((m, i) => (
                  <li key={m.slug}>
                    <Link
                      to="/portal/$slug"
                      params={{ slug: m.slug }}
                      className="flex gap-3 group"
                    >
                      <span className="font-display text-2xl text-ink-soft/40 group-hover:text-brand transition w-8 shrink-0 leading-none">
                        0{i + 1}
                      </span>
                      <span className="text-sm leading-snug group-hover:text-brand transition">
                        {m.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>

            <Link
              to="/patrocinios"
              className="block rounded-xl border border-dashed border-border p-5 hover:border-ink transition"
            >
              <div className="text-[11px] text-ink-soft">Espaço para patrocinador</div>
              <div className="mt-2 font-display text-lg tracking-[-0.02em]">Sua marca aqui</div>
              <p className="mt-1.5 text-sm text-ink-soft">
                Mídia condominial segmentada para marcas e administradoras.
              </p>
            </Link>
          </aside>
        </div>
      </article>

      <Footer />
    </main>
  );
}

function Block({ block }: { block: ArticleBlock }) {
  if (block.type === "h2") {
    return (
      <h2 className="font-display text-2xl md:text-3xl tracking-[-0.02em] leading-tight pt-3">
        {block.text}
      </h2>
    );
  }
  if (block.type === "ul") {
    return (
      <ul className="space-y-2 list-disc pl-5 text-base text-ink leading-relaxed marker:text-brand">
        {block.items.map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ul>
    );
  }
  return <p className="text-base md:text-lg text-ink leading-relaxed">{block.text}</p>;
}
