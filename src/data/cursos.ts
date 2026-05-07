// Catálogo de cursos do SíndicoLab Play.
// IMPORTANTE: o SíndicoLab NÃO hospeda os cursos. Cada link aponta para a
// plataforma externa (Kiwify/Hotmart) onde a venda e o player acontecem.

import inteligencia from "@/assets/cursos/inteligencia-condominial-1.png";
import inteligencia2 from "@/assets/cursos/inteligencia-condominial.png";
import captarMais from "@/assets/cursos/como-captar-mais-clientes.png";
import conselheiros from "@/assets/cursos/conselheiros-fiscais-e-consultivos.png";
import oratoria from "@/assets/cursos/oratoria-e-vendas.png";
import sindicoInicio from "@/assets/cursos/sindico-em-inicio-de-carreira.png";
import limpeza from "@/assets/cursos/limpeza-de-alta-performance.png";
import porteiro from "@/assets/cursos/porteiro-e-controlador-de-acesso.png";
import zelador from "@/assets/cursos/zelador-de-alta-performance.png";
import competencias from "@/assets/cursos/competencias-do-sindico.png";
import juridico from "@/assets/cursos/juridico-de-alta-performance.png";
import inovacao from "@/assets/cursos/inovacao-e-tecnologia.png";
import comunicacao from "@/assets/cursos/capa-curso-comunicacao-de-fim-de-ano-para-sindicos.png";
import jornada from "@/assets/cursos/capa-curso-jornada-do-cliente-na-administracao-de-condominios.png";
import captacao from "@/assets/cursos/capa-curso-captacao-de-condominios.png";
import mercadinhos from "@/assets/cursos/gestao-de-mercadinhos-autonomos-em-condominios.png";
import energia from "@/assets/cursos/mercado-livre-de-energia-de-media-e-alta-tensao.png";
import biblioteca from "@/assets/cursos/biblioteca-de-prompts.png";
import mapas from "@/assets/cursos/mapas-mentais-1.png";

export type Curso = {
  slug: string;
  titulo: string;
  capa: string;
  categoria:
    | "Para síndicos"
    | "Equipe condominial"
    | "Administradoras"
    | "Materiais & ferramentas";
  preco?: string;
  certificado?: boolean;
  acesso?: string;
  destaque?: string;
  resumo: string;
  url: string; // link externo Kiwify/Hotmart (placeholder quando não fornecido)
};

const PLAY_URL = "https://sindicolab.com/play/";

export const cursos: Curso[] = [
  {
    slug: "inteligencia-condominial",
    titulo: "Inteligência Condominial",
    capa: inteligencia,
    categoria: "Para síndicos",
    preco: "R$ 450",
    certificado: true,
    acesso: "90 dias de acesso",
    destaque: "Top 1 em #cursos hoje",
    resumo:
      "Com foco em inteligência artificial, automação de processos e otimização de tempo para resolver desafios reais da administração de condomínios.",
    url: "https://pay.kiwify.com.br/KTRK6dv",
  },
  {
    slug: "inteligencia-condominial-2",
    titulo: "Inteligência Condominial · Pt. II",
    capa: inteligencia2,
    categoria: "Para síndicos",
    preco: "R$ 250",
    certificado: true,
    acesso: "90 dias de acesso",
    resumo:
      "Continuação avançada do Inteligência Condominial. Casos complexos, gestão de crises e síndico como liderança profissional.",
    url: "https://pay.kiwify.com.br/yZEm6OM",
  },
  {
    slug: "como-captar-mais-clientes",
    titulo: "Como Captar Mais Clientes",
    capa: captarMais,
    categoria: "Para síndicos",
    preco: "R$ 500",
    certificado: true,
    acesso: "90 dias de acesso",
    resumo:
      "Estratégia comercial e posicionamento para síndicos profissionais que querem crescer a carteira de condomínios.",
    url: "https://pay.kiwify.com.br/s0Z3UNQ",
  },
  {
    slug: "captacao-de-condominios",
    titulo: "Captação de Condomínios",
    capa: captacao,
    categoria: "Para síndicos",
    preco: "R$ 297",
    certificado: true,
    resumo:
      "Método prático de prospecção, abordagem de conselhos e fechamento para administradoras e síndicos profissionais.",
    url: PLAY_URL,
  },
  {
    slug: "conselheiros",
    titulo: "Conselheiros Fiscais e Consultivos",
    capa: conselheiros,
    categoria: "Para síndicos",
    preco: "R$ 99",
    certificado: true,
    resumo:
      "Formação completa para conselheiros: papéis, leitura de prestação de contas, votação e fiscalização ativa.",
    url: "https://pay.kiwify.com.br/FDgSb70",
  },
  {
    slug: "oratoria-e-vendas",
    titulo: "Oratória & Vendas",
    capa: oratoria,
    categoria: "Para síndicos",
    preco: "R$ 250",
    certificado: true,
    resumo:
      "Comunicação em assembleia, condução de reuniões e técnicas de venda para o síndico que precisa convencer.",
    url: "https://pay.kiwify.com.br/a0fOXfo",
  },
  {
    slug: "sindico-de-alta-performance",
    titulo: "Síndico em Início de Carreira",
    capa: sindicoInicio,
    categoria: "Para síndicos",
    preco: "R$ 197",
    certificado: true,
    resumo:
      "Trilha do zero ao primeiro condomínio: contratação, primeiros 90 dias, prestação de contas e reputação.",
    url: "https://guarida.sindicolab.com/play/curso-para-sindico-profissional-em-inicio-de-carreira/",
  },
  {
    slug: "competencias-do-sindico",
    titulo: "Competências do Síndico",
    capa: competencias,
    categoria: "Para síndicos",
    preco: "R$ 247",
    certificado: true,
    resumo:
      "Mapa das competências técnicas, comportamentais e de liderança do síndico profissional moderno.",
    url: PLAY_URL,
  },
  {
    slug: "juridico-de-alta-performance",
    titulo: "Jurídico de Alta Performance",
    capa: juridico,
    categoria: "Para síndicos",
    preco: "R$ 297",
    certificado: true,
    resumo:
      "Direito condominial aplicado: convenção, regimento, multas, cobrança, LGPD e jurisprudência atual.",
    url: PLAY_URL,
  },
  {
    slug: "inovacao-e-tecnologia",
    titulo: "Inovação e Tecnologia",
    capa: inovacao,
    categoria: "Para síndicos",
    preco: "R$ 197",
    certificado: true,
    resumo:
      "Tecnologia aplicada a condomínios: portaria remota, IA, automação, comunicação e tomada de decisão por dados.",
    url: PLAY_URL,
  },
  {
    slug: "limpeza-alta-performance",
    titulo: "Limpeza de Alta Performance",
    capa: limpeza,
    categoria: "Equipe condominial",
    preco: "R$ 147",
    certificado: true,
    resumo:
      "Treinamento técnico para equipes de limpeza condominial: padrões, produtos, segurança e produtividade.",
    url: "https://pay.kiwify.com.br/HYLI6B4",
  },
  {
    slug: "porteiro-controlador",
    titulo: "Porteiro e Controlador de Acesso",
    capa: porteiro,
    categoria: "Equipe condominial",
    preco: "R$ 147",
    certificado: true,
    resumo:
      "Atendimento, controle de acesso, protocolos de segurança e postura profissional para portaria.",
    url: "https://pay.kiwify.com.br/V1zlia6",
  },
  {
    slug: "zelador-de-excelencia",
    titulo: "Zelador de Alta Performance",
    capa: zelador,
    categoria: "Equipe condominial",
    preco: "R$ 197",
    certificado: true,
    resumo:
      "O zelador como líder operacional: rotinas, manutenções, equipe, fornecedores e relacionamento com o síndico.",
    url: "https://pay.kiwify.com.br/UaBKUDA",
  },
  {
    slug: "comunicacao-fim-de-ano",
    titulo: "Comunicação de Fim de Ano para Síndicos",
    capa: comunicacao,
    categoria: "Para síndicos",
    preco: "R$ 97",
    resumo:
      "Pacote prático para comunicar prestação de contas, eventos e mensagens de fim de ano com tom profissional.",
    url: PLAY_URL,
  },
  {
    slug: "jornada-do-cliente",
    titulo: "Jornada do Cliente na Administração de Condomínios",
    capa: jornada,
    categoria: "Administradoras",
    preco: "R$ 297",
    certificado: true,
    resumo:
      "Customer experience aplicado a administradoras: prospecção, onboarding, retenção e expansão de carteira.",
    url: PLAY_URL,
  },
  {
    slug: "mercadinhos-autonomos",
    titulo: "Gestão de Mercadinhos Autônomos em Condomínios",
    capa: mercadinhos,
    categoria: "Administradoras",
    preco: "R$ 197",
    resumo:
      "Como avaliar, contratar, fiscalizar e rentabilizar mercadinhos autônomos em áreas comuns.",
    url: PLAY_URL,
  },
  {
    slug: "mercado-livre-energia",
    titulo: "Mercado Livre de Energia",
    capa: energia,
    categoria: "Administradoras",
    preco: "R$ 247",
    resumo:
      "Migração para o mercado livre de energia em condomínios de média e alta tensão: viabilidade, contratos e economia.",
    url: PLAY_URL,
  },
  {
    slug: "biblioteca-de-prompts",
    titulo: "Biblioteca de Prompts para Síndicos",
    capa: biblioteca,
    categoria: "Materiais & ferramentas",
    preco: "R$ 97",
    resumo:
      "Centenas de prompts prontos para usar no dia a dia do síndico: comunicados, atas, convocações e análises.",
    url: PLAY_URL,
  },
  {
    slug: "mapas-mentais",
    titulo: "Mapas Mentais Condominiais · Vol. 1",
    capa: mapas,
    categoria: "Materiais & ferramentas",
    preco: "R$ 97",
    resumo:
      "Coletânea de mapas mentais para estudo e consulta rápida das principais rotinas do síndico profissional.",
    url: PLAY_URL,
  },
];

export const cursoEmDestaque = cursos[0];

export const trilhas = [
  "Em destaque",
  "Para síndicos",
  "Equipe condominial",
  "Administradoras",
  "Materiais & ferramentas",
] as const;
