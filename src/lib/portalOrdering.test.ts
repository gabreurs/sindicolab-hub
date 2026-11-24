import { describe, test } from "node:test";
import { strict as assert } from "node:assert";
import { newestPortalPosts, portalHighlight } from "./portalOrdering";

describe("Portal editorial ordering", () => {
  test("puts recent articles first and older articles last using real timestamps", () => {
    const posts = [
      { title: "Antiga", published_at: "2026-08-10T17:21:58Z" },
      { title: "Recente", published_at: "2026-11-24T10:00:00-03:00" },
      { title: "Anterior", published_at: "2026-11-24T12:30:00Z" },
      { title: "Sem data", published_at: null },
    ];
    assert.deepEqual(newestPortalPosts(posts).map(p => p.title), ["Recente", "Anterior", "Antiga", "Sem data"]);
    assert.equal(posts[0].title, "Antiga");
  });
  test("highlights Focus Media even when another article is newer", () => {
    assert.equal(portalHighlight([
      { title: "Outra notícia", published_at: "2026-11-24T13:00:00Z" },
      { title: "Focus Media acelera no Brasil", published_at: "2026-11-23T13:00:00Z" },
    ])?.title, "Focus Media acelera no Brasil");
  });
  test("without Focus the latest article is the highlight", () => {
    assert.equal(portalHighlight([
      { title: "Antiga", published_at: "2026-08-10T13:00:00Z" },
      { title: "Nova", published_at: "2026-11-24T13:00:00Z" },
    ])?.title, "Nova");
  });
});