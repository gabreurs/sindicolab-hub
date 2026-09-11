import { HeroV2 } from "./HeroV2";
import { SearchToday } from "./SearchToday";
import { KnowledgeBanner } from "./KnowledgeBanner";

export function HomeEntry() {
  return (
    <div className="home-entry bg-v2-hero">
      <HeroV2 />
      <SearchToday />
      <KnowledgeBanner />
    </div>
  );
}
