# Conexão do banco de dados real (go-live white-label)

Hoje o site funciona com dados de exemplo guardados na memória do navegador: nada
do que é cadastrado sobrevive a um recarregamento. O objetivo é ligar um banco de
dados real, com logins de verdade, arquivos e isolamento entre empresas, para
poder vender a plataforma para a Administradora CASA.

## O que eu faço (aqui no chat)

**1. Criar o banco**
Crio o backend por aqui mesmo — banco, logins, arquivos e funções de servidor.
Você não precisa criar conta em nenhum serviço externo nem configurar nada.

**2. Criar a estrutura**
Crio todas as tabelas que o site já usa hoje com os mesmos nomes: empresas,
domínios de cada empresa, marcas, convites, pessoas e papéis, catálogo por
empresa, cursos, módulos, aulas, materiais do curso, progresso, avaliações,
comentários, matrículas, pedidos de acesso, lista do aluno, e o conteúdo do site
(materiais para download, artigos, eventos, newsletter, Portal).

**3. Fechar o acesso de cada empresa (o ponto crítico do white-label)**
Cada empresa só vê o que é dela. Um aluno da CASA nunca alcança dados de outra
administradora, nem trocando algo no navegador. Papéis ficam em tabela separada
(dono da plataforma, administrador da empresa, aluno) — nunca no perfil da
pessoa, para não permitir que alguém se promova a administrador.

**4. Entrada somente por convite**
Cadastro livre desligado. O administrador convida por e-mail e a pessoa define a
senha. Recuperação de senha funcionando, com verificação de senha vazada.

**5. Importação de lista de alunos**
Respondendo sua pergunta: as duas formas. Faço no painel da empresa uma
importação de lista (nome + e-mail) que dispara os convites em lote — a CASA
consegue subir sozinha, e você também pode subir para eles.

**6. Arquivos pelo painel**
Espaço de arquivos para materiais em PDF/planilha, capas de curso e logos das
empresas, com upload direto no painel.

**7. Trocar a camada de dados**
Um único arquivo do projeto passa a apontar para o banco real em vez dos dados de
exemplo. Nenhuma tela precisa ser reescrita.

**8. Levar o conteúdo para o banco**
Prioridade: o white-label. Primeiro as empresas, marcas, domínios e os 25 cursos
da CASA. Depois o tenant SíndicoLab (os 9 cursos com compra na Kiwify continuam
exclusivos dele) e o conteúdo do site e do Portal.

**9. Testar e gerar a dist**
Testo o fluxo completo: convite, primeiro acesso, senha, visão do aluno, visão do
administrador da empresa, visão da plataforma, upload de material e troca de
marca por endereço. Depois gero o zip para o cPanel.

## O que depende de você (fora daqui)

**No cPanel**
1. Criar o subdomínio da CASA — recomendo `casa.sindicolab.com.br`.
2. Apontar a pasta do subdomínio para a mesma pasta do build já publicado.
3. Emitir o certificado SSL (Let's Encrypt) do subdomínio.
4. Subir a nova dist dentro de `public_html` (com o arquivo oculto de
   redirecionamento, senão as rotas internas dão 404).

**Decisões e materiais da CASA**
- Endereço final do portal deles (`casa.sindicolab.com.br` agora; domínio próprio
  pode entrar depois sem refazer nada).
- Logo em vetor e cores da marca.
- Lista de usuários (nome + e-mail).
- Confirmação dos 25 cursos do catálogo deles.

**E-mail dos convites**
No começo os convites saem por um remetente padrão — funciona, mas pode cair em
spam. Para sair de `contato@sindicolab.com.br`, preciso que o domínio de envio
seja verificado no DNS (três registros que eu informo na hora).

## Notas técnicas

- Backend via Lovable Cloud: Postgres + Auth + Storage + Edge Functions, com URL
  e chave pública embutidas no build estático — compatível com cPanel.
- `src/integrations/supabase/client.ts` troca `mockClient` por `createClient`;
  `src/services/db/*` permanece apenas como origem dos dados de carga inicial.
- Toda tabela em `public` recebe `GRANT` explícito para `authenticated` e
  `service_role` (e `anon` apenas nas públicas: Portal, artigos, eventos,
  materiais, catálogo público), seguido de RLS e políticas.
- Resolução de tenant mantém a função `resolve_tenant_by_hostname` em
  `security definer`, com hostnames em minúsculas em `organization_domains`.
- Papéis via tabela `organization_memberships` + função `has_role`/
  `is_org_admin` em `security definer` para evitar recursão de RLS.
- Convites em lote por Edge Function usando `auth.admin.inviteUserByEmail`,
  gravando `organization_invites` e o vínculo da pessoa na empresa.
- Buckets: `materiais` (público), `course-covers` (público), `org-branding`
  (público), com políticas de escrita restritas a administradores.
- Métricas hoje em `localStorage` passam a tabela real de eventos.
