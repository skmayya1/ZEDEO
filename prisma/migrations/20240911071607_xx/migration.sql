/*
  Warnings:

  - Added the required column `editor` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_videoUrl_fkey";

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "editor" TEXT NOT NULL;
