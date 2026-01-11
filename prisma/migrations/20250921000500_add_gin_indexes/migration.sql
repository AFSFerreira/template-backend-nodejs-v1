CREATE INDEX IF NOT EXISTS idx_blogs_title_trgm_gin
ON public.blogs USING GIN (title_unaccent gin_trgm_ops);

REINDEX INDEX idx_blogs_title_trgm_gin;

--------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_users_fullname_trgm_gin
ON public.users USING GIN (full_name_unaccent gin_trgm_ops);

REINDEX INDEX idx_users_fullname_trgm_gin;

--------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_academic_publications_title_trgm_gin
ON public.academic_publications USING GIN (title_unaccent gin_trgm_ops);

REINDEX INDEX idx_academic_publications_title_trgm_gin;

--------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_blogs_search_tsv_pt
ON public.blogs USING GIN(search_tsv_pt);

REINDEX INDEX idx_blogs_search_tsv_pt;

--------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_users_full_name_tsv_pt
ON public.users USING GIN(full_name_tsv_pt);

REINDEX INDEX idx_users_full_name_tsv_pt;

--------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_academic_publications_title_tsv_pt
ON public.academic_publications USING GIN (title_tsv_pt);

REINDEX INDEX idx_academic_publications_title_tsv_pt;

--------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_newsletters_edition_number_trgm_gin
ON public.newsletters USING GIN (edition_number gin_trgm_ops);

REINDEX INDEX idx_newsletters_edition_number_trgm_gin;

--------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_newsletters_sequence_number_trgm_gin
ON public.newsletters USING GIN (sequence_number gin_trgm_ops);

REINDEX INDEX idx_newsletters_sequence_number_trgm_gin;

--------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_newsletters_volume_trgm_gin
ON public.newsletters USING GIN (volume gin_trgm_ops);

REINDEX INDEX idx_newsletters_volume_trgm_gin;

--------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_meeting_title_trgm_gin
ON public.meetings USING GIN (title gin_trgm_ops);

REINDEX INDEX idx_meeting_title_trgm_gin;
