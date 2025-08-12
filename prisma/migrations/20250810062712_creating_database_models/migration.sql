-- CreateEnum
CREATE TYPE "public"."UserRoleType" AS ENUM ('ADMIN', 'MANAGER', 'BLOGGER', 'NORMAL_USER');

-- CreateEnum
CREATE TYPE "public"."AuthenticationStatusType" AS ENUM ('SUCCESS', 'USER_NOT_EXISTS', 'INCORRECT_PASSWORD', 'BLOCKED');

-- CreateEnum
CREATE TYPE "public"."OccupationType" AS ENUM ('RESEARCHER', 'PROFESSOR', 'STUDENT', 'POSTGRADUATE', 'MASTER', 'DOCTORATE');

-- CreateEnum
CREATE TYPE "public"."EducationLevelType" AS ENUM ('ELEMENTARY_SCHOOL', 'HIGH_SCHOOL', 'UNDERGRADUATE_STUDENT', 'BACHELOR', 'MASTER_STUDENT', 'MASTER', 'DOCTORATE_STUDENT', 'DOCTORATE', 'POSTDOCTORAL_STUDENT', 'POSTDOCTORATE', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."MembershipStatusType" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'INACTIVE');

-- CreateEnum
CREATE TYPE "public"."BlogCategoryType" AS ENUM ('MAIN_CATEGORY', 'SUBCATEGORY');

-- CreateEnum
CREATE TYPE "public"."IdentityType" AS ENUM ('CPF', 'RNE', 'PASSPORT');

-- CreateEnum
CREATE TYPE "public"."PresentationType" AS ENUM ('ORAL', 'POSTER');

-- CreateEnum
CREATE TYPE "public"."ActivityAreaType" AS ENUM ('AREA_OF_ACTIVITY', 'SUB_AREA_OF_ACTIVITY');

-- CreateTable
CREATE TABLE "public"."authentication_audits" (
    "id" SERIAL NOT NULL,
    "ipAddress" TEXT,
    "remotePort" TEXT,
    "browser" TEXT,
    "status" "public"."AuthenticationStatusType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,

    CONSTRAINT "authentication_audits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."users" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "profile_image_path" TEXT NOT NULL,
    "link_lattes" TEXT,
    "link_google_scholar" TEXT,
    "link_researcherID" TEXT,
    "orcid_number" TEXT,
    "membership_status" "public"."MembershipStatusType" NOT NULL DEFAULT 'PENDING',
    "role" "public"."UserRoleType" NOT NULL DEFAULT 'NORMAL_USER',
    "department_name" TEXT,
    "institution_complement" TEXT,
    "occupation" "public"."OccupationType" NOT NULL,
    "education_level" "public"."EducationLevelType" NOT NULL,
    "identity_type" "public"."IdentityType" NOT NULL,
    "identity_document" TEXT NOT NULL,
    "email_is_public" BOOLEAN NOT NULL,
    "astrobiology_or_related_start_year" INTEGER NOT NULL,
    "interest_description" TEXT NOT NULL,
    "recieve_reports" BOOLEAN NOT NULL,
    "public_information" TEXT NOT NULL,
    "activity_area_description" TEXT,
    "sub_activity_area_description" TEXT,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "login_attempts" INTEGER NOT NULL DEFAULT 0,
    "last_login" TIMESTAMP(3),
    "recovery_password_token" TEXT,
    "recovery_password_token_expires_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "activity_area_id" INTEGER NOT NULL,
    "sub_activity_area_id" INTEGER NOT NULL,
    "institution_id" INTEGER NOT NULL,

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
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "complement" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."enrolled_courses" (
    "id" SERIAL NOT NULL,
    "course_name" TEXT,
    "start_graduation_date" TIMESTAMP(3),
    "expected_graduation_date" TIMESTAMP(3),
    "supervisor_name" TEXT,
    "scholarship_holder" BOOLEAN NOT NULL,
    "sponsoring_organization" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "enrolled_courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."academic_publications" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "authors" TEXT NOT NULL,
    "publication_date" TIMESTAMP(3) NOT NULL,
    "journal_name" TEXT NOT NULL,
    "volume" TEXT NOT NULL,
    "edition_number" TEXT NOT NULL,
    "page_interval" TEXT NOT NULL,
    "link_DOI" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    "activityAreaId" INTEGER NOT NULL,

    CONSTRAINT "academic_publications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."institutions" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "institutions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."area_of_activity" (
    "id" SERIAL NOT NULL,
    "area" TEXT NOT NULL,
    "type" "public"."ActivityAreaType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "area_of_activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."keywords" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "keywords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."directors_board" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "director_board_profile_image" TEXT NOT NULL,
    "about_me" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "directors_board_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "public"."BlogCategoryType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."blogs" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "author_name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "main_category_id" INTEGER NOT NULL,
    "author_id" INTEGER,

    CONSTRAINT "blogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."meeting_participations" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "meetingId" INTEGER NOT NULL,

    CONSTRAINT "meeting_participations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."meeting_presentations" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "presentationType" "public"."PresentationType" NOT NULL,
    "authors" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "affiliations" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    "meeting_id" INTEGER NOT NULL,

    CONSTRAINT "meeting_presentations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."meetings" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "last_date" TIMESTAMP(3) NOT NULL,
    "participations_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "meetings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."meeting_date" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "meeting_id" INTEGER NOT NULL,

    CONSTRAINT "meeting_date_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."newsletters" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "edition" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "comments_quantity" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "newsletters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."newsletter_items" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "link_report" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "newsletter_id" INTEGER NOT NULL,

    CONSTRAINT "newsletter_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."comments" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "author_name" TEXT NOT NULL,
    "likes_quantity" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER,
    "parent_comment_id" INTEGER,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."comment_likes" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER,
    "newsletter_comment_id" INTEGER NOT NULL,

    CONSTRAINT "comment_likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_KeywordToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_KeywordToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_subcategory_fk" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_subcategory_fk_AB_pkey" PRIMARY KEY ("A","B")
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
CREATE UNIQUE INDEX "addresses_user_id_key" ON "public"."addresses"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "enrolled_courses_user_id_key" ON "public"."enrolled_courses"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "institutions_public_id_key" ON "public"."institutions"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "institutions_name_key" ON "public"."institutions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "area_of_activity_type_area_key" ON "public"."area_of_activity"("type", "area");

-- CreateIndex
CREATE UNIQUE INDEX "keywords_value_key" ON "public"."keywords"("value");

-- CreateIndex
CREATE UNIQUE INDEX "directors_board_public_id_key" ON "public"."directors_board"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "directors_board_user_id_key" ON "public"."directors_board"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "public"."categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "blogs_public_id_key" ON "public"."blogs"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "meeting_participations_userId_meetingId_key" ON "public"."meeting_participations"("userId", "meetingId");

-- CreateIndex
CREATE UNIQUE INDEX "meeting_presentations_public_id_key" ON "public"."meeting_presentations"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "meeting_presentations_user_id_meeting_id_key" ON "public"."meeting_presentations"("user_id", "meeting_id");

-- CreateIndex
CREATE UNIQUE INDEX "meetings_public_id_key" ON "public"."meetings"("public_id");

-- CreateIndex
CREATE INDEX "meetings_last_date_idx" ON "public"."meetings"("last_date");

-- CreateIndex
CREATE UNIQUE INDEX "newsletters_public_id_key" ON "public"."newsletters"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "newsletters_edition_number_key" ON "public"."newsletters"("edition", "number");

-- CreateIndex
CREATE INDEX "_KeywordToUser_B_index" ON "public"."_KeywordToUser"("B");

-- CreateIndex
CREATE INDEX "_subcategory_fk_B_index" ON "public"."_subcategory_fk"("B");

-- AddForeignKey
ALTER TABLE "public"."authentication_audits" ADD CONSTRAINT "authentication_audits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_activity_area_id_fkey" FOREIGN KEY ("activity_area_id") REFERENCES "public"."area_of_activity"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_sub_activity_area_id_fkey" FOREIGN KEY ("sub_activity_area_id") REFERENCES "public"."area_of_activity"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "public"."institutions"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."addresses" ADD CONSTRAINT "addresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."enrolled_courses" ADD CONSTRAINT "enrolled_courses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."academic_publications" ADD CONSTRAINT "academic_publications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."academic_publications" ADD CONSTRAINT "academic_publications_activityAreaId_fkey" FOREIGN KEY ("activityAreaId") REFERENCES "public"."area_of_activity"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."directors_board" ADD CONSTRAINT "directors_board_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."blogs" ADD CONSTRAINT "blogs_main_category_id_fkey" FOREIGN KEY ("main_category_id") REFERENCES "public"."categories"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."blogs" ADD CONSTRAINT "blogs_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."meeting_participations" ADD CONSTRAINT "meeting_participations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."meeting_participations" ADD CONSTRAINT "meeting_participations_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "public"."meetings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."meeting_presentations" ADD CONSTRAINT "meeting_presentations_user_id_meeting_id_fkey" FOREIGN KEY ("user_id", "meeting_id") REFERENCES "public"."meeting_participations"("userId", "meetingId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."meeting_date" ADD CONSTRAINT "meeting_date_meeting_id_fkey" FOREIGN KEY ("meeting_id") REFERENCES "public"."meetings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."newsletter_items" ADD CONSTRAINT "newsletter_items_newsletter_id_fkey" FOREIGN KEY ("newsletter_id") REFERENCES "public"."newsletters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."comments" ADD CONSTRAINT "comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."comments" ADD CONSTRAINT "comments_parent_comment_id_fkey" FOREIGN KEY ("parent_comment_id") REFERENCES "public"."comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."comment_likes" ADD CONSTRAINT "comment_likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."comment_likes" ADD CONSTRAINT "comment_likes_newsletter_comment_id_fkey" FOREIGN KEY ("newsletter_comment_id") REFERENCES "public"."comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_KeywordToUser" ADD CONSTRAINT "_KeywordToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."keywords"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_KeywordToUser" ADD CONSTRAINT "_KeywordToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_subcategory_fk" ADD CONSTRAINT "_subcategory_fk_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."blogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_subcategory_fk" ADD CONSTRAINT "_subcategory_fk_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
