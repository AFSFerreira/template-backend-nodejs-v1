ALTER TABLE blogs ADD COLUMN IF NOT EXISTS tsv tsvector;

DROP TRIGGER IF EXISTS tsvectorupdate ON blogs;
DROP FUNCTION IF EXISTS blogs_tsv_trigger();

CREATE FUNCTION blogs_tsv_trigger() RETURNS trigger AS $$
BEGIN
  NEW.tsv := to_tsvector('portuguese', NEW.search_content);
  RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER tsvectorupdate
BEFORE INSERT OR UPDATE ON blogs
FOR EACH ROW EXECUTE FUNCTION blogs_tsv_trigger();
