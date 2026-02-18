/*
  Warnings:

  - A unique constraint covering the columns `[identity_type,identity_document_blind_index]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `identity_document_blind_index` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "users_identity_type_identity_document_encrypted_key";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "identity_document_blind_index" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_identity_type_identity_document_blind_index_key" ON "users"("identity_type", "identity_document_blind_index");
