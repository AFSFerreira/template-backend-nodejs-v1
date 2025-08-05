-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'MANAGER', 'BLOGGER', 'NORMAL_USER');

-- CreateEnum
CREATE TYPE "AuthenticationStatus" AS ENUM ('SUCCESS', 'USER_NOT_EXISTS', 'INCORRECT_PASSWORD', 'BLOCKED');

-- CreateEnum
CREATE TYPE "Occupation" AS ENUM ('RESEARCHER', 'PROFESSOR', 'STUDENT', 'POSTGRADUATE', 'MASTER', 'DOCTORATE');

-- CreateEnum
CREATE TYPE "EducationLevel" AS ENUM ('ELEMENTARY_SCHOOL', 'HIGH_SCHOOL', 'UNDERGRADUATE_STUDENT', 'BACHELOR', 'MASTER_STUDENT', 'MASTER', 'DOCTORATE_STUDENT', 'DOCTORATE', 'POSTDOCTORAL_STUDENT', 'POSTDOCTORATE', 'OTHER');

-- CreateEnum
CREATE TYPE "MembershipStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'INACTIVE');

-- CreateEnum
CREATE TYPE "BlogCategoryType" AS ENUM ('MAIN_CATEGORY', 'SUBCATEGORY');

-- CreateEnum
CREATE TYPE "IdentityType" AS ENUM ('CPF', 'RNE', 'PASSPORT');

-- CreateEnum
CREATE TYPE "PresentationType" AS ENUM ('ORAL', 'POSTER');

-- CreateEnum
CREATE TYPE "KeywordType" AS ENUM ('AREA_OF_ACTIVITY', 'SUB_AREA_OF_ACTIVITY', 'USER_INTEREST');

-- CreateTable
CREATE TABLE "authentication_audits" (
    "id" SERIAL NOT NULL,
    "ipAddress" TEXT,
    "remotePort" TEXT,
    "browser" TEXT,
    "status" "AuthenticationStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,

    CONSTRAINT "authentication_audits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
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
    "membership_status" "MembershipStatus" NOT NULL DEFAULT 'PENDING',
    "role" "UserRole" NOT NULL DEFAULT 'NORMAL_USER',
    "institution_name" TEXT NOT NULL,
    "department_name" TEXT,
    "institution_complement" TEXT,
    "occupation" "Occupation" NOT NULL,
    "education_level" "EducationLevel" NOT NULL,
    "identity_type" "IdentityType" NOT NULL,
    "identity_document" TEXT NOT NULL,
    "email_is_public" BOOLEAN NOT NULL,
    "astrobiology_or_related_start_year" INTEGER NOT NULL,
    "interest_description" TEXT NOT NULL,
    "recieve_reports" BOOLEAN NOT NULL,
    "public_information" TEXT NOT NULL,
    "specific_activity" TEXT NOT NULL,
    "specific_activity_description" TEXT,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "login_attempts" INTEGER NOT NULL DEFAULT 0,
    "last_login" TIMESTAMP(3),
    "recovery_password_token" TEXT,
    "recovery_password_token_expires_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "activity_area_id" INTEGER NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" SERIAL NOT NULL,
    "zip" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enrolled_courses" (
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
CREATE TABLE "academic_publications" (
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

    CONSTRAINT "academic_publications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "keywords" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "type" "KeywordType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "keywords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "directors_board" (
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
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "BlogCategoryType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blogs" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "author_name" TEXT NOT NULL,
    "html_content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "main_category_id" INTEGER NOT NULL,
    "author_id" INTEGER,

    CONSTRAINT "blogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meeting_participations" (
    "userId" INTEGER NOT NULL,
    "meetingId" INTEGER NOT NULL,
    "attended" BOOLEAN,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "meeting_participations_pkey" PRIMARY KEY ("userId","meetingId")
);

-- CreateTable
CREATE TABLE "meeting_presentations" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "presentationType" "PresentationType" NOT NULL,
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
CREATE TABLE "meetings" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "meetings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "newsletters" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "edition" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "newsletters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "newsletter_items" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "linkReport" TEXT NOT NULL,
    "newsletterId" INTEGER NOT NULL,

    CONSTRAINT "newsletter_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "likes_quantity" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "parentCommentId" INTEGER,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment_likes" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "newsletterCommentId" INTEGER NOT NULL,

    CONSTRAINT "comment_likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_user_keywords" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_user_keywords_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_subcategory_fk" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_subcategory_fk_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_public_id_key" ON "users"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_recovery_password_token_key" ON "users"("recovery_password_token");

-- CreateIndex
CREATE UNIQUE INDEX "addresses_user_id_key" ON "addresses"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "enrolled_courses_user_id_key" ON "enrolled_courses"("user_id");

-- CreateIndex
CREATE INDEX "keywords_value_idx" ON "keywords"("value");

-- CreateIndex
CREATE INDEX "keywords_type_idx" ON "keywords"("type");

-- CreateIndex
CREATE UNIQUE INDEX "keywords_type_value_key" ON "keywords"("type", "value");

-- CreateIndex
CREATE UNIQUE INDEX "directors_board_public_id_key" ON "directors_board"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "directors_board_user_id_key" ON "directors_board"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "blogs_public_id_key" ON "blogs"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "meeting_presentations_public_id_key" ON "meeting_presentations"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "meeting_presentations_user_id_meeting_id_key" ON "meeting_presentations"("user_id", "meeting_id");

-- CreateIndex
CREATE UNIQUE INDEX "meetings_public_id_key" ON "meetings"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "newsletters_public_id_key" ON "newsletters"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "newsletters_edition_number_key" ON "newsletters"("edition", "number");

-- CreateIndex
CREATE INDEX "_user_keywords_B_index" ON "_user_keywords"("B");

-- CreateIndex
CREATE INDEX "_subcategory_fk_B_index" ON "_subcategory_fk"("B");

-- AddForeignKey
ALTER TABLE "authentication_audits" ADD CONSTRAINT "authentication_audits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_activity_area_id_fkey" FOREIGN KEY ("activity_area_id") REFERENCES "keywords"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrolled_courses" ADD CONSTRAINT "enrolled_courses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academic_publications" ADD CONSTRAINT "academic_publications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "directors_board" ADD CONSTRAINT "directors_board_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_main_category_id_fkey" FOREIGN KEY ("main_category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meeting_presentations" ADD CONSTRAINT "meeting_presentations_user_id_meeting_id_fkey" FOREIGN KEY ("user_id", "meeting_id") REFERENCES "meeting_participations"("userId", "meetingId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "newsletter_items" ADD CONSTRAINT "newsletter_items_newsletterId_fkey" FOREIGN KEY ("newsletterId") REFERENCES "newsletters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_parentCommentId_fkey" FOREIGN KEY ("parentCommentId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_likes" ADD CONSTRAINT "comment_likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_likes" ADD CONSTRAINT "comment_likes_newsletterCommentId_fkey" FOREIGN KEY ("newsletterCommentId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_user_keywords" ADD CONSTRAINT "_user_keywords_A_fkey" FOREIGN KEY ("A") REFERENCES "keywords"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_user_keywords" ADD CONSTRAINT "_user_keywords_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_subcategory_fk" ADD CONSTRAINT "_subcategory_fk_A_fkey" FOREIGN KEY ("A") REFERENCES "blogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_subcategory_fk" ADD CONSTRAINT "_subcategory_fk_B_fkey" FOREIGN KEY ("B") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
