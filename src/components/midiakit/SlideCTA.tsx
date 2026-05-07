import { ArrowUpRight } from "lucide-react";
import type { ComponentProps } from "react";

interface Props extends Omit<ComponentProps<"a">, "href"> {
  href: string;
  variant?: "ghost" | "ghost-dark" | "solid";
  children: React.ReactNode;
}

export const SlideCTA = ({ href, variant = "ghost", children, className = "", ...rest }: Props) => {
  const styles =
    variant === "solid"
      ? "bg-[hsl(var(--mk-fg))] text-[hsl(var(--mk-bg))] hover:bg-[hsl(var(--mk-purple))]"
      : variant === "ghost-dark"
      ? "border border-white/25 text-[hsl(var(--mk-bg))] hover:border-white/60"
      : "border border-[hsl(var(--mk-fg))]/20 text-[hsl(var(--mk-fg))] hover:border-[hsl(var(--mk-fg))]/60";
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-medium tracking-wide transition-all hover:gap-3 ${styles} ${className}`}
      {...rest}
    >
      {children}
      <ArrowUpRight className="h-3.5 w-3.5" />
    </a>
  );
};
