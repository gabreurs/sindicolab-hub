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
- Criar `.site-container` com gutters, breakpoints e eixos de alinhamento derivados da hero atual.
- Disponibilizar `content-max` para home/site e `content-max-wide` para admin/empresa quando necessário, sem alterar gutters ou âncoras.
- Fazer os containers legados (`container-x`, Academy, admin e páginas especiais) herdarem essas regras quando forem estruturas principais.
- Alinhar header, páginas internas, breadcrumbs e conteúdo do mega menu nesse grid.
- Manter o mesmo elemento de logo, busca e botão Menu fisicamente ancorado ao abrir o mega menu, evitando um segundo logo ou remount sempre que possível; a superfície pode ocupar a tela inteira, mas seus controles persistentes não mudarão de coordenada.

### 3. Header e controles
- Ajustar o header normal e compacto para usar a família de cantos global, sem excesso de cápsulas.
- Padronizar altura, padding, ícones e raio de Buscar, Sair, Plataforma, Menu e ações equivalentes.
- Preservar fundo branco nos controles sobre superfícies escuras e contraste adequado nas demais.

### 4. Uso contextual dos logos
- Auditar todas as aparições da marca.
- Escolher a variante pela família cromática da composição, não apenas pela luminosidade: azul com azul, roxo com roxo e neutro com a variante institucional adequada.
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
