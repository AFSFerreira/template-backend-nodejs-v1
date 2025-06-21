/*
  Warnings:

  - You are about to drop the column `cityName` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `countryName` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `stateName` on the `address` table. All the data in the column will be lost.
  - Added the required column `city` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neighborhood` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "address" DROP COLUMN "cityName",
DROP COLUMN "countryName",
DROP COLUMN "stateName",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "neighborhood" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;
