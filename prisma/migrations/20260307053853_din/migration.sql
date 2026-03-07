/*
  Warnings:

  - You are about to drop the column `path` on the `newsletter_templates` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[templateFolder]` on the table `newsletter_templates` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `templateFolder` to the `newsletter_templates` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "newsletter_templates_path_key";

-- AlterTable
ALTER TABLE "newsletter_templates" DROP COLUMN "path",
ADD COLUMN     "templateFolder" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "newsletter_templates_templateFolder_key" ON "newsletter_templates"("templateFolder");
