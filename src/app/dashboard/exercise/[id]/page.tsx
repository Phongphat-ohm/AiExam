import EditExerciseMainContent from "@/components/Dashboard/exercise/edit/MainContent";
import Layout from "@/components/Dashboard/Layout";


export default function EditExercise() {
    return (
        <>
            <Layout>
                <div className="pt-20 px-3">
                    <EditExerciseMainContent />
                </div>
            </Layout>
        </>
    )
}