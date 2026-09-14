export type SearchItem = {
  id: string;
  title: string;
  description: string;
  category: "Produto" | "Portal" | "Cursos" | "Materiais" | "Patrocínios" | "Páginas" | "Tema";
  type: "internal" | "external";
  href: string;
  priority: number;
  keywords: string[];
  icon?: string;
};

export const searchIndex: SearchItem[] = [
  {
    id: "quero1sindico",
    title: "Encontrar síndico profissional",
    description: "Acesse o Quero1Síndico e encontre síndicos profissionais avaliados.",
    category: "Produto",
    type: "external",
    href: "https://quero1sindico.com/",
    priority: 100,
    keywords: ["síndico profissional", "sindico profissional", "contratar síndico", "sindicatura", "condomínio", "assembleia", "gestão condominial", "quero1sindico", "quero 1 síndico"],
  },
  {
    id: "play",
    title: "Cursos para síndicos — SíndicoLab Academy",
    description: "Cursos, trilhas e formações para gestão condominial.",
    category: "Cursos",
    type: "internal",
    href: "/academy",
    priority: 85,
    keywords: ["curso", "cursos para síndico", "aula", "treinamento", "formação", "play", "inteligência condominial", "como captar mais clientes"],
  },
  {
    id: "materiais",
    title: "Materiais gratuitos para condomínio",
    description: "Modelos de ata, regimentos, checklists e guias práticos.",
    category: "Materiais",
    type: "internal",
    href: "/materiais",
    priority: 88,
    keywords: ["materiais", "downloads", "modelo de ata", "checklist", "regimento", "guia", "baixar"],
  },
  {
    id: "portal",
    title: "Portal de conteúdo condominial",
    description: "Conteúdo de gestão, segurança e comportamento condominial.",
    category: "Portal",
    type: "internal",
    href: "/portal",
    priority: 75,
    keywords: ["portal", "blog", "notícias", "artigos", "conteúdo condominial", "gestão condominial", "segurança", "comportamento"],
  },
  {
    id: "patrocinios",
    title: "Patrocinar experiências condominiais",
    description: "Mídia kit CondoHuby + SíndicoLab. Workshops, eventos e relacionamento.",
    category: "Patrocínios",
    type: "internal",
    href: "/patrocinios",
    priority: 70,
    keywords: ["patrocínio", "patrocinar", "mídia kit", "midia kit", "condohuby", "workshops", "eventos", "anunciar", "marca"],
  },
  {
    id: "quem-somos",
    title: "Quem é o SíndicoLab",
    description: "História, workshops, comunidade e propósito do ecossistema.",
    category: "Páginas",
    type: "internal",
    href: "/quem-somos",
    priority: 50,
    keywords: ["quem somos", "sobre", "história", "rafael bernardes", "comunidade"],
  },
  // Temas / atalhos editoriais
  { id: "t-assembleia", title: "Assembleia de condomínio", description: "Materiais e artigos sobre assembleias.", category: "Tema", type: "internal", href: "/materiais", priority: 60, keywords: ["assembleia", "convocação", "votação", "ata", "reunião"] },
  { id: "t-seguranca", title: "Segurança condominial", description: "Conteúdos e casos sobre portaria e controle de acesso.", category: "Tema", type: "internal", href: "/portal", priority: 55, keywords: ["segurança", "portaria", "controle de acesso", "câmeras"] },
  { id: "t-financas", title: "Finanças e inadimplência", description: "Orçamento, prestação de contas e inadimplência.", category: "Tema", type: "internal", href: "/academy", priority: 55, keywords: ["finanças", "orçamento", "inadimplência", "prestação de contas"] },
  { id: "t-comportamento", title: "Comportamento condominial", description: "Convivência, regras e conflitos.", category: "Tema", type: "internal", href: "/portal", priority: 50, keywords: ["comportamento", "convivência", "conflitos", "regras"] },
  { id: "t-manutencao", title: "Manutenção predial", description: "Checklists e rotinas de manutenção.", category: "Tema", type: "internal", href: "/materiais", priority: 50, keywords: ["manutenção", "predial", "elevador", "fachada"] },
];

export const popularSearches = [
  { label: "Encontrar síndico profissional", href: "https://quero1sindico.com/", external: true },
  { label: "Acessar e-books e estudos exclusivos", href: "/materiais" },
  { label: "Ver cursos para síndicos", href: "/academy" },
  { label: "Ler conteúdo sobre gestão condominial", href: "/portal" },
  { label: "Patrocinar experiências condominiais", href: "/patrocinios" },
];

// placeholder analytics
export function trackSearch(query: string, result?: { id: string; href: string }) {
  if (typeof window === "undefined") return;
  // hook: integrar com analytics futuramente
  // console.debug("[search]", query, result);
}
