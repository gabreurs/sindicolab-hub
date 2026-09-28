-- 08 — Capas corrigidas + duração preenchida para todos os cursos
-- Rode este arquivo se os SQLs 01–06 (e o 07, se for o caso) já foram executados.
-- É reexecutável: nada é duplicado nem apagado.

begin;

-- 1) Capas dos cursos: o caminho interno antigo não existia no site publicado.
--    Agora apontam para os arquivos que acompanham a própria build.
update public.courses set cover_url = '/cursos/competencias-do-sindico.webp', banner_url = '/cursos/competencias-do-sindico.webp'
where slug = 'competencias-sindico-profissional' and cover_url is distinct from '/cursos/competencias-do-sindico.webp';

update public.courses set cover_url = '/cursos/conselheiros-fiscais-e-consultivos.webp', banner_url = '/cursos/conselheiros-fiscais-e-consultivos.webp'
where slug = 'conselheiros-fiscais-consultivos' and cover_url is distinct from '/cursos/conselheiros-fiscais-e-consultivos.webp';

update public.courses set cover_url = '/cursos/zelador-de-alta-performance.webp', banner_url = '/cursos/zelador-de-alta-performance.webp'
where slug = 'zelador-alta-performance' and cover_url is distinct from '/cursos/zelador-de-alta-performance.webp';

update public.courses set cover_url = '/cursos/limpeza-de-alta-performance.webp', banner_url = '/cursos/limpeza-de-alta-performance.webp'
where slug = 'limpeza-alta-performance' and cover_url is distinct from '/cursos/limpeza-de-alta-performance.webp';

update public.courses set cover_url = '/cursos/play/sindico-alta-performance.webp', banner_url = '/cursos/play/sindico-alta-performance.webp'
where slug = 'sindico-alta-performance' and cover_url is distinct from '/cursos/play/sindico-alta-performance.webp';

update public.courses set cover_url = '/cursos/play/inteligencia-condominial.webp', banner_url = '/cursos/play/inteligencia-condominial.webp'
where slug = 'inteligencia-condominial' and cover_url is distinct from '/cursos/play/inteligencia-condominial.webp';

update public.courses set cover_url = '/cursos/play/inteligencia-condominial-2.webp', banner_url = '/cursos/play/inteligencia-condominial-2.webp'
where slug = 'inteligencia-condominial-pt-2' and cover_url is distinct from '/cursos/play/inteligencia-condominial-2.webp';

update public.courses set cover_url = '/cursos/play/captar-mais-clientes.webp', banner_url = '/cursos/play/captar-mais-clientes.webp'
where slug = 'como-captar-mais-clientes' and cover_url is distinct from '/cursos/play/captar-mais-clientes.webp';

update public.courses set cover_url = '/cursos/play/conselheiros.webp', banner_url = '/cursos/play/conselheiros.webp'
where slug = 'conselheiros' and cover_url is distinct from '/cursos/play/conselheiros.webp';

update public.courses set cover_url = '/cursos/play/oratoria-vendas.webp', banner_url = '/cursos/play/oratoria-vendas.webp'
where slug = 'oratoria-e-vendas' and cover_url is distinct from '/cursos/play/oratoria-vendas.webp';

update public.courses set cover_url = '/cursos/play/zelador-excelencia.webp', banner_url = '/cursos/play/zelador-excelencia.webp'
where slug = 'zelador-de-excelencia' and cover_url is distinct from '/cursos/play/zelador-excelencia.webp';

update public.courses set cover_url = '/cursos/play/limpeza-alta-performance.webp', banner_url = '/cursos/play/limpeza-alta-performance.webp'
where slug = 'limpeza-alta-performance-play' and cover_url is distinct from '/cursos/play/limpeza-alta-performance.webp';

update public.courses set cover_url = '/cursos/play/controlador-de-acessos.webp', banner_url = '/cursos/play/controlador-de-acessos.webp'
where slug = 'controlador-de-acessos' and cover_url is distinct from '/cursos/play/controlador-de-acessos.webp';

-- 2) Capas das notícias do Portal (mesma correção de caminho).
update public.portal_posts set cover_image = '/portal/portal-cover-1.jpg', social_image_url = '/portal/portal-cover-1.jpg'
where cover_image like '%portal-cover-1%';
update public.portal_posts set cover_image = '/portal/portal-cover-2.jpg', social_image_url = '/portal/portal-cover-2.jpg'
where cover_image like '%portal-cover-2%';
update public.portal_posts set cover_image = '/portal/portal-cover-3.jpg', social_image_url = '/portal/portal-cover-3.jpg'
where cover_image like '%portal-cover-3%';
update public.portal_posts set cover_image = '/portal/portal-cover-4.jpg', social_image_url = '/portal/portal-cover-4.jpg'
where cover_image like '%portal-cover-4%';
update public.portal_posts set cover_image = '/portal/portal-cover-5.jpg', social_image_url = '/portal/portal-cover-5.jpg'
where cover_image like '%portal-cover-5%';

-- 3) Duração dos cursos sem duração cadastrada: soma das aulas do próprio curso.
update public.courses c
set duration_minutes = sub.total
from (
  select l.course_id, round(sum(l.duration_seconds) / 60.0)::int as total
  from public.course_lessons l
  where l.duration_seconds is not null
  group by l.course_id
) sub
where c.id = sub.course_id
  and sub.total > 0
  and c.duration_minutes is null;

commit;
