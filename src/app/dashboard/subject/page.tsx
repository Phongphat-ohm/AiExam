import Layout from "@/components/Dashboard/Layout";
import SubjectTbl from "@/components/Dashboard/subject/table/SubjectTbl";

export default function Page() {
    return (
        <Layout>
            <div className="pt-20 px-5">
                <SubjectTbl />
            </div>
        </Layout>
    )
}