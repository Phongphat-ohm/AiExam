import ExerciseTbl from "@/components/Dashboard/exercise/tbl/mainTbl";
import Layout from "@/components/Dashboard/Layout";

export default function ExercisePage() {
    return (
        <>
            <Layout>
                <div className="pt-20 px-5">
                    <ExerciseTbl />
                </div>
            </Layout>
        </>
    )
}