type DatedPost = { published_at?: unknown; title?: unknown; slug?: unknown };

function publicationTime(post: DatedPost) {
  const time = Date.parse(String(post.published_at ?? ""));
  return Number.isFinite(time) ? time : -Infinity;
}

export function newestPortalPosts<T extends DatedPost>(posts: readonly T[]): T[] {
  return [...posts].sort((a, b) => {
    const left = publicationTime(a), right = publicationTime(b);
    return left === right ? 0 : left > right ? -1 : 1;
  });
}

export function portalHighlight<T extends DatedPost>(posts: readonly T[]): T | undefined {
  const ordered = newestPortalPosts(posts);
  return ordered.find(post => /\bfocus[\s-]+media\b/i.test(`${post.title ?? ""} ${post.slug ?? ""}`)) ?? ordered[0];
}