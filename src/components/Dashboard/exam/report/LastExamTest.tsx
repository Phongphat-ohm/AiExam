"use client";
import { useState } from "react";
import Marquee from "react-fast-marquee";
import { FaSpinner } from "react-icons/fa6";

export default function LastExamTest() {
    const [lastLoad, setLastLoad] = useState(new Date(Date.now()).toLocaleString("th-TH", {
        year: "2-digit",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }).replace(/,/g, ""));

    return (
        <>
            <div className="pt-10">
                <div className="flex gap-3 items-end">
                    <h1 className="text-2xl">
                        ผู้ใช้ที่ทดสอบล่าสุด
                    </h1>
                    <label className="text-blue-500 flex gap-2 items-center"><FaSpinner /> ดึงข้อมูลล่าสุดเมื่อ: {lastLoad}</label>
                </div>
                <div className="card bg-white shadow mt-2">
                    <div className="card-body">
                        <Marquee gradient pauseOnHover autoFill >
                            <div className="card m-2 border bg-white mx-5">
                                <div className="card-body p-3">
                                    <div className="flex gap-3">
                                        <img src="https://placehold.co/300" className="w-24 h-24 rounded-lg" alt="" />
                                        <div className="flex flex-col justify-between">
                                            <h1 className="text-3xl">
                                                พงษ์ภัทร
                                            </h1>
                                            <label className="text-yellow-500">จำนวนข้อ: 0 ข้อ</label>
                                            <label className="text-green-500">คะแนนที่ได้: 0 คะแนน</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Marquee>
                    </div>
                </div>
            </div>
        </>
    )
}