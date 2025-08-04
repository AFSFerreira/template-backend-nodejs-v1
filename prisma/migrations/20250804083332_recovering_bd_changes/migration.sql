/*
  Warnings:

  - A unique constraint covering the columns `[public_id]` on the table `blogs` will be added. If there are existing duplicate values, this will fail.
  - The required column `public_id` was added to the `blogs` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- CreateEnum
CREATE TYPE "PresentationType" AS ENUM ('ORAL', 'POSTER');

-- AlterTable
ALTER TABLE "blogs" ADD COLUMN     "public_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "meeting_participations" (
    "userId" INTEGER NOT NULL,
    "meetingId" INTEGER NOT NULL,
    "attended" BOOLEAN,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "meeting_participations_pkey" PRIMARY KEY ("userId","meetingId")
);

-- CreateTable
CREATE TABLE "meeting_presentations" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "presentationType" "PresentationType" NOT NULL,
    "authors" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "affiliations" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    "meeting_id" INTEGER NOT NULL,

    CONSTRAINT "meeting_presentations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meetings" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "meetings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "meeting_presentations_public_id_key" ON "meeting_presentations"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "meeting_presentations_user_id_meeting_id_key" ON "meeting_presentations"("user_id", "meeting_id");

-- CreateIndex
CREATE UNIQUE INDEX "meetings_public_id_key" ON "meetings"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "blogs_public_id_key" ON "blogs"("public_id");

-- AddForeignKey
ALTER TABLE "meeting_presentations" ADD CONSTRAINT "meeting_presentations_user_id_meeting_id_fkey" FOREIGN KEY ("user_id", "meeting_id") REFERENCES "meeting_participations"("userId", "meetingId") ON DELETE CASCADE ON UPDATE CASCADE;
