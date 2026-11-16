-- Remove os 12 materiais de exemplo criados pelo seed 06.
-- Rode no SQL Editor do Supabase. Pode ser executado mais de uma vez.

delete from public.site_materials
where id in ('mat-1','mat-2','mat-3','mat-4','mat-5','mat-6',
             'mat-7','mat-8','mat-9','mat-10','mat-11','mat-12');

-- Conferência: deve retornar 0 linhas.
select id, title, slug from public.site_materials order by id;
