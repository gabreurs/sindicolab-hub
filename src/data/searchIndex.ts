export type SearchItem = {
  id: string;
  title: string;
  description: string;
  category: "Produto" | "Portal" | "Cursos" | "Materiais" | "Páginas" | "Tema";
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
  { id: "c-sindico-alta-performance", title: "Síndico Alta Performance", description: "Formação para elevar a atuação e a gestão do síndico profissional.", category: "Cursos", type: "internal", href: "/academy/curso/sindico-alta-performance", priority: 82, keywords: ["curso", "síndico", "sindico", "alta performance", "carreira", "gestão"] },
  { id: "c-inteligencia-condominial", title: "Inteligência Condominial", description: "Curso da SíndicoLab Academy sobre inteligência aplicada ao condomínio.", category: "Cursos", type: "internal", href: "/academy/curso/inteligencia-condominial", priority: 80, keywords: ["curso", "inteligência", "condominial", "tecnologia", "ia"] },
  { id: "c-inteligencia-condominial-2", title: "Inteligência Condominial Pt. II", description: "Continuação da formação em inteligência aplicada à gestão condominial.", category: "Cursos", type: "internal", href: "/academy/curso/inteligencia-condominial-pt-2", priority: 79, keywords: ["curso", "inteligência", "condominial", "parte 2", "ia"] },
  { id: "c-captar-clientes", title: "Como Captar Mais Clientes", description: "Estratégias para ampliar a carteira do síndico profissional.", category: "Cursos", type: "internal", href: "/academy/curso/como-captar-mais-clientes", priority: 78, keywords: ["curso", "clientes", "captação", "vendas", "síndico profissional"] },
  { id: "c-conselheiros", title: "Conselheiros", description: "Formação prática para conselheiros condominiais.", category: "Cursos", type: "internal", href: "/academy/curso/conselheiros", priority: 74, keywords: ["curso", "conselho", "conselheiro", "fiscal", "condomínio"] },
  { id: "c-oratoria-vendas", title: "Oratória & Vendas", description: "Comunicação e vendas para profissionais do mercado condominial.", category: "Cursos", type: "internal", href: "/academy/curso/oratoria-e-vendas", priority: 73, keywords: ["curso", "oratória", "comunicação", "vendas", "negociação"] },
  { id: "c-zelador", title: "Zelador de Excelência", description: "Capacitação para zeladores e equipes operacionais.", category: "Cursos", type: "internal", href: "/academy/curso/zelador-de-excelencia", priority: 72, keywords: ["curso", "zelador", "operação", "funcionário", "equipe"] },
  { id: "c-limpeza", title: "Limpeza Alta Performance", description: "Boas práticas de limpeza para equipes condominiais.", category: "Cursos", type: "internal", href: "/academy/curso/limpeza-alta-performance-play", priority: 71, keywords: ["curso", "limpeza", "equipe", "operação", "condomínio"] },
  { id: "c-controlador", title: "Controlador de Acessos", description: "Capacitação em controle de acesso e segurança condominial.", category: "Cursos", type: "internal", href: "/academy/curso/controlador-de-acessos", priority: 71, keywords: ["curso", "controlador", "acesso", "portaria", "segurança"] },
  { id: "p-assembleias-virtuais", title: "Nova lei das assembleias virtuais", description: "O que muda para os condomínios.", category: "Portal", type: "internal", href: "/portal/noticia/nova-lei-das-assembleias-virtuais", priority: 66, keywords: ["notícia", "lei", "assembleia", "virtual", "votação"] },
  { id: "p-inadimplencia", title: "Inadimplência recua pelo 3º mês seguido", description: "Dados e análise do índice nacional.", category: "Portal", type: "internal", href: "/portal/noticia/inadimplencia-recua-terceiro-mes", priority: 65, keywords: ["notícia", "inadimplência", "cobrança", "finanças"] },
  { id: "p-elevadores", title: "Manutenção preventiva de elevadores", description: "Como reduzir falhas e custos em até 30%.", category: "Portal", type: "internal", href: "/portal/noticia/manutencao-preventiva-elevadores", priority: 64, keywords: ["notícia", "elevador", "manutenção", "custos", "predial"] },
  { id: "p-convivencia", title: "Convivência entre moradores", description: "Como evitar conflitos frequentes no condomínio.", category: "Portal", type: "internal", href: "/portal/noticia/convivencia-entre-moradores", priority: 63, keywords: ["notícia", "morador", "convivência", "conflito", "regras"] },
  { id: "p-checklist", title: "Checklist mensal do síndico", description: "15 tarefas que não podem faltar na rotina de gestão.", category: "Portal", type: "internal", href: "/portal/noticia/checklist-mensal-do-sindico", priority: 63, keywords: ["notícia", "checklist", "síndico", "rotina", "tarefas"] },
  { id: "p-energia", title: "Reduzir contas de luz em áreas comuns", description: "Economia sem perder conforto no condomínio.", category: "Portal", type: "internal", href: "/portal/noticia/reduzir-contas-luz-areas-comuns", priority: 62, keywords: ["notícia", "energia", "luz", "economia", "área comum"] },
];

export const popularSearches = [
  { label: "Resolver uma demanda de gestão", href: "/materiais" },
  { label: "Desenvolver minha carreira", href: "/academy/catalogo" },
  { label: "Acompanhar o mercado condominial", href: "/portal" },
  { label: "Encontrar síndico profissional", href: "https://quero1sindico.com/", external: true },
  { label: "Conhecer eventos e conexões", href: "/eventos" },
];

// placeholder analytics
export function trackSearch(query: string, result?: { id: string; href: string }) {
  if (typeof window === "undefined") return;
  // hook: integrar com analytics futuramente
  // console.debug("[search]", query, result);
}
