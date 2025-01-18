"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowRightFromBracket, FaBook, FaBookOpen, FaClipboard, FaClipboardCheck, FaGauge, FaRankingStar, FaUsers, FaWaterLadder } from "react-icons/fa6";

export default function Sidebar() {
    const [path, setPath] = useState("");

    const route = [
        {
            href: "/dashboard",
            name: "แดชบอร์ด",
            icon: <FaGauge />
        },
        {
            href: "/dashboard/user",
            name: "สมาชิก",
            icon: <FaUsers />
        },
        {
            href: "/dashboard/grade",
            name: "ระดับชั้น",
            icon: <FaWaterLadder />
        },
        {
            href: "/dashboard/subject",
            name: "วิชา",
            icon: <FaBook />
        },
        {
            href: "/dashboard/exercise",
            name: "สาระการเรียนรู้",
            icon: <FaBookOpen />
        },
        {
            href: "/dashboard/exam",
            name: "รายงานข้อสอบ",
            icon: <FaClipboardCheck />
        },
        {
            href: "/dashboard/exam/set",
            name: "ชุดข้อสอบ",
            icon: <FaClipboard />
        },
        {
            href: "/dashboard/rank",
            name: "จัดการแรงค์",
            icon: <FaRankingStar />
        }
    ]

    useEffect(() => {
        const path = window.location.pathname;
        setPath(path);
    }, [])

    return (
        <>
            <div className="bg-white w-full h-screen flex flex-col p-5 pt-2">
                <button className="btn btn-lg btn-ghost flex justify-start gap-2 p-2">
                    <div className="p-3 bg-blue-500 text-white tsxt-2xl rounded-xl">
                        EX
                    </div>
                    <span className="max-xl:hidden">
                        EXammy Dashboard
                    </span>
                </button>
                <div className="mt-5 max-lg:mt-0 w-full">
                    <ul className="flex flex-col w-full gap-2">
                        {route.map((item, index) => (
                            <li className="w-full" key={index}>
                                <Link href={item.href} className="btn btn-ghost flex justify-start items-center gap-2 p-2 w-full font-normal text-lg">
                                    {path == item.href && (
                                        <span className="w-1 bg-blue-500 h-full rounded-l-sm"></span>
                                    )}
                                    {item.icon}{item.name}
                                </Link>
                            </li>
                        ))}
                        <li className="w-full">
                            <Link href={"/signout"} className="btn btn-error flex justify-start items-center gap-2 w-full font-normal text-lg text-white">
                                <FaArrowRightFromBracket /> ออกจากระบบ
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}