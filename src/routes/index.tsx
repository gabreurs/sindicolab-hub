import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { HeaderV2 } from "@/components/site/v2/HeaderV2";
import { HeroV2 } from "@/components/site/v2/HeroV2";
import { SearchToday } from "@/components/site/v2/SearchToday";
import { KnowledgeBanner } from "@/components/site/v2/KnowledgeBanner";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () =>
    buildSeo({
      title:
        "O universo do condomínio em um só lugar | SíndicoLab",
      description:
        "Conhecimento, conexões e ferramentas para quem vive a gestão condominial: blog, newsletter, downloads, agenda de eventos, cursos e síndicos profissionais.",
      path: "/",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "SíndicoLab",
          url: "https://sindicolab.com",
          logo: "https://sindicolab.com/logo.png",
          sameAs: ["https://quero1sindico.com", "https://downloads.sindicolab.com"],
        },
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "SíndicoLab",
          url: "https://sindicolab.com",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://sindicolab.com/?s={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        },
      ],
    }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-v2-section text-v2-ink">
      <HeaderV2 />
      <HeroV2 />
      <SearchToday />
      <KnowledgeBanner />
      <Footer />
    </main>
  );
}
