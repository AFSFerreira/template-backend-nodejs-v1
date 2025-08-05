/*
  Warnings:

  - You are about to drop the column `html_content` on the `blogs` table. All the data in the column will be lost.
  - Added the required column `content` to the `blogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "blogs" DROP COLUMN "html_content",
ADD COLUMN     "content" TEXT NOT NULL;
