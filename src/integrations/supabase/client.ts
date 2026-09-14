/**
 * Ponto único de acesso a dados.
 *
 * HOJE: exporta o cliente em memória (`mockClient`), com dados de exemplo.
 * SEGUNDA ETAPA: basta trocar o corpo deste arquivo pelo cliente real —
 *
 *   import { createClient } from "@supabase/supabase-js";
 *   export const supabase = createClient(URL, PUBLISHABLE_KEY);
 *
 * Nenhum componente, hook ou serviço precisa ser alterado: todos importam
 * `supabase` daqui. Nenhuma credencial fica no bundle enquanto isso.
 */
import { mockClient } from "@/services/db/mockClient";

export const supabase = mockClient;

/** true quando os dados vêm de exemplos em memória (sem banco conectado). */
export const IS_MOCK_DATA = true;
