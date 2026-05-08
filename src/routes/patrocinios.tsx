import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import {
  SlideHero,
  SlideContext,
  SlideInitiative,
  SlideAudience,
  SlideFormats,
  SlideTechnical,
  SlideExperiences,
  SlideValue,
  SlideActivations,
  SlideContact,
} from "@/components/midiakit/Slides";
import { Download } from "lucide-react";
import { CONTACTS, mediaKitUrl, waLink } from "@/lib/midia-kit";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/patrocinios")({
  head: () =>
    buildSeo({
      title: "Patrocínios — Mídia Kit CondoHuby × SíndicoLab",
      description:
        "Mídia kit oficial CondoHuby × SíndicoLab. Patrocine workshops, cursos e experiências presenciais que conectam marcas aos decisores do mercado condominial brasileiro.",
      path: "/patrocinios",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Patrocínio e mídia condominial",
        provider: { "@type": "Organization", name: "SíndicoLab" },
        areaServed: "BR",
        url: "https://sindicolab.com/patrocinios",
      },
    }),
  component: PatrociniosPage,
});

function PatrociniosPage() {
  return (
    <div className="midia-kit-page min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 overflow-x-hidden">
        {/* Ações fixas — mídia kit + falar com a equipe (desktop) */}
        <div className="fixed right-6 top-20 z-40 hidden items-center gap-2 md:flex mk-fixed-actions">
          <a
            href={mediaKitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mk-floating-cta inline-flex items-center gap-2 rounded-full border border-[hsl(var(--mk-fg))]/15 bg-[hsl(var(--mk-bg))]/92 px-4 py-2.5 text-xs font-medium text-[hsl(var(--mk-fg))] transition-all hover:border-[hsl(var(--mk-fg))]/40"
          >
            <Download className="h-3.5 w-3.5" /> Baixar Mídia Kit
          </a>
          <a
            href={waLink(CONTACTS[0].whatsapp)}
            target="_blank"
            rel="noreferrer"
            className="mk-floating-cta inline-flex items-center gap-2 rounded-full border border-[hsl(var(--mk-fg))]/15 bg-[hsl(var(--mk-bg))]/92 px-4 py-2.5 text-xs font-medium text-[hsl(var(--mk-fg))] transition-all hover:border-[hsl(var(--mk-fg))]/40"
          >
            Falar com a equipe
          </a>
        </div>

        <Breadcrumbs tone="mediakit" items={[{ label: "Patrocínios" }]} />

        <SlideHero />
        <SlideContext />
        <SlideInitiative />
        <SlideAudience />
        <SlideFormats />
        <SlideTechnical />
        <SlideExperiences />
        <SlideValue />
        <SlideActivations />
        <SlideContact />

        {/* Action bar mobile */}
        <div
          className="fixed inset-x-0 bottom-0 z-40 md:hidden"
          style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
        >
          <div className="mx-3 mb-3 flex items-center gap-2 rounded-full border border-[hsl(var(--mk-fg))]/10 bg-[hsl(var(--mk-bg))]/95 p-1.5 shadow-[0_6px_18px_-14px_hsl(var(--mk-fg)/0.18)]">
            <a
              href={waLink(CONTACTS[0].whatsapp)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[hsl(var(--mk-fg))] px-4 py-2.5 text-[12px] font-medium text-[hsl(var(--mk-bg))]"
            >
              Falar
            </a>
            <a
              href={mediaKitUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[hsl(var(--mk-fg))]/15 px-4 py-2.5 text-[12px] font-medium text-[hsl(var(--mk-fg))]"
            >
              <Download className="h-3.5 w-3.5" /> Mídia Kit
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
