/** Normaliza texto para buscas tolerantes a acentos, caixa e espaços. */
export function normalizeSearchText(value: unknown): string {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .replace(/\s+/g, " ")
    .trim();
}

export function matchesSearch(query: string, ...fields: unknown[]): boolean {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return true;
  const terms = normalizedQuery.split(" ").filter(Boolean);
  const haystack = normalizeSearchText(fields.join(" "));
  return terms.every((term) => haystack.includes(term));
}