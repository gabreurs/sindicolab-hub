-- 07 — Atualização incremental para a apresentação white-label da CASA
-- Rode este arquivo se os SQLs 01–06 já foram executados no projeto Supabase.

begin;

alter table public.organization_branding add column if not exists heading_font text;
alter table public.organization_branding add column if not exists body_font text;

update public.organization_branding
set logo_light_url = '/tenant/casa-logo-light.png',
    logo_dark_url = '/tenant/casa-logo-dark.png',
    favicon_url = '/tenant/casa-favicon.png',
    primary_color = '#1D1D1B',
    secondary_color = '#1D1D1B',
    accent_color = '#FFCD00',
    background_color = '#FFFFFF',
    surface_color = '#FFFFFF',
    text_color = '#1D1D1B',
    dark_background_color = '#1D1D1B',
    dark_surface_color = '#282826',
    dark_text_color = '#FFFFFF',
    heading_font = 'montserrat',
    body_font = 'open-sans',
    environment_name = 'CASA Academy',
    welcome_title = 'CASA Academy',
    welcome_message = 'Educação condominial para síndicos, conselheiros e equipes dos condomínios administrados pela CASA.'
where organization_id = '33333333-3333-3333-3333-333333333333';

insert into public.organization_domains (id, organization_id, hostname, is_primary)
values ('dom-casa', '33333333-3333-3333-3333-333333333333', 'admcasa.studiomarqo.com.br', true)
on conflict (id) do update set
  organization_id = excluded.organization_id,
  hostname = excluded.hostname,
  is_primary = excluded.is_primary;

commit;