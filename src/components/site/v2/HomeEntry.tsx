import { HeroV2 } from "./HeroV2";
import { SearchToday } from "./SearchToday";
import { KnowledgeBanner } from "./KnowledgeBanner";

/**
 * Primeira tela da home: hero + cards "O que você procura hoje?" +
 * faixa de cursos — tudo dentro de 100svh, como na referência.
 * Em telas pequenas (<lg) a altura é liberada para não comprimir o conteúdo.
 */
export function HomeEntry() {
  return (
    <section className="relative flex flex-col bg-v2-hero pt-[72px] lg:min-h-[100svh]">
      <div className="flex flex-1 items-center py-4 lg:py-0">
        <HeroV2 />
      </div>
      <SearchToday />
      <KnowledgeBanner />
    </section>
  );
}
