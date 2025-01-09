import NewExerciseCard from "@/components/Dashboard/exercise/card/newExerciseCard";
import GradeSelect from "@/components/Dashboard/exercise/select/gradeSelected";
import SubjectSelect from "@/components/Dashboard/exercise/select/subjectSelect";
import Layout from "@/components/Dashboard/Layout";
import { Input } from "@nextui-org/react";
import Link from "next/link";

export default function NewExercisePage() {
    return (
        <>
            <Layout>
                <div className="h-screen flex items-center justify-center">
                    <NewExerciseCard />
                </div>
            </Layout>
        </>
    )
}