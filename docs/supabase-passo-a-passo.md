# Conectar o banco (Supabase) ao SíndicoLab — passo a passo

Este roteiro é para o banco **na sua conta**, fora do Lovable: você cria o projeto,
roda os códigos que já estão no repositório, gera o build na sua máquina e envia a
pasta para o cPanel.

Tudo o que o site precisa já está pronto no repositório:

```
supabase/sql/01_schema.sql      estrutura (tabelas e permissões)
supabase/sql/02_functions.sql   papéis, endereço do tenant, criação de perfil
supabase/sql/03_rls.sql         regras de quem vê e edita o quê
supabase/sql/04_storage.sql     pastas de arquivos (logos, capas, materiais)
supabase/sql/05_seed_estrutura_e_academy.sql   empresas, marcas, categorias e os 25 cursos
supabase/sql/06_seed_sindicolab_e_conteudo.sql os 9 cursos da SíndicoLab, site e Portal
supabase/functions/invite-user/ convite de acesso por e-mail
```

---

## 1. Criar o projeto — FEITO

Projeto criado e saudável:

```
VITE_SUPABASE_URL=https://amvevyexbxqekhaycwvi.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_0augLN1_7Dc6U5sHugNcSw_B7brNQWU
```

Esses dois valores são públicos e já estão no `.env.example`. A senha do banco e a
chave **secreta** (`sb_secret_...` / `service_role`) ficam só com você — nunca no site.

## 2. Rodar os códigos do banco

No painel, abra **SQL Editor → New query**, cole o conteúdo de cada arquivo e
clique em **Run**, **nesta ordem**:

`01_schema.sql` → `02_functions.sql` → `03_rls.sql` → `04_storage.sql` →
`05_seed_estrutura_e_academy.sql` → `06_seed_sindicolab_e_conteudo.sql`

Todos podem ser executados novamente sem duplicar nada.

Depois, confira em **Table Editor**: `courses` com 34 linhas, `portal_posts` com 6,
`site_materials` com 12, `organizations` com 4.

## 3. Configurar o acesso das pessoas

Em **Authentication → Providers → Email**:

- Deixe **Confirm email** ligado.
- Desligue **Enable sign ups** (ninguém se cadastra sozinho; o acesso é por convite).
- Ligue **Password HIBP check** (bloqueia senhas vazadas).
- Ligue **Require current password for password changes**.

Em **Authentication → URL Configuration**:

- **Site URL**: `https://sindicolab.com.br`
- **Redirect URLs**: `https://sindicolab.com.br/**` e o endereço da CASA
  (`https://admcasa.sindicolab.com/**`)

## 4. Criar o seu acesso de dono da plataforma

1. Em **Authentication → Users → Add user**, crie o seu e-mail com senha.
2. Em **SQL Editor**, rode (trocando o e-mail):

```sql
insert into public.organization_memberships (organization_id, user_id, role)
select o.id, u.id, 'platform_admin'
from public.organizations o, auth.users u
where o.slug = 'sindicolab' and u.email = 'seu@email.com'
on conflict do nothing;
```

A partir daí `/admin` abre com o seu acesso real. Para o administrador da CASA,
troque `o.slug` por `'casa'` e o papel por `'org_admin'`.

## 5. Publicar o convite por e-mail

Na sua máquina, com a CLI do Supabase instalada:

```bash
supabase login
supabase link --project-ref amvevyexbxqekhaycwvi
supabase secrets set SITE_URL=https://sindicolab.com.br
supabase functions deploy invite-user
```

A chave `service_role` já existe automaticamente dentro da função — não precisa
ser configurada e nunca sai do servidor. É essa função que a tela de **Clientes e
acessos** usa para convidar pessoas e respeitar o limite de usuários da empresa.

## 6. Gerar o site e enviar ao cPanel

Na pasta do projeto, crie um arquivo `.env` (use `.env.example` como base):

```
VITE_SUPABASE_URL=https://amvevyexbxqekhaycwvi.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_0augLN1_7Dc6U5sHugNcSw_B7brNQWU
```

Depois:

```bash
npm install
npm run build
```

Envie **todo o conteúdo** da pasta `dist` para `public_html`, incluindo o arquivo
oculto `.htaccess` — é ele que faz `/admin`, `/empresa` e `/portal` funcionarem no
acesso direto e no F5.

> Sem essas duas variáveis, o site continua abrindo com os dados de exemplo. Com
> elas, passa a usar o banco real — nenhuma outra alteração é necessária.

## 7. Endereço próprio da CASA — FEITO

O endereço já está definido como `admcasa.sindicolab.com`, tanto no SQL do seed
quanto nos dados de exemplo do site. No cPanel o subdomínio foi criado com
**"compartilhar a raiz do documento"**, ou seja, ele usa a mesma pasta
`public_html` do site principal — por isso nenhuma pasta nova aparece lá, e está
correto assim. Falta apenas emitir o certificado (SSL) para esse subdomínio.

Se algum dia o endereço mudar, basta rodar:

```sql
update public.organization_domains
set hostname = 'novo-endereco.exemplo.com'
where organization_id = (select id from public.organizations where slug = 'casa');
```

---

## O que ainda precisa ser decidido

1. **Cursos da CASA** — quais dos 25 entram no catálogo dela e como o aluno assiste
   (link do ambiente de vídeo de cada curso).
2. **Marca da CASA** — logo em vetor (claro e escuro) e as cores oficiais.
3. **Primeiros acessos** — seu e-mail como dono da plataforma e o e-mail do
   administrador da CASA.
4. **Remetente dos e-mails** — começar com o remetente padrão do Supabase (pode
   cair em spam) ou já configurar `contato@sindicolab.com.br` com SPF, DKIM e DMARC.

## Observações importantes

- As capas dos 9 cursos da SíndicoLab e das notícias do Portal continuam vindo do
  próprio site; se quiser trocá-las pelo banco, suba a imagem na pasta `covers` e
  cole o endereço no campo de capa.
- Nenhuma senha ou chave de serviço fica no site publicado: só a chave pública.
- Os acessos de demonstração deixam de ser usados assim que o banco entra no ar.
