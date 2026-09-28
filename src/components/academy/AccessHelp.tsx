import { useState } from "react";
import ReactMarkdown from "react-markdown";

const TIPS: { re: RegExp; tip: string }[] = [
  { re: /expir|venc|invalid|usado/, tip: "**Link expirado:** cada link funciona uma única vez. Na tela de entrada, digite seu e-mail e clique em \"Esqueci minha senha\" para receber um novo." },
  { re: /nao cheg|nao receb|spam|email|e-mail/, tip: "**E-mail não chegou:** procure na caixa de entrada e no spam pelo remetente \"CASA Academy\". Confira se digitou o mesmo e-mail em que recebeu o convite. Se não tiver conta, nenhum e-mail é enviado." },
  { re: /senha|errad|incorret|esqueci/, tip: "**Senha não funciona:** use \"Esqueci minha senha\" para criar uma nova. Ela precisa ter 8 caracteres, com letra e número." },
  { re: /pendent|aprova|pedido|solicit|convite/, tip: "**Pedido ou convite:** seu acesso só funciona depois que a administradora CASA aprovar seu cadastro. Fale com ela para confirmar." },
  { re: /bloque|desativ|suspen|inativ/, tip: "**Acesso desativado:** apenas a administradora CASA pode reativar seu cadastro. Fale com ela." },
];

const FALLBACK = `Tente assim:

1. **Confira o e-mail**: use o mesmo e-mail em que você recebeu o convite.
2. **Procure o e-mail de acesso** na caixa de entrada e no spam, remetente "CASA Academy".
3. **Link vencido?** Cada link funciona uma única vez. Peça um novo em "Esqueci minha senha".
4. **Ainda sem acesso?** Fale com a administradora: talvez seu cadastro ainda não tenha sido aprovado.`;

export function AccessHelp() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [answer, setAnswer] = useState("");
  const [busy, setBusy] = useState(false);

  const ask = (e: React.FormEvent) => {
    e.preventDefault();
    const problem = text.trim();
    if (problem.length < 5) return;
    setBusy(true);
    setAnswer("");
    const n = problem.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const hits = TIPS.filter((t) => t.re.test(n)).map((t) => t.tip);
    setAnswer(hits.length ? hits.join("\n\n") + "\n\nAinda sem acesso? Fale com a administradora CASA." : FALLBACK);
    setBusy(false);

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
          {busy ? "…" : "Receber orientação"}
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
