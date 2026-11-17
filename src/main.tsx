import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { routeTree } from "./routeTree.gen";
import "./styles.css";

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  context: { queryClient },
  scrollRestoration: true,
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
});

// Navegação nova (clique em link) sempre começa no topo da página.
let backForward = false;
window.addEventListener("popstate", () => { backForward = true; });
router.subscribe("onResolved", (e) => {
  const wasBack = backForward;
  backForward = false;
  if (e.pathChanged && !wasBack && !window.location.hash) {
    requestAnimationFrame(() => window.scrollTo(0, 0));
  }
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootEl = document.getElementById("root");
if (rootEl) {
  createRoot(rootEl).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>,
  );
}
