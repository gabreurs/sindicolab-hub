import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { IntroLoader } from "@/components/site/IntroLoader";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { AccessCards } from "@/components/site/AccessCards";

import { ValuePillars } from "@/components/site/ValuePillars";
import { Sponsors } from "@/components/site/Sponsors";
import { Footer } from "@/components/site/Footer";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { EdgeBlur } from "@/components/site/EdgeBlur";
import { GlobalSearch } from "@/components/site/GlobalSearch";
import { QuemSomos } from "@/components/site/QuemSomos";

export const Route = createFileRoute("/")({
  head: () =>
    buildSeo({
      title:
        "Síndico profissional, cursos e materiais para condomínio | SíndicoLab",
      description:
        "SíndicoLab é o ecossistema condominial brasileiro: encontre síndico profissional, acesse cursos para síndicos, baixe materiais para condomínio e leia conteúdo de gestão condominial.",
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
    <>
      <SmoothScroll />
      <IntroLoader />
      <GlobalSearch />
      <main className="min-h-screen bg-background text-ink flex flex-col">
        <Header />
        <Hero />
        <AccessCards />
        <QuemSomos />
        <ValuePillars />
        <Sponsors />
        <Footer />
      </main>
      <EdgeBlur />
    </>
  );
}
