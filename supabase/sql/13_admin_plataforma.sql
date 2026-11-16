-- Dá a um login o acesso total ao /admin (materiais, portal, cursos, clientes).
--
-- ANTES de rodar isto: em Authentication -> Users -> Add user, crie o e-mail
-- abaixo com uma senha própria (desmarque "auto confirm" se quiser e-mail de
-- confirmação, ou marque para já entrar com a senha).
--
-- Depois: rode este arquivo no SQL Editor. Para outro e-mail, troque as duas
-- ocorrências de admin@sindicolab.com.br.

insert into public.profiles (id, email, full_name)
select u.id, u.email, split_part(u.email, '@', 1)
from auth.users u
where lower(u.email) = 'admin@sindicolab.com.br'
on conflict (id) do nothing;

insert into public.organization_memberships (organization_id, user_id, role, is_active)
select o.id, u.id, 'platform_admin', true
from public.organizations o, auth.users u
where o.is_platform and lower(u.email) = 'admin@sindicolab.com.br'
on conflict (organization_id, user_id, role) do update set is_active = true;

-- Conferência: deve aparecer 1 linha com role = platform_admin.
select u.email, o.slug, m.role, m.is_active
from public.organization_memberships m
join auth.users u on u.id = m.user_id
join public.organizations o on o.id = m.organization_id
where lower(u.email) = 'admin@sindicolab.com.br';
