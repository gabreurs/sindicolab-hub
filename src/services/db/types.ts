// Tipos mínimos de sessão/usuário — compatíveis com o formato do Supabase Auth.
// Quando o Supabase real entrar, estes tipos podem ser trocados por
// `import type { Session, User } from "@supabase/supabase-js"`.

export type User = {
  id: string;
  email?: string;
  user_metadata?: Record<string, unknown>;
  app_metadata?: Record<string, unknown>;
  created_at?: string;
};

export type Session = {
  access_token: string;
  refresh_token: string;
  expires_at?: number;
  token_type: string;
  user: User;
};

export type AuthChangeEvent =
  | "INITIAL_SESSION"
  | "SIGNED_IN"
  | "SIGNED_OUT"
  | "TOKEN_REFRESHED"
  | "USER_UPDATED";

export type Row = Record<string, any>;

export type QueryResult<T = Row[]> = {
  data: T | null;
  error: { message: string } | null;
  count: number | null;
};
