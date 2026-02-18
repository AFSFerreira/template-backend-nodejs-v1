/*
  Warnings:

  - You are about to drop the column `identity_document_hash` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[identity_type,identity_document_encrypted]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `identity_document_encrypted` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "users_identity_type_identity_document_hash_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "identity_document_hash",
ADD COLUMN     "identity_document_encrypted" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_identity_type_identity_document_encrypted_key" ON "users"("identity_type", "identity_document_encrypted");
