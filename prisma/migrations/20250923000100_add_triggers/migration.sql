DROP TRIGGER IF EXISTS users_search_data_trigger ON public.users;
DROP FUNCTION IF EXISTS users_search_data_trigger;

CREATE OR REPLACE FUNCTION users_search_data_trigger()
RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'INSERT' OR
    NEW.full_name IS DISTINCT FROM OLD.full_name THEN

      NEW.full_name_unaccent := unaccent(substring(coalesce(NEW.full_name, '') FROM 1 FOR 255));

      NEW.full_name_tsv_pt := to_tsvector(
        'portuguese',
        NEW.full_name_unaccent
      );
  END IF;

  RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_search_data_trigger
BEFORE INSERT OR UPDATE ON public.users
FOR EACH ROW EXECUTE FUNCTION users_search_data_trigger();

--------------------------------------------------------

DROP TRIGGER IF EXISTS blogs_search_data_trigger ON public.blogs;
DROP FUNCTION IF EXISTS blogs_search_data_trigger;

CREATE OR REPLACE FUNCTION blogs_search_data_trigger()
RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'INSERT' OR
    NEW.title IS DISTINCT FROM OLD.title OR
    NEW.search_content IS DISTINCT FROM OLD.search_content THEN

      NEW.title_unaccent := unaccent(substring(coalesce(NEW.title, '') FROM 1 FOR 255));

      NEW.search_tsv_pt :=
        setweight(
          to_tsvector('portuguese', NEW.title_unaccent),
          'A'
        )
        || setweight(
          to_tsvector('portuguese', unaccent(substring(coalesce(NEW.search_content, '') FROM 1 FOR 511))),
          'B'
        );
  END IF;

  RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER blogs_search_data_trigger
BEFORE INSERT OR UPDATE ON public.blogs
FOR EACH ROW EXECUTE FUNCTION blogs_search_data_trigger();

--------------------------------------------------------

DROP TRIGGER IF EXISTS academic_publications_search_data_trigger ON public.academic_publications;
DROP FUNCTION IF EXISTS academic_publications_search_data_trigger;

CREATE OR REPLACE FUNCTION academic_publications_search_data_trigger()
RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'INSERT' OR
    NEW.title IS DISTINCT FROM OLD.title THEN

      NEW.title_unaccent := unaccent(substring(coalesce(NEW.title, '') FROM 1 FOR 255));

      NEW.title_tsv_pt := to_tsvector(
        'portuguese',
        NEW.title_unaccent
      );
  END IF;

  RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER academic_publications_search_data_trigger
BEFORE INSERT OR UPDATE ON public.academic_publications
FOR EACH ROW EXECUTE FUNCTION academic_publications_search_data_trigger();

