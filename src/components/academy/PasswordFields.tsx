import { useState } from "react";
import { Check, Eye, EyeOff, X } from "lucide-react";

export const passwordRules = (pw: string, pw2: string) => [
  { ok: pw.length >= 8, label: "Pelo menos 8 caracteres" },
  { ok: /[A-Za-zÀ-ÿ]/.test(pw), label: "Pelo menos uma letra" },
  { ok: /\d/.test(pw), label: "Pelo menos um número" },
  { ok: pw.length > 0 && pw === pw2, label: "As duas senhas são iguais" },
];

function Field({ value, onChange, placeholder, id }: { value: string; onChange: (v: string) => void; placeholder: string; id: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only">{placeholder}</label>
      <input
        id={id}
        type={show ? "text" : "password"}
        required
        autoComplete="new-password"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full py-3 pl-4 pr-12 text-[15px]"
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        aria-label={show ? "Ocultar senha" : "Mostrar senha"}
        aria-pressed={show}
        className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md opacity-70 transition hover:opacity-100"
      >
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}

export function PasswordFields({ pw, pw2, setPw, setPw2 }: { pw: string; pw2: string; setPw: (v: string) => void; setPw2: (v: string) => void }) {
  const rules = passwordRules(pw, pw2);
  return (
    <div className="space-y-3">
      <Field id="pw" value={pw} onChange={setPw} placeholder="Senha" />
      <Field id="pw2" value={pw2} onChange={setPw2} placeholder="Repita a senha" />
      <ul className="space-y-1.5 pt-1" aria-live="polite">
        {rules.map((r) => (
          <li key={r.label} className="flex items-center gap-2 text-[13px]" style={{ opacity: r.ok ? 1 : 0.65 }}>
            {r.ok ? <Check className="h-3.5 w-3.5" style={{ color: "var(--ax-accent, currentColor)" }} /> : <X className="h-3.5 w-3.5" />}
            <span>{r.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
