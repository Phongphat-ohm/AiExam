-- AddForeignKey
ALTER TABLE "ExamSet" ADD CONSTRAINT "ExamSet_grade_id_fkey" FOREIGN KEY ("grade_id") REFERENCES "Grade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
