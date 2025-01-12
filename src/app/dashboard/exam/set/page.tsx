import MainTable from "@/components/Dashboard/exam/set/tbl/MainTbl";
import Layout from "@/components/Dashboard/Layout";

export default function ExamSetPage() {
    return (
        <>
            <Layout>
                <div className="pt-20 px-5">
                    <MainTable />
                </div>
            </Layout>
        </>
    )
}