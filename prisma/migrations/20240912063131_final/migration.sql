/*
  Warnings:

  - Added the required column `editorName` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `deadline` on the `Video` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pending', 'completed', 'delivered', 'uploaded');

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "editorName" TEXT NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'pending',
DROP COLUMN "deadline",
ADD COLUMN     "deadline" TIMESTAMP(3) NOT NULL;
