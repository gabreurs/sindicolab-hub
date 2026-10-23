-- 11 — Tenant HFlex (apresentação). Pode ser rodado mais de uma vez.
-- ANTES: crie em Authentication → Users → Add user o login admhflex@academy.com.br
-- (marque "Auto Confirm User"). Depois rode este arquivo inteiro.
begin;

insert into public.organizations (id, slug, name, is_platform, status, user_limit, created_at)
values ('55555555-5555-5555-5555-555555555555', 'hflex', 'HFlex', false, 'active', 120, now())
on conflict (id) do update set slug = excluded.slug, name = excluded.name, status = 'active';

insert into public.organization_branding (id, organization_id, favicon_url, banner_url,
  dark_background_color, dark_surface_color, dark_text_color, logo_light_url, logo_dark_url,
  primary_color, secondary_color, accent_color, background_color, surface_color, text_color,
  heading_font, body_font, environment_name, welcome_title, welcome_message)
values ('brand-hflex', '55555555-5555-5555-5555-555555555555', '/tenant/hflex-favicon.png', null,
  '#0F0F0F', '#1E1E1E', '#FFFFFF', '/tenant/hflex-logo-light.svg', '/tenant/hflex-logo-dark.svg',
  '#1E1E1E', '#000000', '#69684E', '#FFFFFF', '#F5F5F3', '#1E1E1E',
  'plus-jakarta-sans', 'plus-jakarta-sans', 'HFlex Academy', 'HFlex Academy',
  'Transformar condomínios em experiências: formação para síndicos, conselheiros e equipes dos condomínios HFlex.')
on conflict (id) do update set
  favicon_url = excluded.favicon_url, dark_background_color = excluded.dark_background_color,
  dark_surface_color = excluded.dark_surface_color, dark_text_color = excluded.dark_text_color,
  logo_light_url = excluded.logo_light_url, logo_dark_url = excluded.logo_dark_url,
  primary_color = excluded.primary_color, secondary_color = excluded.secondary_color,
  accent_color = excluded.accent_color, background_color = excluded.background_color,
  surface_color = excluded.surface_color, text_color = excluded.text_color,
  heading_font = excluded.heading_font, body_font = excluded.body_font,
  environment_name = excluded.environment_name, welcome_title = excluded.welcome_title,
  welcome_message = excluded.welcome_message;

insert into public.organization_domains (id, organization_id, hostname, is_primary)
values ('dom-hflex', '55555555-5555-5555-5555-555555555555', 'hflex.studiomarqo.com.br', true)
on conflict (id) do update set organization_id = excluded.organization_id,
  hostname = excluded.hostname, is_primary = excluded.is_primary;

-- Mesmo catálogo de cursos da CASA.
insert into public.organization_course_catalog (id, organization_id, course_id, is_visible, created_at)
select 'occ-hflex-' || c.course_id, '55555555-5555-5555-5555-555555555555', c.course_id, true, now()
from public.organization_course_catalog c
where c.organization_id = '33333333-3333-3333-3333-333333333333'
on conflict (id) do nothing;

-- Administrador da HFlex
insert into public.profiles (id, email, full_name)
select u.id, u.email, 'Administrador HFlex' from auth.users u
where lower(u.email) = 'admhflex@academy.com.br'
on conflict (id) do nothing;

insert into public.organization_memberships (organization_id, user_id, role, is_active)
select '55555555-5555-5555-5555-555555555555', u.id, 'org_admin', true
from auth.users u where lower(u.email) = 'admhflex@academy.com.br'
on conflict (organization_id, user_id, role) do update set is_active = true;

commit;

-- Conferência: 1 linha com role = org_admin.
select u.email, o.slug, m.role from public.organization_memberships m
join auth.users u on u.id = m.user_id join public.organizations o on o.id = m.organization_id
where lower(u.email) = 'admhflex@academy.com.br';
