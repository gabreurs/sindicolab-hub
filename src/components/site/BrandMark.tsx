import logoSrc from "@/assets/logo-sindicolab.svg";

type Props = {
  size?: number;
  withWordmark?: boolean;
  tone?: "light" | "dark";
  className?: string;
  animated?: boolean;
  responsive?: boolean;
};

/**
 * Logotipo SíndicoLab — SVG oficial enviado pelo cliente.
 * O arquivo é branco; em tone="dark" aplicamos invert para fundo claro.
 */
export function BrandMark({
  size = 28,
  tone = "dark",
  className = "",
  responsive = false,
}: Props) {
  const filter = tone === "dark" ? "invert(1)" : "none";
  const style: React.CSSProperties = responsive
    ? {
        display: "block",
        width: "clamp(145px, 48vw, 185px)",
        maxWidth: "100%",
        height: "auto",
        objectFit: "contain",
        objectPosition: "left center",
        flexShrink: 1,
        filter,
      }
    : { height: size, width: "auto", filter };
  return (
    <span
      className={`inline-flex items-center ${className}`}
      aria-label="SíndicoLab"
      style={responsive ? { minWidth: 0, maxWidth: "100%" } : undefined}
    >
      <img src={logoSrc} alt="SíndicoLab" style={style} draggable={false} />
    </span>
  );
}
