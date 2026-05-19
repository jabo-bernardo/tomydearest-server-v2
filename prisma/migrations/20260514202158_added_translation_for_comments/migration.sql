/*
  Warnings:

  - A unique constraint covering the columns `[submissionId,language]` on the table `Translation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[commentId,language]` on the table `Translation` will be added. If there are existing duplicate values, this will fail.
  - Made the column `language` on table `Translation` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Translation" DROP CONSTRAINT "Translation_submissionId_fkey";

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "language" TEXT;

-- AlterTable
ALTER TABLE "Translation" ADD COLUMN     "commentId" TEXT,
ALTER COLUMN "submissionId" DROP NOT NULL,
ALTER COLUMN "language" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Translation_submissionId_language_key" ON "Translation"("submissionId", "language");

-- CreateIndex
CREATE UNIQUE INDEX "Translation_commentId_language_key" ON "Translation"("commentId", "language");

-- AddForeignKey
ALTER TABLE "Translation" ADD CONSTRAINT "Translation_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "Submission"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Translation" ADD CONSTRAINT "Translation_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
