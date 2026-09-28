-- Dá ao login admcasa@academy.com.br o papel de administrador da CASA.
-- Sem isso, a função de convite responde "Seu login não é administrador desta empresa".
-- Pode ser rodado mais de uma vez.
insert into public.profiles (id, email, full_name)
select u.id, u.email, split_part(u.email, '@', 1)
from auth.users u
where lower(u.email) = 'admcasa@academy.com.br'
on conflict (id) do nothing;

insert into public.organization_memberships (organization_id, user_id, role, is_active)
select o.id, u.id, 'org_admin', true
from public.organizations o, auth.users u
where o.slug = 'casa' and lower(u.email) = 'admcasa@academy.com.br'
on conflict (organization_id, user_id, role) do update set is_active = true;

-- Conferência: deve aparecer 1 linha com role = org_admin.
select u.email, o.slug, m.role, m.is_active
from public.organization_memberships m
join auth.users u on u.id = m.user_id
join public.organizations o on o.id = m.organization_id
where lower(u.email) = 'admcasa@academy.com.br';
