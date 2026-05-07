import type { PropsWithChildren } from "react";

/**
 * TransitionProvider — desativado.
 * As ondas SVG de transição foram removidas por motivos de performance
 * e direção visual. A navegação agora é direta, sem overlay.
 */
export function TransitionProvider({ children }: PropsWithChildren) {
  return <>{children}</>;
}
