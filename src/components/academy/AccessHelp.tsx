import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/integrations/supabase/client";

const FALLBACK = `Não consegui gerar uma orientação agora. Tente assim:

1. **Confira o e-mail**: use o mesmo e-mail em que você recebeu o convite.
2. **Procure o e-mail de acesso** na caixa de entrada e no spam, remetente "CASA Academy".
3. **Link vencido?** Cada link funciona uma única vez. Peça um novo em "Esqueci minha senha".
4. **Ainda sem acesso?** Fale com a administradora: talvez seu cadastro ainda não tenha sido aprovado.`;

export function AccessHelp() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [answer, setAnswer] = useState("");
  const [busy, setBusy] = useState(false);

  const ask = async (e: React.FormEvent) => {
    e.preventDefault();
    const problem = text.trim();
    if (problem.length < 5) return;
    setBusy(true);
    setAnswer("");
    try {
      const { data, error } = await (supabase as any).functions.invoke("access-help", {
        body: { problem: problem.slice(0, 1000), site: window.location.hostname },
      });
      if (error || !data?.answer) throw error ?? new Error("sem resposta");
      setAnswer(data.answer);
    } catch {
      setAnswer(FALLBACK);
    } finally {
      setBusy(false);
    }
  };

  if (!open)
    return (
      <button type="button" onClick={() => setOpen(true)} className="ax-body mt-6 w-full text-center text-[13px] underline underline-offset-4">
        Não consegue entrar? Descreva o problema
      </button>
    );

  return (
    <div className="mt-6 border-t pt-6" style={{ borderColor: "color-mix(in srgb, currentColor 12%, transparent)" }}>
      <h2 className="text-[15px] font-medium">Ajuda com o acesso</h2>
      <p className="ax-body mt-1 text-[13px]">Conte o que está acontecendo e receba um passo a passo para resolver.</p>
      <form onSubmit={ask} className="mt-4 space-y-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={1000}
          rows={3}
          placeholder="Ex.: Recebi o convite, mas o link diz que expirou."
          className="w-full px-4 py-3 text-[14px]"
        />
        <button disabled={busy || text.trim().length < 5} type="submit" className="ax-btn w-full" data-variant="secondary">
          {busy ? "Gerando orientação…" : "Receber orientação"}
        </button>
      </form>
      {answer && (
        <div className="ax-body prose-sm mt-4 space-y-2 text-[14px] [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5">
          <ReactMarkdown>{answer}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
