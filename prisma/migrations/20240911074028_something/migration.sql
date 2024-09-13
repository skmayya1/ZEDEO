/*
  Warnings:

  - You are about to drop the column `editor` on the `Video` table. All the data in the column will be lost.
  - Added the required column `creatorId` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `editorId` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_videoId_fkey";

-- AlterTable
ALTER TABLE "Video" DROP COLUMN "editor",
ADD COLUMN     "creatorId" TEXT NOT NULL,
ADD COLUMN     "editorId" TEXT NOT NULL;
