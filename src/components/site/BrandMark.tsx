type Props = {
  size?: number;
  withWordmark?: boolean;
  tone?: "light" | "dark";
  className?: string;
  animated?: boolean;
};

/**
 * Logotipo SíndicoLab — símbolo "S" geométrico com brilho ciano no "Lab".
 * SVG nativo: pode ser desenhado por stroke (intro) e tem alt para acessibilidade.
 */
export function BrandMark({
  size = 28,
  withWordmark = true,
  tone = "dark",
  className = "",
  animated = false,
}: Props) {
  const inkColor = tone === "dark" ? "var(--ink)" : "var(--background)";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`} aria-label="SíndicoLab">
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        className={animated ? "logo-stroke" : ""}
        aria-hidden
      >
        <defs>
          <linearGradient id="sl-grad" x1="0" y1="0" x2="40" y2="40">
            <stop offset="0%" stopColor="oklch(0.45 0.2 262)" />
            <stop offset="55%" stopColor="oklch(0.55 0.22 285)" />
            <stop offset="100%" stopColor="oklch(0.78 0.14 220)" />
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="38" height="38" rx="11" fill="url(#sl-grad)" />
        <path
          d="M27 14.5c-1.6-2-4.1-3-6.9-3-3.7 0-6.6 1.9-6.6 5 0 3 2.4 4.2 6.7 5.1 4.4 1 7.4 2.4 7.4 5.6 0 3.4-3.2 5.4-7.5 5.4-3.5 0-6.4-1.4-7.9-3.6"
          stroke="white"
          strokeWidth="2.6"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      {withWordmark && (
        <span
          className="font-display text-[1.05rem] tracking-[-0.02em]"
          style={{ color: inkColor }}
        >
          Síndico<span style={{ color: "oklch(0.78 0.14 220)" }}>Lab</span>
        </span>
      )}
    </span>
  );
}
