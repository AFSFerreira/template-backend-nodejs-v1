/*
  Warnings:

  - You are about to drop the `user_keyword` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_keyword" DROP CONSTRAINT "user_keyword_keywordId_fkey";

-- DropForeignKey
ALTER TABLE "user_keyword" DROP CONSTRAINT "user_keyword_userId_fkey";

-- DropTable
DROP TABLE "user_keyword";

-- CreateTable
CREATE TABLE "_KeywordToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_KeywordToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_KeywordToUser_B_index" ON "_KeywordToUser"("B");

-- AddForeignKey
ALTER TABLE "_KeywordToUser" ADD CONSTRAINT "_KeywordToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "keyword"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KeywordToUser" ADD CONSTRAINT "_KeywordToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
