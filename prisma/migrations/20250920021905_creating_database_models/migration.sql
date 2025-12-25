-- CreateEnum
CREATE TYPE "public"."UserRoleType" AS ENUM ('ADMIN', 'MANAGER', 'CONTENT_LEADER', 'CONTENT_PRODUCER', 'DEFAULT');

-- CreateEnum
CREATE TYPE "public"."AuthenticationStatusType" AS ENUM ('SUCCESS', 'USER_NOT_EXISTS', 'INCORRECT_PASSWORD', 'BLOCKED');

-- CreateEnum
CREATE TYPE "public"."OccupationType" AS ENUM ('RESEARCHER', 'PROFESSOR', 'STUDENT', 'POSTGRADUATE', 'MASTER', 'DOCTORATE');

-- CreateEnum
CREATE TYPE "public"."EducationLevelType" AS ENUM ('ELEMENTARY_SCHOOL', 'HIGH_SCHOOL', 'UNDERGRADUATE_STUDENT', 'BACHELOR', 'MASTER_STUDENT', 'MASTER', 'DOCTORATE_STUDENT', 'DOCTORATE', 'POST_DOCTORATE_STUDENT', 'POST_DOCTORATE', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."MembershipStatusType" AS ENUM ('ACTIVE', 'INACTIVE', 'PENDING');

-- CreateEnum
CREATE TYPE "public"."IdentityType" AS ENUM ('CPF', 'RNE', 'PASSPORT');

-- CreateEnum
CREATE TYPE "public"."PresentationType" AS ENUM ('ORAL', 'POSTER');

-- CreateEnum
CREATE TYPE "public"."ActivityAreaType" AS ENUM ('AREA_OF_ACTIVITY', 'SUB_AREA_OF_ACTIVITY');

-- CreateEnum
CREATE TYPE "public"."EditorialStatusType" AS ENUM ('PENDING_APPROVAL', 'DRAFT', 'PUBLISHED', 'CHANGES_REQUESTED');

-- CreateTable
CREATE TABLE "public"."authentication_audits" (
    "id" SERIAL NOT NULL,
    "ip_address" INET,
    "remote_port" TEXT,
    "browser" TEXT,
    "status" "public"."AuthenticationStatusType" NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER,

    CONSTRAINT "authentication_audits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."users" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "birthdate" DATE NOT NULL,
    "profile_image" TEXT NOT NULL,
    "link_lattes" TEXT,
    "link_google_scholar" TEXT,
    "link_researcher_id" TEXT,
    "orcid_number" TEXT,
    "membership_status" "public"."MembershipStatusType" NOT NULL DEFAULT 'PENDING',
    "role" "public"."UserRoleType" NOT NULL DEFAULT 'DEFAULT',
    "department_name" TEXT,
    "institution_complement" TEXT,
    "occupation" "public"."OccupationType",
    "education_level" "public"."EducationLevelType" NOT NULL,
    "identity_type" "public"."IdentityType" NOT NULL,
    "identity_document" TEXT NOT NULL,
    "email_is_public" BOOLEAN NOT NULL,
    "astrobiology_or_related_start_year" INTEGER,
    "interest_description" TEXT NOT NULL,
    "receive_reports" BOOLEAN NOT NULL,
    "public_information" TEXT,
    "activity_area_description" TEXT,
    "sub_activity_area_description" TEXT,
    "email" TEXT NOT NULL,
    "secondary_email" TEXT,
    "password_hash" TEXT NOT NULL,
    "login_attempts" INTEGER NOT NULL DEFAULT 0,
    "last_login" TIMESTAMPTZ(3),
    "recovery_password_token" TEXT,
    "recovery_password_token_expires_at" TIMESTAMPTZ(3),
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    "activity_area_id" INTEGER,
    "sub_activity_area_id" INTEGER,
    "institution_id" INTEGER,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."addresses" (
    "id" SERIAL NOT NULL,
    "zip" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "complement" TEXT,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    "state_id" INTEGER NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "address_states" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "country_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "address_states_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "address_countries" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "address_countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."enrolled_courses" (
    "id" SERIAL NOT NULL,
    "course_name" TEXT,
    "start_graduation_date" DATE,
    "expected_graduation_date" DATE,
    "supervisor_name" TEXT,
    "scholarship_holder" BOOLEAN NOT NULL,
    "sponsoring_organization" TEXT,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "enrolled_courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."academic_publications" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "publication_year" INTEGER NOT NULL,
    "journal_name" TEXT NOT NULL,
    "volume" TEXT NOT NULL,
    "edition_number" TEXT NOT NULL,
    "start_page" TEXT NOT NULL,
    "link_doi" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    "activity_area_id" INTEGER NOT NULL,

    CONSTRAINT "academic_publications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."academic_publication_authors" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "academic_publication_id" INTEGER NOT NULL,

    CONSTRAINT "academic_publication_authors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."institutions" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "institutions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."area_of_activity" (
    "id" SERIAL NOT NULL,
    "area" TEXT NOT NULL,
    "type" "public"."ActivityAreaType" NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "area_of_activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."keywords" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "keywords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."directors_board" (
    "id" SERIAL NOT NULL,
    "director_position_id" INTEGER NOT NULL,
    "director_board_profile_image" TEXT NOT NULL,
    "about_me" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "directors_board_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."director_positions" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "precedence" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "director_positions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."payment_info" (
    "id" SMALLINT NOT NULL DEFAULT 1,
    "pix_key" TEXT NOT NULL,
    "bank" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "agency" TEXT NOT NULL,
    "account" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "payment_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."meeting_payment_information" (
    "id" SERIAL NOT NULL,
    "value" DECIMAL(10,2) NOT NULL,
    "limit_date" DATE NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    "payment_info_id" INTEGER NOT NULL,
    "meeting_id" INTEGER NOT NULL,

    CONSTRAINT "meeting_payment_information_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."meeting_guest" (
    "id" SERIAL NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "institution_name" TEXT NOT NULL,
    "department_name" TEXT NOT NULL,
    "occupation" "public"."OccupationType" NOT NULL,
    "education_level" "public"."EducationLevelType" NOT NULL,
    "wants_newsletter" BOOLEAN NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "meeting_guest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."meeting_participants" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER,
    "guest_id" INTEGER,
    "meeting_id" INTEGER NOT NULL,

    CONSTRAINT "meeting_participants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."meeting_presentations" (
    "id" SERIAL NOT NULL,
    "presentation_type" "public"."PresentationType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "participation_id" INTEGER NOT NULL,

    CONSTRAINT "meeting_presentations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."meeting_presentation_authors" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "presentation_id" INTEGER NOT NULL,

    CONSTRAINT "meeting_presentation_authors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."meeting_presentation_affiliations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "presentation_id" INTEGER NOT NULL,

    CONSTRAINT "meeting_presentation_affiliations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."meetings" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "last_date" DATE NOT NULL,
    "participants_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "meetings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."meeting_date" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "meeting_id" INTEGER NOT NULL,

    CONSTRAINT "meeting_date_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."blogs" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "editorial_status" "EditorialStatusType" NOT NULL DEFAULT 'PENDING_APPROVAL',
    "title" TEXT NOT NULL,
    "banner_image" TEXT NOT NULL,
    "author_name" TEXT NOT NULL,
    "access_count" INTEGER NOT NULL DEFAULT 0,
    "content" JSON NOT NULL,
    "search_content" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    "user_id" INTEGER,

    CONSTRAINT "blogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."newsletters" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "sequence_number" TEXT NOT NULL,
    "edition_number" TEXT NOT NULL,
    "volume" TEXT NOT NULL,
    "comments_quantity" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "newsletters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."comments" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "author_name" TEXT NOT NULL,
    "likes_quantity" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    "newsletter_id" INTEGER NOT NULL,
    "user_id" INTEGER,
    "parent_comment_id" INTEGER,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."comment_likes" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER,
    "newsletter_comment_id" INTEGER NOT NULL,

    CONSTRAINT "comment_likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "slider_images" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "link" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "slider_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_blog_subcategories" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_blog_subcategories_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_KeywordToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_KeywordToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_public_id_key" ON "public"."users"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "public"."users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_recovery_password_token_key" ON "public"."users"("recovery_password_token");

-- CreateIndex
CREATE INDEX "users_membership_status_idx" ON "public"."users"("membership_status");

-- CreateIndex
CREATE UNIQUE INDEX "users_identity_type_identity_document_key" ON "public"."users"("identity_type", "identity_document");

-- CreateIndex
CREATE UNIQUE INDEX "users_secondary_email_key" ON "users"("secondary_email");

-- CreateIndex
CREATE UNIQUE INDEX "addresses_user_id_key" ON "public"."addresses"("user_id");

-- CreateIndex
CREATE INDEX "addresses_user_id_idx" ON "public"."addresses"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "address_states_name_country_id_key" ON "address_states"("name", "country_id");

-- CreateIndex
CREATE UNIQUE INDEX "address_countries_name_key" ON "address_countries"("name");

-- CreateIndex
CREATE INDEX "address_countries_name_idx" ON "address_countries"("name");

-- CreateIndex
CREATE INDEX "addresses_state_id_idx" ON "addresses"("state_id");

-- CreateIndex
CREATE UNIQUE INDEX "enrolled_courses_user_id_key" ON "public"."enrolled_courses"("user_id");

-- CreateIndex
CREATE INDEX "enrolled_courses_user_id_idx" ON "public"."enrolled_courses"("user_id");

-- CreateIndex
CREATE INDEX "academic_publications_user_id_idx" ON "public"."academic_publications"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "academic_publication_authors_public_id_key" ON "public"."academic_publication_authors"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "academic_publication_authors_academic_publication_id_name_key" ON "public"."academic_publication_authors"("academic_publication_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "institutions_public_id_key" ON "public"."institutions"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "institutions_name_key" ON "public"."institutions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "area_of_activity_type_area_key" ON "public"."area_of_activity"("type", "area");

-- CreateIndex
CREATE UNIQUE INDEX "keywords_value_key" ON "public"."keywords"("value");

-- CreateIndex
CREATE UNIQUE INDEX "directors_board_user_id_key" ON "public"."directors_board"("user_id");

-- CreateIndex
CREATE INDEX "directors_board_user_id_idx" ON "public"."directors_board"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "directors_board_director_position_id_key" ON "public"."directors_board"("director_position_id");

-- CreateIndex
CREATE UNIQUE INDEX "director_positions_position_key" ON "public"."director_positions"("position");

-- CreateIndex
CREATE UNIQUE INDEX "director_positions_public_id_key" ON "director_positions"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "meeting_payment_information_meeting_id_key" ON "public"."meeting_payment_information"("meeting_id");

-- CreateIndex
CREATE INDEX "meeting_payment_information_meeting_id_idx" ON "public"."meeting_payment_information"("meeting_id");

-- CreateIndex
CREATE UNIQUE INDEX "meeting_participants_meeting_id_user_id_key" ON "public"."meeting_participants"("meeting_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "meeting_participants_meeting_id_guest_id_key" ON "public"."meeting_participants"("meeting_id", "guest_id");

-- CreateIndex
CREATE UNIQUE INDEX "meeting_presentations_participation_id_key" ON "public"."meeting_presentations"("participation_id");

-- CreateIndex
CREATE UNIQUE INDEX "meetings_public_id_key" ON "public"."meetings"("public_id");

-- CreateIndex
CREATE INDEX "meetings_last_date_idx" ON "public"."meetings"("last_date");

-- CreateIndex
CREATE INDEX "meeting_date_meeting_id_idx" ON "public"."meeting_date"("meeting_id");

-- CreateIndex
CREATE UNIQUE INDEX "blogs_public_id_key" ON "public"."blogs"("public_id");

-- CreateIndex
CREATE INDEX "blogs_editorial_status_idx" ON "blogs"("editorial_status");

-- CreateIndex
CREATE UNIQUE INDEX "newsletters_public_id_key" ON "public"."newsletters"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "newsletters_sequence_number_key" ON "newsletters"("sequence_number");

-- CreateIndex
CREATE INDEX "newsletters_edition_number_idx" ON "newsletters"("edition_number");

-- CreateIndex
CREATE UNIQUE INDEX "newsletters_volume_edition_number_key" ON "newsletters"("volume", "edition_number");

-- CreateIndex
CREATE INDEX "comments_newsletter_id_idx" ON "public"."comments"("newsletter_id");

-- CreateIndex
CREATE INDEX "comment_likes_newsletter_comment_id_idx" ON "public"."comment_likes"("newsletter_comment_id");

-- CreateIndex
CREATE UNIQUE INDEX "slider_images_public_id_key" ON "slider_images"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "slider_images_image_key" ON "slider_images"("image");

-- CreateIndex
CREATE INDEX "_blog_subcategories_B_index" ON "public"."_blog_subcategories"("B");

-- CreateIndex
CREATE INDEX "_KeywordToUser_B_index" ON "public"."_KeywordToUser"("B");

-- AddForeignKey
ALTER TABLE "public"."authentication_audits" ADD CONSTRAINT "authentication_audits_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_activity_area_id_fkey" FOREIGN KEY ("activity_area_id") REFERENCES "public"."area_of_activity"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "public"."institutions"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_sub_activity_area_id_fkey" FOREIGN KEY ("sub_activity_area_id") REFERENCES "public"."area_of_activity"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."addresses" ADD CONSTRAINT "addresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "address_states"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address_states" ADD CONSTRAINT "address_states_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "address_countries"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."enrolled_courses" ADD CONSTRAINT "enrolled_courses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."academic_publications" ADD CONSTRAINT "academic_publications_activity_area_id_fkey" FOREIGN KEY ("activity_area_id") REFERENCES "public"."area_of_activity"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."academic_publications" ADD CONSTRAINT "academic_publications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."academic_publication_authors" ADD CONSTRAINT "academic_publication_authors_academic_publication_id_fkey" FOREIGN KEY ("academic_publication_id") REFERENCES "public"."academic_publications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."directors_board" ADD CONSTRAINT "directors_board_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."directors_board" ADD CONSTRAINT "directors_board_director_position_id_fkey" FOREIGN KEY ("director_position_id") REFERENCES "public"."director_positions"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."meeting_payment_information" ADD CONSTRAINT "meeting_payment_information_meeting_id_fkey" FOREIGN KEY ("meeting_id") REFERENCES "public"."meetings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."meeting_payment_information" ADD CONSTRAINT "meeting_payment_information_payment_info_id_fkey" FOREIGN KEY ("payment_info_id") REFERENCES "public"."payment_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."meeting_participants" ADD CONSTRAINT "meeting_participants_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."meeting_participants" ADD CONSTRAINT "meeting_participants_guest_id_fkey" FOREIGN KEY ("guest_id") REFERENCES "public"."meeting_guest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."meeting_participants" ADD CONSTRAINT "meeting_participants_meeting_id_fkey" FOREIGN KEY ("meeting_id") REFERENCES "public"."meetings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."meeting_presentations" ADD CONSTRAINT "meeting_presentations_participation_id_fkey" FOREIGN KEY ("participation_id") REFERENCES "public"."meeting_participants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."meeting_presentation_authors" ADD CONSTRAINT "meeting_presentation_authors_presentation_id_fkey" FOREIGN KEY ("presentation_id") REFERENCES "public"."meeting_presentations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."meeting_presentation_affiliations" ADD CONSTRAINT "meeting_presentation_affiliations_presentation_id_fkey" FOREIGN KEY ("presentation_id") REFERENCES "public"."meeting_presentations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."meeting_date" ADD CONSTRAINT "meeting_date_meeting_id_fkey" FOREIGN KEY ("meeting_id") REFERENCES "public"."meetings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."blogs" ADD CONSTRAINT "blogs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."comments" ADD CONSTRAINT "comments_newsletter_id_fkey" FOREIGN KEY ("newsletter_id") REFERENCES "public"."newsletters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."comments" ADD CONSTRAINT "comments_parent_comment_id_fkey" FOREIGN KEY ("parent_comment_id") REFERENCES "public"."comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."comments" ADD CONSTRAINT "comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."comment_likes" ADD CONSTRAINT "comment_likes_newsletter_comment_id_fkey" FOREIGN KEY ("newsletter_comment_id") REFERENCES "public"."comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."comment_likes" ADD CONSTRAINT "comment_likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_blog_subcategories" ADD CONSTRAINT "_blog_subcategories_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."area_of_activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_blog_subcategories" ADD CONSTRAINT "_blog_subcategories_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."blogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_KeywordToUser" ADD CONSTRAINT "_KeywordToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."keywords"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_KeywordToUser" ADD CONSTRAINT "_KeywordToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
