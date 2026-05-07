import logoSrc from "@/assets/logo-sindicolab.svg";

type Props = {
  size?: number;
  withWordmark?: boolean;
  tone?: "light" | "dark";
  className?: string;
  animated?: boolean;
};

/**
 * Logotipo SíndicoLab — SVG oficial enviado pelo cliente.
 * O arquivo é branco; em tone="dark" aplicamos invert para fundo claro.
 */
export function BrandMark({
  size = 28,
  tone = "dark",
  className = "",
}: Props) {
  const height = size;
  const filter = tone === "dark" ? "invert(1)" : "none";
  return (
    <span className={`inline-flex items-center ${className}`} aria-label="SíndicoLab">
      <img
        src={logoSrc}
        alt="SíndicoLab"
        style={{ height, width: "auto", filter }}
        draggable={false}
      />
    </span>
  );
}
