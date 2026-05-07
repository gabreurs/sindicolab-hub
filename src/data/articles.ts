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
  {
    slug: "gestao-financeira-condominio",
    title: "Gestão financeira do condomínio: o que separa o amador do profissional",
    excerpt:
      "Fluxo de caixa, fundo de reserva, prestação de contas digital e indicadores que todo síndico profissional deveria acompanhar.",
    category: "Gestão condominial",
    author: "Redação SíndicoLab",
    readTime: "7 min",
    publishedAt: "1 semana atrás",
    image: u("photo-1554224155-6726b3ff858f"),
    imageAlt: "Síndico analisando relatório financeiro do condomínio com gráficos e planilhas",
    content: [
      { type: "p", text: "A diferença entre uma gestão amadora e uma gestão profissional aparece com mais nitidez nas finanças. Não é só sobre fechar o mês no azul: é sobre previsibilidade, transparência e capacidade de tomar decisão com dado." },
      { type: "h2", text: "Os três pilares" },
      { type: "ul", items: [
        "Fluxo de caixa rolante de 12 meses, atualizado semanalmente.",
        "Fundo de reserva entre 5% e 10% da arrecadação, blindado de uso operacional.",
        "Prestação de contas digital com acesso 24/7 ao morador.",
      ]},
      { type: "h2", text: "Indicadores que separam o profissional" },
      { type: "p", text: "Custo por unidade, % de inadimplência líquida, dias médios de cobrança, % do orçamento em manutenção preventiva e índice de retrabalho. Sem esses números, o síndico está navegando no escuro." },
    ],
    relatedSlugs: ["10-desafios-sindico-2026", "reduziu-conta-agua"],
  },
  {
    slug: "tecnologia-condominio-2026",
    title: "Stack tecnológico do condomínio em 2026: o que vale e o que é firula",
    excerpt:
      "App de morador, controle de acesso, CFTV com IA, IoT de utilities e BI condominial. Onde investir e onde economizar.",
    category: "Tecnologia",
    author: "Lucas Vieira",
    readTime: "8 min",
    publishedAt: "1 semana atrás",
    image: u("photo-1518770660439-4636190af475"),
    imageAlt: "Painel de controle tecnológico de condomínio inteligente com sensores IoT",
    content: [
      { type: "p", text: "A indústria condominial virou um buffet de SaaS. App de morador, gestão financeira, CFTV inteligente, IoT, BI, automação. O síndico precisa separar o que entrega valor real do que é venda sofisticada de produto." },
      { type: "h2", text: "O que vale (quase sempre)" },
      { type: "ul", items: [
        "App de morador unificando comunicação, reservas e financeiro.",
        "Controle de acesso digital integrado com CFTV.",
        "Medição individualizada de água com leitura remota.",
      ]},
      { type: "h2", text: "O que costuma virar firula" },
      { type: "p", text: "IoT de áreas comuns sem caso de uso claro, dashboards de BI sem operação por trás e portarias 100% sem humano em prédios de fluxo alto. A regra é simples: tecnologia entra para resolver problema medido, não para impressionar morador." },
    ],
    relatedSlugs: ["camera-ia-lgpd", "portaria-remota-o-que-avaliar"],
  },
  {
    slug: "esg-condominio-pratica",
    title: "ESG no condomínio: da pauta de assembleia à conta de luz",
    excerpt:
      "Mercado livre, energia solar, gestão de resíduos e acessibilidade — o que mudou de tese para prática nos últimos 24 meses.",
    category: "ESG condominial",
    author: "Camila Reis",
    readTime: "6 min",
    publishedAt: "10 dias atrás",
    image: u("photo-1509391366360-2e959784a276"),
    imageAlt: "Painéis solares instalados em cobertura de condomínio residencial",
    content: [
      { type: "p", text: "ESG saiu da apresentação de slide e entrou na conta de luz. Em 2026, condomínios que migraram para o mercado livre de energia ou instalaram geração solar reportam economia média de 22% a 38% sobre a tarifa cativa." },
      { type: "h2", text: "Os quatro vetores práticos" },
      { type: "ul", items: [
        "Mercado livre de energia para prédios acima de 500 kWh/mês de áreas comuns.",
        "Geração solar com payback médio de 5 a 7 anos.",
        "Gestão de resíduos com cooperativa local — reduz volume de lixo em até 40%.",
        "Acessibilidade: rampa, sinalização e adequação de elevador são obrigação legal, não tema ESG.",
      ]},
      { type: "h2", text: "O risco do ESG decorativo" },
      { type: "p", text: "Adesivar lixeira de seletiva sem cooperativa é greenwashing. ESG real é medido em kWh, m³ e kg — não em comunicado de assembleia." },
    ],
    relatedSlugs: ["reduziu-conta-agua", "10-desafios-sindico-2026"],
  },
  {
    slug: "juridico-sindico-2026",
    title: "Direito condominial em 2026: as 6 decisões que mudaram a rotina do síndico",
    excerpt:
      "STJ, Lei 14.905/24 e jurisprudência consolidada sobre assembleia híbrida, multa, animais e responsabilidade do síndico.",
    category: "Jurídico",
    author: "Dr. Paulo S.",
    readTime: "9 min",
    publishedAt: "12 dias atrás",
    image: u("photo-1589994965851-a8f479c573a9"),
    imageAlt: "Mesa de trabalho jurídico com livros de direito condominial e martelo de juiz",
    content: [
      { type: "p", text: "O biênio 2024-2026 foi prolífico em decisões que tocam diretamente a rotina do síndico. Cobrança, multa, animais, acessibilidade, segurança e governança ganharam balizas mais claras." },
      { type: "h2", text: "As decisões que mais impactam" },
      { type: "ul", items: [
        "Lei 14.905/24: novos critérios de juros e correção em débitos condominiais.",
        "STJ: validade da assembleia híbrida desde que prevista em convenção ou aprovada em pauta.",
        "TJSP: multa por barulho exige notificação prévia e prova documental.",
        "STJ: condomínio responde por furto em garagem apenas com previsão expressa em convenção.",
        "Acessibilidade: omissão do síndico configura responsabilidade pessoal.",
        "LGPD: tratamento de imagem e voz exige base legal documentada.",
      ]},
      { type: "p", text: "Em todos os casos, o ponto comum é o mesmo: o síndico precisa documentar processo. Conversa de elevador não é prova; ata, notificação e protocolo, sim." },
    ],
    relatedSlugs: ["camera-ia-lgpd", "como-conduzir-assembleia"],
  },
  {
    slug: "equipe-condominial-treinamento",
    title: "Equipe condominial: treinar é mais barato que substituir",
    excerpt:
      "Zelador, porteiro, faxina e manutenção — por que investir em treinamento contínuo derruba turnover e ocorrência.",
    category: "Equipe condominial",
    author: "Redação SíndicoLab",
    readTime: "5 min",
    publishedAt: "2 semanas atrás",
    image: u("photo-1521737711867-e3b97375f902"),
    imageAlt: "Equipe operacional de condomínio em treinamento com instrutor",
    content: [
      { type: "p", text: "O custo de substituir um colaborador operacional do condomínio — porteiro, zelador, faxina — chega a 1,8x o salário mensal somando rescisão, recrutamento, integração e queda de produtividade. Treinar é literalmente mais barato." },
      { type: "h2", text: "O que treinar (de verdade)" },
      { type: "ul", items: [
        "Atendimento ao morador em situação de tensão.",
        "Procedimento de emergência: incêndio, queda de energia, intercorrência médica.",
        "Uso de sistemas: controle de acesso, CFTV, app interno.",
        "LGPD básica para quem opera portaria.",
      ]},
      { type: "h2", text: "Resultado mensurável" },
      { type: "p", text: "Condomínios com plano de treinamento estruturado reportam queda de 35% em ocorrências reincidentes e turnover anual abaixo de 12% na operação." },
    ],
    relatedSlugs: ["portaria-remota-o-que-avaliar", "gestao-financeira-condominio"],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
export const articleBySlug = (slug: string) => getArticle(slug);
