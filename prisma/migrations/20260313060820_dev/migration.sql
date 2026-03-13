/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "address_countries_name_idx";

-- DropIndex
DROP INDEX "users_email_key";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "deleted_at" TIMESTAMPTZ(3);

-- CreateIndex
CREATE INDEX "academic_publications_created_at_idx" ON "academic_publications"("created_at");

-- CreateIndex
CREATE INDEX "academic_publications_activity_area_id_idx" ON "academic_publications"("activity_area_id");

-- CreateIndex
CREATE INDEX "addresses_user_id_idx" ON "addresses"("user_id");

-- CreateIndex
CREATE INDEX "authentication_audits_user_id_status_created_at_idx" ON "authentication_audits"("user_id", "status", "created_at");

-- CreateIndex
CREATE INDEX "blogs_user_id_idx" ON "blogs"("user_id");

-- CreateIndex
CREATE INDEX "blogs_created_at_idx" ON "blogs"("created_at");

-- CreateIndex
CREATE INDEX "director_positions_precedence_idx" ON "director_positions"("precedence");

-- CreateIndex
CREATE INDEX "guest_meeting_enrollments_meeting_enrollment_id_idx" ON "guest_meeting_enrollments"("meeting_enrollment_id");

-- CreateIndex
CREATE INDEX "meeting_enrollments_created_at_idx" ON "meeting_enrollments"("created_at");

-- CreateIndex
CREATE INDEX "meeting_presentation_affiliations_presentation_id_idx" ON "meeting_presentation_affiliations"("presentation_id");

-- CreateIndex
CREATE INDEX "meeting_presentation_authors_presentation_id_idx" ON "meeting_presentation_authors"("presentation_id");

-- CreateIndex
CREATE INDEX "meetings_created_at_idx" ON "meetings"("created_at");

-- CreateIndex
CREATE INDEX "newsletters_created_at_idx" ON "newsletters"("created_at");

-- CreateIndex
CREATE INDEX "newsletters_newsletter_template_id_idx" ON "newsletters"("newsletter_template_id") WHERE (newsletter_template_id IS NOT NULL);

-- CreateIndex
CREATE INDEX "users_institution_id_idx" ON "users"("institution_id");

-- CreateIndex
CREATE INDEX "users_activity_area_id_idx" ON "users"("activity_area_id");

-- CreateIndex
CREATE INDEX "users_sub_activity_area_id_idx" ON "users"("sub_activity_area_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email") WHERE (deleted_at IS NULL);
