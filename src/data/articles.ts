// Catálogo editorial fake do Portal SíndicoLab.
// Imagens carregadas externamente (Unsplash) para não inflar o bundle.

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  readTime: string;
  publishedAt: string; // human readable
  image: string;
  imageAlt: string;
  content: ArticleBlock[];
  relatedSlugs?: string[];
};

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const articles: Article[] = [
  {
    slug: "portaria-remota-o-que-avaliar",
    title: "Portaria remota: o que avaliar antes de implantar",
    excerpt:
      "Antes de contratar uma solução de portaria remota, condomínios precisam avaliar infraestrutura, rotina dos moradores, perfil do prédio e responsabilidade da empresa.",
    category: "Segurança condominial",
    author: "Redação SíndicoLab",
    readTime: "5 min",
    publishedAt: "Hoje",
    image: u("photo-1582719478250-c89cae4dc85b"),
    imageAlt: "Portaria remota em condomínio residencial com câmeras de monitoramento",
    content: [
      { type: "p", text: "A portaria remota é uma das transformações mais relevantes da gestão condominial dos últimos anos. Com adoção crescente em prédios verticais e condomínios de alto padrão, ela promete reduzir custo, padronizar processos e aumentar o controle de acesso. Mas a transição não é trivial: exige planejamento técnico, comunicação com moradores e contratos bem desenhados." },
      { type: "h2", text: "Quando a portaria remota faz sentido" },
      { type: "p", text: "Não existe regra universal. Em geral, condomínios com fluxo médio de visitantes, infraestrutura mínima de rede e síndico engajado em comunicação tendem a colher os melhores resultados. Já prédios com perfil idoso, fluxo intenso de entregadores e prestadores ou histórico de tensão entre moradores precisam de uma transição mais cuidadosa." },
      { type: "h2", text: "O que o síndico precisa conferir antes da implantação" },
      { type: "ul", items: [
        "Capacidade de internet redundante (link principal e backup).",
        "Sistema de no-break para câmeras, fechaduras e interfones.",
        "Auditoria do CFTV existente e blindagem física da guarita.",
        "Contrato com SLA claro de tempo de resposta e responsabilidade civil.",
      ]},
      { type: "h2", text: "Riscos comuns na transição" },
      { type: "p", text: "O maior erro é tratar portaria remota como simples troca de fornecedor. A operação é diferente: porteiro físico vira operador remoto; o tempo de atendimento muda; a relação com o morador é mediada por telas e áudio. Sem comunicação clara, o condomínio enfrenta semanas de reclamações, mesmo quando o sistema funciona perfeitamente." },
      { type: "h2", text: "Como comunicar os moradores" },
      { type: "p", text: "Antes da implantação, faça assembleia explicando o porquê, o como e o quando. Distribua um guia visual com fluxos: entrega, visita, prestador, mudança. Nas primeiras quatro semanas, mantenha canal direto com a empresa para tratar fricções pontuais." },
      { type: "h2", text: "Checklist inicial para o condomínio" },
      { type: "ul", items: [
        "Diagnóstico técnico (rede, energia, CFTV).",
        "Pesquisa de satisfação dos moradores antes da troca.",
        "Aprovação em assembleia com quórum qualificado.",
        "Plano de comunicação de 90 dias.",
        "Indicadores de acompanhamento: tempo de atendimento, ocorrências, NPS.",
      ]},
    ],
    relatedSlugs: ["camera-ia-lgpd", "plano-evacuacao"],
  },
  {
    slug: "10-desafios-sindico-2026",
    title: "Os 10 maiores desafios do síndico profissional em 2026",
    excerpt:
      "Inadimplência, segurança, ESG, sucessão, tecnologia e o futuro das assembleias híbridas no mercado condominial brasileiro.",
    category: "Reportagem especial",
    author: "Redação SíndicoLab",
    readTime: "12 min",
    publishedAt: "Hoje",
    image: u("photo-1486406146926-c627a92ad1ab"),
    imageAlt: "Edifícios residenciais altos representando o mercado condominial brasileiro",
    content: [
      { type: "p", text: "O ano de 2026 marca uma virada simbólica no mercado condominial brasileiro: pela primeira vez, mais da metade dos condomínios verticais com mais de 80 unidades é gerida por um síndico profissional contratado. A profissionalização do síndico, antes uma exceção em capitais, virou padrão em pelo menos 14 cidades do país." },
      { type: "h2", text: "1. Inadimplência estrutural" },
      { type: "p", text: "A inadimplência condominial deixou de ser sazonal. Mesmo em ciclos econômicos favoráveis, condomínios convivem com 6% a 12% de unidades em atraso recorrente. O síndico precisa dominar cobrança extrajudicial, negociação ativa e Lei 14.905/24." },
      { type: "h2", text: "2. Segurança em camadas" },
      { type: "p", text: "A discussão saiu do binômio portaria física vs remota e migrou para arquitetura de segurança em camadas: perímetro, acesso, áreas comuns, garagem e moradores. CFTV com IA e biometria são padrão; LGPD é o limitador." },
      { type: "h2", text: "3. ESG no condomínio" },
      { type: "p", text: "Eficiência energética, mercado livre, gestão de resíduos e acessibilidade entram nas pautas obrigatórias de assembleia. Bancos de financiamento já condicionam taxas a critérios ESG do prédio." },
      { type: "h2", text: "4. Tecnologia e dados" },
      { type: "p", text: "O síndico moderno é também um curador de dados. Ferramentas de gestão entregam dashboards, mas a leitura crítica continua sendo do humano." },
      { type: "h2", text: "5. Assembleias híbridas com validade jurídica" },
      { type: "p", text: "A jurisprudência consolidou validade das assembleias híbridas, mas exige rigor: convocação por dois canais, identificação de presença, gravação e ata digital assinada." },
    ],
    relatedSlugs: ["portaria-remota-o-que-avaliar", "novo-perfil-sindico-2026"],
  },
  {
    slug: "novo-perfil-sindico-2026",
    title: "O novo perfil do síndico profissional brasileiro em 2026",
    excerpt: "Pesquisa anual mostra alta de profissionalização e redução do síndico morador.",
    category: "Mercado",
    author: "Redação SíndicoLab",
    readTime: "8 min",
    publishedAt: "Ontem",
    image: u("photo-1521737604893-d14cc237f11d"),
    imageAlt: "Síndico profissional analisando documentos e indicadores de gestão condominial",
    content: [
      { type: "p", text: "A pesquisa anual SíndicoLab/CondoHub ouviu 1.842 síndicos em 27 estados. Os dados mostram aceleração da profissionalização e mudança no perfil etário, de gênero e de formação." },
      { type: "h2", text: "Quem é o síndico de 2026" },
      { type: "p", text: "Idade média: 44 anos. Mulheres já representam 51% da base profissional. Formação predominante: administração, direito e engenharia. Renda média mensal por mandato: R$ 7.200, com o topo do mercado superando R$ 25 mil." },
      { type: "h2", text: "O que mudou em relação a 2024" },
      { type: "ul", items: [
        "Crescimento de 38% na carteira média por síndico profissional.",
        "Queda de 17% no número de síndicos morador em prédios acima de 80 unidades.",
        "Adoção de ferramentas digitais de gestão por 89% dos profissionais.",
      ]},
      { type: "h2", text: "Os gargalos" },
      { type: "p", text: "Apesar do avanço, três gargalos seguem firmes: regulamentação da profissão, padronização de contratos e formação continuada acessível em cidades do interior." },
    ],
    relatedSlugs: ["10-desafios-sindico-2026", "como-conduzir-assembleia"],
  },
  {
    slug: "como-conduzir-assembleia",
    title: "Como conduzir uma assembleia sem rachar o prédio",
    excerpt: "Roteiro de mediação, votação e atas para reuniões com pautas polêmicas.",
    category: "Assembleias",
    author: "Camila Reis",
    readTime: "6 min",
    publishedAt: "2 dias atrás",
    image: u("photo-1577962917302-cd874c4e31d2"),
    imageAlt: "Assembleia condominial com moradores discutindo votação em mesa coletiva",
    content: [
      { type: "p", text: "Pautas como reforma de fachada, troca de portaria e aumento de taxa têm potencial de rachar a convivência por meses. O papel do síndico é mediar — não vencer." },
      { type: "h2", text: "Antes da assembleia" },
      { type: "p", text: "Convocação clara, com pautas separadas, materiais técnicos disponíveis com pelo menos 7 dias de antecedência e abertura de canal para dúvidas escritas." },
      { type: "h2", text: "Durante" },
      { type: "p", text: "Tempo de fala controlado, ata em tempo real projetada, votação por pauta, registro audiovisual." },
      { type: "h2", text: "Depois" },
      { type: "p", text: "Comunicação oficial em até 72h, ata assinada digitalmente e plano de execução dos itens aprovados." },
    ],
    relatedSlugs: ["10-desafios-sindico-2026"],
  },
  {
    slug: "camera-ia-lgpd",
    title: "Câmeras com IA: o que a LGPD permite (e o que não)",
    excerpt: "Reconhecimento facial, leitura de placa e analytics de comportamento têm limites legais.",
    category: "Segurança condominial",
    author: "Dr. Paulo S.",
    readTime: "6 min",
    publishedAt: "3 dias atrás",
    image: u("photo-1557597774-9d273605dfa9"),
    imageAlt: "Câmeras de segurança modernas com IA monitorando área comum de condomínio",
    content: [
      { type: "p", text: "A LGPD não proíbe câmeras inteligentes em condomínios — disciplina o uso. Reconhecimento facial, em particular, exige base legal robusta, finalidade específica, retenção limitada e governança documentada." },
      { type: "h2", text: "Bases legais aplicáveis" },
      { type: "p", text: "Em condomínio, a base mais comum é o legítimo interesse, mas exige relatório de impacto (RIPD) e, em alguns casos, consentimento específico." },
      { type: "h2", text: "O que evitar" },
      { type: "ul", items: [
        "Compartilhar imagens em grupos de WhatsApp.",
        "Reter vídeo por mais tempo do que a finalidade exige.",
        "Usar reconhecimento facial sem RIPD.",
      ]},
    ],
    relatedSlugs: ["portaria-remota-o-que-avaliar"],
  },
  {
    slug: "plano-evacuacao",
    title: "Plano de evacuação: o que todo síndico precisa ter pronto",
    excerpt: "Da brigada à sinalização, o plano que evita pânico em emergências.",
    category: "Segurança condominial",
    author: "Redação",
    readTime: "5 min",
    publishedAt: "4 dias atrás",
    image: u("photo-1504917595217-d4dc5ebe6122"),
    imageAlt: "Sinalização de saída de emergência em corredor de condomínio",
    content: [
      { type: "p", text: "Plano de evacuação não é documento de gaveta: é treinamento ativo e responsabilidade civil. Síndico que negligencia responde solidariamente." },
      { type: "h2", text: "Itens obrigatórios" },
      { type: "ul", items: [
        "Brigada treinada e renovada anualmente.",
        "Sinalização luminosa funcional.",
        "Mapa de rota afixado em todos os pavimentos.",
        "Simulado anual com participação dos moradores.",
      ]},
    ],
  },
  {
    slug: "pets-barulho-condominio",
    title: "Pets, barulho e convivência em condomínio",
    excerpt: "Mediação, multa e regimento — o que funciona e o que vira processo.",
    category: "Comportamento condominial",
    author: "Camila Reis",
    readTime: "4 min",
    publishedAt: "5 dias atrás",
    image: u("photo-1507146426996-ef05306b995a"),
    imageAlt: "Cachorro em área comum de condomínio com moradores ao redor",
    content: [
      { type: "p", text: "Pets e barulho lideram as ocorrências em condomínios verticais. Boa parte se resolve com mediação ativa, antes de qualquer multa." },
      { type: "h2", text: "Mediação primeiro" },
      { type: "p", text: "Conversa estruturada, escuta dos dois lados e proposta de solução. Multa só após esgotada a tentativa de acordo, com base em regimento atualizado." },
    ],
  },
  {
    slug: "reduziu-conta-agua",
    title: "Como um síndico reduziu 38% da conta de água",
    excerpt: "Caso real: medição individualizada, vazamentos e mudança de comportamento.",
    category: "Casos reais",
    author: "Lucas Vieira",
    readTime: "6 min",
    publishedAt: "1 semana atrás",
    image: u("photo-1581094288338-2314dddb7ece"),
    imageAlt: "Síndico inspecionando hidrômetros e tubulações de água em condomínio",
    content: [
      { type: "p", text: "O Edifício Aurora, em Curitiba, reduziu 38% da conta de água em 14 meses. O método combinou três frentes." },
      { type: "h2", text: "1. Medição individualizada" },
      { type: "p", text: "Instalação de hidrômetros por unidade, com leitura mensal automatizada." },
      { type: "h2", text: "2. Caça-vazamentos" },
      { type: "p", text: "Diagnóstico pavimento por pavimento revelou três vazamentos não-aparentes responsáveis por 11% do consumo." },
      { type: "h2", text: "3. Comunicação" },
      { type: "p", text: "Comparativos mensais por torre, com ranking público (anonimizado) e premiação simbólica para a torre mais econômica." },
    ],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
export const articleBySlug = (slug: string) => getArticle(slug);
