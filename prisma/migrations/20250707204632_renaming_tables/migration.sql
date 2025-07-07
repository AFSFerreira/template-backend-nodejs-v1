/*
  Warnings:

  - You are about to drop the `Blog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `area_of_activity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `authentication_audit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `enrolled_course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `keyword` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_mainCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "BlogCategory" DROP CONSTRAINT "BlogCategory_blogId_fkey";

-- DropForeignKey
ALTER TABLE "BlogCategory" DROP CONSTRAINT "BlogCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "_KeywordToUser" DROP CONSTRAINT "_KeywordToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_userId_fkey";

-- DropForeignKey
ALTER TABLE "authentication_audit" DROP CONSTRAINT "authentication_audit_userId_fkey";

-- DropForeignKey
ALTER TABLE "enrolled_course" DROP CONSTRAINT "enrolled_course_userId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_activityAreaId_fkey";

-- DropIndex
DROP INDEX "users_id_idx";

-- DropTable
DROP TABLE "Blog";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "address";

-- DropTable
DROP TABLE "area_of_activity";

-- DropTable
DROP TABLE "authentication_audit";

-- DropTable
DROP TABLE "enrolled_course";

-- DropTable
DROP TABLE "keyword";

-- CreateTable
CREATE TABLE "authentication_audits" (
    "id" SERIAL NOT NULL,
    "ipAddress" TEXT,
    "remotePort" TEXT,
    "browser" TEXT,
    "status" "AUTHENTICATION_STATUS" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,

    CONSTRAINT "authentication_audits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL,
    "houseNumber" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enrolled_courses" (
    "id" TEXT NOT NULL,
    "courseName" TEXT,
    "startGraduationDate" TIMESTAMP(3),
    "expectedGraduationDate" TIMESTAMP(3),
    "supervisorName" TEXT,
    "scholarshipHolder" BOOLEAN NOT NULL,
    "sponsoringOrganization" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "enrolled_courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "areas_of_activities" (
    "id" TEXT NOT NULL,
    "mainAreaActivity" TEXT NOT NULL,

    CONSTRAINT "areas_of_activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "keywords" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "keywords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL,
    "categoryType" "CATEGORY_TYPE" NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blogs" (
    "id" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "pageContent" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "mainCategoryId" TEXT NOT NULL,
    "authorId" TEXT,

    CONSTRAINT "blogs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "addresses_userId_key" ON "addresses"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "enrolled_courses_userId_key" ON "enrolled_courses"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "areas_of_activities_mainAreaActivity_key" ON "areas_of_activities"("mainAreaActivity");

-- CreateIndex
CREATE UNIQUE INDEX "keywords_value_key" ON "keywords"("value");

-- CreateIndex
CREATE UNIQUE INDEX "categories_categoryName_key" ON "categories"("categoryName");

-- AddForeignKey
ALTER TABLE "authentication_audits" ADD CONSTRAINT "authentication_audits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_activityAreaId_fkey" FOREIGN KEY ("activityAreaId") REFERENCES "areas_of_activities"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrolled_courses" ADD CONSTRAINT "enrolled_courses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogCategory" ADD CONSTRAINT "BlogCategory_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "blogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogCategory" ADD CONSTRAINT "BlogCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_mainCategoryId_fkey" FOREIGN KEY ("mainCategoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KeywordToUser" ADD CONSTRAINT "_KeywordToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "keywords"("id") ON DELETE CASCADE ON UPDATE CASCADE;
