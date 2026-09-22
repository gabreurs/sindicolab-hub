-- 02 — Funções de apoio (papéis, resolução de endereço e criação de perfil)
-- Execute depois do 01.

begin;

/* Papel do usuário: sempre consultado fora da tabela de perfis. */
create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.organization_memberships
    where user_id = _user_id and role = _role and is_active
  );
$$;

create or replace function public.is_platform_admin(_user_id uuid default auth.uid())
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1
    from public.organization_memberships m
    join public.organizations o on o.id = m.organization_id
    where m.user_id = _user_id and m.is_active
      and m.role = 'platform_admin' and o.is_platform
  );
$$;

create or replace function public.has_org_role(_organization_id uuid, _role public.app_role, _user_id uuid default auth.uid())
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.organization_memberships
    where organization_id = _organization_id and user_id = _user_id
      and role = _role and is_active
  );
$$;

create or replace function public.is_org_member(_organization_id uuid, _user_id uuid default auth.uid())
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.organization_memberships
    where organization_id = _organization_id and user_id = _user_id and is_active
  );
$$;

/* Empresas do usuário logado — usado nas regras de acesso. */
create or replace function public.current_user_org_ids()
returns setof uuid language sql stable security definer set search_path = public as $$
  select organization_id from public.organization_memberships
  where user_id = auth.uid() and is_active;
$$;

/* O aluno pode abrir o curso? Catálogo da empresa OU compra individual. */
create or replace function public.can_access_course(_course_id text, _user_id uuid default auth.uid())
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1
    from public.organization_course_catalog c
    join public.organization_memberships m
      on m.organization_id = c.organization_id and m.user_id = _user_id and m.is_active
    where c.course_id = _course_id and c.is_visible
  ) or exists (
    select 1 from public.course_entitlements e
    where e.course_id = _course_id and e.user_id = _user_id
      and (e.expires_at is null or e.expires_at > now())
  ) or public.is_platform_admin(_user_id);
$$;

/* Resolve o tenant pelo endereço (white-label). Hostname sempre em minúsculas. */
create or replace function public.resolve_tenant_by_hostname(p_hostname text)
returns setof public.organizations language sql stable security definer set search_path = public as $$
  select o.*
  from public.organizations o
  join public.organization_domains d on d.organization_id = o.id
  where d.hostname = lower(trim(p_hostname)) and o.status = 'active'
  order by d.is_primary desc
  limit 1;
$$;

grant execute on function public.resolve_tenant_by_hostname(text) to anon, authenticated;
grant execute on function public.is_platform_admin(uuid) to authenticated;
grant execute on function public.has_org_role(uuid, public.app_role, uuid) to authenticated;
grant execute on function public.is_org_member(uuid, uuid) to authenticated;
grant execute on function public.has_role(uuid, public.app_role) to authenticated;
grant execute on function public.current_user_org_ids() to authenticated;
grant execute on function public.can_access_course(text, uuid) to authenticated;

/* Perfil criado automaticamente no primeiro acesso. */
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)))
  on conflict (id) do update set email = excluded.email;

  -- Convite pendente para este e-mail vira vínculo com a empresa.
  insert into public.organization_memberships (organization_id, user_id, role)
  select i.organization_id, new.id, i.role
  from public.organization_invites i
  where lower(i.email) = lower(new.email) and i.status = 'pending'
  on conflict (organization_id, user_id, role) do nothing;

  update public.organization_invites
  set status = 'accepted'
  where lower(email) = lower(new.email) and status = 'pending';

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

/* updated_at automático. */
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

do $$
declare t text;
begin
  foreach t in array array['courses', 'course_delivery_sources', 'site_materials', 'site_articles', 'site_events', 'course_progress', 'lesson_progress']
  loop
    execute format('drop trigger if exists touch_%1$s on public.%1$s', t);
    execute format('create trigger touch_%1$s before update on public.%1$s for each row execute function public.touch_updated_at()', t);
  end loop;
end $$;

commit;
