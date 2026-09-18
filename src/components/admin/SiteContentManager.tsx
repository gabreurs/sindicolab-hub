import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Badge, Button, Card, ConfirmAction, EmptyState, Field, Input, PageHeader,
  SaveState, SearchInput, Select, TableSkeleton, TableWrap, Textarea,
} from "@/components/console/ui";
import { materialsService } from "@/services/materialsService";
import { articlesService } from "@/services/articlesService";
import { eventsService } from "@/services/eventsService";

export type ContentKind = "materiais" | "artigos" | "eventos";

type FieldKind = "text" | "textarea" | "date" | "select" | "checkbox" | "file";

type FieldDef = {
  key: string;
  label: string;
  kind: FieldKind;
  hint?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
  full?: boolean;
};

type Row = Record<string, unknown>;

const STATUS_FIELD: FieldDef = {
  key: "status",
  label: "Situação",
  kind: "select",
  options: [
    { value: "published", label: "Publicado" },
    { value: "draft", label: "Rascunho" },
  ],
};

const CONFIG: Record<
  ContentKind,
  {
    title: string;
    description: string;
    singular: string;
    fields: FieldDef[];
    columns: { key: string; label: string }[];
    empty: Row;
  }
> = {
  materiais: {
    title: "Materiais",
    description: "Biblioteca pública de modelos, checklists, guias, planilhas e e-books.",
    singular: "material",
    // Publicar material exige só o essencial: título, descrição e o arquivo.
    // Slug, tipo, data e texto do botão são derivados automaticamente.
    fields: [
      { key: "title", label: "Título", kind: "text", required: true, full: true },
      { key: "description", label: "Descrição", kind: "textarea", full: true },
      {
        key: "file_url",
        label: "Arquivo",
        kind: "file",
        full: true,
        required: true,
        hint: "PDF, planilha, documento ou imagem (até 8 MB).",
      },
    ],
    columns: [
      { key: "title", label: "Título" },
      { key: "type", label: "Tipo" },
      { key: "category", label: "Categoria" },
    ],
    empty: {
      title: "", slug: "", description: "", category: "Materiais", type: "Guia", cover_url: "",
      file_url: "", file_name: "", cta_label: "Baixar material",
      published_at: new Date().toISOString().slice(0, 10),
      status: "published", is_featured: false,
    },
  },
  artigos: {
    title: "Artigos",
    description: "Conteúdo editorial publicado no Portal, com campos de SEO.",
    singular: "artigo",
    fields: [
      { key: "title", label: "Título", kind: "text", required: true },
      { key: "slug", label: "Slug", kind: "text", required: true },
      { key: "excerpt", label: "Resumo", kind: "textarea", full: true },
      { key: "body_text", label: "Conteúdo", kind: "textarea", full: true, hint: "Um parágrafo por linha em branco" },
      { key: "cover_url", label: "Imagem destacada (URL)", kind: "text", full: true },
      { key: "cover_alt", label: "Texto alternativo da imagem", kind: "text", full: true },
      { key: "category", label: "Categoria", kind: "text" },
      { key: "author", label: "Autor", kind: "text" },
      { key: "read_time", label: "Tempo de leitura", kind: "text" },
      { key: "published_at", label: "Data", kind: "date" },
      { key: "seo_title", label: "Título de SEO", kind: "text", full: true },
      { key: "meta_description", label: "Meta description", kind: "textarea", full: true },
      { key: "social_image_url", label: "Imagem social (URL)", kind: "text", full: true },
      STATUS_FIELD,
    ],
    columns: [
      { key: "title", label: "Título" },
      { key: "category", label: "Categoria" },
      { key: "author", label: "Autor" },
    ],
    empty: {
      title: "", slug: "", excerpt: "", body_text: "", cover_url: "", cover_alt: "", category: "",
      author: "Equipe SíndicoLab", read_time: "5 min", published_at: new Date().toISOString().slice(0, 10),
      seo_title: "", meta_description: "", social_image_url: "", status: "draft",
    },
  },
  eventos: {
    title: "Eventos",
    description: "Agenda pública: encontros presenciais, lives e workshops.",
    singular: "evento",
    fields: [
      { key: "title", label: "Título", kind: "text", required: true },
      { key: "slug", label: "Slug", kind: "text", required: true },
      { key: "short_description", label: "Descrição curta", kind: "textarea", full: true },
      { key: "content", label: "Conteúdo", kind: "textarea", full: true },
      { key: "cover_url", label: "Imagem de capa (URL)", kind: "text", full: true },
      { key: "starts_at", label: "Data", kind: "date", required: true },
      { key: "time_label", label: "Horário", kind: "text", hint: "Ex.: 14h às 18h" },
      { key: "ends_at", label: "Encerramento", kind: "date" },
      {
        key: "format",
        label: "Formato",
        kind: "select",
        options: [
          { value: "presencial", label: "Presencial" },
          { value: "online", label: "Online" },
        ],
      },
      { key: "city", label: "Cidade", kind: "text" },
      { key: "location", label: "Local", kind: "text", full: true },
      { key: "external_url", label: "Link externo", kind: "text", full: true },
      { key: "sympla_url", label: "Link do Sympla", kind: "text", full: true },
      STATUS_FIELD,
      { key: "is_featured", label: "Destaque", kind: "checkbox" },
    ],
    columns: [
      { key: "title", label: "Título" },
      { key: "starts_at", label: "Data" },
      { key: "format", label: "Formato" },
    ],
    empty: {
      title: "", slug: "", short_description: "", content: "", cover_url: "",
      starts_at: new Date().toISOString().slice(0, 10), time_label: "", ends_at: "",
      format: "presencial", city: "", location: "", external_url: "", sympla_url: "",
      status: "draft", is_featured: false,
    },
  },
};

function slugify(v: string) {
  return v
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function toDateInput(v: unknown) {
  if (!v) return "";
  const s = String(v);
  return s.length >= 10 ? s.slice(0, 10) : s;
}

/** Traduz o registro do banco para o formulário e vice-versa. */
function toForm(kind: ContentKind, row: Row): Row {
  const form: Row = { ...CONFIG[kind].empty, ...row };
  CONFIG[kind].fields.forEach((f) => {
    if (f.kind === "date") form[f.key] = toDateInput(row[f.key]);
    if (form[f.key] == null) form[f.key] = CONFIG[kind].empty[f.key] ?? "";
  });
  if (kind === "artigos") {
    const content = row.content;
    form.body_text = Array.isArray(content)
      ? content
          .map((b: any) => (b?.type === "ul" ? (b.items ?? []).join("\n") : b?.text ?? ""))
          .filter(Boolean)
          .join("\n\n")
      : String(content ?? "");
  }
  return form;
}

function fromForm(kind: ContentKind, form: Row): Row {
  const out: Row = {};
  CONFIG[kind].fields.forEach((f) => {
    if (f.key === "body_text") return;
    let value = form[f.key];
    if (f.kind === "date") value = value ? new Date(String(value)).toISOString() : null;
    if (value === "") value = f.kind === "text" && (f.key === "title" || f.key === "slug") ? "" : null;
    out[f.key] = value;
  });
  out.title = String(form.title ?? "").trim();
  out.slug = slugify(String(form.slug || form.title || ""));
  if (kind === "artigos") {
    out.content = String(form.body_text ?? "")
      .split(/\n{2,}/)
      .map((text) => ({ type: "p", text: text.trim() }))
      .filter((b) => b.text);
    out.seo_title = form.seo_title || out.title;
    out.meta_description = form.meta_description || String(form.excerpt ?? "").slice(0, 155);
  }
  if (kind === "materiais") {
    // Campos operacionais ficam fora do formulário: derivamos aqui.
    out.file_url = String(form.file_url ?? "").trim();
    out.file_name = form.file_name || null;
    out.category = form.category || "Materiais";
    out.type = form.type || "Guia";
    out.cover_url = form.cover_url || null;
    out.cta_label = form.cta_label || "Baixar material";
    out.status = form.status || "published";
    out.is_featured = Boolean(form.is_featured);
    out.published_at = form.published_at
      ? new Date(String(form.published_at)).toISOString()
      : new Date().toISOString();
  }
  if (kind === "eventos") {
    out.content = String(form.content ?? "");
  }
  return out;
}

const services = {
  materiais: materialsService,
  artigos: articlesService,
  eventos: eventsService,
} as const;

/**
 * Gestão do conteúdo público do site (materiais, artigos e eventos) dentro do
 * console. Fala apenas com a camada de serviços.
 */
export function SiteContentManager({ kind }: { kind: ContentKind }) {
  const config = CONFIG[kind];
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Row | null>(null);
  const [msg, setMsg] = useState<null | { kind: "ok" | "err" | "busy"; text: string }>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const list = await (services[kind] as any).list({ includeDrafts: true });
    setRows(list as Row[]);
    setLoading(false);
  }, [kind]);

  useEffect(() => {
    setEditing(null);
    setQuery("");
    refresh();
  }, [kind, refresh]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) => String(r.title ?? "").toLowerCase().includes(q));
  }, [rows, query]);

  async function save() {
    if (!editing) return;
    const payload = fromForm(kind, editing);
    if (!payload.title) {
      setMsg({ kind: "err", text: "O título é obrigatório." });
      return;
    }
    setMsg({ kind: "busy", text: "" });
    try {
      if (editing.id) await (services[kind] as any).update(String(editing.id), payload);
      else await (services[kind] as any).create(payload);
      setMsg({ kind: "ok", text: "Alterações salvas." });
      setEditing(null);
      refresh();
    } catch (err) {
      setMsg({ kind: "err", text: err instanceof Error ? err.message : "Não foi possível salvar." });
    }
  }

  async function remove(id: string) {
    try {
      await (services[kind] as any).remove(id);
      setMsg({ kind: "ok", text: "Item removido." });
      refresh();
    } catch (err) {
      setMsg({ kind: "err", text: err instanceof Error ? err.message : "Não foi possível remover." });
    }
  }

  return (
    <>
      <PageHeader
        title={config.title}
        description={config.description}
        actions={
          <>
            <SaveState state={msg} />
            <Button variant="secondary" size="sm" onClick={refresh}>Atualizar</Button>
            <Button variant="primary" size="sm" onClick={() => setEditing(toForm(kind, { ...config.empty }))}>
              Novo {config.singular}
            </Button>
          </>
        }
      />

      {editing && (
        <Card
          title={editing.id ? `Editar ${config.singular}` : `Novo ${config.singular}`}
          actions={
            <>
              <Button variant="ghost" size="sm" onClick={() => setEditing(null)}>Cancelar</Button>
              <Button variant="primary" size="sm" onClick={save}>Salvar</Button>
            </>
          }
          className="mb-5"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {config.fields.map((f) => {
              const value = editing[f.key];
              const set = (v: unknown) => setEditing({ ...editing, [f.key]: v });
              return (
                <Field key={f.key} label={f.label} hint={f.hint} className={f.full ? "sm:col-span-2" : undefined}>
                  {f.kind === "textarea" ? (
                    <Textarea rows={f.key === "content" || f.key === "body_text" ? 6 : 3} value={String(value ?? "")} onChange={(e) => set(e.target.value)} />
                  ) : f.kind === "select" ? (
                    <Select value={String(value ?? "")} onChange={(e) => set(e.target.value)}>
                      {f.options?.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </Select>
                  ) : f.kind === "checkbox" ? (
                    <span className="mt-1 flex items-center gap-2 text-sm">
                      <input type="checkbox" checked={Boolean(value)} onChange={(e) => set(e.target.checked)} />
                      Marcar como destaque
                    </span>
                  ) : f.kind === "file" ? (
                    <FileDrop
                      fileName={editing.file_name ? String(editing.file_name) : null}
                      hasFile={Boolean(value)}
                      hint={f.hint}
                      onError={(text) => setMsg({ kind: "err", text })}
                      onClear={() => setEditing({ ...editing, file_url: "", file_name: "" })}
                      onFile={(file) => {
                        const reader = new FileReader();
                        reader.onload = () =>
                          setEditing({
                            ...editing,
                            file_url: String(reader.result ?? ""),
                            file_name: file.name,
                          });
                        reader.readAsDataURL(file);
                      }}
                    />
                  ) : (
                    <Input
                      type={f.kind === "date" ? "date" : "text"}
                      value={String(value ?? "")}
                      onChange={(e) => set(e.target.value)}
                    />
                  )}
                </Field>
              );
            })}
          </div>
        </Card>
      )}

      <Card
        title={`${filtered.length} ${filtered.length === 1 ? "registro" : "registros"}`}
        actions={<SearchInput value={query} onChange={setQuery} placeholder="Buscar por título…" />}
        padded={false}
      >
        {loading ? (
          <TableSkeleton rows={5} cols={config.columns.length + 2} />
        ) : filtered.length === 0 ? (
          <EmptyState title="Nada por aqui" description={`Crie o primeiro ${config.singular}.`} />
        ) : (
          <TableWrap>
            <table className="c-table">
              <thead>
                <tr>
                  {config.columns.map((c) => (
                    <th key={c.key}>{c.label}</th>
                  ))}
                  <th>Situação</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={String(r.id)}>
                    {config.columns.map((c) => (
                      <td key={c.key}>
                        {c.key === "starts_at"
                          ? new Date(String(r[c.key])).toLocaleDateString("pt-BR")
                          : String(r[c.key] ?? "—")}
                      </td>
                    ))}
                    <td>
                      <Badge tone={r.status === "published" ? "ok" : "warn"}>
                        {r.status === "published" ? "Publicado" : "Rascunho"}
                      </Badge>
                    </td>
                    <td className="text-right">
                      <span className="inline-flex items-center gap-1.5">
                        <Button variant="ghost" size="sm" onClick={() => setEditing(toForm(kind, r))}>Editar</Button>
                        <ConfirmAction
                          label="Excluir"
                          question="Remover?"
                          onConfirm={() => remove(String(r.id))}
                        />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrap>
        )}
      </Card>
    </>
  );
}
