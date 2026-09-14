/**
 * ACERVO REAL DA SÍNDICOLAB ACADEMY.
 *
 * Fonte de verdade: repositório `gabreurs/academy-nexus-89`, em especial as
 * migrations
 *   - 20260817202331 → categorias + 25 cursos globais Learning Studio
 *     (slug, título, categoria, código do share e delivery_type)
 *   - 20260730144441 → curso exclusivo/atributos editoriais (subtítulo,
 *     descrição, nível, duração, destaque) e aulas com `video_url`
 *   - 20260819175406 → relação slug → capa
 *   - 20260819181126 → logos da Administradora CASA
 *   - 20260720164310/164635 → cores e logos do tenant plataforma SíndicoLab
 *
 * NADA aqui é inventado: quando o repositório não define descrição, nível ou
 * capa, o campo fica nulo e a interface mostra o espaço neutro. Nenhum curso
 * do antigo site institucional entra na Academy.
 */
import type { Row } from "./types";

/* --------------------------- capas disponíveis ---------------------------
 * Só entra imagem quando ela corresponde EXATAMENTE ao mesmo curso do acervo.
 * Cursos sem capa continuam existindo com o container neutro. */
import coverCompetencias from "@/assets/cursos/competencias-do-sindico.webp";
import coverConselheiros from "@/assets/cursos/conselheiros-fiscais-e-consultivos.webp";
import coverLimpeza from "@/assets/cursos/limpeza-de-alta-performance.webp";
import coverZelador from "@/assets/cursos/zelador-de-alta-performance.webp";
import casaLogoBlack from "@/assets/casa-logo-black.png.asset.json";
import casaLogoWhite from "@/assets/casa-logo-white.png.asset.json";

const COVERS: Record<string, string> = {
  "competencias-sindico-profissional": coverCompetencias,
  "conselheiros-fiscais-consultivos": coverConselheiros,
  "limpeza-alta-performance": coverLimpeza,
  "zelador-alta-performance": coverZelador,
};

const now = Date.now();
const iso = (daysAgo: number) => new Date(now - daysAgo * 86400000).toISOString();

/* ------------------------------ organizações ------------------------------ */

export const ORG = {
  sindicolab: "11111111-1111-1111-1111-111111111111",
  guarida: "22222222-2222-2222-2222-222222222222",
  casa: "33333333-3333-3333-3333-333333333333",
  apsa: "44444444-4444-4444-4444-444444444444",
} as const;

export const organizations: Row[] = [
  { id: ORG.sindicolab, slug: "sindicolab", name: "SíndicoLab", is_platform: true, status: "active", user_limit: null, created_at: iso(720) },
  { id: ORG.guarida, slug: "guarida", name: "Guarida Administradora", is_platform: false, status: "active", user_limit: 250, created_at: iso(320) },
  { id: ORG.casa, slug: "casa", name: "Administradora CASA", is_platform: false, status: "active", user_limit: 120, created_at: iso(140) },
  { id: ORG.apsa, slug: "apsa", name: "APSA", is_platform: false, status: "suspended", user_limit: 80, created_at: iso(200) },
];

const brandingDefaults = {
  favicon_url: null,
  banner_url: null,
  dark_background_color: "#0B0B0E",
  dark_surface_color: "#151518",
  dark_text_color: "#F3F3F5",
};

export const organization_branding: Row[] = [
  {
    id: "brand-sindicolab",
    organization_id: ORG.sindicolab,
    ...brandingDefaults,
    // Migration 20260720164635 — logo real da marca (nunca placeholder).
    logo_light_url: "/brand/logo-sindicolab-ink.svg",
    logo_dark_url: "/brand/logo-sindicolab-white.svg",
    primary_color: "#111827",
    secondary_color: "#0F172A",
    accent_color: "#4F46E5",
    background_color: "#F7F5F2",
    surface_color: "#FFFFFF",
    text_color: "#111827",
    environment_name: "SíndicoLab Academy",
    welcome_title: "Educação para o mercado condominial",
    welcome_message:
      "Formação contínua para administradoras, síndicos, porteiros e equipes condominiais — em um único ecossistema.",
  },
  {
    id: "brand-guarida",
    organization_id: ORG.guarida,
    ...brandingDefaults,
    logo_light_url: null,
    logo_dark_url: null,
    primary_color: "#14202B",
    secondary_color: "#1D2C3A",
    accent_color: "#0F7B6C",
    background_color: "#FAFBFB",
    surface_color: "#FFFFFF",
    text_color: "#14202B",
    environment_name: "Guarida Academy",
    welcome_title: "Guarida Academy",
    welcome_message: "Trilhas de formação para o time Guarida e para os síndicos parceiros.",
  },
  {
    id: "brand-casa",
    organization_id: ORG.casa,
    ...brandingDefaults,
    // Migration 20260819181126 — logos reais da CASA.
    logo_light_url: (casaLogoBlack as { url: string }).url,
    logo_dark_url: (casaLogoWhite as { url: string }).url,
    primary_color: "#111111",
    secondary_color: "#2B2B2B",
    accent_color: "#FFC20E",
    background_color: "#0B0B0C",
    surface_color: "#141416",
    text_color: "#F5F5F4",
    environment_name: "CASA Academy",
    welcome_title: "CASA Academy",
    welcome_message:
      "Educação condominial para síndicos, conselheiros e equipes dos condomínios administrados pela CASA.",
  },
  {
    id: "brand-apsa",
    organization_id: ORG.apsa,
    ...brandingDefaults,
    logo_light_url: null,
    logo_dark_url: null,
    primary_color: "#132A3A",
    secondary_color: "#1C3A4F",
    accent_color: "#0E7490",
    background_color: "#F7FAFB",
    surface_color: "#FFFFFF",
    text_color: "#132A3A",
    environment_name: "APSA Academy",
    welcome_title: "APSA Academy",
    welcome_message: "Ambiente em preparação.",
  },
];

export const organization_domains: Row[] = [
  { id: "dom-sindicolab", organization_id: ORG.sindicolab, hostname: "sindicolab.com", is_primary: true },
  { id: "dom-guarida", organization_id: ORG.guarida, hostname: "guarida.sindicolab.academy", is_primary: true },
  { id: "dom-casa", organization_id: ORG.casa, hostname: "casa.sindicolab.academy", is_primary: true },
  { id: "dom-apsa", organization_id: ORG.apsa, hostname: "apsa.sindicolab.academy", is_primary: true },
];

/* ------------------------------- categorias ------------------------------- */

export const CATEGORY = {
  ia: "cat-ia-tecnologia",
  carreira: "cat-sindico-carreira",
  assembleias: "cat-assembleias-conselhos",
  operacao: "cat-operacao-condominial",
} as const;

export const course_categories: Row[] = [
  { id: CATEGORY.ia, slug: "ia-tecnologia", name: "IA e Tecnologia", description: "Inteligência artificial aplicada ao mercado condominial", sort_order: 1 },
  { id: CATEGORY.carreira, slug: "sindico-carreira", name: "Síndico Profissional e Carreira", description: "Formação, posicionamento e crescimento profissional", sort_order: 2 },
  { id: CATEGORY.assembleias, slug: "assembleias-conselhos", name: "Assembleias e Conselhos", description: "Governança, assembleias e órgãos de fiscalização", sort_order: 3 },
  { id: CATEGORY.operacao, slug: "operacao-condominial", name: "Operação Condominial", description: "Portaria, zeladoria e serviços de campo", sort_order: 4 },
];

/* ------------------ 25 cursos globais do Learning Studio ------------------ */

type Global = [slug: string, title: string, category: string, code: string];

const LEARNING_STUDIO: Global[] = [
  ["curso-ia-gestao-condominial-v2", "Curso de IA para Gestão Condominial v2", CATEGORY.ia, "1iE7xOld3ePd74eKo1iG"],
  ["gestao-condominial-inteligente-ia-empresa", "Gestão Condominial Inteligente com IA — Crie sua empresa", CATEGORY.ia, "TfWKwiYdixr8WRsm09y8"],
  ["ia-gestao-condominial", "Curso de Inteligência Artificial Aplicada à Gestão Condominial", CATEGORY.ia, "sLvnjknjro1whwLQpwh3"],
  ["analise-cotacoes-condominiais-chatgpt", "Análise de Cotações Condominiais com ChatGPT", CATEGORY.ia, "SqHm00X4ozvy8ZMjmnsW"],
  ["app-condominio-chatgpt-lovable", "Como Criar um App de Condomínio com ChatGPT e Lovable", CATEGORY.ia, "FRYVxpUpKobS03xTEo4l"],
  ["manual-gpts-mercado-condominial", "Manual Completo de Criação de GPTs no ChatGPT para o Mercado Condominial", CATEGORY.ia, "qEBz0pCnB3oqqxC7HMBq"],
  ["sindico-profissional", "Curso de Síndico Profissional", CATEGORY.carreira, "wNftWMyvb7GAEW4A1th9"],
  ["ensaio-carreira-sindicos-profissionais", "Ensaio sobre a Carreira de Síndicos Profissionais", CATEGORY.carreira, "cjsMjhq6rMFxkYXDUoNa"],
  ["competencias-sindico-profissional", "Competências do Síndico Profissional", CATEGORY.carreira, "ridN27iuuzwACoHhKycL"],
  ["empresa-sindicatura-atuacao-nacional", "Como Desenvolver uma Empresa de Sindicatura com Atuação Nacional", CATEGORY.carreira, "IuMBC4lJMMdJl09CpTHn"],
  ["estrategias-reeleicao-gestao-condominial", "Estratégias para Reeleição na Gestão Condominial", CATEGORY.carreira, "ZgJABzPQ8830EUzOwrN3"],
  ["oratoria-sindicos", "Técnicas de Oratória para Síndicos", CATEGORY.carreira, "hSeukht9MRuDBl8jSBIL"],
  ["captacao-de-clientes", "Captação de Clientes", CATEGORY.carreira, "WJy9VRDv8km8QkUVEZbB"],
  ["captacao-clientes-sindicos", "Captação de Clientes para Síndicos Profissionais", CATEGORY.carreira, "FuIgcCDHyg2JWcsCPwKU"],
  ["conselheiros-fiscais-consultivos", "Curso para Conselheiros Fiscais e Consultivos de Condomínio", CATEGORY.assembleias, "9BMKdNtIJtGDAPpXSOMc"],
  ["conselheiros-fiscais", "Curso para Conselheiros Fiscais de Condomínios Residenciais", CATEGORY.assembleias, "ZcAQHWQV6XdPT2AqxDqy"],
  ["presidente-mesa-assembleias", "Presidente da Mesa em Assembleias de Condomínio", CATEGORY.assembleias, "oWp0ZKnNdf7f9LveqiQe"],
  ["dinamicas-votacao-assembleias", "Dinâmicas de Votação e Preparação de Assembleias Condominiais", CATEGORY.assembleias, "HcafIZENhIwLMqhMwjcX"],
  ["procuracoes-assembleias-condominios", "Procurações em Assembleias de Condomínios", CATEGORY.assembleias, "iJQSUopeXRwE5LYEOddE"],
  ["relacionamento-conselho-fiscal-consultivo", "Relacionamento com o Conselho Fiscal e Consultivo", CATEGORY.assembleias, "bd5GvC5LJulmlSfgjTu1"],
  ["subsindicos-condominios-residenciais", "Curso Completo para Subsíndicos de Condomínios Residenciais", CATEGORY.assembleias, "0f71ttYrSJ6S2L9FhvyZ"],
  ["apresentando-resultados-da-gestao", "Apresentando os Resultados da Gestão ao Final de Cada Ano", CATEGORY.assembleias, "5eIkK2ah7opw3x0Ja9bD"],
  ["porteiro-alta-performance", "Como se Tornar um Porteiro Condominial de Alta Performance", CATEGORY.operacao, "PaaFEpSThYHjY427bBWW"],
  ["zelador-alta-performance", "Zelador Condominial de Alta Performance", CATEGORY.operacao, "XZxxojlhhn7mQg1hGyJt"],
  ["limpeza-alta-performance", "Curso de Limpeza de Alta Performance", CATEGORY.operacao, "Bk4pUQ5hHyfYKZdQNqmg"],
];

/** Atributos editoriais definidos na migration 20260730144441. */
const EDITORIAL: Record<
  string,
  { subtitle: string; description: string; level: string; duration: number; featured?: boolean }
> = {
  "conselheiros-fiscais": {
    subtitle: "Fiscalização de contas com segurança jurídica",
    description:
      "Aula interativa completa sobre o papel do conselho fiscal: análise de prestação de contas, pareceres, responsabilidades legais e boas práticas de fiscalização.",
    level: "Intermediário",
    duration: 90,
    featured: true,
  },
  "porteiro-alta-performance": {
    subtitle: "Excelência na portaria",
    description:
      "Formação interativa para porteiros: controle de acesso, comunicação, postura profissional e rotinas de alta performance.",
    level: "Iniciante",
    duration: 80,
  },
  "ia-gestao-condominial": {
    subtitle: "Produtividade com IA no dia a dia do síndico",
    description:
      "Como usar IA para automatizar comunicação, análises financeiras, atas e atendimento na gestão de condomínios.",
    level: "Intermediário",
    duration: 100,
    featured: true,
  },
  "sindico-profissional": {
    subtitle: "Da base à atuação profissional",
    description:
      "Trilha interativa completa para quem quer atuar como síndico profissional: legislação, finanças, pessoas e operação.",
    level: "Intermediário",
    duration: 120,
    featured: true,
  },
  "captacao-clientes-sindicos": {
    subtitle: "Comercial e posicionamento",
    description:
      "Estratégias práticas de prospecção, proposta comercial, precificação e posicionamento para síndicos profissionais.",
    level: "Avançado",
    duration: 75,
  },
  "limpeza-alta-performance": {
    subtitle: "Padrões e produtividade na conservação",
    description:
      "Técnicas, produtos, segurança e rotinas de limpeza profissional em áreas comuns de condomínios.",
    level: "Iniciante",
    duration: 70,
  },
  "oratoria-sindicos": {
    subtitle: "Conduza assembleias com autoridade",
    description:
      "Como falar em público, conduzir assembleias, lidar com objeções e comunicar decisões difíceis.",
    level: "Intermediário",
    duration: 60,
  },
};

const globalCourses: Row[] = LEARNING_STUDIO.map(([slug, title, category_id, code], i) => {
  const ed = EDITORIAL[slug];
  return {
    id: `course-${slug}`,
    slug,
    title,
    subtitle: ed?.subtitle ?? null,
    description: ed?.description ?? null,
    cover_url: COVERS[slug] ?? null,
    banner_url: COVERS[slug] ?? null,
    instructor_name: "SíndicoLab",
    instructor_bio: null,
    duration_minutes: ed?.duration ?? null,
    level: ed?.level ?? null,
    category_id,
    owner_org_id: null,
    visibility: "global",
    status: "published",
    delivery_type: "learning_studio_embed",
    embed_url: `https://learningstudioai.com/share/${code}`,
    external_checkout_url: null,
    is_featured: !!ed?.featured,
    is_required: false,
    created_at: iso(240 - i * 4),
    updated_at: iso(20),
  };
});

/** Curso exclusivo de tenant (Guarida) — usado nos testes de isolamento do README. */
const guaridaCourse: Row = {
  id: "course-atendimento-guarida",
  slug: "atendimento-guarida",
  title: "Atendimento Guarida",
  subtitle: "Programa interno da Guarida Administradora",
  description:
    "Conteúdo exclusivo da Guarida Administradora para as equipes de atendimento e para os síndicos parceiros. Visível apenas para membros da organização.",
  cover_url: null,
  banner_url: null,
  instructor_name: "Guarida Administradora",
  instructor_bio: null,
  duration_minutes: 85,
  level: "Intermediário",
  category_id: CATEGORY.carreira,
  owner_org_id: ORG.guarida,
  visibility: "exclusive",
  status: "published",
  delivery_type: "learning_studio_embed",
  embed_url: "https://learningstudioai.com/share/efbbbdbd5514",
  external_checkout_url: null,
  is_featured: false,
  is_required: true,
  created_at: iso(180),
  updated_at: iso(25),
};

/** Curso arquivado pela migration 20260817202331 — permanece no admin como histórico. */
const archivedCourse: Row = {
  id: "course-tecnologia-comunicacao-condominial",
  slug: "tecnologia-comunicacao-condominial",
  title: "Revolução da Tecnologia e Comunicação na Gestão Condominial",
  subtitle: "Ferramentas digitais para condomínios",
  description:
    "Panorama de tecnologias, canais digitais e comunicação eficiente entre síndico, moradores e equipe.",
  cover_url: null,
  banner_url: null,
  instructor_name: "SíndicoLab",
  instructor_bio: null,
  duration_minutes: 65,
  level: "Iniciante",
  category_id: CATEGORY.ia,
  owner_org_id: null,
  visibility: "global",
  status: "archived",
  delivery_type: "learning_studio_embed",
  embed_url: "https://learningstudioai.com/share/BBEcHIFU2prw3KbfxgJw",
  external_checkout_url: null,
  is_featured: false,
  is_required: false,
  created_at: iso(300),
  updated_at: iso(60),
};

export const courses: Row[] = [...globalCourses, guaridaCourse, archivedCourse];

/* --------------------------- módulos e aulas ---------------------------- */

export const course_modules: Row[] = [];
export const course_lessons: Row[] = [];
export const course_materials: Row[] = [];

courses
  .filter((c) => c.status === "published")
  .forEach((c) => {
    const moduleId = `mod-${c.slug}`;
    course_modules.push({
      id: moduleId,
      course_id: c.id,
      title: "Conteúdo do curso",
      description: "Experiência completa do curso em formato interativo",
      sort_order: 1,
      created_at: c.created_at,
    });
    course_lessons.push({
      id: `les-${c.slug}`,
      course_id: c.id,
      module_id: moduleId,
      slug: "aula-completa",
      title: `Curso completo — ${c.title}`,
      description: "Percorra os capítulos no seu ritmo.",
      // Learning Studio: a aula aponta para o embed real do curso.
      video_url: c.embed_url,
      video_provider: null,
      video_id: null,
      duration_seconds: (c.duration_minutes ?? 60) * 60,
      sort_order: 1,
      is_preview: true,
      created_at: c.created_at,
    });
  });

/* ---------------------- catálogo por organização ----------------------- */

const published = courses.filter((c) => c.status === "published" && c.visibility === "global");

export const organization_course_catalog: Row[] = [
  // SíndicoLab e CASA recebem todo o acervo global (migration 20260817202331).
  ...published.map((c, i) => ({ id: `occ-lab-${i}`, organization_id: ORG.sindicolab, course_id: c.id, is_visible: true, created_at: iso(200) })),
  ...published.map((c, i) => ({ id: `occ-casa-${i}`, organization_id: ORG.casa, course_id: c.id, is_visible: true, created_at: iso(120) })),
  // Guarida: acervo global + o curso exclusivo da própria organização.
  ...published.map((c, i) => ({ id: `occ-gua-${i}`, organization_id: ORG.guarida, course_id: c.id, is_visible: true, created_at: iso(150) })),
  { id: "occ-gua-excl", organization_id: ORG.guarida, course_id: guaridaCourse.id, is_visible: true, created_at: iso(150) },
];

/* ----------------------- pessoas, papéis e acessos ---------------------- */

export const USERS = {
  platformAdmin: "user-admin-sindicolab",
  orgAdminGuarida: "user-admin-guarida",
  studentCasa: "user-aluno-casa",
  gabriel: "user-gabriel",
  mari: "user-mari",
} as const;

export const profiles: Row[] = [
  { id: USERS.platformAdmin, email: "admin@sindicolab.demo", full_name: "Administração SíndicoLab", avatar_url: null, created_at: iso(700) },
  { id: USERS.orgAdminGuarida, email: "admin@guarida.demo", full_name: "Administração Guarida", avatar_url: null, created_at: iso(320) },
  { id: USERS.studentCasa, email: "aluno@vista-alegre.demo", full_name: "Aluno Vista Alegre", avatar_url: null, created_at: iso(60) },
  { id: USERS.gabriel, email: "gabriel@studiomarqo.com.br", full_name: "Gabriel Reus — Studio Marqo", avatar_url: null, created_at: iso(700) },
  { id: USERS.mari, email: "mari@sindicolab.com", full_name: "Mari — SíndicoLab", avatar_url: null, created_at: iso(500) },
];

export const organization_memberships: Row[] = [
  { id: "mem-platform", organization_id: ORG.sindicolab, user_id: USERS.platformAdmin, role: "platform_admin", is_active: true, created_at: iso(700) },
  { id: "mem-guarida", organization_id: ORG.guarida, user_id: USERS.orgAdminGuarida, role: "org_admin", is_active: true, created_at: iso(320) },
  { id: "mem-casa", organization_id: ORG.casa, user_id: USERS.studentCasa, role: "student", is_active: true, created_at: iso(60) },
  { id: "mem-gabriel", organization_id: ORG.sindicolab, user_id: USERS.gabriel, role: "platform_admin", is_active: true, created_at: iso(700) },
  { id: "mem-mari", organization_id: ORG.sindicolab, user_id: USERS.mari, role: "platform_admin", is_active: true, created_at: iso(500) },
];

export const organization_invites: Row[] = [
  { id: "inv-1", organization_id: ORG.guarida, email: "novo.coordenador@guarida.demo", role: "org_admin", status: "pending", created_at: iso(9), expires_at: null },
];

export const access_requests: Row[] = [
  {
    id: "req-1",
    email: "interessada@condominio.com.br",
    full_name: "Ana Interessada",
    organization_id: ORG.sindicolab,
    status: "pending",
    message: "Gostaria de acesso à Academy para minha equipe.",
    created_at: iso(5),
  },
];

/* ------------------ progresso e interações do aluno demo ---------------- */

const s1 = "course-ia-gestao-condominial";
const s2 = "course-conselheiros-fiscais";
const s3 = "course-porteiro-alta-performance";

export const enrollments: Row[] = [
  { id: "enr-1", user_id: USERS.studentCasa, course_id: s1, status: "active", created_at: iso(20) },
  { id: "enr-2", user_id: USERS.studentCasa, course_id: s2, status: "active", created_at: iso(11) },
];

export const course_entitlements: Row[] = [
  { id: "ent-1", user_id: USERS.studentCasa, course_id: s3, expires_at: null, created_at: iso(8) },
];

export const course_progress: Row[] = [
  { id: "cp-1", user_id: USERS.studentCasa, course_id: s1, percent: 42, open_count: 7, first_opened_at: iso(20), last_accessed_at: iso(1), updated_at: iso(1) },
  { id: "cp-2", user_id: USERS.studentCasa, course_id: s2, percent: 12, open_count: 2, first_opened_at: iso(11), last_accessed_at: iso(4), updated_at: iso(4) },
];

export const lesson_progress: Row[] = [
  { id: "lp-1", user_id: USERS.studentCasa, course_id: s1, lesson_id: "les-ia-gestao-condominial", completed_at: null, updated_at: iso(1) },
];

export const course_reviews: Row[] = [
  { id: "rev-1", course_id: s1, user_id: USERS.studentCasa, organization_id: ORG.casa, rating: 5, comment: "Conteúdo direto ao ponto.", created_at: iso(6) },
  { id: "rev-2", course_id: s2, user_id: USERS.studentCasa, organization_id: ORG.casa, rating: 4, comment: "Muito aplicável no dia a dia.", created_at: iso(15) },
];

export const user_course_list: Row[] = [
  { id: "ucl-1", user_id: USERS.studentCasa, organization_id: ORG.casa, course_id: "course-sindico-profissional", created_at: iso(7) },
];

export const course_comments: Row[] = [];
export const lesson_comments: Row[] = [];

/* --------------------------- acessos de demo ---------------------------- */

/**
 * Contas de demonstração documentadas no README do repositório da Academy.
 * São SOMENTE para a demonstração antes da conexão definitiva do banco.
 */
export const DEMO_ACCOUNTS: {
  email: string;
  password: string;
  role: "platform_admin" | "org_admin" | "student";
  organization: string;
  label: string;
}[] = [
  { email: "admin@sindicolab.demo", password: "SindicoLab#2026", role: "platform_admin", organization: "SíndicoLab", label: "Administração da plataforma" },
  { email: "admin@guarida.demo", password: "Guarida#2026", role: "org_admin", organization: "Guarida Administradora", label: "Administração da organização" },
  { email: "aluno@vista-alegre.demo", password: "Vista#2026", role: "student", organization: "Administradora CASA", label: "Aluno" },
];
