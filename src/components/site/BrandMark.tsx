import logoNavyPurple from "@/assets/brand/logo-navy-purple.svg";
import logoBlackBlue from "@/assets/brand/logo-black-blue.svg";
import logoBlackPurple from "@/assets/brand/logo-black-purple.svg";
import logoWhiteBlue from "@/assets/brand/logo-white-blue.svg";
import logoWhitePurple from "@/assets/brand/logo-white-purple.svg";

type Props = {
  size?: number;
  withWordmark?: boolean;
  tone?: "light" | "dark";
  variant?: "navy-purple" | "black-blue" | "black-purple" | "white-blue" | "white-purple";
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
  variant,
  className = "",
  responsive = false,
}: Props) {
  const resolvedVariant = variant ?? (tone === "dark" ? "black-blue" : "white-blue");
  const sources = {
    "navy-purple": logoNavyPurple,
    "black-blue": logoBlackBlue,
    "black-purple": logoBlackPurple,
    "white-blue": logoWhiteBlue,
    "white-purple": logoWhitePurple,
  };
  const logoSrc = sources[resolvedVariant];
  const style: React.CSSProperties = responsive
    ? {
        display: "block",
        width: "clamp(145px, 48vw, 185px)",
        maxWidth: "100%",
        height: "auto",
        objectFit: "contain",
        objectPosition: "left center",
        flexShrink: 1,
      }
    : { height: size, width: "auto" };
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
