SELECT pg_advisory_lock(40028922);

CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX IF NOT EXISTS idx_blogs_title_trgm
  ON public.blogs USING GiST(title gist_trgm_ops);

ALTER DATABASE sbastrobiodb SET pg_trgm.similarity_threshold = 0.6;

SELECT pg_advisory_unlock(40028922);
