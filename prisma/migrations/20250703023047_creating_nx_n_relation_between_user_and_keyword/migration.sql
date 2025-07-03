/*
  Warnings:

  - You are about to drop the column `userId` on the `keyword` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[value]` on the table `keyword` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_authorId_fkey";

-- DropForeignKey
ALTER TABLE "keyword" DROP CONSTRAINT "keyword_userId_fkey";

-- AlterTable
ALTER TABLE "Blog" ALTER COLUMN "authorId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "keyword" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "user_keyword" (
    "userId" TEXT NOT NULL,
    "keywordId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_keyword_userId_keywordId_key" ON "user_keyword"("userId", "keywordId");

-- CreateIndex
CREATE UNIQUE INDEX "keyword_value_key" ON "keyword"("value");

-- AddForeignKey
ALTER TABLE "user_keyword" ADD CONSTRAINT "user_keyword_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_keyword" ADD CONSTRAINT "user_keyword_keywordId_fkey" FOREIGN KEY ("keywordId") REFERENCES "keyword"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
