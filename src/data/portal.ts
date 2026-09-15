import coverChecklist from "@/assets/portal/portal-cover-1.jpg";
import coverLaw from "@/assets/portal/portal-cover-2.jpg";
import coverEnergy from "@/assets/portal/portal-cover-3.jpg";
import coverNeighbors from "@/assets/portal/portal-cover-4.jpg";
import coverMarket from "@/assets/portal/portal-cover-5.jpg";
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

export const portalCategories: PortalCategory[] = [
  { id: "pcat-noticias", slug: "noticias", name: "Notícias", color: "#3B82F6", sort_order: 1, active: true },
  { id: "pcat-sindicos", slug: "sindicos", name: "Síndicos", color: "#10B981", sort_order: 2, active: true },
  { id: "pcat-moradores", slug: "moradores", name: "Moradores", color: "#F59E0B", sort_order: 3, active: true },
  { id: "pcat-mercado", slug: "mercado", name: "Mercado", color: "#EF4444", sort_order: 4, active: true },
  { id: "pcat-direito", slug: "direito", name: "Direito", color: "#8B5CF6", sort_order: 5, active: true },
  { id: "pcat-manutencao", slug: "manutencao", name: "Manutenção", color: "#06B6D4", sort_order: 6, active: true },
];

export const portalAuthors: PortalAuthor[] = [
  { id: "pa-camila-santos", slug: "camila-santos", name: "Camila Santos", avatar_url: null, bio: "Jornalista especializada em gestão condominial.", role: "Editora", headline: null, linkedin_url: null, instagram_url: null, sort_order: 1, active: true, is_columnist: true },
  { id: "pa-ricardo-freitas", slug: "ricardo-freitas", name: "Ricardo Freitas", avatar_url: null, bio: "Advogado com foco em direito condominial.", role: "Colunista", headline: null, linkedin_url: null, instagram_url: null, sort_order: 2, active: true, is_columnist: true },
  { id: "pa-juliana-duarte", slug: "juliana-duarte", name: "Juliana Duarte", avatar_url: null, bio: "Consultora em administração de condomínios.", role: "Colunista", headline: null, linkedin_url: null, instagram_url: null, sort_order: 3, active: true, is_columnist: true },
];

const category = (slug: string) => portalCategories.find((item) => item.slug === slug) ?? null;
const author = (slug: string) => portalAuthors.find((item) => item.slug === slug) ?? null;
const post = (input: Omit<PortalPost, "categories" | "authors" | "seo_title" | "meta_description" | "social_image_url" | "cover_alt"> & { categorySlug: string; authorSlug: string; coverAlt: string }): PortalPost => {
  const { categorySlug, authorSlug, coverAlt, ...rest } = input;
  return {
    ...rest,
    cover_alt: coverAlt,
    categories: category(categorySlug),
    authors: author(authorSlug),
    seo_title: rest.title,
    meta_description: rest.excerpt.slice(0, 155),
    social_image_url: rest.cover_image,
  };
};

export const portalPosts: PortalPost[] = [
  post({
    id: "ppost-nova-lei", title: "Nova lei das assembleias virtuais: o que muda para condomínios", slug: "nova-lei-das-assembleias-virtuais",
    excerpt: "Entenda os principais pontos da Lei 14.309/2022 e os impactos na gestão, participação e segurança jurídica das deliberações.",
    content: "<p>A <strong>Lei 14.309/2022</strong> trouxe mudanças importantes para as assembleias condominiais realizadas por meio digital. O texto regulamenta a convocação, a participação dos condôminos e a validade das votações.</p><p>Entre os principais pontos estão a necessidade de identificação do participante, a gravação da sessão e a possibilidade de voto por correspondência eletrônica, desde que previsto em convenção ou regulamento.</p><p>Para os síndicos, a lei representa mais agilidade, mas também exige cuidado com a segurança da informação e a guarda dos registros.</p>",
    cover_image: coverLaw, coverAlt: "Edifícios residenciais vistos de baixo", category_id: "pcat-direito", author_id: "pa-ricardo-freitas", categorySlug: "direito", authorSlug: "ricardo-freitas", featured: true, published: true, published_at: "2026-08-10T17:21:58.000Z", view_count: 2450,
  }),
  post({
    id: "ppost-inadimplencia", title: "Inadimplência recua pelo 3º mês seguido, aponta índice nacional", slug: "inadimplencia-recua-terceiro-mes",
    excerpt: "Dados do índice nacional mostram queda consistente da inadimplência em condomínios, sinalizando recuperação do setor.",
    content: "<p>O índice nacional de inadimplência condominial registrou queda pelo terceiro mês consecutivo. Especialistas apontam que a melhora está relacionada à retomada econômica e ao uso de ferramentas de cobrança mais eficientes.</p><p>Síndicos e administradoras destacam a importância da negociação preventiva e da transparência nas finanças do condomínio.</p>",
    cover_image: coverMarket, coverAlt: "Análise de indicadores financeiros", category_id: "pcat-mercado", author_id: "pa-camila-santos", categorySlug: "mercado", authorSlug: "camila-santos", featured: false, published: true, published_at: "2026-08-09T17:21:58.000Z", view_count: 1830,
  }),
  post({
    id: "ppost-elevadores", title: "Elevadores: manutenção preventiva reduz falhas e custos em até 30%", slug: "manutencao-preventiva-elevadores",
    excerpt: "Um cronograma de manutenção preventiva bem estruturado pode reduzir drasticamente as paradas e os gastos com reparos emergenciais.",
    content: "<p>A manutenção preventiva de elevadores é um investimento que se paga rapidamente. Segundo especialistas, condomínios que adotam revisões periódicas registram queda de até 30% nos custos de reparo.</p><p>O ideal é contar com uma empresa credenciada e manter um laudo técnico atualizado, conforme exigido pela legislação de segurança.</p>",
    cover_image: coverChecklist, coverAlt: "Profissional revisando um plano de manutenção", category_id: "pcat-manutencao", author_id: "pa-juliana-duarte", categorySlug: "manutencao", authorSlug: "juliana-duarte", featured: false, published: true, published_at: "2026-08-08T17:21:58.000Z", view_count: 1520,
  }),
  post({
    id: "ppost-convivencia", title: "Como melhorar a convivência entre moradores e evitar conflitos frequentes", slug: "convivencia-entre-moradores",
    excerpt: "Pequenas ações de comunicação e respeito às regras comuns podem transformar o clima do condomínio.",
    content: "<p>A convivência em condomínios pode ser desafiadora, mas regras claras e comunicação transparente ajudam a evitar atritos. Especialistas recomendam assembleias participativas, canais de ouvidoria e mediação de conflitos.</p><p>O síndico desempenha papel central como mediador, mas a responsabilidade pela boa convivência é coletiva.</p>",
    cover_image: coverNeighbors, coverAlt: "Moradores reunidos em um ambiente de convivência", category_id: "pcat-moradores", author_id: "pa-camila-santos", categorySlug: "moradores", authorSlug: "camila-santos", featured: false, published: true, published_at: "2026-08-07T17:21:58.000Z", view_count: 980,
  }),
  post({
    id: "ppost-checklist", title: "Checklist mensal do síndico: 15 tarefas que não podem faltar", slug: "checklist-mensal-do-sindico",
    excerpt: "Organize a rotina da gestão condominial com um checklist prático de atenção mensal.",
    content: "<p>Síndicos profissionais e voluntários podem se beneficiar de um checklist mensal para não perder prazos. Entre as tarefas estão aprovação de despesas, acompanhamento de inadimplência, revisão de contratos e inspeção das áreas comuns.</p><p>A disciplina na rotina evita surpresas e melhora a previsibilidade financeira do condomínio.</p>",
    cover_image: coverChecklist, coverAlt: "Checklist de gestão sobre uma mesa", category_id: "pcat-sindicos", author_id: "pa-juliana-duarte", categorySlug: "sindicos", authorSlug: "juliana-duarte", featured: false, published: true, published_at: "2026-08-06T17:21:58.000Z", view_count: 875,
  }),
  post({
    id: "ppost-energia", title: "Contas de luz em áreas comuns: como reduzir sem perder conforto", slug: "reduzir-contas-luz-areas-comuns",
    excerpt: "Economia de energia nas áreas comuns é possível com iluminação LED, sensores de presença e conscientização dos moradores.",
    content: "<p>A conta de luz é uma das maiores despesas operacionais dos condomínios. Substituir lâmpadas por LED, instalar sensores de presença e fazer manutenção periódica do sistema elétrico são medidas simples e eficazes.</p><p>Além da economia, essas ações aumentam a sustentabilidade do empreendimento.</p>",
    cover_image: coverEnergy, coverAlt: "Área comum iluminada de um condomínio", category_id: "pcat-noticias", author_id: "pa-camila-santos", categorySlug: "noticias", authorSlug: "camila-santos", featured: false, published: true, published_at: "2026-08-05T17:21:58.000Z", view_count: 720,
  }),
];

export const portalCategoryRows: Row[] = portalCategories.map((item) => ({ ...item }));
export const portalAuthorRows: Row[] = portalAuthors.map((item) => ({ ...item }));
export const portalPostRows: Row[] = portalPosts.map(({ categories: _categories, authors: _authors, ...item }) => ({ ...item }));