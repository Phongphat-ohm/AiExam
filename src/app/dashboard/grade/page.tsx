import GradesTbl from "@/components/Dashboard/Grade/Table/Grades";
import Layout from "@/components/Dashboard/Layout";
import Link from "next/link";

export default function GradesPage() {
    return (
        <>
            <Layout>
                <div className="pt-20 px-5">
                    <div className="flex gap-2">
                        <Link href={"/dashboard/grade/new"} className="btn btn-success text-white font-normal">
                            เพิ่มระดับชั้น
                        </Link>
                    </div>
                    <GradesTbl />
                </div>
            </Layout>
        </>
    )
}