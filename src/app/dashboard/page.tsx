import Layout from "@/components/Dashboard/Layout";

export default function Dashboard() {
    return (
        <>
            <Layout >
                <div className="h-screen flex flex-col items-center justify-center">
                    <div className="text-gray-500 flex flex-col items-center">
                        <h1 className="text-2xl">
                            ยินดีต้อนรับสู่ E-Xammy Dashboard
                        </h1>
                        <label>dashboard สำหรับจัดการเว็บไซตืติวข้อสอบออนใลน์</label>
                    </div>
                </div>
            </Layout >
        </>
    )
}