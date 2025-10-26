DROP TRIGGER IF EXISTS tsvector_pt_update_users_full_name ON "public"."users";
DROP FUNCTION IF EXISTS users_full_name_tsv_pt_trigger;

CREATE OR REPLACE FUNCTION users_full_name_tsv_pt_trigger()
RETURNS trigger AS $$
BEGIN
  NEW.full_name_tsv_pt := to_tsvector(
    'portuguese',
    unaccent(substring(coalesce(NEW.full_name, '') FROM 1 FOR 255))
  );
  RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER tsvector_pt_update_users_full_name
BEFORE INSERT OR UPDATE ON "public"."users"
FOR EACH ROW EXECUTE FUNCTION users_full_name_tsv_pt_trigger();

--------------------------------------------------------

DROP TRIGGER IF EXISTS tsvector_pt_update_search_blogs ON blogs;
DROP FUNCTION IF EXISTS blogs_search_tsv_pt_trigger;

CREATE OR REPLACE FUNCTION blogs_search_tsv_pt_trigger()
RETURNS trigger AS $$
BEGIN
  NEW.search_tsv_pt :=
    setweight(
      to_tsvector(
        'portuguese',
        unaccent(substring(coalesce(NEW.title, '') FROM 1 FOR 255))
      ),
      'A'
    )
    || setweight(
      to_tsvector(
        'portuguese',
        unaccent(substring(coalesce(NEW.search_content, '') FROM 1 FOR 511))
      ),
      'B'
    );
  RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER tsvector_pt_update_search_blogs
BEFORE INSERT OR UPDATE ON blogs
FOR EACH ROW EXECUTE FUNCTION blogs_search_tsv_pt_trigger();

--------------------------------------------------------

DROP TRIGGER IF EXISTS blogs_title_unaccent_trigger ON blogs;
DROP FUNCTION IF EXISTS fill_blogs_title_unaccented_columns;

CREATE OR REPLACE FUNCTION fill_blogs_title_unaccented_columns()
RETURNS trigger AS $$
BEGIN
  NEW.title_unaccent := unaccent(substring(coalesce(NEW.title, '') FROM 1 FOR 255));
  RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER blogs_title_unaccent_trigger
BEFORE INSERT OR UPDATE ON "public"."blogs"
FOR EACH ROW EXECUTE FUNCTION fill_blogs_title_unaccented_columns();

--------------------------------------------------------

DROP TRIGGER IF EXISTS users_full_name_unaccent_trigger ON public.users;
DROP FUNCTION IF EXISTS fill_users_full_name_unaccent_trigger;

CREATE FUNCTION fill_users_full_name_unaccent_trigger()
RETURNS trigger AS $$
BEGIN
  NEW.full_name_unaccent := unaccent(substring(coalesce(NEW.full_name, '') FROM 1 FOR 255));
  RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_full_name_unaccent_trigger
BEFORE INSERT OR UPDATE ON public.users
FOR EACH ROW EXECUTE FUNCTION fill_users_full_name_unaccent_trigger();

--------------------------------------------------------

DROP TRIGGER IF EXISTS tsvector_pt_update_academic_publications_title ON public.academic_publications;
DROP FUNCTION IF EXISTS academic_publications_title_tsv_pt_trigger;

CREATE OR REPLACE FUNCTION academic_publications_title_tsv_pt_trigger()
RETURNS trigger AS $$
BEGIN
  NEW.title_tsv_pt := to_tsvector(
    'portuguese',
    unaccent(substring(coalesce(NEW.title, '') FROM 1 FOR 255))
  );
  RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER tsvector_pt_update_academic_publications_title
BEFORE INSERT OR UPDATE ON public.academic_publications
FOR EACH ROW EXECUTE FUNCTION academic_publications_title_tsv_pt_trigger();

