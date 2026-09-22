# Conexão do Supabase próprio (fora do Lovable) — go-live white-label

Regra base: o banco é **seu projeto Supabase**, criado na conta da Studio Marqo.
O Lovable é só onde o código é escrito. Você puxa o repositório do GitHub, roda o
build na sua máquina e sobe a dist no cPanel. Nada fica preso aqui.

O que eu entrego neste projeto: os arquivos `.sql` prontos para você colar no
Supabase, o código do app já conectado por variáveis de ambiente, e as funções de
servidor prontas para publicar no seu projeto.

## Parte 1 — Você cria o projeto Supabase

1. Entrar em supabase.com com a conta da Studio Marqo e criar um projeto novo
   (nome sugerido: `sindicolab-academy`).
2. Região: **South America (São Paulo)** — menor latência para o Brasil.
3. Guardar a senha do banco em local seguro (só serve para acesso direto).
4. Em **Project Settings → API**, copiar dois valores:
   - `Project URL`
   - chave pública `anon` (pode ficar no build, é pública por definição)
5. Em **Project Settings → API**, a chave `service_role` **nunca** vai para o
   build — ela só é usada dentro das funções de servidor.

## Parte 2 — Você roda os SQLs (SQL Editor, na ordem)

Eu crio estes arquivos no projeto, em `supabase/sql/`:

| Arquivo | O que faz |
|---|---|
| `01_schema.sql` | Cria todas as tabelas: empresas, domínios, marcas, convites, pessoas e papéis, catálogo por empresa, cursos, módulos, aulas, materiais, progresso, avaliações, comentários, matrículas, pedidos de acesso, lista do aluno, conteúdo do site, Portal e métricas |
| `02_functions.sql` | Funções de apoio: resolver a empresa pelo endereço do navegador, verificar papel, criar o perfil quando alguém aceita convite |
| `03_rls.sql` | Permissões e isolamento: cada empresa só alcança o que é dela |
| `04_storage.sql` | Espaços de arquivos (materiais, capas de curso, logos) e quem pode subir |
| `05_seed_casa.sql` | Carga inicial da CASA: empresa, marca, endereço e os 25 cursos |
| `06_seed_sindicolab.sql` | Carga do tenant SíndicoLab (os 9 cursos com compra na Kiwify continuam exclusivos dele) e o conteúdo do site e do Portal |

Cada arquivo pode ser rodado de novo sem duplicar nada.

## Parte 3 — Você configura o Auth no painel do Supabase

1. **Authentication → Providers → Email**: ligado, com confirmação de e-mail.
2. **Authentication → Sign In / Providers**: desligar `Allow new users to sign up`
   (entrada somente por convite) e ligar a proteção de senha vazada.
3. **Authentication → URL Configuration**:
   - Site URL: `https://sindicolab.com.br`
   - Redirect URLs: `https://sindicolab.com.br/**`,
     `https://casa.sindicolab.com.br/**` e um por subdomínio que entrar no ar.
   Sem isso, o link do convite e o de recuperação de senha levam ao lugar errado.
4. **E-mail**: no começo o remetente padrão do Supabase resolve (limite baixo,
   pode cair em spam). Para sair de `contato@sindicolab.com.br`, configurar SMTP
   próprio em Project Settings → Auth → SMTP, com SPF, DKIM e DMARC no DNS.

## Parte 4 — Funções de servidor (convites em lote)

Convidar alguém exige a chave `service_role`, que não pode ficar no site. Então
os convites passam por uma função hospedada no seu Supabase.

1. Instalar a CLI: `npm i -g supabase`, depois `supabase login`.
2. `supabase link --project-ref <ref-do-seu-projeto>`.
3. `supabase functions deploy invite-user`.
4. `supabase secrets set SERVICE_ROLE_KEY=...` (valor do painel).

Respondendo sua pergunta sobre a lista da CASA: as duas formas funcionam. No
painel da empresa entra uma importação de lista (nome + e-mail) que dispara os
convites em lote — a CASA sobe sozinha, e você também pode subir para eles.

## Parte 5 — Build fora do Lovable

1. `git clone` do repositório e `npm install`.
2. Criar um arquivo `.env` na raiz (não vai para o GitHub):
   ```
   VITE_SUPABASE_URL=https://xxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJ...
   ```
3. `npm run build` e subir o conteúdo de `dist/` dentro de `public_html` no
   cPanel — com o arquivo oculto de redirecionamento, senão as rotas internas dão
   404 ao recarregar.

## Parte 6 — cPanel (white-label da CASA)

1. Criar o subdomínio `casa.sindicolab.com.br`.
2. Apontar a pasta dele para a mesma pasta do build.
3. Emitir o SSL (Let's Encrypt).
4. Gravar esse endereço na empresa CASA (linha do `05_seed_casa.sql`), em
   minúsculas. Cada novo subdomínio é cadastrado um a um — sem curinga de DNS.

## O que preciso definir com você

1. Endereço final do portal da CASA — sigo com `casa.sindicolab.com.br`.
2. Lista dos 25 cursos da CASA (títulos e ordem) e como o aluno assiste: vídeo
   próprio, link externo ou os dois.
3. Logo em vetor e cores da marca CASA.
4. E-mail do primeiro administrador da CASA e o seu, como dono da plataforma.
5. Se o remetente de e-mail começa com o padrão do Supabase ou já com
   `contato@sindicolab.com.br`.

## Notas técnicas

- `src/integrations/supabase/client.ts` passa a criar o cliente real com
  `import.meta.env.VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`; `mockClient`
  continua no repositório apenas como fallback de desenvolvimento quando as
  variáveis estão ausentes. Nenhuma tela é reescrita — todas importam `supabase`
  daqui.
- Nomes de tabela e coluna já são os das fixtures (`src/services/db/seed.ts` e
  `academyFixtures.ts`), então os SQLs de carga saem direto delas.
- Todo `CREATE TABLE` em `public` vem com `GRANT` explícito para `authenticated`
  e `service_role`; `anon` só nas tabelas públicas (Portal, artigos, eventos,
  materiais do site, catálogo público) — depois `ENABLE ROW LEVEL SECURITY` e as
  políticas.
- Papéis ficam em `organization_memberships` (nunca em `profiles`), lidos por
  `has_role(uid, role)` e `is_org_admin(uid, org)` em `security definer` com
  `set search_path = public`, evitando recursão de RLS.
- `resolve_tenant_by_hostname(p_hostname)` em `security definer`, com `lower()`
  no hostname, mantendo a mesma assinatura já usada pelo `TenantProvider`.
- Buckets: `materiais`, `course-covers`, `org-branding` públicos para leitura,
  escrita restrita a administradores via políticas em `storage.objects`.
- Edge Function `invite-user` em `supabase/functions/invite-user/index.ts`:
  valida o JWT do chamador, confere se é `org_admin` da empresa alvo, chama
  `auth.admin.inviteUserByEmail` com `redirectTo` do hostname do tenant e grava
  `organization_invites`.
- `analyticsService` migra do `localStorage` para a tabela `analytics_events`,
  mantendo a mesma superfície de chamada.
- `src/integrations/supabase/types.ts` é regerado a partir do schema final.
