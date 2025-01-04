"use client";
import { Input } from "@nextui-org/react";
import Link from "next/link";
import Swal from "sweetalert2";
import axios from "axios";
import { read } from "fs";
import { useRouter } from "next/navigation";

export default function SigninCard() {
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
                        <br />
                        <div className="flex gap-2">
                            <Link href="/signup" className="btn btn-warning text-white font-normal w-1/2">สมัครสมาชิก</Link>
                            <button className="btn btn-success text-white font-normal w-1/2">
                                ยืนยัน
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}