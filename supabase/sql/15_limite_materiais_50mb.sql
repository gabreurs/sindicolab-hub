-- Permite arquivos de até 50 MB nas pastas de materiais e capas.
update storage.buckets set file_size_limit = 52428800 where id in ('materials', 'covers');
select id, public, file_size_limit from storage.buckets where id in ('materials', 'covers');
