-- CreateTable
CREATE TABLE "slider_images" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "slider_images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "slider_images_filename_key" ON "slider_images"("filename");
