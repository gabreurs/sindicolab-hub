-- 03 — Regras de acesso (RLS). Execute depois do 02.
-- Princípio: conteúdo público do site é leitura livre; dados de aluno são
-- privados; administração é restrita a administradores da empresa e da plataforma.

begin;

do $$
declare t text;
begin
  foreach t in array array[
    'organizations','organization_branding','organization_domains','profiles',
    'organization_memberships','organization_invites','access_requests',
    'course_categories','courses','course_modules','course_lessons','course_materials',
    'course_delivery_sources','organization_course_catalog','enrollments','course_entitlements',
    'course_progress','lesson_progress','user_course_list','course_reviews','course_comments',
    'lesson_comments','site_materials','site_articles','site_events','newsletter_subscribers',
    'portal_categories','portal_authors','portal_posts','analytics_events'
  ] loop
    execute format('alter table public.%I enable row level security', t);
    -- limpa políticas anteriores para que o arquivo possa rodar de novo
    execute (
      select coalesce(string_agg(format('drop policy %I on public.%I;', policyname, t), ' '), '')
      from pg_policies where schemaname = 'public' and tablename = t
    );
  end loop;
end $$;

/* --------------------------- leitura pública --------------------------- */

create policy "leitura publica" on public.organizations for select to anon, authenticated using (true);
create policy "leitura publica" on public.organization_branding for select to anon, authenticated using (true);
create policy "leitura publica" on public.organization_domains for select to anon, authenticated using (true);
create policy "leitura publica" on public.course_categories for select to anon, authenticated using (true);
create policy "leitura publica" on public.organization_course_catalog for select to anon, authenticated using (true);
create policy "leitura publica" on public.portal_categories for select to anon, authenticated using (true);
create policy "leitura publica" on public.portal_authors for select to anon, authenticated using (true);

create policy "cursos publicados" on public.courses for select to anon, authenticated
  using (status = 'published' or public.is_platform_admin());
create policy "modulos publicados" on public.course_modules for select to anon, authenticated using (true);
create policy "aulas publicadas" on public.course_lessons for select to anon, authenticated using (true);

create policy "materiais publicados" on public.site_materials for select to anon, authenticated
  using (status = 'published' or public.is_platform_admin());
create policy "artigos publicados" on public.site_articles for select to anon, authenticated
  using (status = 'published' or public.is_platform_admin());
create policy "eventos publicados" on public.site_events for select to anon, authenticated
  using (status = 'published' or public.is_platform_admin());
create policy "noticias publicadas" on public.portal_posts for select to anon, authenticated
  using (published or public.is_platform_admin());

/* -------------------- administração da plataforma --------------------- */

do $$
declare t text;
begin
  foreach t in array array[
    'organizations','organization_branding','organization_domains','course_categories',
    'courses','course_modules','course_lessons','course_materials','course_delivery_sources',
    'site_materials','site_articles','site_events','portal_categories','portal_authors','portal_posts'
  ] loop
    execute format(
      'create policy "administra plataforma" on public.%I for all to authenticated using (public.is_platform_admin()) with check (public.is_platform_admin())', t);
  end loop;
end $$;

/* ------------------------------ perfis -------------------------------- */

create policy "ve o proprio perfil" on public.profiles for select to authenticated
  using (id = auth.uid() or public.is_platform_admin()
    or exists (select 1 from public.organization_memberships m
               where m.user_id = profiles.id and m.organization_id in (select public.current_user_org_ids())));
create policy "edita o proprio perfil" on public.profiles for update to authenticated
  using (id = auth.uid()) with check (id = auth.uid());
create policy "cria o proprio perfil" on public.profiles for insert to authenticated
  with check (id = auth.uid());

/* --------------------------- vínculos e convites ---------------------- */

create policy "ve vinculos da empresa" on public.organization_memberships for select to authenticated
  using (user_id = auth.uid() or organization_id in (select public.current_user_org_ids()) or public.is_platform_admin());
create policy "admin gerencia vinculos" on public.organization_memberships for all to authenticated
  using (public.is_platform_admin() or public.has_org_role(organization_id, 'org_admin'))
  with check (public.is_platform_admin() or public.has_org_role(organization_id, 'org_admin'));

create policy "admin gerencia convites" on public.organization_invites for all to authenticated
  using (public.is_platform_admin() or public.has_org_role(organization_id, 'org_admin'))
  with check (public.is_platform_admin() or public.has_org_role(organization_id, 'org_admin'));

create policy "qualquer um solicita acesso" on public.access_requests for insert to anon, authenticated with check (true);
create policy "admin ve solicitacoes" on public.access_requests for select to authenticated
  using (public.is_platform_admin() or (organization_id is not null and public.has_org_role(organization_id, 'org_admin')));
create policy "admin atualiza solicitacoes" on public.access_requests for update to authenticated
  using (public.is_platform_admin() or (organization_id is not null and public.has_org_role(organization_id, 'org_admin')))
  with check (true);
create policy "admin remove solicitacoes" on public.access_requests for delete to authenticated
  using (public.is_platform_admin() or (organization_id is not null and public.has_org_role(organization_id, 'org_admin')));

/* --------------------------- catálogo da empresa ---------------------- */

create policy "admin da empresa ajusta catalogo" on public.organization_course_catalog for all to authenticated
  using (public.is_platform_admin() or public.has_org_role(organization_id, 'org_admin'))
  with check (public.is_platform_admin() or public.has_org_role(organization_id, 'org_admin'));

/* --------- entrega do curso: só quem tem acesso vê o endereço --------- */

create policy "entrega para quem tem acesso" on public.course_delivery_sources for select to authenticated
  using (public.can_access_course(course_id));
create policy "material para quem tem acesso" on public.course_materials for select to authenticated
  using (public.can_access_course(course_id));

/* ------------------------- dados do próprio aluno --------------------- */

do $$
declare t text;
begin
  foreach t in array array['enrollments','course_progress','lesson_progress','user_course_list','course_entitlements'] loop
    execute format('create policy "dono le" on public.%I for select to authenticated using (user_id = auth.uid() or public.is_platform_admin())', t);
    execute format('create policy "dono grava" on public.%I for insert to authenticated with check (user_id = auth.uid())', t);
    execute format('create policy "dono atualiza" on public.%I for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid())', t);
    execute format('create policy "dono remove" on public.%I for delete to authenticated using (user_id = auth.uid() or public.is_platform_admin())', t);
  end loop;
end $$;

-- Liberação de curso comprado também pode ser concedida por administradores.
create policy "admin concede acesso" on public.course_entitlements for all to authenticated
  using (public.is_platform_admin()) with check (public.is_platform_admin());

/* ------------------------ avaliações e comentários -------------------- */

create policy "todos leem avaliacoes" on public.course_reviews for select to anon, authenticated using (true);
create policy "aluno avalia" on public.course_reviews for insert to authenticated with check (user_id = auth.uid());
create policy "aluno edita avaliacao" on public.course_reviews for update to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "aluno apaga avaliacao" on public.course_reviews for delete to authenticated
  using (user_id = auth.uid() or public.is_platform_admin());

do $$
declare t text;
begin
  foreach t in array array['course_comments','lesson_comments'] loop
    execute format('create policy "empresa le comentarios" on public.%I for select to authenticated using (not is_hidden and (organization_id in (select public.current_user_org_ids()) or user_id = auth.uid() or public.is_platform_admin()))', t);
    execute format('create policy "aluno comenta" on public.%I for insert to authenticated with check (user_id = auth.uid() and organization_id in (select public.current_user_org_ids()))', t);
    execute format('create policy "autor ou moderacao edita" on public.%I for update to authenticated using (user_id = auth.uid() or public.is_platform_admin() or public.has_org_role(organization_id, ''org_admin'')) with check (true)', t);
    execute format('create policy "autor ou moderacao remove" on public.%I for delete to authenticated using (user_id = auth.uid() or public.is_platform_admin() or public.has_org_role(organization_id, ''org_admin''))', t);
  end loop;
end $$;

/* --------------------------- newsletter e métricas -------------------- */

create policy "qualquer um assina" on public.newsletter_subscribers for insert to anon, authenticated with check (true);
create policy "admin le assinantes" on public.newsletter_subscribers for select to authenticated
  using (public.is_platform_admin());

create policy "qualquer um registra evento" on public.analytics_events for insert to anon, authenticated with check (true);
create policy "admin le metricas" on public.analytics_events for select to authenticated
  using (public.is_platform_admin());

commit;
