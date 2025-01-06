import Layout from "@/components/Dashboard/Layout";
import NewSubjectCard from "@/components/Dashboard/subject/card/newSubjectCard";

export default function NewSubjectPage() {
    return (
        <>
            <Layout>
                <div className="pt-20 px-5">
                    <NewSubjectCard />
                </div>
            </Layout>
        </>
    )
}