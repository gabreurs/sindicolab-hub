import { supabase } from "@/integrations/supabase/client";
import { EXTERNAL_LINKS } from "@/config/external-links";

export type CaptureResult =
  | { ok: true; redirectTo: string }
  | { ok: false; reason: "invalid_email" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(email: string) {
  return EMAIL_RE.test(email.trim());
}

/**
 * Captura de e-mail da newsletter.
 *
 * HOJE: valida o formato e devolve o destino do Substack — a assinatura é
 * concluída lá. Nenhuma persistência é simulada no navegador.
 * SEGUNDA ETAPA: o insert abaixo grava no banco e a inscrição fica nossa.
 */
export async function captureNewsletterEmail(email: string): Promise<CaptureResult> {
  const clean = email.trim().toLowerCase();
  if (!isValidEmail(clean)) return { ok: false, reason: "invalid_email" };

  try {
    await supabase.from("newsletter_subscribers").insert({
      email: clean,
      source: "site",
      status: "pending_substack",
    });
  } catch {
    // Sem banco conectado a captura não bloqueia o fluxo do assinante.
  }

  return { ok: true, redirectTo: EXTERNAL_LINKS.SUBSTACK };
}

export const newsletterService = { captureNewsletterEmail, isValidEmail };
