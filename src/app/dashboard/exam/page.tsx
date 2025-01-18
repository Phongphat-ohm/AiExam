import Layout from "@/components/Dashboard/Layout";
import { FaBook, FaClipboard, FaLayerGroup } from "react-icons/fa6";

export default function ExamReport() {
    return (
        <>
            <Layout>
                <div className="pt-20 px-5">
                    <div className="grid grid-cols-3 gap-3">
                        <div className="card bg-white shadow">
                            <div className="card-body p-4">
                                <div className="stats">
                                    <div className="stat">
                                        <div className="stat-figure text-success">
                                            <FaLayerGroup className="text-5xl" />
                                        </div>
                                        <div className="stat-title">ชุดข้อสอบทั้งหมด</div>
                                        <div className="stat-value text-success">25.6K</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card bg-white shadow">
                            <div className="card-body p-4">
                                <div className="stats">
                                    <div className="stat">
                                        <div className="stat-figure text-primary">
                                            <FaClipboard className="text-5xl" />
                                        </div>
                                        <div className="stat-title">ข้อสอบทั้งหมด</div>
                                        <div className="stat-value text-primary">25.6K</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card bg-white shadow">
                            <div className="card-body p-4">
                                <div className="stats">
                                    <div className="stat">
                                        <div className="stat-figure text-error">
                                            <FaBook className="text-5xl" />
                                        </div>
                                        <div className="stat-title">ประวัติการทำข้อสอบทั้งหมด</div>
                                        <div className="stat-value text-error">25.6K</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}