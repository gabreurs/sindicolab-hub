import { HeroV2 } from "./HeroV2";
import { SearchToday } from "./SearchToday";
import { KnowledgeBanner } from "./KnowledgeBanner";

/**
 * Primeira tela da home: header + hero + cards + faixa de cursos,
 * tudo dentro de uma única viewport (proporção da referência).
 * Hero ocupa ~44% da altura; cards e faixa dividem o resto.
 */
export function HomeEntry() {
  return (
    <section className="relative flex flex-col bg-v2-hero pt-[72px] lg:h-[100svh]">
      <div className="flex items-center py-6 lg:h-[44svh] lg:py-0">
        <HeroV2 />
      </div>
      <div className="flex flex-1 flex-col justify-center">
        <SearchToday />
        <KnowledgeBanner />
      </div>
    </section>
  );
}
