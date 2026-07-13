/**
 * Banner oficial de Patrocínios/Direcionamento.
 *
 * ⚠️ PENDENTE: a equipe de marketing (Rafael Bernardes) enviará o banner
 * definitivo. Quando o arquivo chegar:
 *
 *   1. Faça upload como asset (Lovable Assets ou src/assets/patrocinios/).
 *   2. Preencha `desktop` (obrigatório) e `mobile` (opcional).
 *      - Se só houver 1 arquivo, defina apenas `desktop` — servirá para tudo.
 *   3. Ajuste `alt` para o texto descritivo definitivo (se necessário).
 *
 * Enquanto `desktop` estiver null, o site renderiza o CARD FALLBACK atual
 * (identidade roxa) — a página /patrocinios continua intacta.
 */
export const patrociniosBanner: {
  desktop: string | null;
  mobile: string | null;
  alt: string;
} = {
  desktop: null,
  mobile: null,
  alt: "Patrocine experiências CondoHuby × SíndicoLab — Mídia kit oficial",
};
