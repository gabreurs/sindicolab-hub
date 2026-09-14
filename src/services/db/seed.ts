/**
 * Dados de exemplo do ecossistema (organizações, Academy, materiais, artigos,
 * eventos). Estruturados com os MESMOS nomes de tabela e coluna que o banco
 * usará, para que a troca pelo Supabase seja apenas de cliente.
 */
import { cursos } from "@/data/cursos";
import { articles } from "@/data/articles";
import { EXTERNAL_LINKS } from "@/config/external-links";
import type { Row } from "./types";

const now = new Date();
const iso = (daysAgo: number) => new Date(now.getTime() - daysAgo * 86400000).toISOString();
const future = (days: number) => new Date(now.getTime() + days * 86400000).toISOString();

const CATEGORY_IDS: Record<string, string> = {
  "Para síndicos": "cat-sindicos",
  "Equipe condominial": "cat-equipe",
  Administradoras: "cat-administradoras",
  "Materiais & ferramentas": "cat-ferramentas",
};

const organizations: Row[] = [
  {
    id: "org-sindicolab",
    slug: "sindicolab",
    name: "SíndicoLab",
    is_platform: true,
    status: "active",
    created_at: iso(720),
  },
  {
    id: "org-guarida",
    slug: "guarida",
    name: "Guarida Imóveis",
    is_platform: false,
    status: "active",
    created_at: iso(320),
  },
  {
    id: "org-casa",
    slug: "casa",
    name: "CASA Administradora",
    is_platform: false,
    status: "active",
    created_at: iso(140),
  },
];

const brandingBase = {
  logo_light_url: null,
  logo_dark_url: null,
  favicon_url: null,
  banner_url: null,
  dark_background_color: "#0B0B0E",
  dark_surface_color: "#151518",
  dark_text_color: "#F3F3F5",
};

const organization_branding: Row[] = [
  {
    id: "brand-sindicolab",
    organization_id: "org-sindicolab",
    ...brandingBase,
    primary_color: "#12151C",
    secondary_color: "#1B1F29",
    accent_color: "#3F5BF6",
    background_color: "#FBFBFD",
    surface_color: "#FFFFFF",
    text_color: "#12151C",
    welcome_title: "Bem-vindo à SíndicoLab Academy",
    welcome_message: "Formação contínua para quem vive a gestão condominial todos os dias.",
    environment_name: null,
  },
  {
    id: "brand-guarida",
    organization_id: "org-guarida",
    ...brandingBase,
    primary_color: "#14202B",
    secondary_color: "#1D2C3A",
    accent_color: "#0F7B6C",
    background_color: "#FAFBFB",
    surface_color: "#FFFFFF",
    text_color: "#14202B",
    welcome_title: "Universidade Guarida",
    welcome_message: "Trilhas de formação para o time e para os síndicos parceiros.",
    environment_name: null,
  },
  {
    id: "brand-casa",
    organization_id: "org-casa",
    ...brandingBase,
    primary_color: "#231A14",
    secondary_color: "#3A2A1F",
    accent_color: "#C2551F",
    background_color: "#FDFBF8",
    surface_color: "#FFFFFF",
    text_color: "#231A14",
    welcome_title: "CASA Educação",
    welcome_message: "Conteúdo aplicado para equipes de administração de condomínios.",
    environment_name: null,
  },
];

const organization_domains: Row[] = [
  { id: "dom-1", organization_id: "org-sindicolab", hostname: "sindicolab.com", is_primary: true },
  { id: "dom-2", organization_id: "org-guarida", hostname: "academy.guarida.com.br", is_primary: true },
  { id: "dom-3", organization_id: "org-casa", hostname: "educacao.casaadm.com.br", is_primary: true },
];

const profiles: Row[] = [
  {
    id: "user-gabriel",
    email: "gabriel@studiomarqo.com.br",
    full_name: "Gabriel Reus — Studio Marqo",
    avatar_url: null,
    created_at: iso(700),
  },
  {
    id: "user-mari",
    email: "mari@sindicolab.com",
    full_name: "Mari — SíndicoLab",
    avatar_url: null,
    created_at: iso(500),
  },
  {
    id: "user-guarida",
    email: "educacao@guarida.com.br",
    full_name: "Coordenação Guarida",
    avatar_url: null,
    created_at: iso(300),
  },
  {
    id: "user-sindico",
    email: "sindico@exemplo.com",
    full_name: "Síndica Demonstração",
    avatar_url: null,
    created_at: iso(60),
  },
];

const organization_memberships: Row[] = [
  { id: "mem-1", organization_id: "org-sindicolab", user_id: "user-gabriel", role: "platform_admin", is_active: true, created_at: iso(700) },
  { id: "mem-2", organization_id: "org-sindicolab", user_id: "user-mari", role: "platform_admin", is_active: true, created_at: iso(500) },
  { id: "mem-3", organization_id: "org-guarida", user_id: "user-guarida", role: "org_admin", is_active: true, created_at: iso(300) },
  { id: "mem-4", organization_id: "org-sindicolab", user_id: "user-sindico", role: "student", is_active: true, created_at: iso(60) },
];

const organization_invites: Row[] = [
  {
    id: "inv-1",
    organization_id: "org-guarida",
    email: "novo.coordenador@guarida.com.br",
    role: "org_admin",
    status: "pending",
    created_at: iso(9),
  },
];

const course_categories: Row[] = [
  { id: "cat-sindicos", name: "Para síndicos", sort_order: 1 },
  { id: "cat-equipe", name: "Equipe condominial", sort_order: 2 },
  { id: "cat-administradoras", name: "Administradoras", sort_order: 3 },
  { id: "cat-ferramentas", name: "Materiais & ferramentas", sort_order: 4 },
];

const courses: Row[] = cursos.map((c, i) => ({
  id: `course-${c.slug}`,
  slug: c.slug,
  title: c.titulo,
  subtitle: c.destaque ?? null,
  description: c.resumo,
  cover_url: c.capa,
  banner_url: c.capa,
  instructor_name: "SíndicoLab Academy",
  duration_minutes: 90 + (i % 6) * 45,
  category_id: CATEGORY_IDS[c.categoria] ?? "cat-sindicos",
  level: i % 3 === 0 ? "Iniciante" : i % 3 === 1 ? "Intermediário" : "Avançado",
  is_featured: !!c.destaque,
  is_required: false,
  visibility: "catalog",
  status: "published",
  organization_id: "org-sindicolab",
  external_url: c.url,
  price_label: c.preco ?? null,
  certificate: c.certificado ?? false,
  access_label: c.acesso ?? null,
  created_at: iso(400 - i * 9),
  updated_at: iso(30),
}));

const organization_course_catalog: Row[] = [
  ...courses.map((c, i) => ({
    id: `occ-lab-${i}`,
    organization_id: "org-sindicolab",
    course_id: c.id,
    is_visible: true,
    created_at: iso(200),
  })),
  ...courses.slice(0, 6).map((c, i) => ({
    id: `occ-guarida-${i}`,
    organization_id: "org-guarida",
    course_id: c.id,
    is_visible: true,
    created_at: iso(120),
  })),
  ...courses.slice(3, 8).map((c, i) => ({
    id: `occ-casa-${i}`,
    organization_id: "org-casa",
    course_id: c.id,
    is_visible: true,
    created_at: iso(90),
  })),
];

const course_modules: Row[] = [];
const course_lessons: Row[] = [];
const course_materials: Row[] = [];

courses.slice(0, 6).forEach((course, ci) => {
  ["Fundamentos", "Na prática", "Aprofundamento"].forEach((modTitle, mi) => {
    const moduleId = `mod-${ci}-${mi}`;
    course_modules.push({
      id: moduleId,
      course_id: course.id,
      title: modTitle,
      sort_order: mi + 1,
      created_at: iso(200),
    });
    for (let li = 0; li < 3; li++) {
      course_lessons.push({
        id: `les-${ci}-${mi}-${li}`,
        course_id: course.id,
        module_id: moduleId,
        title: `${modTitle} · aula ${li + 1}`,
        description: "Aula de demonstração. O vídeo definitivo entra com o banco conectado.",
        sort_order: li + 1,
        duration_minutes: 8 + li * 4,
        video_provider: "vimeo",
        video_id: null,
        video_url: null,
        content_html: null,
        is_free: mi === 0 && li === 0,
        created_at: iso(200),
      });
    }
  });
  course_materials.push({
    id: `cmat-${ci}`,
    course_id: course.id,
    title: "Material de apoio do curso",
    kind: "pdf",
    file_url: EXTERNAL_LINKS.DOWNLOADS,
    created_at: iso(180),
  });
});

const enrollments: Row[] = [
  { id: "enr-1", user_id: "user-sindico", course_id: courses[0].id, created_at: iso(20) },
  { id: "enr-2", user_id: "user-sindico", course_id: courses[2].id, created_at: iso(11) },
];

const course_entitlements: Row[] = [
  { id: "ent-1", user_id: "user-sindico", course_id: courses[4].id, created_at: iso(8) },
];

const course_progress: Row[] = [
  {
    id: "cp-1",
    user_id: "user-sindico",
    course_id: courses[0].id,
    percent: 42,
    open_count: 7,
    last_accessed_at: iso(1),
    updated_at: iso(1),
  },
  {
    id: "cp-2",
    user_id: "user-sindico",
    course_id: courses[2].id,
    percent: 12,
    open_count: 2,
    last_accessed_at: iso(4),
    updated_at: iso(4),
  },
];

const lesson_progress: Row[] = [
  { id: "lp-1", user_id: "user-sindico", lesson_id: "les-0-0-0", course_id: courses[0].id, completed_at: iso(3), updated_at: iso(3) },
  { id: "lp-2", user_id: "user-sindico", lesson_id: "les-0-0-1", course_id: courses[0].id, completed_at: iso(2), updated_at: iso(2) },
];

const course_reviews: Row[] = [
  { id: "rev-1", course_id: courses[0].id, user_id: "user-sindico", rating: 5, comment: "Conteúdo direto ao ponto.", created_at: iso(6) },
  { id: "rev-2", course_id: courses[2].id, user_id: "user-sindico", rating: 4, comment: "Muito aplicável no dia a dia.", created_at: iso(15) },
];

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
  file_url: EXTERNAL_LINKS.DOWNLOADS,
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
const access_requests: Row[] = [
  {
    id: "req-1",
    email: "interessada@condominio.com.br",
    full_name: "Ana Interessada",
    organization_id: "org-sindicolab",
    status: "pending",
    message: "Gostaria de acesso à Academy para minha equipe.",
    created_at: iso(5),
  },
];
const user_course_list: Row[] = [
  { id: "ucl-1", user_id: "user-sindico", course_id: courses[5].id, created_at: iso(7) },
];
const course_comments: Row[] = [];
const lesson_comments: Row[] = [];

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
