"use client";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// ลงทะเบียน Components และ Scales
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function CardStat() {
    return (
        <>
            <div className="grid grid-cols-3 gap-10">
                {/* การ์ดสำหรับข้อมูลผู้ใช้ทั้งหมด */}
                <div className="card bg-white shadow">
                    <div className="card-body p-3">
                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <div className="avatar">
                                    <div className="w-24">
                                        <img src="/images/icon/team.png" alt="Team Icon" />
                                    </div>
                                </div>
                            </div>
                            <div className="stat-title">ผู้ใช้ทั้งหมด</div>
                            <div className="stat-value text-5xl">0 คน</div>
                            <div className="stat-desc"></div>
                        </div>
                    </div>
                </div>

                {/* การ์ดสำหรับกราฟ */}
                <div className="card bg-white shadow">
                    <div className="card-body p-3">
                        <Line
                            datasetIdKey="id"
                            data={{
                                labels: ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"],
                                datasets: [
                                    {
                                        label: "Dataset 1",
                                        data: [0],
                                    },
                                    {
                                        label: "Dataset 2",
                                        data: [0],
                                    },
                                ],
                            }}
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: {
                                        display: true,
                                        position: "top",
                                    },
                                    title: {
                                        display: true,
                                        text: "Example Line Chart",
                                    },
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
