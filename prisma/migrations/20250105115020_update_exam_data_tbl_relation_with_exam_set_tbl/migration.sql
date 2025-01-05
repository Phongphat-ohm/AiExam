-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_exam_set_id_fkey" FOREIGN KEY ("exam_set_id") REFERENCES "ExamSet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
