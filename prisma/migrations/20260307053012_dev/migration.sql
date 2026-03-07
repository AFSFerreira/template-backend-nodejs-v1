/*
  Warnings:

  - Added the required column `newsletter_template_id` to the `newsletters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "newsletters" ADD COLUMN     "newsletter_template_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "newsletter_templates" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "newsletter_templates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "newsletter_templates_public_id_key" ON "newsletter_templates"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "newsletter_templates_name_key" ON "newsletter_templates"("name");

-- AddForeignKey
ALTER TABLE "newsletters" ADD CONSTRAINT "newsletters_newsletter_template_id_fkey" FOREIGN KEY ("newsletter_template_id") REFERENCES "newsletter_templates"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
