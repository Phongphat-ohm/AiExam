/*
  Warnings:

  - Added the required column `exam_id` to the `ExamData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExamData" ADD COLUMN     "exam_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ExamData" ADD CONSTRAINT "ExamData_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
