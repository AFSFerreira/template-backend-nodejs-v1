/*
  Warnings:

  - You are about to drop the column `activity` on the `area_of_activity` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `area_of_activity` table. All the data in the column will be lost.
  - You are about to drop the column `publicEmail` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[categoryType]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authorName` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postalCode` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emailIsPublic` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specificActivity` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "IDENTITY_TYPE" ADD VALUE 'PASSPORT';

-- DropIndex
DROP INDEX "area_of_activity_activity_key";

-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "authorName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "address" ADD COLUMN     "postalCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "area_of_activity" DROP COLUMN "activity",
DROP COLUMN "description";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "publicEmail",
ADD COLUMN     "emailIsPublic" BOOLEAN NOT NULL,
ADD COLUMN     "specificActivity" TEXT NOT NULL,
ADD COLUMN     "specificActivityDescription" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Category_categoryType_key" ON "Category"("categoryType");
