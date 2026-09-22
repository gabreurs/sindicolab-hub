-- 04 — Arquivos (capas, logos e materiais para download). Execute depois do 03.

begin;

-- Públicos: qualquer visitante pode ver a imagem pelo endereço.
insert into storage.buckets (id, name, public) values ('brand', 'brand', true)
  on conflict (id) do update set public = true;
insert into storage.buckets (id, name, public) values ('covers', 'covers', true)
  on conflict (id) do update set public = true;
insert into storage.buckets (id, name, public) values ('materials', 'materials', true)
  on conflict (id) do update set public = true;

-- Privado: arquivos internos de curso (apenas quem tem acesso).
insert into storage.buckets (id, name, public) values ('course-files', 'course-files', false)
  on conflict (id) do update set public = false;

do $$
declare p text;
begin
  foreach p in array array[
    'leitura publica brand','leitura publica covers','leitura publica materials',
    'admin grava brand','admin grava covers','admin grava materials',
    'admin atualiza arquivos','admin remove arquivos','arquivos de curso'
  ] loop
    execute format('drop policy if exists %I on storage.objects', p);
  end loop;
end $$;

create policy "leitura publica brand" on storage.objects for select to anon, authenticated
  using (bucket_id = 'brand');
create policy "leitura publica covers" on storage.objects for select to anon, authenticated
  using (bucket_id = 'covers');
create policy "leitura publica materials" on storage.objects for select to anon, authenticated
  using (bucket_id = 'materials');

create policy "admin grava brand" on storage.objects for insert to authenticated
  with check (bucket_id in ('brand', 'covers', 'materials', 'course-files')
    and (public.is_platform_admin() or public.has_role(auth.uid(), 'org_admin')));
create policy "admin atualiza arquivos" on storage.objects for update to authenticated
  using (bucket_id in ('brand', 'covers', 'materials', 'course-files')
    and (public.is_platform_admin() or public.has_role(auth.uid(), 'org_admin')));
create policy "admin remove arquivos" on storage.objects for delete to authenticated
  using (bucket_id in ('brand', 'covers', 'materials', 'course-files')
    and (public.is_platform_admin() or public.has_role(auth.uid(), 'org_admin')));

create policy "arquivos de curso" on storage.objects for select to authenticated
  using (bucket_id = 'course-files');

commit;
