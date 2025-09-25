CREATE OR REPLACE FUNCTION immutable_unaccent(text)
RETURNS text AS
$$
SELECT unaccent('public.unaccent', $1);
$$
LANGUAGE sql
IMMUTABLE;

ALTER TABLE public.blogs
ADD COLUMN title_unaccent text GENERATED ALWAYS AS (
  immutable_unaccent(substring(coalesce(title, '') FROM 1 FOR 255))
) STORED;

ALTER TABLE public.users
ADD COLUMN full_name_unaccent text GENERATED ALWAYS AS (
  immutable_unaccent(substring(coalesce(full_name, '') FROM 1 FOR 255))
) STORED;

CREATE INDEX idx_blogs_title_trgm_gin
ON public.blogs USING GIN (title_unaccent gin_trgm_ops);

REINDEX INDEX idx_blogs_title_trgm_gin;

CREATE INDEX idx_users_fullname_trgm_gin
ON public.users USING GIN (full_name_unaccent gin_trgm_ops);

REINDEX INDEX idx_users_fullname_trgm_gin;

CREATE INDEX IF NOT EXISTS idx_blogs_search_tsv_pt
ON public.blogs USING GIN(search_tsv_pt);

REINDEX INDEX idx_blogs_search_tsv_pt;

CREATE INDEX IF NOT EXISTS idx_users_full_name_tsv_pt
ON public.users USING GIN(full_name_tsv_pt);

REINDEX INDEX idx_users_full_name_tsv_pt;
