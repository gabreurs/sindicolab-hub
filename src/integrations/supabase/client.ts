/**
 * Ponto único de acesso a dados.
 *
 * Com `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` definidos no build, o site
 * conversa com o banco real. Sem essas variáveis (ex.: prévia local sem banco),
 * continua usando os dados de exemplo em memória — nenhum componente muda.
 */
import { createClient } from "@supabase/supabase-js";
import { mockClient } from "@/services/db/mockClient";

const url = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.trim();
const anonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined)?.trim();

const hasBackend = Boolean(url && anonKey);

export const supabase: any = hasBackend
  ? createClient(url!, anonKey!, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    })
  : mockClient;

/** true quando os dados vêm de exemplos em memória (sem banco conectado). */
export const IS_MOCK_DATA = !hasBackend;
