// Links externos oficiais do ecossistema SíndicoLab.
// Fonte única: nenhum componente deve escrever uma dessas URLs à mão.

export const EXTERNAL_LINKS = {
  /** Newsletter — publicação oficial no Substack */
  SUBSTACK: "https://substack.com/@sindicolab",
  /** Canal oficial no YouTube */
  YOUTUBE: "https://www.youtube.com/@SindicoLab",
  /** Instagram oficial */
  INSTAGRAM: "https://instagram.com/sindicolab",
  /** Grupo de apoio entre síndicas e síndicos no WhatsApp */
  WHATSAPP_GROUP: "https://chat.whatsapp.com/GTRh8zayKC22XNwjpzPU68",
  /** Atendimento direto — Rafael Bernardes */
  WHATSAPP_RAFAEL_NUMBER: "5511960841033",
  WHATSAPP_RAFAEL_MESSAGE:
    "Olá, Rafael! Vim pelo site do SíndicoLab e gostaria de mais informações.",
  /** Plataforma de síndicos profissionais */
  QUERO1SINDICO: "https://quero1sindico.com/",
  /** Biblioteca de downloads legada */
  DOWNLOADS: "https://downloads.sindicolab.com/",
  /** Studio Marqo */
  STUDIO_MARQO: "https://studiomarqo.com.br",
} as const;

export function whatsappRafaelUrl(message = EXTERNAL_LINKS.WHATSAPP_RAFAEL_MESSAGE) {
  return `https://wa.me/${EXTERNAL_LINKS.WHATSAPP_RAFAEL_NUMBER}?text=${encodeURIComponent(message)}`;
}
