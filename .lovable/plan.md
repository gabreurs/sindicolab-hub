# CASA Academy: entrada pública e identidade própria

## Resultado
- Ao abrir `admcasa.studiomarqo.com.br`, o visitante será levado diretamente à página inicial pública da CASA Academy, sem passar pelo site SíndicoLab e sem exigir login para conhecer o catálogo.
- A marca da CASA aparecerá no cabeçalho, na entrada e na tela de login; a aba do navegador usará um favicon derivado do símbolo da CASA.
- A CASA terá cores e tipografia próprias em toda a Academy, sem alterar a identidade do SíndicoLab ou de outros clientes.

## Implementação
1. Preparar a logo enviada com fundo transparente, publicar a versão para uso no site e gerar um favicon quadrado com o símbolo da CASA.
2. Corrigir a entrada por domínio para enviar tenants white-label a `/academy`, mantendo o redirecionamento automático para `/academy/inicio` apenas depois da autenticação.
3. Atualizar a marca inicial da CASA no SQL com logo, favicon e paleta próprios, garantindo que a repetição do seed atualize esses dados.
4. Adicionar ao cadastro de marca duas escolhas independentes: fonte de títulos e fonte de textos. A lista terá opções seguras e conhecidas do Google Fonts; a fonte será carregada somente quando o tenant a escolher.
5. Aplicar as fontes e as cores do tenant às superfícies da Academy e à tela de login, preservando contraste e legibilidade.
6. Atualizar o editor de marca para permitir que cada administradora escolha suas fontes, mantendo essa configuração isolada por tenant.
7. Gerar um SQL complementar para bancos que já rodaram os seis arquivos, além de manter os arquivos-base corretos para instalações novas.
8. Validar a experiência da CASA deslogada e a tela de login em celular e desktop, conferir logo/favicon e gerar uma nova `dist` completa para o cPanel.

## Detalhes técnicos
- Novos campos em `organization_branding`: `heading_font` e `body_font`.
- As fontes serão aplicadas por variáveis CSS do tenant, com fallback local; nenhuma URL de fonte será importada em CSS.
- A resolução continuará sendo feita pelo hostname cadastrado em `organization_domains`; não haverá build separado por cliente.
- O catálogo público continuará respeitando as regras atuais de acesso às aulas: ver a vitrine não libera conteúdo restrito.
