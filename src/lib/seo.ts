import { SITE_URL } from "./site";

export type SeoInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  jsonLd?: object | object[];
  noIndex?: boolean;
};

const DEFAULT_OG = `${SITE_URL}/og-default.jpg`;

export function buildSeo({
  title,
  description,
  path,
  image,
  type = "website",
  jsonLd,
  noIndex,
}: SeoInput) {
  const url = `${SITE_URL}${path}`;
  const og = image ?? DEFAULT_OG;
  const meta: Array<Record<string, string>> = [
    { title },
    { name: "description", content: description },
    { property: "og:type", content: type },
    { property: "og:site_name", content: "SíndicoLab" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: og },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: og },
  ];
  if (noIndex) meta.push({ name: "robots", content: "noindex,nofollow" });

  const ldArr = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return {
    meta,
    links: [{ rel: "canonical", href: url }],
    scripts: ldArr.map((data) => ({
      type: "application/ld+json",
      children: JSON.stringify(data),
    })),
  };
}
