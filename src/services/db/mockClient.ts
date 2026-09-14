/**
 * Cliente de dados em memória.
 *
 * Expõe a MESMA superfície de API usada pela Academy (from/select/eq/in/order/
 * insert/update/upsert/delete/rpc/auth/functions), mas resolve tudo contra as
 * tabelas de exemplo em `seed.ts`.
 *
 * É a ÚNICA costura entre a aplicação e a origem dos dados: na segunda etapa,
 * `src/integrations/supabase/client.ts` passa a exportar o cliente real do
 * Supabase e nenhum componente precisa mudar.
 *
 * Nada aqui persiste em localStorage: mutações valem para a sessão atual.
 */
import { tables, type TableName } from "./seed";
import { DEMO_ACCOUNTS, ORG } from "./academyFixtures";
import type { AuthChangeEvent, Row, Session, User } from "./types";

const RELATIONS: Record<string, { table: TableName; fk: string }[]> = {
  course_modules: [{ table: "course_lessons", fk: "module_id" }],
};

const ok = <T,>(data: T, count: number | null = null) => ({
  data,
  error: null as { message: string } | null,
  count,
});

function uid(prefix = "id") {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36).slice(-4)}`;
}

function rows(table: string): Row[] {
  const t = tables as Record<string, Row[]>;
  t[table] ??= [];
  return t[table];
}

type Filter = { col: string; op: "eq" | "in" | "neq" | "is" | "not"; value: any };

class Query implements PromiseLike<{ data: any; error: { message: string } | null; count: number | null }> {
  private filters: Filter[] = [];
  private op: "select" | "insert" | "update" | "upsert" | "delete" = "select";
  private payload: Row | Row[] | null = null;
  private columns = "*";
  private orderBy: { col: string; asc: boolean }[] = [];
  private limitN: number | null = null;
  private wantCount = false;
  private headOnly = false;
  private singleMode: "none" | "maybe" | "one" = "none";
  private returning = false;
  private conflictCols: string[] = ["id"];

  constructor(private table: string) {}

  select(columns = "*", opts?: { count?: string; head?: boolean }) {
    if (this.op === "select") this.columns = columns;
    else this.returning = true;
    if (opts?.count) this.wantCount = true;
    if (opts?.head) this.headOnly = true;
    return this;
  }
  insert(payload: Row | Row[]) { this.op = "insert"; this.payload = payload; return this; }
  update(payload: Row) { this.op = "update"; this.payload = payload; return this; }
  delete() { this.op = "delete"; return this; }
  upsert(payload: Row | Row[], opts?: { onConflict?: string }) {
    this.op = "upsert";
    this.payload = payload;
    if (opts?.onConflict) this.conflictCols = opts.onConflict.split(",").map((s) => s.trim());
    return this;
  }
  eq(col: string, value: any) { this.filters.push({ col, op: "eq", value }); return this; }
  neq(col: string, value: any) { this.filters.push({ col, op: "neq", value }); return this; }
  is(col: string, value: any) { this.filters.push({ col, op: "is", value }); return this; }
  in(col: string, value: any[]) { this.filters.push({ col, op: "in", value }); return this; }
  not(col: string, _op: string, value: any) { this.filters.push({ col, op: "not", value }); return this; }
  order(col: string, opts?: { ascending?: boolean }) {
    this.orderBy.push({ col, asc: opts?.ascending !== false });
    return this;
  }
  limit(n: number) { this.limitN = n; return this; }
  maybeSingle() { this.singleMode = "maybe"; return this; }
  single() { this.singleMode = "one"; return this; }

  private matches(row: Row) {
    return this.filters.every((f) => {
      const v = row[f.col];
      if (f.op === "eq") return v === f.value;
      if (f.op === "neq") return v !== f.value;
      if (f.op === "is") return f.value === null ? v == null : v === f.value;
      if (f.op === "not") return f.value === null ? v != null : v !== f.value;
      return Array.isArray(f.value) && f.value.includes(v);
    });
  }

  private expand(list: Row[]) {
    const rels = RELATIONS[this.table];
    if (!rels || !this.columns.includes("(")) return list;
    return list.map((row) => {
      const out: Row = { ...row };
      rels.forEach((r) => {
        if (!this.columns.includes(r.table)) return;
        out[r.table] = rows(r.table)
          .filter((child) => child[r.fk] === row.id)
          .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
      });
      return out;
    });
  }

  private run() {
    const store = rows(this.table);
    const stamp = new Date().toISOString();

    if (this.op === "insert" || this.op === "upsert") {
      const list = Array.isArray(this.payload) ? this.payload : [this.payload!];
      const saved: Row[] = [];
      for (const raw of list) {
        const record: Row = { ...raw };
        if (this.op === "upsert") {
          const existing = store.find((r) => this.conflictCols.every((c) => r[c] === record[c]));
          if (existing) {
            Object.assign(existing, record, { updated_at: stamp });
            saved.push(existing);
            continue;
          }
        }
        record.id ??= uid(this.table.slice(0, 4));
        record.created_at ??= stamp;
        record.updated_at ??= stamp;
        store.push(record);
        saved.push(record);
      }
      const data = this.singleMode !== "none" ? (saved[0] ?? null) : this.returning ? saved : null;
      return ok(data);
    }

    if (this.op === "update") {
      const hit = store.filter((r) => this.matches(r));
      hit.forEach((r) => Object.assign(r, this.payload, { updated_at: stamp }));
      const data = this.singleMode !== "none" ? (hit[0] ?? null) : this.returning ? hit : null;
      return ok(data);
    }

    if (this.op === "delete") {
      const keep = store.filter((r) => !this.matches(r));
      const removed = store.filter((r) => this.matches(r));
      store.length = 0;
      store.push(...keep);
      return ok(this.returning ? removed : null);
    }

    let list = store.filter((r) => this.matches(r));
    for (const o of [...this.orderBy].reverse()) {
      list = [...list].sort((a, b) => {
        const av = a[o.col], bv = b[o.col];
        const cmp = typeof av === "number" && typeof bv === "number"
          ? av - bv
          : String(av ?? "").localeCompare(String(bv ?? ""));
        return o.asc ? cmp : -cmp;
      });
    }
    const total = list.length;
    if (this.limitN != null) list = list.slice(0, this.limitN);
    if (this.headOnly) return ok(null, total);
    const expanded = this.expand(list).map((r) => ({ ...r }));
    if (this.singleMode !== "none") return ok(expanded[0] ?? null, this.wantCount ? total : null);
    return ok(expanded, this.wantCount ? total : null);
  }

  then<TResult1 = any, TResult2 = never>(
    onfulfilled?: ((value: any) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null,
  ): PromiseLike<TResult1 | TResult2> {
    let result: any;
    try {
      result = this.run();
    } catch (e) {
      result = { data: null, error: { message: (e as Error).message }, count: null };
    }
    return Promise.resolve(result).then(onfulfilled, onrejected);
  }
}

/* ------------------------------- auth mock ------------------------------- */

const SESSION_KEY = "sindicolab.mockSession"; // apenas o id do usuário (estado de UI)
type Listener = (event: AuthChangeEvent, session: Session | null) => void;

const listeners = new Set<Listener>();
let currentSession: Session | null = null;

function buildSession(user: Row): Session {
  return {
    access_token: `mock.${user.id}`,
    refresh_token: `mock.refresh.${user.id}`,
    token_type: "bearer",
    expires_at: Math.floor(Date.now() / 1000) + 3600,
    user: {
      id: user.id,
      email: user.email,
      user_metadata: { full_name: user.full_name },
      created_at: user.created_at,
    } as User,
  };
}

function restore() {
  if (typeof window === "undefined") return;
  const id = window.sessionStorage.getItem(SESSION_KEY);
  if (!id) return;
  const profile = rows("profiles").find((p) => p.id === id);
  if (profile) currentSession = buildSession(profile);
}
restore();

function emit(event: AuthChangeEvent) {
  listeners.forEach((l) => l(event, currentSession));
}

function setSession(profile: Row | null) {
  currentSession = profile ? buildSession(profile) : null;
  if (typeof window !== "undefined") {
    if (profile) window.sessionStorage.setItem(SESSION_KEY, profile.id);
    else window.sessionStorage.removeItem(SESSION_KEY);
  }
  emit(profile ? "SIGNED_IN" : "SIGNED_OUT");
}

/**
 * Autenticação de demonstração: reconhece e-mails já cadastrados nos dados de
 * exemplo. Não há nenhuma senha no código — a validação real passa a existir
 * quando o banco for conectado.
 */
const auth = {
  async getSession() {
    return { data: { session: currentSession }, error: null };
  },
  async getUser() {
    return { data: { user: currentSession?.user ?? null }, error: null };
  },
  onAuthStateChange(cb: Listener) {
    listeners.add(cb);
    Promise.resolve().then(() => cb("INITIAL_SESSION", currentSession));
    return { data: { subscription: { unsubscribe: () => listeners.delete(cb) } } };
  },
  async signInWithPassword({ email, password }: { email: string; password: string }) {
    const mail = email.trim().toLowerCase();
    const profile = rows("profiles").find((p) => p.email?.toLowerCase() === mail);
    if (!profile) {
      return { data: { session: null, user: null }, error: { message: "E-mail não encontrado nesta plataforma." } };
    }
    // Acessos de demonstração do repositório da Academy: a senha documentada é
    // exigida. Contas criadas durante a sessão (signUp) seguem sem validação.
    const demo = DEMO_ACCOUNTS.find((a) => a.email === mail);
    if (demo && password !== demo.password) {
      return { data: { session: null, user: null }, error: { message: "Senha incorreta para este acesso." } };
    }
    setSession(profile);
    return { data: { session: currentSession, user: currentSession!.user }, error: null };
  },
  async signUp({ email, options }: { email: string; password: string; options?: any }) {
    const existing = rows("profiles").find((p) => p.email?.toLowerCase() === email.trim().toLowerCase());
    if (existing) return { data: { session: null, user: null }, error: { message: "Este e-mail já tem acesso." } };
    const profile = {
      id: uid("user"),
      email: email.trim().toLowerCase(),
      full_name: options?.data?.full_name ?? email.split("@")[0],
      avatar_url: null,
      created_at: new Date().toISOString(),
    };
    rows("profiles").push(profile);
    rows("organization_memberships").push({
      id: uid("mem"),
      organization_id: ORG.sindicolab,
      user_id: profile.id,
      role: "student",
      is_active: true,
      created_at: new Date().toISOString(),
    });
    setSession(profile);
    return { data: { session: currentSession, user: currentSession!.user }, error: null };
  },
  async signOut() {
    setSession(null);
    return { error: null };
  },
};

/* --------------------------------- rpc ---------------------------------- */

function rpc(name: string, args: Row = {}) {
  const resolver: Record<string, () => Row[]> = {
    resolve_tenant_by_hostname: () => {
      const domain = rows("organization_domains").find((d) => d.hostname === args.p_hostname);
      if (!domain) return [];
      const org = rows("organizations").find((o) => o.id === domain.organization_id);
      return org ? [org] : [];
    },
  };
  const data = resolver[name]?.() ?? [];
  return {
    maybeSingle: async () => ok(data[0] ?? null),
    single: async () => ok(data[0] ?? null),
    then: (res: any) => Promise.resolve(ok(data)).then(res),
  };
}

export const mockClient = {
  from: (table: string) => new Query(table),
  auth,
  rpc,
  functions: {
    /**
     * Substitui as funções de servidor. Hoje registra o convite localmente;
     * com o banco conectado, volta a ser uma chamada de edge function.
     */
    async invoke(name: string, opts?: { body?: Row }) {
      const error = null as { message: string; context?: any } | null;
      if (name === "invite-user" && opts?.body) {
        const body = opts.body;
        const already = rows("organization_invites").find(
          (i) =>
            i.organization_id === body.organization_id &&
            i.email === String(body.email).toLowerCase() &&
            i.status === "pending",
        );
        if (already) {
          return { data: null, error: { message: "Já existe um convite pendente para este e-mail." } };
        }
        rows("organization_invites").push({
          id: uid("inv"),
          organization_id: body.organization_id,
          email: String(body.email).toLowerCase(),
          role: body.role ?? "student",
          status: "pending",
          created_at: new Date().toISOString(),
          expires_at: null,
        });
        return { data: { ok: true }, error };
      }
      return { data: { ok: true }, error };
    },
  },
  channel: () => ({
    on: () => ({ subscribe: () => ({ unsubscribe: () => {} }) }),
    subscribe: () => ({ unsubscribe: () => {} }),
  }),
  removeChannel: () => {},
};

export type MockClient = typeof mockClient;
