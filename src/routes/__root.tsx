import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl text-ink">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-ink">Página não encontrada</h2>
        <p className="mt-2 text-sm text-ink-soft">
          O endereço que você buscou não existe no SíndicoLab.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-brand"
          >
            Voltar para a home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-ink">Esta página não carregou</h1>
        <p className="mt-2 text-sm text-ink-soft">Algo deu errado. Tente novamente.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-full bg-ink px-4 py-2 text-sm text-background hover:bg-brand"
          >
            Tentar novamente
          </button>
          <a href="/" className="rounded-full border border-border px-4 py-2 text-sm">Home</a>
        </div>
      </div>
    </div>
  );
}

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SíndicoLab",
  url: "https://sindicolab.com/",
  logo: "https://sindicolab.com/logo.png",
  sameAs: ["https://quero1sindico.com/", "https://downloads.sindicolab.com/"],
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "SíndicoLab",
  url: "https://sindicolab.com/",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://sindicolab.com/?s={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0b1020" },
      { title: "SíndicoLab — Síndico profissional, cursos e materiais para condomínio" },
      {
        name: "description",
        content:
          "O SíndicoLab é o ecossistema de síndico profissional, cursos para síndicos, materiais para condomínio e conteúdo de gestão condominial.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "SíndicoLab" },
      { property: "og:title", content: "SíndicoLab — Ecossistema condominial" },
      {
        property: "og:description",
        content:
          "Síndico profissional, cursos, materiais e conteúdo condominial em um só lugar.",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: "https://sindicolab.com/" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(orgJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(siteJsonLd) },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
