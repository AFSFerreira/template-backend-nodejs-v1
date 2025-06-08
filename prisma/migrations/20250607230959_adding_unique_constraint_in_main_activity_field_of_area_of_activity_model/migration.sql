/*
  Warnings:

  - A unique constraint covering the columns `[mainActivity]` on the table `area_of_activity` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "area_of_activity_mainActivity_key" ON "area_of_activity"("mainActivity");
