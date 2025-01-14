"use client";
import { Input, Spinner } from "@nextui-org/react";
import Link from "next/link";
import Swal from "sweetalert2";
import axios from "axios";
import { read } from "fs";
import { useRouter } from "next/navigation";
import { FaLine } from "react-icons/fa6";
import { useState } from "react";

export default function SigninCard() {
    const [lineLoading, setLineLoading] = useState(false);
    const router = useRouter();

    const signin = async (data: FormData) => {
        Swal.fire({
            title: "กำลังโหลดข้อมูล",
            didOpen: () => {
                Swal.showLoading()
            },
            allowOutsideClick: false
        })

        try {
            const username = data.get("username");
            const password = data.get("password");

            let req_data = JSON.stringify({
                "username": username?.toString(),
                "password": password?.toString()
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: '/api/auth/signin',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: req_data
            };

            const req = await axios(config);
            const res = req.data;

            if (res) {
                Swal.close();

                if (res.status !== 200) {
                    Swal.fire({
                        icon: "error",
                        title: "ผิดพลาด",
                        text: res.message,
                        confirmButtonText: "ลองอีกครั้ง"
                    })
                    return;
                }

                if (res.role == "admin") {
                    Swal.fire({
                        icon: "success",
                        title: "สำเร็จ",
                        text: res.message,
                        confirmButtonText: "ตกลง"
                    }).then((r) => {
                        if (r.isConfirmed) {
                            router.push("/dashboard")
                        } else {
                            router.push("/dashboard")
                        }
                    })
                    return;
                } else {
                    Swal.fire({
                        icon: "success",
                        title: "สำเร็จ",
                        text: res.message,
                        confirmButtonText: "ตกลง"
                    }).then((r) => {
                        if (r.isConfirmed) {
                            router.push("/home")
                        } else {
                            router.push("/home")
                        }
                    })
                    return;
                }
            }
        } catch (error) {
            Swal.close();
            Swal.fire({
                icon: "error",
                title: "ผิดพลาด",
                text: "มีบางอย่างผิดพลาด",
                confirmButtonText: "ลองอีกครั้ง"
            })

            console.log(error)
            return;
        }
    }

    const line_login = async () => {
        try {
            setLineLoading(true);
            Swal.fire({
                title: "กำลังพาคุณไปยังหน้าต่อไป",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            })

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: '/api/auth/line/generate-url',
                headers: {
                    'Cookie': 'line_state=AIYZ9ZPOJ1'
                }
            };

            const get_url = await axios(config);
            const response_url = get_url.data;

            if (response_url.status !== 200) {
                setLineLoading(false);
                Swal.fire({
                    icon: "warning",
                    title: "ระวัง",
                    text: response_url.message
                })
                return;
            }

            router.push(response_url.url);
        } catch (error) {
            console.log(error);
            Swal.close();
            Swal.fire({
                icon: "error",
                title: "ผิดลาด",
                text: "มีบางอย่างผิดพลาด",
                confirmButtonText: "ลองอีกครั้ง"
            })
        }
    }

    return (
        <>
            <div className="card bg-white shadow">
                <div className="card-body">
                    <form action={signin} className="w-96 flex flex-col">
                        <h1 className="text-5xl">
                            เข้าสู่ระบบ
                        </h1>
                        <label className="mt-2">กรอกชื่อผู้ใช้และรหัสผ่านเพื่อเข้าสู่ระบบ</label>
                        <div className="mt-5">
                            <Input type="text" label="ชื่อผู้ใช้" name="username" placeholder="กรอกชื่อผู้ใช้" labelPlacement="outside" size="lg" autoComplete="off" isRequired required />
                            <br />
                            <div className="flex flex-col">
                                <Input type="password" label="รหัสผ่าน" name="password" placeholder="กรอกรหัสผ่าน" labelPlacement="outside" size="lg" isRequired required />
                                <label className="flex gap-2 mt-2">
                                    หากลืมรหัสผ่าน <Link href={"/forgot-pass"} className="text-blue-500 underline">กดที่นี่</Link>
                                </label>
                            </div>
                        </div>
                        {/* <div className="mt-3">
                            <button className="btn btn-success text-white font-normal flex items-center justify-center gap-3 w-full" onClick={line_login} disabled={lineLoading}>
                                {lineLoading ? (
                                    <Spinner color="white" />
                                ) : (
                                    <>
                                        <FaLine /> เข้าสู่ระบบด้วย Line
                                    </>
                                )}
                            </button>
                        </div> */}
                        <br />
                        <div className="flex gap-2 items-center justify-between">
                            <div className="w-full">
                                <Link href="/signup" className="btn btn-warning text-white font-normal w-full">สมัครสมาชิก</Link>
                            </div>
                            <div className="w-full">
                                <button className="btn btn-success text-white font-normal w-full">
                                    ยืนยัน
                                </button>
                            </div>
                        </div>
                    </form>
                </div >
            </div >
        </>
    )
}