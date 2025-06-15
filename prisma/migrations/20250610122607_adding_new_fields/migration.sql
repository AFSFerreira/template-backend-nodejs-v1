/*
  Warnings:

  - You are about to drop the column `author` on the `academic_publications` table. All the data in the column will be lost.
  - You are about to drop the column `mainActivity` on the `area_of_activity` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `identity_document` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[mainAreaActivity]` on the table `area_of_activity` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[activity]` on the table `area_of_activity` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authors` to the `academic_publications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `activity` to the `area_of_activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mainAreaActivity` to the `area_of_activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identityDocument` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identityType` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicInformation` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "IDENTITY_TYPE" AS ENUM ('CPF', 'RNE');

-- DropForeignKey
ALTER TABLE "identity_document" DROP CONSTRAINT "identity_document_userId_fkey";

-- DropIndex
DROP INDEX "area_of_activity_mainActivity_key";

-- AlterTable
ALTER TABLE "academic_publications" DROP COLUMN "author",
ADD COLUMN     "authors" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "area_of_activity" DROP COLUMN "mainActivity",
ADD COLUMN     "activity" TEXT NOT NULL,
ADD COLUMN     "mainAreaActivity" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "name",
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "identityDocument" TEXT NOT NULL,
ADD COLUMN     "identityType" "IDENTITY_TYPE" NOT NULL,
ADD COLUMN     "passport" TEXT,
ADD COLUMN     "publicInformation" TEXT NOT NULL;

-- DropTable
DROP TABLE "identity_document";

-- CreateIndex
CREATE UNIQUE INDEX "area_of_activity_mainAreaActivity_key" ON "area_of_activity"("mainAreaActivity");

-- CreateIndex
CREATE UNIQUE INDEX "area_of_activity_activity_key" ON "area_of_activity"("activity");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
