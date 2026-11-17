-- 14 — Garante os buckets de capas e materiais (seguro rodar de novo).
-- As permissões já vêm do 04_storage.sql; rode o 04 inteiro se ainda não rodou.
insert into storage.buckets (id, name, public) values ('covers', 'covers', true)
  on conflict (id) do update set public = true;
insert into storage.buckets (id, name, public) values ('materials', 'materials', true)
  on conflict (id) do update set public = true;
select id, public from storage.buckets where id in ('covers','materials');
select policyname from pg_policies where schemaname='storage' and tablename='objects' order by 1;
