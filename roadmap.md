# Roadmap

- [x] Auditar busca, filtros, cards e diferenças por tenant na Academy
- [x] Corrigir busca sem acentos e reduzir atraso percebido
- [x] Melhorar hierarquia de preço e ações dos cards
- [x] Validar catálogo e home em desktop e mobile
- [x] Corrigir navegação por setas e Enter na busca global
- [x] Remover instruções de teclado da busca global e da busca rápida
- [x] Reestruturar sugestões da busca para o ecossistema condominial
- [x] Trocar e-mail sem ação por contato direto com Rafael Bernardes no mega menu
- [x] Corrigir todos os botões “Falar com a equipe” para contato funcional
- [x] Validar /admin, /empresa e /portal em vários tamanhos, acesso direto e recarga estilo cPanel
- [x] Adicionar métricas de cursos, Kiwify, materiais e conversões por produto no admin
- [ ] Assistente em linguagem natural — bloqueado: AI Gateway é pago e requer servidor seguro
- [x] Remover a página /patrocinios e toda navegação, busca ou redirecionamento para ela
- [x] Fazer todo logo SíndicoLab voltar à home e exibir globalmente o botão do grupo no WhatsApp
- [x] Eliminar o lag e aprimorar a UI/UX da busca/filtro da home
- [x] Aplicar as novas fotos reais na página Quem somos
- [x] Corrigir os acessos ao YouTube no Portal
- [x] Validar o login administrativo de demonstração
- [x] Conectar Supabase próprio (projeto do cliente, fora do Lovable): schema, RLS, storage, convites e build para cPanel
- [x] Finalizar a apresentação white-label da CASA: entrada pública, logo, favicon, cores e fontes próprias
- [x] Substituir URLs de logo, favicon e banner por upload direto no editor de marca
- [x] Remover a linha visual sob os cabeçalhos da Academy e do painel da empresa
- [x] Fazer fundo, superfícies, textos e ações acompanharem a identidade de cada tenant
- [x] Aplicar logo, cores e fontes do tenant em todo o /empresa
- [x] Exibir Inherit e ampliar a lista de fontes somente para a CASA Academy
- [x] Tornar o seletor claro/escuro visível e persistente em toda Academy e /empresa
- [x] Ajustar a CASA para #FFCD00, #1D1D1B e #FFFFFF e validar responsividade
- [x] Manter escopo explícito: identidade CASA e fontes extras só na CASA; melhorias estruturais para todos os tenants
- [x] Exibir duração e nível em todos os cursos (SQL 08) e editar esses campos no painel de cursos
- [x] Corrigir capas quebradas dos cursos e notícias (SQL 08 + arquivos publicados no site)
- [x] Aplicar as capas enviadas ao acervo das administradoras sem alterar as capas do SíndicoLab
- [x] Corrigir a capa de IA v2 e reutilizar a capa do Zelador do SíndicoLab nos tenants

## 2026-09-28
- [x] Aviso evidente "confira o spam" em todos os fluxos que enviam e-mail de acesso (login, definir-senha, /empresa convite, reenviar senha, importação CSV)
- [x] Investigar flash da página SíndicoLab durante loading antes de cair na CASA Academy (explicar causa e corrigir)

## 2026-10-22
- [x] Trocar a capa da notícia de São Paulo (Arena Condoexpo.SP) pela foto real do evento e gerar novo pacote

## 2026-11-16
- [x] Remover os 12 materiais fakes do seed, do mock, da página e do banco (SQL 12)
- [x] Verificar o Supabase conectado (tabelas, domínios, contas de acesso)
- [x] Criar SQL 13 para conceder platform_admin e destravar o /admin real

## 2026-11-24
- [x] Remover faixa de parceiros falsos (PROSEG/OTIS/Intelbras...) da home do Portal
- [x] Artigos do /admin (site_articles) não aparecem no Portal (portal_posts): unificar leitura
- [x] Categoria do artigo no /admin virar seleção das categorias do Portal (hoje é texto livre)
- [x] Verificar exibição da data de publicação nos artigos do Portal
- [x] Conferir material "Ebook claude" aparecendo em /materiais no site ao vivo
