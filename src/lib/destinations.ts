export type Destination = {
  key: "quero1" | "portal" | "play" | "materiais" | "contato";
  number: string;
  title: string;
  short: string;
  description: string;
  cta: string;
  href: string;
  external: boolean;
  accent: "brand" | "cyan" | "violet" | "ink";
};

export const destinations: Destination[] = [
  {
    key: "quero1",
    number: "01",
    title: "Quero1Síndico",
    short: "Encontre um síndico profissional para o seu condomínio.",
    description:
      "Plataforma que conecta condomínios, conselheiros e moradores a síndicos profissionais avaliados.",
    cta: "Encontrar síndico profissional",
    href: "https://quero1sindico.com/",
    external: true,
    accent: "brand",
  },
  {
    key: "portal",
    number: "02",
    title: "Portal SíndicoLab",
    short: "Conteúdo de gestão condominial e mercado.",
    description:
      "Notícias, análises e artigos sobre administração de condomínio, assembleias e tendências do setor.",
    cta: "Ler conteúdo condominial",
    href: "/portal",
    external: false,
    accent: "ink",
  },
  {
    key: "play",
    number: "03",
    title: "SíndicoLab Play",
    short: "Cursos para síndicos e profissionais do setor.",
    description:
      "Formações práticas em gestão condominial, finanças, manutenção, jurídico e liderança.",
    cta: "Acessar cursos para síndicos",
    href: "/play",
    external: false,
    accent: "cyan",
  },
  {
    key: "materiais",
    number: "04",
    title: "Materiais e Downloads",
    short: "Modelos e guias para o dia a dia do condomínio.",
    description:
      "Modelos de atas, regimentos, checklists e materiais práticos para apoiar decisões e rotinas.",
    cta: "Baixar materiais para condomínio",
    href: "/materiais",
    external: false,
    accent: "violet",
  },
  {
    key: "contato",
    number: "05",
    title: "Relacionamento",
    short: "Parcerias, imprensa e relacionamento com o ecossistema.",
    description: "Fale com o time SíndicoLab para projetos, parcerias e apoio institucional.",
    cta: "Falar com o time",
    href: "mailto:contato@sindicolab.com",
    external: true,
    accent: "ink",
  },
];

export const sponsors = [
  "CondoHuby",
  "BBZ",
  "Focus Media",
  "CBE",
  "Atlas Schindler",
  "Síndico Advanced",
  "DGT",
  "Guarida",
  "Studio Marqo",
];
