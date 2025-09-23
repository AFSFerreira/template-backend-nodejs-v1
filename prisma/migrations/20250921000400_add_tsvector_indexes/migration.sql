ALTER TABLE "public"."users"
  ADD COLUMN IF NOT EXISTS full_name_tsv_pt tsvector;

UPDATE "public"."users"
SET full_name_tsv_pt = to_tsvector('portuguese', unaccent(coalesce(full_name, '')));

ALTER TABLE "public"."blogs"
  ADD COLUMN IF NOT EXISTS search_tsv_pt tsvector;

UPDATE "public"."blogs"
SET search_tsv_pt =
  setweight(to_tsvector('portuguese', unaccent(coalesce(title, ''))), 'A') ||
  setweight(to_tsvector('portuguese', unaccent(coalesce(search_content, ''))), 'B');
