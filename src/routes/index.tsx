import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Portas } from "@/components/site/Portas";
import { Ecossistema } from "@/components/site/Ecossistema";
import { Blocos } from "@/components/site/Blocos";
import { Publicos } from "@/components/site/Publicos";
import { Jornadas } from "@/components/site/Jornadas";
import { Quero1Destaque } from "@/components/site/Quero1Destaque";
import { Conteudos } from "@/components/site/Conteudos";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SíndicoLab — O canal do mercado condominial" },
      {
        name: "description",
        content:
          "Ecossistema que conecta condomínios, síndicos, conselheiros e moradores. Conheça o Quero1Síndico, cursos e materiais.",
      },
      { property: "og:title", content: "SíndicoLab — O canal do mercado condominial" },
      {
        property: "og:description",
        content:
          "Um canal. Vários pontos de entrada. Quero1Síndico, cursos, materiais e conteúdo em um único ecossistema.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background text-ink">
      <Header />
      <Hero />
      <Portas />
      <Ecossistema />
      <Blocos />
      <Publicos />
      <Jornadas />
      <Quero1Destaque />
      <Conteudos />
      <Footer />
    </main>
  );
}
