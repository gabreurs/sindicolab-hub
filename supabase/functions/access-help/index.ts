// Orientação de recuperação de acesso gerada por IA (Lovable AI Gateway).
// Segredo necessário no Supabase: LOVABLE_API_KEY.
const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (b: unknown, s = 200) =>
  new Response(JSON.stringify(b), { status: s, headers: { ...cors, "Content-Type": "application/json" } });

const SYSTEM = `Você é o suporte de acesso da CASA Academy (plataforma de cursos da Administradora CASA).
Responda em português do Brasil, tom cordial e direto, no máximo 6 passos curtos em lista numerada.
Como o acesso funciona:
- A administradora convida a pessoa por e-mail ou aprova um pedido de acesso; a pessoa recebe um e-mail "CASA Academy" com link para criar a senha.
- Cada link funciona uma única vez e vence em pouco tempo; se aparecer "link expirado", pedir um novo em "Esqueci minha senha" na tela de entrada.
- Por segurança, o sistema não informa se um e-mail está cadastrado: se o e-mail não tiver conta, nenhum e-mail chega.
- Senha: mínimo 8 caracteres, com letra e número.
- Se nada resolver, falar com a administradora CASA para confirmar o cadastro.
Nunca peça a senha da pessoa. Não invente telefones, e-mails ou prazos.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "Método não permitido." }, 405);
  const key = Deno.env.get("LOVABLE_API_KEY");
  if (!key) return json({ error: "Ajuda por IA não configurada." }, 503);

  let problem = "";
  try {
    const b = await req.json();
    problem = String(b?.problem ?? "").trim().slice(0, 1000);
  } catch {
    return json({ error: "Corpo inválido." }, 400);
  }
  if (problem.length < 5) return json({ error: "Descreva o problema." }, 400);

  const r = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Lovable-API-Key": key, "X-Lovable-AIG-SDK": "fetch" },
    body: JSON.stringify({
      model: "openai/gpt-6-astra",
      stream: true,
      store: false,
      reasoning: { effort: "low" },
      instructions: SYSTEM,
      input: [{ role: "user", content: problem }],
    }),
  });
  if (!r.ok || !r.body) {
    const detail = await r.text();
    console.error(`Gateway [${r.status}]: ${detail}`);
    return json({ error: "Não foi possível gerar a orientação.", status: r.status }, r.status === 429 || r.status === 402 ? r.status : 502);
  }

  const reader = r.body.getReader();
  const dec = new TextDecoder();
  let buf = "", answer = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    const lines = buf.split("\n");
    buf = lines.pop() ?? "";
    for (const l of lines) {
      if (!l.startsWith("data:")) continue;
      const d = l.slice(5).trim();
      if (!d || d === "[DONE]") continue;
      try {
        const ev = JSON.parse(d);
        if (ev.type === "response.output_text.delta") answer += ev.delta ?? "";
      } catch { /* linha parcial */ }
    }
  }
  if (!answer.trim()) return json({ error: "Sem resposta." }, 502);
  return json({ answer: answer.trim() });
});
