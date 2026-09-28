/**
 * Capas que acompanham o próprio site (arte já aprovada), usadas quando o
 * registro no banco ainda não aponta para uma imagem hospedada.
 * Assim o catálogo e o Portal nunca aparecem sem arte após a conexão do banco.
 */
import playSindico from "@/assets/cursos/play/sindico-alta-performance.webp";
import playInteligencia from "@/assets/cursos/play/inteligencia-condominial.webp";
import playInteligencia2 from "@/assets/cursos/play/inteligencia-condominial-2.webp";
import playCaptar from "@/assets/cursos/play/captar-mais-clientes.webp";
import playConselheiros from "@/assets/cursos/play/conselheiros.webp";
import playOratoria from "@/assets/cursos/play/oratoria-vendas.webp";
import playZelador from "@/assets/cursos/play/zelador-excelencia.webp";
import playLimpeza from "@/assets/cursos/play/limpeza-alta-performance.webp";
import playControlador from "@/assets/cursos/play/controlador-de-acessos.webp";
import portal1 from "@/assets/portal/portal-cover-1.jpg";
import portal2 from "@/assets/portal/portal-cover-2.jpg";
import portal3 from "@/assets/portal/portal-cover-3.jpg";
import portal4 from "@/assets/portal/portal-cover-4.jpg";
import portal5 from "@/assets/portal/portal-cover-5.jpg";

const COURSE_COVERS: Record<string, string> = {
  "sindico-alta-performance": playSindico,
  "inteligencia-condominial": playInteligencia,
  "inteligencia-condominial-pt-2": playInteligencia2,
  "como-captar-mais-clientes": playCaptar,
  conselheiros: playConselheiros,
  "oratoria-e-vendas": playOratoria,
  "zelador-de-excelencia": playZelador,
  "limpeza-alta-performance-play": playLimpeza,
  "controlador-de-acessos": playControlador,
};

/** Capas do acervo das administradoras (arquivos publicados no próprio site). */
const ADMIN_COVERS: Record<string, string> = {
  "analise-cotacoes-condominiais-chatgpt": "/cursos/administradoras/analise-cotacoes-condominiais-chatgpt.webp",
  "app-condominio-chatgpt-lovable": "/cursos/administradoras/app-condominio-chatgpt-lovable.webp",
  "apresentando-resultados-da-gestao": "/cursos/administradoras/apresentando-resultados-da-gestao.webp",
  "captacao-clientes-sindicos": "/cursos/administradoras/captacao-clientes-sindicos.webp",
  "captacao-de-clientes": "/cursos/administradoras/captacao-de-clientes.webp",
  "competencias-sindico-profissional": "/cursos/administradoras/competencias-sindico-profissional.webp",
  "conselheiros-fiscais": "/cursos/administradoras/conselheiros-fiscais.webp",
  "conselheiros-fiscais-consultivos": "/cursos/administradoras/conselheiros-fiscais-consultivos.webp",
  "dinamicas-votacao-assembleias": "/cursos/administradoras/dinamicas-votacao-assembleias.webp",
  "empresa-sindicatura-atuacao-nacional": "/cursos/administradoras/empresa-sindicatura-atuacao-nacional.webp",
  "ensaio-carreira-sindicos-profissionais": "/cursos/administradoras/ensaio-carreira-sindicos-profissionais.webp",
  "estrategias-reeleicao-gestao-condominial": "/cursos/administradoras/estrategias-reeleicao-gestao-condominial.webp",
  "gestao-condominial-inteligente-ia-empresa": "/cursos/administradoras/gestao-condominial-inteligente-ia-empresa.webp",
  "ia-gestao-condominial": "/cursos/administradoras/ia-gestao-condominial.webp",
  "ia-gestao-condominial-v2": "/cursos/administradoras/ia-gestao-condominial-v2.webp",
  "manual-gpts-mercado-condominial": "/cursos/administradoras/manual-gpts-mercado-condominial.webp",
  "oratoria-sindicos": "/cursos/administradoras/oratoria-sindicos.webp",
  "porteiro-alta-performance": "/cursos/administradoras/porteiro-alta-performance.webp",
  "presidente-mesa-assembleias": "/cursos/administradoras/presidente-mesa-assembleias.webp",
  "procuracoes-assembleias-condominios": "/cursos/administradoras/procuracoes-assembleias-condominios.webp",
  "relacionamento-conselho-fiscal-consultivo": "/cursos/administradoras/relacionamento-conselho-fiscal-consultivo.webp",
  "sindico-profissional": "/cursos/administradoras/sindico-profissional.webp",
  "subsindicos-condominios-residenciais": "/cursos/administradoras/subsindicos-condominios-residenciais.webp",
  "tecnologia-comunicacao-condominial": "/cursos/administradoras/tecnologia-comunicacao-condominial.webp",
  "zelador-alta-performance": "/cursos/administradoras/zelador-alta-performance.webp",
};

const POST_COVERS: Record<string, string> = {
  "nova-lei-das-assembleias-virtuais": portal2,
  "inadimplencia-recua-terceiro-mes": portal5,
  "manutencao-preventiva-elevadores": portal1,
  "convivencia-entre-moradores": portal4,
  "checklist-mensal-do-sindico": portal1,
  "reduzir-contas-luz-areas-comuns": portal3,
};

/**
 * Corrige caminhos antigos gravados no banco apontando para pastas internas
 * (ex.: "/dev-server/src/assets/cursos/x.webp") — viram arquivos públicos
 * da própria build ("/cursos/x.webp", "/portal/x.jpg").
 */
export function normalizeLegacyAssetPath(url: string | null | undefined): string | null | undefined {
  if (!url || !url.startsWith("/dev-server/src/assets/")) return url;
  const rest = url.slice("/dev-server/src/assets/".length);
  if (rest.startsWith("cursos/")) return `/cursos/${rest.slice("cursos/".length)}`;
  if (rest.startsWith("portal/")) return `/portal/${rest.slice("portal/".length)}`;
  return `/${rest}`;
}

/** Completa `cover_url`/`banner_url` de um curso quando vierem vazios. */
export function withCourseCover<T extends { slug?: string; cover_url?: string | null; banner_url?: string | null }>(course: T): T {
  const art = course.slug ? COURSE_COVERS[course.slug] ?? ADMIN_COVERS[course.slug] : undefined;
  const cover = normalizeLegacyAssetPath(course.cover_url) ?? null;
  const banner = normalizeLegacyAssetPath(course.banner_url) ?? null;
  if (!art && cover === course.cover_url && banner === course.banner_url) return course;
  return {
    ...course,
    cover_url: cover || art,
    banner_url: banner || art,
  };
}

export function withCourseCovers<T extends { slug?: string; cover_url?: string | null; banner_url?: string | null }>(list: T[]): T[] {
  return list.map(withCourseCover);
}

/** Completa a imagem de uma notícia do Portal quando vier vazia. */
export function withPostCover<T extends { slug?: string; cover_image?: string | null; social_image_url?: string | null }>(post: T): T {
  const art = post.slug ? POST_COVERS[post.slug] : undefined;
  const cover = normalizeLegacyAssetPath(post.cover_image) ?? null;
  const social = normalizeLegacyAssetPath(post.social_image_url) ?? null;
  if (!art && cover === post.cover_image && social === post.social_image_url) return post;
  return {
    ...post,
    cover_image: cover || art,
    social_image_url: social || art,
  };
}
