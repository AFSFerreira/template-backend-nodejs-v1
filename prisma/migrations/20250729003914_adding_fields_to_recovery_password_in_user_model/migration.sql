/*
  Warnings:

  - A unique constraint covering the columns `[recovery_password_token]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'MANAGER';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "recovery_password_token" TEXT,
ADD COLUMN     "recovery_password_token_expires_at" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "users_recovery_password_token_key" ON "users"("recovery_password_token");
