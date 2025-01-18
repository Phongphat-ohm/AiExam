"use client";
import axios, { AxiosRequestConfig } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FaGear } from "react-icons/fa6";
import Swal from "sweetalert2";
import { useLoading } from "./Layout";
import { IoIosReturnLeft, IoIosReturnRight } from "react-icons/io";


interface UserData {
    gravatar: string;
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    role: string;
    create_at: Date;
}

export default function Navbar() {
    const [time, setTime] = useState<string>("");
    const [user, setUser] = useState<UserData | null>(null);
    const route = useRouter();
    const { setShowLoading } = useLoading();

    const get_user = async () => {
        setShowLoading(true)
        try {
            const config: AxiosRequestConfig = {
                url: "/api/auth/data",
                method: "get"
            }

            const request = await axios(config);
            const data = request.data;

            if (data.status !== 200) {
                Swal.close();

                if (data.status == 401) {
                    Swal.fire({
                        icon: "info",
                        title: "กรุณาเข้าสู่ระบบ",
                        text: "กดเข้าสู่ระบบเพื่อกรอกข้อมูลเข้าสู่ระบบ",
                        confirmButtonText: "เข้าสู่ระบบ"
                    }).then(r => {
                        if (r.isConfirmed) {
                            route.push("/signin")
                        } else {
                            route.push("/signin")
                        }
                    })
                    return;
                }

                Swal.fire({
                    icon: "warning",
                    title: "คำเตือน",
                    text: data.message
                })
                return;
            }
            Swal.close();

            if (data.data.role !== "admin") {
                route.push("/")
                return;
            }

            setShowLoading(false)
            setUser(data.data);
            return;

        } catch (error) {
            Swal.close();

            Swal.fire({
                icon: "error",
                title: "ผิดพลาด",
                text: "มีบางอย่างผิดพลาด",
                confirmButtonText: "ลองอีกครั้ง"
            }).then(r => {
                if (r.isConfirmed) {
                    route.push("/")
                } else {
                    route.push("/")
                }
            })

            console.log(error);
            return;
        }
    }

    useEffect(() => {
        get_user();
        const interval = setInterval(() => {
            const now = new Date();
            const formattedTime = now.toLocaleTimeString("th-TH", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            });
            setTime(formattedTime);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className="navbar absolute w-full top-0 left-0 p-0 py-3 z-30">
                <div className="flex-1">
                    <div className="flex gap-2 items-center mx-5">
                        <button onClick={() => route.back()} className="p-3  rounded-lg bg-info text-white font-bold">
                            <IoIosReturnLeft />
                        </button>
                        <button onClick={() => route.forward()} className="p-3  rounded-lg bg-info text-white font-bold">
                            <IoIosReturnRight />
                        </button>
                        <div className="p-3 px-6 text-xs text-gray-500 bg-white rounded-lg shadow">
                            เวลา: {time} นาฬิกา
                        </div>
                    </div>
                </div>
                <div className="flex-none">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="">
                            <div className="p-3 bg-gray-50 rounded-l-full rounded flex gap-5 shadow">
                                <div className="avatar">
                                    <div className="w-10 h-10 rounded-full">
                                        <img src={user?.gravatar} />
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between">
                                    <label className="text-sm cursor-pointer">{user?.first_name} {user?.last_name}</label>
                                    <label className="text-xs text-gray-500 cursor-pointer">{user?.username}</label>
                                </div>
                            </div>
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            <li>
                                <Link href="/dashboard/admin/setting">
                                    <FaGear /> การตั้งค่าผู้ใช้
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
