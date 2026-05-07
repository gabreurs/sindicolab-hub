/**
 * ViewportGlassEdges — camadas globais de vidro fixas na viewport.
 * Não pertencem a nenhuma seção. Usam backdrop-filter + mask-image
 * para criar profundidade no topo/rodapé sem cobrir conteúdo.
 *
 * z-index: 40 (abaixo do header 70, mega menu 90, search 100).
 */
export function ViewportGlassEdges() {
  return <div className="edge-blur-bottom" aria-hidden />;
}

// Backwards-compat export name used elsewhere.
export const EdgeBlur = ViewportGlassEdges;
