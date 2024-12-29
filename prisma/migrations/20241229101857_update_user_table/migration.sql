/*
  Warnings:

  - You are about to drop the column `grade_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `rank_id` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "grade_id",
DROP COLUMN "rank_id";
