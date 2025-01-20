import Layout from "@/components/Dashboard/Layout";
import { FaBook, FaClipboard, FaLayerGroup } from "react-icons/fa6";
import ReportCard from "../../../components/Dashboard/exam/report/ReportCard";
import LastExamTest from "@/components/Dashboard/exam/report/LastExamTest";

export default function ExamReport() {
    return (
        <>
            <Layout>
                <div className="pt-20 px-5">
                    <ReportCard />
                    <LastExamTest />
                </div>
            </Layout>
        </>
    )
}