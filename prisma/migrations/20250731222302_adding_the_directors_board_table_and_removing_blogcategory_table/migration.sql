/*
  Warnings:

  - You are about to drop the `BlogCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BlogCategory" DROP CONSTRAINT "BlogCategory_blogId_fkey";

-- DropForeignKey
ALTER TABLE "BlogCategory" DROP CONSTRAINT "BlogCategory_categoryId_fkey";

-- DropTable
DROP TABLE "BlogCategory";

-- CreateTable
CREATE TABLE "directors_board" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "director_board_profile_image" TEXT NOT NULL,
    "about_me" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "directors_board_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_subcategory_fk" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_subcategory_fk_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "directors_board_public_id_key" ON "directors_board"("public_id");

-- CreateIndex
CREATE INDEX "_subcategory_fk_B_index" ON "_subcategory_fk"("B");

-- AddForeignKey
ALTER TABLE "directors_board" ADD CONSTRAINT "directors_board_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_subcategory_fk" ADD CONSTRAINT "_subcategory_fk_A_fkey" FOREIGN KEY ("A") REFERENCES "blogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_subcategory_fk" ADD CONSTRAINT "_subcategory_fk_B_fkey" FOREIGN KEY ("B") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
