/**
 * Dados de exemplo do ecossistema. Estruturados com os MESMOS nomes de tabela
 * e coluna que o banco usará, para que a troca pelo Supabase seja apenas de
 * cliente.
 *
 * ACADEMY: todo o acervo, organizações, papéis e acessos vêm de
 * `academyFixtures.ts`, derivado das migrations do repositório oficial da
 * Academy. Abaixo ficam apenas os conteúdos do site institucional
 * (materiais, artigos, eventos, newsletter).
 */
import { articles } from "@/data/articles";
import { EXTERNAL_LINKS } from "@/config/external-links";
import type { Row } from "./types";
import {
  access_requests,
  course_categories,
  course_comments,
  course_entitlements,
  course_lessons,
  course_materials,
  course_modules,
  course_progress,
  course_reviews,
  courses,
  enrollments,
  lesson_comments,
  lesson_progress,
  organization_branding,
  organization_course_catalog,
  organization_domains,
  organization_invites,
  organization_memberships,
  organizations,
  profiles,
  user_course_list,
} from "./academyFixtures";

const now = new Date();
const iso = (daysAgo: number) => new Date(now.getTime() - daysAgo * 86400000).toISOString();
const future = (days: number) => new Date(now.getTime() + days * 86400000).toISOString();


/* ------------------------- conteúdo do site ------------------------- */

type MaterialSeed = { tag: string; title: string; type: string };

const materialSeeds: MaterialSeed[] = [
  { tag: "Assembleia", title: "Modelo de ata de assembleia condominial", type: "Modelo" },
  { tag: "Assembleia", title: "Modelo de convocação de assembleia", type: "Modelo" },
  { tag: "Transição", title: "Checklist de transição de síndico", type: "Checklist" },
  { tag: "Finanças", title: "Guia prático de prestação de contas", type: "Guia" },
  { tag: "Regimento", title: "Modelo de regimento interno", type: "Modelo" },
  { tag: "Manutenção", title: "Checklist de manutenção predial NBR 5674", type: "Checklist" },
  { tag: "Finanças", title: "Planilha de previsão orçamentária", type: "Planilha" },
  { tag: "Assembleia", title: "Guia para assembleias híbridas", type: "Guia" },
  { tag: "Comunicação", title: "Modelo de comunicado a moradores", type: "Modelo" },
  { tag: "Liderança", title: "E-book: Os 90 primeiros dias do síndico", type: "E-book" },
  { tag: "Cobrança", title: "Checklist de cobrança e inadimplência", type: "Checklist" },
  { tag: "Segurança", title: "Planilha de controle de portaria", type: "Planilha" },
];

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const site_materials: Row[] = materialSeeds.map((m, i) => ({
  id: `mat-${i + 1}`,
  title: m.title,
  slug: slugify(m.title),
  description: `${m.type} pronto para usar na gestão do seu condomínio.`,
  category: m.tag,
  type: m.type,
  cover_url: null,
  // O arquivo é cadastrado no painel; sem arquivo, a página mostra o aviso.
  file_url: null,
  cta_label: "Baixar material",
  status: "published",
  is_featured: i < 2,
  published_at: iso(120 - i * 4),
  created_at: iso(120 - i * 4),
  updated_at: iso(10),
}));

const site_articles: Row[] = articles.map((a, i) => ({
  id: `art-${i + 1}`,
  title: a.title,
  slug: a.slug,
  excerpt: a.excerpt,
  content: a.content,
  cover_url: a.image,
  cover_alt: a.imageAlt,
  category: a.category,
  author: a.author,
  read_time: a.readTime,
  status: "published",
  seo_title: a.title,
  meta_description: a.excerpt.slice(0, 155),
  social_image_url: a.image,
  published_at: iso(i * 3),
  created_at: iso(i * 3),
  updated_at: iso(i),
}));

const site_events: Row[] = [
  {
    id: "evt-1",
    title: "Workshop de Inteligência Artificial para síndicos",
    slug: "workshop-ia-para-sindicos",
    short_description: "Uma tarde prática de automação e IA aplicada à rotina do síndico profissional.",
    content:
      "Encontro presencial com demonstrações reais de automação de comunicados, atas, cobranças e atendimento a moradores. Traga seu notebook: você sai com fluxos prontos.",
    cover_url: null,
    starts_at: future(24),
    time_label: "14h às 18h",
    ends_at: future(24),
    location: "Studio Marqo — São Paulo/SP",
    format: "presencial",
    city: "São Paulo",
    external_url: "https://www.sympla.com.br/sindicolab",
    sympla_url: "https://www.sympla.com.br/sindicolab",
    status: "published",
    is_featured: true,
    created_at: iso(20),
    updated_at: iso(2),
  },
  {
    id: "evt-2",
    title: "Live: prestação de contas sem ruído",
    slug: "live-prestacao-de-contas",
    short_description: "Como apresentar números para o condomínio sem gerar desconfiança.",
    content:
      "Transmissão aberta com um roteiro de apresentação de contas, os erros mais comuns e como responder às perguntas difíceis da assembleia.",
    cover_url: null,
    starts_at: future(9),
    time_label: "19h30",
    ends_at: future(9),
    location: "Online — YouTube SíndicoLab",
    format: "online",
    city: null,
    external_url: EXTERNAL_LINKS.YOUTUBE,
    sympla_url: null,
    status: "published",
    is_featured: false,
    created_at: iso(12),
    updated_at: iso(3),
  },
  {
    id: "evt-3",
    title: "Encontro SíndicoLab — Las Vegas Connect",
    slug: "encontro-las-vegas-connect",
    short_description: "Missão internacional de tecnologia condominial com a comunidade SíndicoLab.",
    content:
      "Relato e networking da missão internacional: o que o mercado condominial brasileiro pode aplicar já a partir das tendências vistas fora.",
    cover_url: null,
    starts_at: iso(80),
    time_label: "Dia inteiro",
    ends_at: iso(78),
    location: "Las Vegas, EUA",
    format: "presencial",
    city: "Las Vegas",
    external_url: null,
    sympla_url: null,
    status: "published",
    is_featured: false,
    created_at: iso(140),
    updated_at: iso(70),
  },
];

const newsletter_subscribers: Row[] = [];

export const tables = {
  organizations,
  organization_branding,
  organization_domains,
  organization_memberships,
  organization_invites,
  organization_course_catalog,
  profiles,
  course_categories,
  courses,
  course_modules,
  course_lessons,
  course_materials,
  course_progress,
  lesson_progress,
  course_reviews,
  course_comments,
  lesson_comments,
  enrollments,
  course_entitlements,
  access_requests,
  user_course_list,
  site_materials,
  site_articles,
  site_events,
  newsletter_subscribers,
};

export type TableName = keyof typeof tables;
