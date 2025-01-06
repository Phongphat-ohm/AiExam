/*
  Warnings:

  - Added the required column `grade_id` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "grade_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_grade_id_fkey" FOREIGN KEY ("grade_id") REFERENCES "Grade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
