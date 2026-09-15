import { HeroV2 } from "./HeroV2";
import { SearchToday } from "./SearchToday";
import { KnowledgeBanner } from "./KnowledgeBanner";
import { HomeMotion } from "./HomeMotion";

export function HomeEntry() {
  return (
    <HomeMotion>
      <div className="home-entry bg-v2-hero">
        <HeroV2 />
        <SearchToday />
        <KnowledgeBanner />
      </div>
    </HomeMotion>
  );
}
