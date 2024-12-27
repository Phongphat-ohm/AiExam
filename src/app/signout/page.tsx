"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Logout() {
    const route = useRouter();

    useEffect(() => {
        axios({
            method: "get",
            url: "/api/auth/logout"
        }).then(r => {
            route.push("/");
        })
    }, [])

    return (
        <>
            <div className="h-screen flex flex-col items-center justify-center">
                <h1 className="text-xl text-gray-500">
                    กำลังออกจากระบบ
                </h1>
                <span className="loading loading-dots loading-lg mt-3"></span>
            </div>
        </>
    )
}