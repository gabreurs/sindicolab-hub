import { useRef, useState } from "react";
import { ImageUp, Loader2, RefreshCw, Trash2 } from "lucide-react";
import { IS_MOCK_DATA, supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/console/ui";

type Props = {
  organizationId: string;
  kind: "logo-light" | "logo-dark" | "favicon" | "banner";
  label: string;
  hint: string;
  value: string | null;
  darkPreview?: boolean;
  onChange: (url: string | null) => void;
};

const MAX_BYTES = 5 * 1024 * 1024;

export function ImageUploadField({ organizationId, kind, label, hint, value, darkPreview, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const upload = async (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) { setMessage("Escolha um arquivo de imagem."); return; }
    if (file.size > MAX_BYTES) { setMessage("A imagem deve ter no máximo 5 MB."); return; }
    if (IS_MOCK_DATA) { setMessage("O envio fica disponível quando o banco estiver conectado."); return; }
    setBusy(true); setMessage(null);
    const extension = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "png";
    const path = `${organizationId}/${kind}-${Date.now()}.${extension}`;
    const storage = (supabase as any).storage.from("brand");
    const { error } = await storage.upload(path, file, { cacheControl: "31536000", contentType: file.type, upsert: false });
    if (error) { setMessage(error.message); setBusy(false); return; }
    const { data } = storage.getPublicUrl(path);
    onChange(data.publicUrl);
    setBusy(false);
  };

  return (
    <div>
      <p className="text-xs font-medium">{label}</p>
      <p className="mt-1 text-[11px] c-muted">{hint}</p>
      <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml,image/x-icon" className="sr-only" onChange={(e) => void upload(e.target.files?.[0])} />
      <button
        type="button"
        className="mt-2 flex min-h-28 w-full items-center justify-center overflow-hidden rounded-md border border-dashed p-3 text-center transition"
        style={{ borderColor: "var(--c-border)", background: darkPreview ? "var(--c-text)" : "var(--c-surface-2)" }}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); void upload(e.dataTransfer.files?.[0]); }}
      >
        {busy ? <Loader2 className="h-5 w-5 animate-spin c-muted" aria-label="Enviando imagem" /> : value ? (
          <img src={value} alt={`Prévia de ${label}`} className={kind === "banner" ? "max-h-40 w-full object-cover" : "max-h-16 max-w-[220px] object-contain"} />
        ) : (
          <span className="grid justify-items-center gap-2 text-xs c-muted"><ImageUp className="h-5 w-5" />Clique ou arraste uma imagem</span>
        )}
      </button>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <Button size="sm" onClick={() => inputRef.current?.click()} disabled={busy}>
          {value ? <><RefreshCw className="h-3.5 w-3.5" />Trocar imagem</> : <><ImageUp className="h-3.5 w-3.5" />Enviar imagem</>}
        </Button>
        {value && <Button size="sm" variant="ghost" onClick={() => onChange(null)} disabled={busy}><Trash2 className="h-3.5 w-3.5" />Remover</Button>}
        <span className="text-[11px] c-muted">PNG, JPG, WebP ou SVG · até 5 MB</span>
      </div>
      {message && <p className="mt-2 text-xs" style={{ color: "var(--c-danger)" }}>{message}</p>}
    </div>
  );
}