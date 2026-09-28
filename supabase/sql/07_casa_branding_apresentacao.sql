-- 07 — Atualização incremental para a apresentação white-label da CASA
-- Rode este arquivo se os SQLs 01–06 já foram executados no projeto Supabase.

begin;

alter table public.organization_branding add column if not exists heading_font text;
alter table public.organization_branding add column if not exists body_font text;

update public.organization_branding
set logo_light_url = '/__l5e/assets-v1/a3a34325-78f5-4ae8-837c-6b203763e162/casa-logo-light.png',
    logo_dark_url = '/__l5e/assets-v1/11cb3bbe-f094-43c9-80a5-3831298ab9b1/casa-logo-dark.png',
    favicon_url = '/tenant/casa-favicon.png',
    primary_color = '#111111',
    secondary_color = '#2B2B2B',
    accent_color = '#FFC20E',
    background_color = '#F7F7F5',
    surface_color = '#FFFFFF',
    text_color = '#111111',
    dark_background_color = '#0B0B0E',
    dark_surface_color = '#151518',
    dark_text_color = '#F3F3F5',
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