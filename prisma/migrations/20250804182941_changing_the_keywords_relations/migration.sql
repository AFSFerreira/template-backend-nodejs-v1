/*
  Warnings:

  - You are about to drop the `_KeywordToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `areas_of_activity` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[type,value]` on the table `keywords` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `keywords` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "KeywordType" AS ENUM ('AREA_OF_ACTIVITY', 'SUB_AREA_OF_ACTIVITY', 'USER_INTEREST');

-- AlterEnum
ALTER TYPE "MembershipStatus" ADD VALUE 'INACTIVE';

-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'BLOGGER';

-- DropForeignKey
ALTER TABLE "_KeywordToUser" DROP CONSTRAINT "_KeywordToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_KeywordToUser" DROP CONSTRAINT "_KeywordToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_activity_area_id_fkey";

-- DropIndex
DROP INDEX "keywords_value_key";

-- AlterTable
ALTER TABLE "keywords" ADD COLUMN     "type" "KeywordType" NOT NULL;

-- DropTable
DROP TABLE "_KeywordToUser";

-- DropTable
DROP TABLE "areas_of_activity";

-- CreateTable
CREATE TABLE "_user_keywords" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_user_keywords_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_user_keywords_B_index" ON "_user_keywords"("B");

-- CreateIndex
CREATE INDEX "keywords_value_idx" ON "keywords"("value");

-- CreateIndex
CREATE INDEX "keywords_type_idx" ON "keywords"("type");

-- CreateIndex
CREATE UNIQUE INDEX "keywords_type_value_key" ON "keywords"("type", "value");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_activity_area_id_fkey" FOREIGN KEY ("activity_area_id") REFERENCES "keywords"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_user_keywords" ADD CONSTRAINT "_user_keywords_A_fkey" FOREIGN KEY ("A") REFERENCES "keywords"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_user_keywords" ADD CONSTRAINT "_user_keywords_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
