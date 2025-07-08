/*
  Warnings:

  - You are about to drop the `addresses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `areas_of_activities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `blogs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `enrolled_courses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `keywords` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BlogCategory" DROP CONSTRAINT "BlogCategory_blogId_fkey";

-- DropForeignKey
ALTER TABLE "BlogCategory" DROP CONSTRAINT "BlogCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "_KeywordToUser" DROP CONSTRAINT "_KeywordToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_KeywordToUser" DROP CONSTRAINT "_KeywordToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "academic_publications" DROP CONSTRAINT "academic_publications_userId_fkey";

-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_userId_fkey";

-- DropForeignKey
ALTER TABLE "authentication_audits" DROP CONSTRAINT "authentication_audits_userId_fkey";

-- DropForeignKey
ALTER TABLE "blogs" DROP CONSTRAINT "blogs_authorId_fkey";

-- DropForeignKey
ALTER TABLE "blogs" DROP CONSTRAINT "blogs_mainCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "enrolled_courses" DROP CONSTRAINT "enrolled_courses_userId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_activityAreaId_fkey";

-- DropTable
DROP TABLE "addresses";

-- DropTable
DROP TABLE "areas_of_activities";

-- DropTable
DROP TABLE "blogs";

-- DropTable
DROP TABLE "categories";

-- DropTable
DROP TABLE "enrolled_courses";

-- DropTable
DROP TABLE "keywords";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "profileImagePath" TEXT NOT NULL,
    "lattesCVLink" TEXT,
    "profileGSLink" TEXT,
    "profileRIDLink" TEXT,
    "orcidNumber" TEXT,
    "membershipStatus" "MEMBERSHIP_STATUS" NOT NULL DEFAULT 'PENDING',
    "userRole" "USER_ROLE" NOT NULL DEFAULT 'NORMAL_USER',
    "institutionName" TEXT NOT NULL,
    "departmentName" TEXT,
    "institutionComplement" TEXT,
    "occupation" "OCCUPATION" NOT NULL,
    "educationLevel" "EDUCATION_LEVEL" NOT NULL,
    "identityType" "IDENTITY_TYPE" NOT NULL,
    "identityDocument" TEXT NOT NULL,
    "emailIsPublic" BOOLEAN NOT NULL,
    "astrobiologyOrRelatedStartYear" INTEGER NOT NULL,
    "interestDescription" TEXT NOT NULL,
    "receiveReports" BOOLEAN NOT NULL,
    "publicInformation" TEXT NOT NULL,
    "specificActivity" TEXT NOT NULL,
    "specificActivityDescription" TEXT,
    "email" TEXT NOT NULL,
    "passwordDigest" TEXT NOT NULL,
    "loginAttempts" INTEGER NOT NULL DEFAULT 0,
    "lastLogin" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "activityAreaId" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "address" (
    "id" TEXT NOT NULL,
    "houseNumber" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enrolled_course" (
    "id" TEXT NOT NULL,
    "courseName" TEXT,
    "startGraduationDate" TIMESTAMP(3),
    "expectedGraduationDate" TIMESTAMP(3),
    "supervisorName" TEXT,
    "scholarshipHolder" BOOLEAN NOT NULL,
    "sponsoringOrganization" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "enrolled_course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "area_of_activity" (
    "id" TEXT NOT NULL,
    "mainAreaActivity" TEXT NOT NULL,

    CONSTRAINT "area_of_activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "keyword" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "keyword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL,
    "categoryType" "CATEGORY_TYPE" NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog" (
    "id" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "pageContent" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "mainCategoryId" TEXT NOT NULL,
    "authorId" TEXT,

    CONSTRAINT "blog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "address_userId_key" ON "address"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "enrolled_course_userId_key" ON "enrolled_course"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "area_of_activity_mainAreaActivity_key" ON "area_of_activity"("mainAreaActivity");

-- CreateIndex
CREATE UNIQUE INDEX "keyword_value_key" ON "keyword"("value");

-- CreateIndex
CREATE UNIQUE INDEX "category_categoryName_key" ON "category"("categoryName");

-- AddForeignKey
ALTER TABLE "authentication_audits" ADD CONSTRAINT "authentication_audits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_activityAreaId_fkey" FOREIGN KEY ("activityAreaId") REFERENCES "area_of_activity"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrolled_course" ADD CONSTRAINT "enrolled_course_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academic_publications" ADD CONSTRAINT "academic_publications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogCategory" ADD CONSTRAINT "BlogCategory_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogCategory" ADD CONSTRAINT "BlogCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog" ADD CONSTRAINT "blog_mainCategoryId_fkey" FOREIGN KEY ("mainCategoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog" ADD CONSTRAINT "blog_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KeywordToUser" ADD CONSTRAINT "_KeywordToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "keyword"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KeywordToUser" ADD CONSTRAINT "_KeywordToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
