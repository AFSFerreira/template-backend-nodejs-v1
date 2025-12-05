ALTER TABLE public.users
  ADD COLUMN IF NOT EXISTS full_name_tsv_pt tsvector;

UPDATE public.users
SET full_name_tsv_pt = to_tsvector(
    'portuguese',
    unaccent(substring(coalesce(full_name, '') FROM 1 FOR 255))
  );

--------------------------------------------------------

ALTER TABLE public.blogs
  ADD COLUMN IF NOT EXISTS search_tsv_pt tsvector;

UPDATE public.blogs
SET search_tsv_pt =
  setweight(
    to_tsvector(
      'portuguese',
      unaccent(substring(coalesce(title, '') FROM 1 FOR 255))
    ),
    'A'
  )
  || setweight(
    to_tsvector(
      'portuguese',
      unaccent(substring(coalesce(search_content, '') FROM 1 FOR 600))
    ),
    'B'
  );

--------------------------------------------------------

ALTER TABLE public.academic_publications
  ADD COLUMN IF NOT EXISTS title_tsv_pt tsvector;

UPDATE public.academic_publications
SET title_tsv_pt = to_tsvector(
    'portuguese',
    unaccent(substring(coalesce(title, '') FROM 1 FOR 255))
  );
