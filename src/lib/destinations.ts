export type Destination = {
  key: "quero1" | "portal" | "play" | "materiais" | "patrocinios" | "quem-somos";
  number: string;
  category: string;
  title: string;
  short: string;
  description: string;
  cta: string;
  href: string;
  external: boolean;
  accent: "brand" | "cyan" | "violet" | "ink" | "editorial";
};

export const destinations: Destination[] = [
  {
    key: "quero1",
    number: "01",
    category: "Plataforma de síndicos profissionais",
    title: "Encontre um síndico profissional para o seu condomínio",
    short: "Síndicos profissionais avaliados, próximos da sua região e prontos para atender o seu condomínio.",
    description: "Quero1Síndico conecta condomínios, conselheiros e moradores a profissionais verificados e com cobertura nacional.",
    cta: "Encontrar síndico profissional",
    href: "https://quero1sindico.com/",
    external: true,
    accent: "brand",
  },
  {
    key: "portal",
    number: "02",
    category: "Portal de conteúdo condominial",
    title: "Leia conteúdos sobre gestão, segurança e comportamento condominial",
    short: "Notícias, análises e casos reais para síndicos, conselheiros e moradores.",
    description: "Acompanhe o que está em alta no mercado condominial brasileiro com curadoria editorial do SíndicoLab.",
    cta: "Acessar portal",
    href: "/portal",
    external: false,
    accent: "editorial",
  },
  {
    key: "play",
    number: "03",
    category: "Cursos para síndicos",
    title: "Faça cursos para síndicos e evolua na gestão condominial",
    short: "Aulas, trilhas e formações para profissionais do mercado condominial.",
    description: "Conteúdo prático em finanças, jurídico, manutenção, liderança e inteligência condominial.",
    cta: "Ver cursos para síndicos",
    href: "/play",
    external: false,
    accent: "cyan",
  },
  {
    key: "materiais",
    number: "04",
    category: "E-books e estudos exclusivos",
    title: "E-books e estudos únicos e exclusivos para o mercado condominial",
    short: "Conteúdos e publicações desenvolvidos especialmente para o setor condominial.",
    description: "Biblioteca de e-books e estudos exclusivos para apoiar decisões, assembleias e a gestão condominial.",
    cta: "Acessar e-books e estudos",
    href: "/materiais",
    external: false,
    accent: "ink",
  },
  {
    key: "patrocinios",
    number: "05",
    category: "Mídia, workshops e patrocínio condominial",
    title: "Patrocine experiências com decisores do mercado condominial",
    short: "Aproxime sua marca de síndicos, gestores e profissionais em workshops e ações de relacionamento.",
    description: "Mídia kit CondoHuby + SíndicoLab: agenda, formatos, audiência e oportunidades de patrocínio.",
    cta: "Ver mídia kit",
    href: "/patrocinios",
    external: false,
    accent: "violet",
  },
];

// Apoiadores/parceiros oficiais — usados pelo componente Sponsors,
// que renderiza os logos reais (ver src/components/site/Sponsors.tsx).
export const sponsors = [
  "Atlas Schindler",
  "BBZ",
  "CondoHuby",
  "Focus Media",
  "MLG Pinturas & Construções",
  "Damas e Reis da Limpeza — Diluidores",
];

