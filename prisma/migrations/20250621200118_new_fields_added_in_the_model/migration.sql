/*
  Warnings:

  - Added the required column `doiLink` to the `academic_publications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `editionNumber` to the `academic_publications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `journalName` to the `academic_publications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pageInterval` to the `academic_publications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `volume` to the `academic_publications` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Category_categoryType_key";

-- AlterTable
ALTER TABLE "academic_publications" ADD COLUMN     "doiLink" TEXT NOT NULL,
ADD COLUMN     "editionNumber" TEXT NOT NULL,
ADD COLUMN     "journalName" TEXT NOT NULL,
ADD COLUMN     "pageInterval" TEXT NOT NULL,
ADD COLUMN     "volume" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "enrolled_course" ALTER COLUMN "startGraduationDate" SET DATA TYPE TEXT,
ALTER COLUMN "expectedGraduationDate" SET DATA TYPE TEXT;
