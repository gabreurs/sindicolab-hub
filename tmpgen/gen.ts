/**
 * Gera os arquivos de carga inicial (`supabase/sql/05_*` e `06_*`) a partir das
 * mesmas fixtures que abastecem o app hoje. Roda com `bun tmpgen/gen.ts`.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { tables } from "@/services/db/seed";

type Row = Record<string, any>;
const T = tables as unknown as Record<string, Row[]>;

/** Capas empacotadas no build não existem no banco: ficam nulas e o app resolve pelo slug. */
const isBundled = (v: string) => v.startsWith("/src/") || v.startsWith("/assets/") || /^\/[^/]+\.(webp|jpg|png|svg)$/.test(v);

function lit(v: any): string {
  if (v === null || v === undefined) return "null";
  if (typeof v === "number") return String(v);
  if (typeof v === "boolean") return v ? "true" : "false";
  if (typeof v === "object") return `'${JSON.stringify(v).replace(/'/g, "''")}'::jsonb`;
  if (typeof v === "string" && isBundled(v)) return "null";
  return `'${String(v).replace(/'/g, "''")}'`;
}

function insert(table: string, rows: Row[], conflict = "id") {
  if (!rows.length) return `-- ${table}: nada a carregar\n`;
  const cols = [...new Set(rows.flatMap((r) => Object.keys(r)))];
  const values = rows
    .map((r) => `  (${cols.map((c) => lit(r[c] ?? null)).join(", ")})`)
    .join(",\n");
  const updates = cols.filter((c) => c !== "id" && !conflict.split(",").includes(c.trim()));
  return (
    `insert into public.${table} (${cols.join(", ")}) values\n${values}\n` +
    `on conflict (${conflict}) do update set\n  ${updates.map((c) => `${c} = excluded.${c}`).join(",\n  ")};\n`
  );
}

const header = (title: string) =>
  `-- ${title}\n-- Gerado a partir do acervo do projeto. Pode ser executado novamente sem duplicar.\n\nbegin;\n\n`;
const footer = "\ncommit;\n";

const ls = T.courses.filter((c) => c.delivery_type !== "external_checkout");
const play = T.courses.filter((c) => c.delivery_type === "external_checkout");
const playIds = new Set(play.map((c) => c.id));
const lsIds = new Set(ls.map((c) => c.id));

mkdirSync("supabase/sql", { recursive: true });

writeFileSync(
  "supabase/sql/05_seed_estrutura_e_academy.sql",
  header("05 — Empresas, marcas, endereços, categorias e o acervo Learning Studio") +
    [
      insert("organizations", T.organizations),
      insert("organization_branding", T.organization_branding),
      insert("organization_domains", T.organization_domains),
      insert("course_categories", T.course_categories),
      insert("courses", ls),
      insert("course_modules", T.course_modules.filter((m) => lsIds.has(m.course_id))),
      insert("course_lessons", T.course_lessons.filter((l) => lsIds.has(l.course_id))),
      insert("course_delivery_sources", T.course_delivery_sources),
      insert(
        "organization_course_catalog",
        T.organization_course_catalog.filter((c) => lsIds.has(c.course_id)),
        "organization_id, course_id",
      ),
    ].join("\n") +
    footer,
);

writeFileSync(
  "supabase/sql/06_seed_sindicolab_e_conteudo.sql",
  header("06 — Acervo comercial da SíndicoLab (Kiwify), conteúdo do site e Portal") +
    [
      insert("courses", play),
      insert(
        "organization_course_catalog",
        T.organization_course_catalog.filter((c) => playIds.has(c.course_id)),
        "organization_id, course_id",
      ),
      insert("site_materials", T.site_materials),
      insert("site_articles", T.site_articles),
      insert("site_events", T.site_events),
      insert("portal_categories", T.portal_categories),
      insert("portal_authors", T.portal_authors),
      insert("portal_posts", T.portal_posts),
    ].join("\n") +
    footer,
);

console.log("ok");
