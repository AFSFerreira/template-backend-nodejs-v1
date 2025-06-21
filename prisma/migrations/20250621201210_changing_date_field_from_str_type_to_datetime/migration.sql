/*
  Warnings:

  - The `startGraduationDate` column on the `enrolled_course` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `expectedGraduationDate` column on the `enrolled_course` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "enrolled_course" DROP COLUMN "startGraduationDate",
ADD COLUMN     "startGraduationDate" TIMESTAMP(3),
DROP COLUMN "expectedGraduationDate",
ADD COLUMN     "expectedGraduationDate" TIMESTAMP(3);
