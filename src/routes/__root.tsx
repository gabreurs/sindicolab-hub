import { useEffect } from "react";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";
import { TransitionProvider } from "@/providers/TransitionProvider";
import { clearNativeScrollLock } from "@/lib/scroll-lock";
import { WhatsAppDock } from "@/components/site/WhatsAppDock";

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

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const matches = useRouterState({ select: (s) => s.matches });
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    clearNativeScrollLock();
  }, [pathname]);

  // Aplica head() de cada match (title, meta, link, ld+json) no <head> real.
  // Em SPA não há SSR, então fazemos isso no cliente para que o navegador
  // mostre o título correto e crawlers que executam JS leiam OG/JSON-LD.
  useEffect(() => {
    const collected: Array<{ type: string; el: HTMLElement }> = [];
    let title: string | undefined;

    for (const m of matches) {
      const head = (m as unknown as { meta?: { meta?: Array<Record<string, string>>; links?: Array<Record<string, string>>; scripts?: Array<{ type?: string; children?: string }> } }).meta;
      if (!head) continue;

      head.meta?.forEach((tag) => {
        if ("title" in tag && tag.title) { title = tag.title; return; }
        const el = document.createElement("meta");
        Object.entries(tag).forEach(([k, v]) => el.setAttribute(k, v));
        collected.push({ type: "meta", el });
      });
      head.links?.forEach((link) => {
        const el = document.createElement("link");
        Object.entries(link).forEach(([k, v]) => el.setAttribute(k, v));
        collected.push({ type: "link", el });
      });
      head.scripts?.forEach((s) => {
        const el = document.createElement("script");
        if (s.type) el.setAttribute("type", s.type);
        if (s.children) el.textContent = s.children;
        collected.push({ type: "script", el });
      });
    }

    // Remove tags injetadas anteriormente
    document.head.querySelectorAll("[data-rh]").forEach((n) => n.remove());

    if (title) document.title = title;
    collected.forEach(({ el }) => {
      el.setAttribute("data-rh", "");
      document.head.appendChild(el);
    });
  }, [matches]);

  // O dock de contato pertence ao site público; consoles e player ficam livres.
  const showDock = !/^\/(admin|empresa|academy)(\/|$)/.test(pathname);

  return (
    <TransitionProvider>
      <Outlet />
      {showDock && <WhatsAppDock />}
    </TransitionProvider>
  );
}
