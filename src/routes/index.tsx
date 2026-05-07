import { createFileRoute } from "@tanstack/react-router";
import { IntroLoader } from "@/components/site/IntroLoader";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { AccessCards } from "@/components/site/AccessCards";
import { ProductScrollShowcase } from "@/components/site/ProductScrollShowcase";
import { ValuePillars } from "@/components/site/ValuePillars";
import { Sponsors } from "@/components/site/Sponsors";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "Síndico profissional, cursos e materiais para condomínio | SíndicoLab",
      },
      {
        name: "description",
        content:
          "SíndicoLab é o ecossistema condominial brasileiro: encontre síndico profissional, acesse cursos para síndicos, baixe materiais para condomínio e leia conteúdo de gestão condominial.",
      },
      {
        name: "keywords",
        content:
          "síndico profissional, gestão condominial, curso para síndico, materiais para condomínio, administração de condomínio, Quero1Síndico, SíndicoLab",
      },
      { property: "og:title", content: "SíndicoLab — Ecossistema condominial" },
      {
        property: "og:description",
        content:
          "Síndico profissional, cursos, materiais e conteúdo condominial em um só ecossistema.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <IntroLoader />
      <main className="min-h-screen bg-background text-ink flex flex-col">
        <Header />
          <Hero />
          <ProductScrollShowcase />
          <AccessCards />
        <ValuePillars />
        <Sponsors />
        <Footer />
      </main>
    </>
  );
}
