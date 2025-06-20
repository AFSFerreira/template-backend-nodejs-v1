/*
  Warnings:

  - You are about to drop the column `address` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `cpf` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `curriculumPath` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `departmentRoleId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `universityName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `department_role` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `houseNumber` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `activityAreaId` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `astrobiologyOrRelatedStartYear` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `educationLevel` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `institutionName` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interestDescription` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `occupation` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicEmail` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiveReports` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OCCUPATION" AS ENUM ('RESEARCHER', 'PROFESSOR', 'STUDENT', 'POSTGRADUATE', 'MASTER', 'DOCTORATE');

-- CreateEnum
CREATE TYPE "EDUCATION_LEVEL" AS ENUM ('ELEMENTARY_SCHOOL', 'HIGH_SCHOOL', 'UNDERGRADUATE_STUDENT', 'BACHELOR', 'MASTER_STUDENT', 'MASTER', 'DOCTORATE_STUDENT', 'DOCTORATE', 'POSTDOCTORAL_STUDENT', 'POSTDOCTORATE', 'OTHER');

-- CreateEnum
CREATE TYPE "MEMBERSHIP_STATUS" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "CATEGORY_TYPE" AS ENUM ('MAIN_CATEGORY', 'SUBCATEGORY');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_departmentRoleId_fkey";

-- DropIndex
DROP INDEX "users_cpf_key";

-- AlterTable
ALTER TABLE "address" DROP COLUMN "address",
ADD COLUMN     "houseNumber" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "address",
DROP COLUMN "cpf",
DROP COLUMN "curriculumPath",
DROP COLUMN "departmentRoleId",
DROP COLUMN "role",
DROP COLUMN "universityName",
ADD COLUMN     "activityAreaId" TEXT NOT NULL,
ADD COLUMN     "astrobiologyOrRelatedStartYear" INTEGER NOT NULL,
ADD COLUMN     "educationLevel" "EDUCATION_LEVEL" NOT NULL,
ADD COLUMN     "institutionName" TEXT NOT NULL,
ADD COLUMN     "interestDescription" TEXT NOT NULL,
ADD COLUMN     "lattesCVLink" TEXT,
ADD COLUMN     "membershipStatus" "MEMBERSHIP_STATUS" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "occupation" "OCCUPATION" NOT NULL,
ADD COLUMN     "orcidNumber" TEXT,
ADD COLUMN     "profileGSLink" TEXT,
ADD COLUMN     "profileRIDLink" TEXT,
ADD COLUMN     "publicEmail" BOOLEAN NOT NULL,
ADD COLUMN     "receiveReports" BOOLEAN NOT NULL,
ADD COLUMN     "userRole" "USER_ROLE" NOT NULL DEFAULT 'NORMAL_USER',
ALTER COLUMN "departmentName" DROP NOT NULL,
ALTER COLUMN "institutionComplement" DROP NOT NULL;

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "department_role";

-- CreateTable
CREATE TABLE "identity_document" (
    "id" TEXT NOT NULL,
    "cpf" TEXT,
    "rne" TEXT,
    "passport" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "identity_document_pkey" PRIMARY KEY ("id")
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
    "role" TEXT NOT NULL,
    "mainActivity" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "area_of_activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "academic_publications" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "publicationDate" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "academic_publications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "keyword" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "keyword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL,
    "categoryType" "CATEGORY_TYPE" NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogCategory" (
    "blogId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "BlogCategory_pkey" PRIMARY KEY ("blogId","categoryId")
);

-- CreateTable
CREATE TABLE "Blog" (
    "id" TEXT NOT NULL,
    "pageContent" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "mainCategoryId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "identity_document_cpf_key" ON "identity_document"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "identity_document_rne_key" ON "identity_document"("rne");

-- CreateIndex
CREATE UNIQUE INDEX "identity_document_passport_key" ON "identity_document"("passport");

-- CreateIndex
CREATE UNIQUE INDEX "identity_document_userId_key" ON "identity_document"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "enrolled_course_userId_key" ON "enrolled_course"("userId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_activityAreaId_fkey" FOREIGN KEY ("activityAreaId") REFERENCES "area_of_activity"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "identity_document" ADD CONSTRAINT "identity_document_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrolled_course" ADD CONSTRAINT "enrolled_course_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academic_publications" ADD CONSTRAINT "academic_publications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "keyword" ADD CONSTRAINT "keyword_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogCategory" ADD CONSTRAINT "BlogCategory_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogCategory" ADD CONSTRAINT "BlogCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_mainCategoryId_fkey" FOREIGN KEY ("mainCategoryId") REFERENCES "Category"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
