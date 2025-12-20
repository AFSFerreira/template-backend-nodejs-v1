/*
  Warnings:

  - You are about to drop the `carousel_banners` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "slider_images" ADD COLUMN     "link" TEXT,
ALTER COLUMN "order" DROP NOT NULL;

-- DropTable
DROP TABLE "carousel_banners";
