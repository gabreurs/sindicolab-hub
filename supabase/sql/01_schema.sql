-- 01 — Estrutura do banco (tabelas, chaves e permissões de acesso da API)
-- Execute este arquivo primeiro, no SQL Editor do Supabase.
-- Pode ser executado novamente sem erro: tudo usa "if not exists".

begin;

create extension if not exists pgcrypto;

-- Papéis de acesso. Nunca guardamos papel no perfil do usuário.
do $$ begin
  create type public.app_role as enum ('platform_admin', 'org_admin', 'student');
exception when duplicate_object then null; end $$;

/* ------------------------------ empresas ------------------------------ */

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  is_platform boolean not null default false,
  status text not null default 'active' check (status in ('active', 'suspended')),
  user_limit integer,
  created_at timestamptz not null default now()
);
grant select on public.organizations to anon, authenticated;
grant insert, update, delete on public.organizations to authenticated;
grant all on public.organizations to service_role;

create table if not exists public.organization_branding (
  id text primary key default gen_random_uuid()::text,
  organization_id uuid not null unique references public.organizations(id) on delete cascade,
  logo_light_url text,
  logo_dark_url text,
  favicon_url text,
  banner_url text,
  primary_color text,
  secondary_color text,
  accent_color text,
  background_color text,
  surface_color text,
  text_color text,
  dark_background_color text,
  dark_surface_color text,
  dark_text_color text,
  environment_name text,
  welcome_title text,
  welcome_message text
);
grant select on public.organization_branding to anon, authenticated;
grant insert, update, delete on public.organization_branding to authenticated;
grant all on public.organization_branding to service_role;

create table if not exists public.organization_domains (
  id text primary key default gen_random_uuid()::text,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  hostname text not null unique,
  is_primary boolean not null default false
);
grant select on public.organization_domains to anon, authenticated;
grant insert, update, delete on public.organization_domains to authenticated;
grant all on public.organization_domains to service_role;

/* ------------------------------- pessoas ------------------------------ */

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now()
);
grant select, insert, update on public.profiles to authenticated;
grant all on public.profiles to service_role;

create table if not exists public.organization_memberships (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null default 'student',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (organization_id, user_id, role)
);
grant select, insert, update, delete on public.organization_memberships to authenticated;
grant all on public.organization_memberships to service_role;

create table if not exists public.organization_invites (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  email text not null,
  role public.app_role not null default 'student',
  status text not null default 'pending' check (status in ('pending', 'accepted', 'revoked')),
  created_at timestamptz not null default now(),
  expires_at timestamptz,
  unique (organization_id, email, role)
);
grant select, insert, update, delete on public.organization_invites to authenticated;
grant all on public.organization_invites to service_role;

create table if not exists public.access_requests (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  full_name text,
  organization_id uuid references public.organizations(id) on delete set null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  message text,
  created_at timestamptz not null default now()
);
grant insert on public.access_requests to anon, authenticated;
grant select, update, delete on public.access_requests to authenticated;
grant all on public.access_requests to service_role;

/* ------------------------------- cursos ------------------------------- */

create table if not exists public.course_categories (
  id text primary key default gen_random_uuid()::text,
  slug text not null unique,
  name text not null,
  description text,
  sort_order integer not null default 0
);
grant select on public.course_categories to anon, authenticated;
grant insert, update, delete on public.course_categories to authenticated;
grant all on public.course_categories to service_role;

create table if not exists public.courses (
  id text primary key default gen_random_uuid()::text,
  slug text not null unique,
  title text not null,
  subtitle text,
  description text,
  cover_url text,
  banner_url text,
  instructor_name text,
  instructor_bio text,
  duration_minutes integer,
  level text,
  category_id text references public.course_categories(id) on delete set null,
  owner_org_id uuid references public.organizations(id) on delete set null,
  visibility text not null default 'global' check (visibility in ('global', 'exclusive')),
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  delivery_type text not null default 'learning_studio_embed',
  embed_url text,
  external_checkout_url text,
  price_brl numeric(10, 2) not null default 0,
  access_label text,
  is_featured boolean not null default false,
  is_required boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.courses to anon, authenticated;
grant insert, update, delete on public.courses to authenticated;
grant all on public.courses to service_role;

create table if not exists public.course_modules (
  id text primary key default gen_random_uuid()::text,
  course_id text not null references public.courses(id) on delete cascade,
  title text not null,
  description text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);
grant select on public.course_modules to anon, authenticated;
grant insert, update, delete on public.course_modules to authenticated;
grant all on public.course_modules to service_role;

create table if not exists public.course_lessons (
  id text primary key default gen_random_uuid()::text,
  course_id text not null references public.courses(id) on delete cascade,
  module_id text references public.course_modules(id) on delete cascade,
  slug text,
  title text not null,
  description text,
  video_url text,
  video_provider text,
  video_id text,
  duration_seconds integer,
  sort_order integer not null default 0,
  is_preview boolean not null default false,
  created_at timestamptz not null default now()
);
grant select on public.course_lessons to anon, authenticated;
grant insert, update, delete on public.course_lessons to authenticated;
grant all on public.course_lessons to service_role;

create table if not exists public.course_materials (
  id text primary key default gen_random_uuid()::text,
  course_id text not null references public.courses(id) on delete cascade,
  title text not null,
  file_url text,
  kind text,
  created_at timestamptz not null default now()
);
grant select, insert, update, delete on public.course_materials to authenticated;
grant all on public.course_materials to service_role;

-- Endereço de entrega do curso (embed). Só quem tem acesso consegue ler.
create table if not exists public.course_delivery_sources (
  id text primary key default gen_random_uuid()::text,
  course_id text not null unique references public.courses(id) on delete cascade,
  provider text not null default 'learning_studio',
  embed_url text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update, delete on public.course_delivery_sources to authenticated;
grant all on public.course_delivery_sources to service_role;

create table if not exists public.organization_course_catalog (
  id text primary key default gen_random_uuid()::text,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  course_id text not null references public.courses(id) on delete cascade,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  unique (organization_id, course_id)
);
grant select on public.organization_course_catalog to anon, authenticated;
grant insert, update, delete on public.organization_course_catalog to authenticated;
grant all on public.organization_course_catalog to service_role;

/* --------------------- uso, progresso e interações -------------------- */

create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id text not null references public.courses(id) on delete cascade,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  unique (user_id, course_id)
);
grant select, insert, update, delete on public.enrollments to authenticated;
grant all on public.enrollments to service_role;

create table if not exists public.course_entitlements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id text not null references public.courses(id) on delete cascade,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  unique (user_id, course_id)
);
grant select, insert, update, delete on public.course_entitlements to authenticated;
grant all on public.course_entitlements to service_role;

create table if not exists public.course_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id text not null references public.courses(id) on delete cascade,
  percent numeric(5, 2) not null default 0,
  open_count integer not null default 0,
  first_opened_at timestamptz,
  last_accessed_at timestamptz,
  updated_at timestamptz not null default now(),
  unique (user_id, course_id)
);
grant select, insert, update, delete on public.course_progress to authenticated;
grant all on public.course_progress to service_role;

create table if not exists public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id text not null references public.courses(id) on delete cascade,
  lesson_id text not null references public.course_lessons(id) on delete cascade,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  unique (user_id, lesson_id)
);
grant select, insert, update, delete on public.lesson_progress to authenticated;
grant all on public.lesson_progress to service_role;

create table if not exists public.user_course_list (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  organization_id uuid references public.organizations(id) on delete cascade,
  course_id text not null references public.courses(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, course_id)
);
grant select, insert, update, delete on public.user_course_list to authenticated;
grant all on public.user_course_list to service_role;

create table if not exists public.course_reviews (
  id uuid primary key default gen_random_uuid(),
  course_id text not null references public.courses(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  organization_id uuid references public.organizations(id) on delete set null,
  rating integer not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz not null default now(),
  unique (user_id, course_id)
);
grant select, insert, update, delete on public.course_reviews to authenticated;
grant all on public.course_reviews to service_role;

create table if not exists public.course_comments (
  id uuid primary key default gen_random_uuid(),
  course_id text not null references public.courses(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  organization_id uuid references public.organizations(id) on delete set null,
  body text not null,
  is_hidden boolean not null default false,
  is_answered boolean not null default false,
  created_at timestamptz not null default now()
);
grant select, insert, update, delete on public.course_comments to authenticated;
grant all on public.course_comments to service_role;

create table if not exists public.lesson_comments (
  id uuid primary key default gen_random_uuid(),
  lesson_id text not null references public.course_lessons(id) on delete cascade,
  course_id text not null references public.courses(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  organization_id uuid references public.organizations(id) on delete set null,
  body text not null,
  is_hidden boolean not null default false,
  is_answered boolean not null default false,
  created_at timestamptz not null default now()
);
grant select, insert, update, delete on public.lesson_comments to authenticated;
grant all on public.lesson_comments to service_role;

/* --------------------------- site e Portal ---------------------------- */

create table if not exists public.site_materials (
  id text primary key default gen_random_uuid()::text,
  title text not null,
  slug text not null unique,
  description text,
  category text,
  type text,
  cover_url text,
  file_url text,
  cta_label text,
  status text not null default 'published' check (status in ('published', 'draft')),
  is_featured boolean not null default false,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.site_materials to anon, authenticated;
grant insert, update, delete on public.site_materials to authenticated;
grant all on public.site_materials to service_role;

create table if not exists public.site_articles (
  id text primary key default gen_random_uuid()::text,
  title text not null,
  slug text not null unique,
  excerpt text,
  content jsonb,
  cover_url text,
  cover_alt text,
  category text,
  author text,
  read_time text,
  status text not null default 'published' check (status in ('published', 'draft')),
  seo_title text,
  meta_description text,
  social_image_url text,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.site_articles to anon, authenticated;
grant insert, update, delete on public.site_articles to authenticated;
grant all on public.site_articles to service_role;

create table if not exists public.site_events (
  id text primary key default gen_random_uuid()::text,
  title text not null,
  slug text not null unique,
  short_description text,
  content text,
  cover_url text,
  starts_at timestamptz,
  ends_at timestamptz,
  time_label text,
  location text,
  format text,
  city text,
  external_url text,
  sympla_url text,
  status text not null default 'published' check (status in ('published', 'draft')),
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.site_events to anon, authenticated;
grant insert, update, delete on public.site_events to authenticated;
grant all on public.site_events to service_role;

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text,
  status text not null default 'pending_substack',
  created_at timestamptz not null default now()
);
grant insert on public.newsletter_subscribers to anon, authenticated;
grant select, update, delete on public.newsletter_subscribers to authenticated;
grant all on public.newsletter_subscribers to service_role;

create table if not exists public.portal_categories (
  id text primary key default gen_random_uuid()::text,
  slug text not null unique,
  name text not null,
  color text,
  sort_order integer not null default 0,
  active boolean not null default true
);
grant select on public.portal_categories to anon, authenticated;
grant insert, update, delete on public.portal_categories to authenticated;
grant all on public.portal_categories to service_role;

create table if not exists public.portal_authors (
  id text primary key default gen_random_uuid()::text,
  slug text not null unique,
  name text not null,
  avatar_url text,
  bio text,
  role text,
  headline text,
  linkedin_url text,
  instagram_url text,
  sort_order integer not null default 0,
  active boolean not null default true,
  is_columnist boolean not null default false
);
grant select on public.portal_authors to anon, authenticated;
grant insert, update, delete on public.portal_authors to authenticated;
grant all on public.portal_authors to service_role;

create table if not exists public.portal_posts (
  id text primary key default gen_random_uuid()::text,
  title text not null,
  slug text not null unique,
  excerpt text,
  content text,
  cover_image text,
  cover_alt text,
  category_id text references public.portal_categories(id) on delete set null,
  author_id text references public.portal_authors(id) on delete set null,
  featured boolean not null default false,
  published boolean not null default false,
  published_at timestamptz,
  view_count integer not null default 0,
  seo_title text,
  meta_description text,
  social_image_url text
);
grant select on public.portal_posts to anon, authenticated;
grant insert, update, delete on public.portal_posts to authenticated;
grant all on public.portal_posts to service_role;

/* ----------------------------- métricas ------------------------------- */

create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('course_view', 'checkout_click', 'material_download')),
  product_id text,
  product_slug text,
  product_title text,
  value numeric(10, 2),
  source text,
  created_at timestamptz not null default now()
);
grant insert on public.analytics_events to anon, authenticated;
grant select on public.analytics_events to authenticated;
grant all on public.analytics_events to service_role;

create index if not exists analytics_events_created_idx on public.analytics_events (created_at desc);
create index if not exists courses_status_idx on public.courses (status);
create index if not exists catalog_org_idx on public.organization_course_catalog (organization_id);
create index if not exists portal_posts_published_idx on public.portal_posts (published, published_at desc);

commit;
