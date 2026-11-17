-- Permite arquivos de até 50 MB na pasta de materiais (e-books, PDFs grandes).
update storage.buckets set file_size_limit = 52428800 where id = 'materials';
select id, public, file_size_limit from storage.buckets where id = 'materials';
