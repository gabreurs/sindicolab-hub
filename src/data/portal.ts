import { articles } from "@/data/articles";
import type { Row } from "@/services/db/types";

export type PortalCategory = {
  id: string; slug: string; name: string; color: string; sort_order: number; active: boolean;
};
export type PortalAuthor = {
  id: string; slug: string; name: string; avatar_url: string | null; bio: string | null;
  role: string | null; headline: string | null; linkedin_url: string | null;
  instagram_url: string | null; sort_order: number; active: boolean; is_columnist: boolean;
};
export type PortalPost = {
  id: string; title: string; slug: string; excerpt: string; content: string;
  cover_image: string | null; cover_alt: string; category_id: string | null; author_id: string | null;
  featured: boolean; published: boolean; published_at: string | null; view_count: number;
  seo_title: string; meta_description: string; social_image_url: string | null;
  categories: PortalCategory | null; authors: PortalAuthor | null;
};

const categoryNames = [
  "Notícias", "Síndicos", "Moradores", "Mercado", "Direito", "Manutenção",
  "Segurança condominial", "Gestão condominial", "Tecnologia", "ESG condominial",
  "Equipe condominial", "Comportamento condominial", "Assembleias", "Casos reais", "Reportagem especial",
];
const slugify = (value: string) => value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const colors = ["#2563EB", "#14B8A6", "#D97706", "#E11D48", "#7C3AED", "#0891B2"];

export const portalCategories: PortalCategory[] = categoryNames.map((name, index) => ({
  id: `pcat-${index + 1}`, slug: slugify(name), name, color: colors[index % colors.length], sort_order: index + 1, active: true,
}));

export const portalAuthors: PortalAuthor[] = [
  { id: "pa-1", slug: "redacao-sindicolab", name: "Redação SíndicoLab", avatar_url: null, bio: "Jornalismo, tendências e informação para quem transforma a gestão condominial.", role: "Redação", headline: "Informação para decisões melhores", linkedin_url: null, instagram_url: "https://instagram.com/sindicolab", sort_order: 1, active: true, is_columnist: false },
  { id: "pa-2", slug: "camila-reis", name: "Camila Reis", avatar_url: null, bio: "Especialista em comunicação, assembleias e convivência condominial.", role: "Colunista", headline: "Convivência e comunicação sem ruído", linkedin_url: null, instagram_url: null, sort_order: 2, active: true, is_columnist: true },
  { id: "pa-3", slug: "lucas-vieira", name: "Lucas Vieira", avatar_url: null, bio: "Consultor em tecnologia e eficiência operacional para condomínios.", role: "Colunista", headline: "Tecnologia aplicada à operação", linkedin_url: null, instagram_url: null, sort_order: 3, active: true, is_columnist: true },
  { id: "pa-4", slug: "paulo-silva", name: "Dr. Paulo Silva", avatar_url: null, bio: "Advogado especializado em direito condominial e proteção de dados.", role: "Colunista", headline: "Direito condominial na prática", linkedin_url: null, instagram_url: null, sort_order: 4, active: true, is_columnist: true },
];

const authorFor = (name: string) => portalAuthors.find((a) => name.includes("Camila") ? a.slug === "camila-reis" : name.includes("Lucas") ? a.slug === "lucas-vieira" : name.includes("Paulo") ? a.slug === "paulo-silva" : a.slug === "redacao-sindicolab") ?? portalAuthors[0];
const categoryFor = (name: string) => portalCategories.find((c) => c.name === name) ?? portalCategories[0];

export const portalPosts: PortalPost[] = articles.map((article, index) => {
  const category = categoryFor(article.category);
  const author = authorFor(article.author);
  const publishedAt = new Date(Date.now() - index * 86400000 * 2).toISOString();
  return {
    id: `ppost-${index + 1}`, title: article.title, slug: article.slug, excerpt: article.excerpt,
    content: article.content.map((block) => block.type === "h2" ? `<h2>${block.text}</h2>` : block.type === "ul" ? `<ul>${block.items.map((item) => `<li>${item}</li>`).join("")}</ul>` : `<p>${block.text}</p>`).join(""),
    cover_image: article.image, cover_alt: article.imageAlt, category_id: category.id, author_id: author.id,
    featured: index === 1, published: true, published_at: publishedAt, view_count: Math.max(420, 2780 - index * 173),
    seo_title: article.title, meta_description: article.excerpt.slice(0, 155), social_image_url: article.image,
    categories: category, authors: author,
  };
});

export const portalCategoryRows: Row[] = portalCategories.map((item) => ({ ...item }));
export const portalAuthorRows: Row[] = portalAuthors.map((item) => ({ ...item }));
export const portalPostRows: Row[] = portalPosts.map(({ categories: _categories, authors: _authors, ...item }) => ({ ...item }));
