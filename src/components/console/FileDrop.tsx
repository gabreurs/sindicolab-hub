import { useRef, useState } from "react";

/**
 * Área de upload explícita: deixa claro que é possível arrastar ou escolher um
 * arquivo, mostra o arquivo selecionado e permite trocar/remover.
 */
export function FileDrop({
  fileName,
  hasFile,
  hint,
  maxBytes = 8 * 1024 * 1024,
  onFile,
  onClear,
  onError,
}: {
  fileName?: string | null;
  hasFile?: boolean;
  hint?: string;
  maxBytes?: number;
  onFile: (file: File) => void;
  onClear?: () => void;
  onError?: (message: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);

  const handle = (file?: File | null) => {
    if (!file) return;
    if (file.size > maxBytes) {
      onError?.(`Arquivo acima de ${Math.round(maxBytes / (1024 * 1024))} MB. Envie uma versão menor.`);
      return;
    }
    onFile(file);
  };

  return (
    <div className="mt-1.5">
      <div
        role="button"
        tabIndex={0}
        aria-label="Selecionar arquivo para upload"
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(e) => { e.preventDefault(); setOver(true); }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setOver(false);
          handle(e.dataTransfer.files?.[0]);
        }}
        className="flex w-full cursor-pointer flex-col items-center gap-2 rounded-[var(--c-radius, 14px)] border border-dashed px-5 py-7 text-center transition-colors"
        style={{
          borderColor: over ? "var(--c-focus)" : "var(--c-border)",
          background: over ? "color-mix(in oklab, var(--c-focus) 8%, transparent)" : "transparent",
        }}
      >
        <svg viewBox="0 0 24 24" aria-hidden className="h-6 w-6 opacity-60" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 16V4m0 0 4 4m-4-4L8 8" />
          <path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
        </svg>
        <p className="text-sm font-medium">Arraste o arquivo aqui ou clique para escolher</p>
        <p className="text-xs c-muted">{hint ?? "PDF, planilha, documento ou imagem (até 8 MB)."}</p>
        <span className="c-btn mt-1" data-variant="secondary" data-size="sm" aria-hidden>
          Escolher arquivo
        </span>
      </div>

      <input
        ref={inputRef}
        type="file"
        className="sr-only"
        onChange={(e) => handle(e.target.files?.[0])}
      />

      {(fileName || hasFile) && (
        <div
          className="mt-2 flex items-center justify-between gap-3 rounded-[12px] border px-3 py-2"
          style={{ borderColor: "var(--c-border-soft)" }}
        >
          <span className="min-w-0 truncate text-xs">
            {fileName ? `Arquivo: ${fileName}` : "Arquivo enviado."}
          </span>
          <span className="flex shrink-0 items-center gap-1.5">
            <button type="button" className="c-btn" data-variant="ghost" data-size="sm" onClick={() => inputRef.current?.click()}>
              Trocar
            </button>
            {onClear && (
              <button type="button" className="c-btn" data-variant="ghost" data-size="sm" onClick={onClear}>
                Remover
              </button>
            )}
          </span>
        </div>
      )}
    </div>
  );
}
