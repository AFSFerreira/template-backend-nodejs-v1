/*
  Warnings:

  - You are about to drop the column `country` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `addresses` table. All the data in the column will be lost.
  - Added the required column `state_id` to the `addresses` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "addresses_state_idx";

-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "country",
DROP COLUMN "state",
ADD COLUMN     "state_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "address_states" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "country_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "address_states_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "address_countries" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "address_countries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "address_states_name_country_id_key" ON "address_states"("name", "country_id");

-- CreateIndex
CREATE UNIQUE INDEX "address_countries_name_key" ON "address_countries"("name");

-- CreateIndex
CREATE INDEX "address_countries_name_idx" ON "address_countries"("name");

-- CreateIndex
CREATE INDEX "addresses_state_id_idx" ON "addresses"("state_id");

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "address_states"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address_states" ADD CONSTRAINT "address_states_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "address_countries"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
