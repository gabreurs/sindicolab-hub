import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { AccessCards } from "@/components/site/AccessCards";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SíndicoLab — Escolha por onde entrar no ecossistema condominial" },
      {
        name: "description",
        content:
          "Canal de acesso aos destinos do SíndicoLab: Quero1Síndico, Portal, Play, Materiais e Contato.",
      },
      { property: "og:title", content: "SíndicoLab — O canal do ecossistema condominial" },
      {
        property: "og:description",
        content:
          "Quero1Síndico, Portal, Play e Materiais — escolha o seu caminho no SíndicoLab.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background text-ink flex flex-col">
      <Header />
      <Hero />
      <AccessCards />
      <div className="mt-auto">
        <Footer />
      </div>
    </main>
  );
}
