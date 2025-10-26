CREATE OR REPLACE FUNCTION immutable_unaccent(text)
RETURNS text AS
$$
SELECT unaccent('public.unaccent', $1);
$$
LANGUAGE sql
IMMUTABLE;

--------------------------------------------------------

ALTER TABLE public.blogs
ADD COLUMN title_unaccent text GENERATED ALWAYS AS (
  immutable_unaccent(substring(coalesce(title, '') FROM 1 FOR 255))
) STORED;

--------------------------------------------------------

ALTER TABLE public.users
ADD COLUMN full_name_unaccent text GENERATED ALWAYS AS (
  immutable_unaccent(substring(coalesce(full_name, '') FROM 1 FOR 255))
) STORED;

--------------------------------------------------------

ALTER TABLE public.academic_publications
ADD COLUMN title_unaccent text GENERATED ALWAYS AS (
  immutable_unaccent(substring(coalesce(title, '') FROM 1 FOR 255))
) STORED;
