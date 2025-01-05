-- AddForeignKey
ALTER TABLE "ExamSet" ADD CONSTRAINT "ExamSet_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
