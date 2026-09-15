# Consistência visual global do SíndicoLab

## Objetivo
Unificar cantos, grid horizontal, controles e uso da marca em todo o produto, mantendo os layouts e fluxos atuais.

## Implementação

### 1. Sistema global de cantos
- Definir quatro tokens semânticos: card, controle, pequeno e pill.
- Tomar os cards da home como referência do `radius-card`.
- Substituir valores arbitrários em site, Academy, player, admin, empresa, formulários, modais e menus.
- Reservar `pill` para badges, tags, filtros, indicadores e botões circulares; botões comuns e inputs usarão `radius-control`.

### 2. Grid e alinhamento único
- Criar `.site-container` com uma única largura máxima e gutters responsivos derivados da hero atual.
- Fazer os containers legados (`container-x`, Academy, admin e páginas especiais) herdarem os mesmos tokens de largura e gutter quando forem estruturas principais.
- Alinhar header, páginas internas, breadcrumbs e conteúdo do mega menu nesse grid.
- Manter logo, busca e botão Menu espacialmente ancorados ao abrir o mega menu; a superfície pode ocupar a tela inteira, mas seu conteúdo não mudará de coordenada.

### 3. Header e controles
- Ajustar o header normal e compacto para usar a família de cantos global, sem excesso de cápsulas.
- Padronizar altura, padding, ícones e raio de Buscar, Sair, Plataforma, Menu e ações equivalentes.
- Preservar fundo branco nos controles sobre superfícies escuras e contraste adequado nas demais.

### 4. Uso contextual dos logos
- Auditar todas as aparições da marca.
- Aplicar Preto-Azul em contextos claros/azuis neutros; Preto-Roxo em contextos claros/roxos; branco com acento azul em fundos azul-marinho; branco com acento roxo em fundos roxos.
- Preservar Preto-Azul entre o header fechado e o mega menu aberto.
- Corrigir especificamente o banner roxo e o rodapé azul-marinho.
- Manter logos próprios dos tenants e usar o logo oficial SíndicoLab, nunca placeholder, quando o tenant for a plataforma.

### 5. Favicon de produção
- Usar somente o símbolo oficial azul, sem lettering.
- Gerar `favicon.svg`, `favicon.ico`, PNG 16×16, PNG 32×32 e `apple-touch-icon.png`.
- Criar/atualizar o webmanifest com os tamanhos usados e conectar todos os metadados no documento, incluindo `theme-color`.

### 6. Validação
- Fazer busca final por valores concorrentes de `border-radius`, `max-width` e gutters.
- Verificar visualmente home, mega menu aberto, página interna, Academy/login, catálogo, admin e empresa em desktop e mobile.
- Confirmar que o logo não salta ao abrir o menu e que nenhum conteúdo ou controle ficou sobreposto.
