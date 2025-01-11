"use client";

import { Input } from "@nextui-org/react";
import Link from "next/link";
import GradeSelected from "./GradeSelected";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function SignupCard() {
    const route = useRouter();

    const handler_submit = async (data: FormData) => {
        Swal.fire({
            title: "กำลังสมัครสมาชิก...",
            didOpen: () => {
                Swal.showLoading();
            },
            allowOutsideClick: false,
        });
        try {
            const first_name = data.get("first_name");
            const last_name = data.get("last_name");
            const email = data.get("email");
            const username = data.get("username");
            const password = data.get("password");
            const grade = data.get("grade");

            let req_data = JSON.stringify({
                first_name: first_name?.toString(),
                last_name: last_name?.toString(),
                email: email?.toString(),
                username: username?.toString(),
                password: password?.toString(),
                grade: grade?.toString(),
            });

            let config = {
                method: "post",
                maxBodyLength: Infinity,
                url: "/api/auth/signup",
                headers: {
                    "Content-Type": "application/json",
                },
                data: req_data,
            };

            const req = await axios(config);
            const response = req.data;

            console.log(response);

            if (response.status === 200) {
                Swal.close();
                Swal.fire({
                    icon: "success",
                    title: "สำเร็จ",
                    text: response.message,
                    confirmButtonText: "ตกลง",
                }).then(() => route.push("/signin"));
                return;
            }

            Swal.close();
            Swal.fire({
                icon: "warning",
                title: "ระวัง",
                text: response.message,
                confirmButtonText: "ลองอีกครั้ง",
            });
        } catch (error) {
            console.log(error);
            Swal.close();
            Swal.fire({
                icon: "error",
                title: "ผิดพลาด",
                text: "เซิร์ฟเวอร์ error",
                confirmButtonText: "ลองอีกครั้ง",
            });
        }
    };

    return (
        <div className="card backdrop-blur-md bg-white/80 shadow-lg rounded-lg p-8 max-w-lg w-full">
            <form
                action={handler_submit}
                className="flex flex-col space-y-6"
            >
                <h1 className="text-3xl font-bold text-center text-gray-900">
                    สมัครสมาชิก
                </h1>
                <p className="text-sm text-center text-gray-700">
                    กรอกข้อมูลให้ครบเพื่อสมัครสมาชิกและใช้บริหารของเรา
                </p>

                <div className="grid grid-cols-2 gap-4">
                    <Input
                        isRequired
                        placeholder="ชื่อ"
                        size="lg"
                        label="ชื่อ"
                        labelPlacement="outside"
                        name="first_name"
                    />
                    <Input
                        isRequired
                        placeholder="นามสกุล"
                        size="lg"
                        label="นามสกุล"
                        labelPlacement="outside"
                        name="last_name"
                    />
                    <Input
                        isRequired
                        placeholder="อีเมล"
                        size="lg"
                        label="อีเมล"
                        labelPlacement="outside"
                        name="email"
                    />
                    <Input
                        isRequired
                        placeholder="ชื่อผู้ใช้"
                        size="lg"
                        label="ชื่อผู้ใช้"
                        labelPlacement="outside"
                        name="username"
                    />
                </div>
                <Input
                    isRequired
                    type="password"
                    placeholder="รหัสผ่าน"
                    size="lg"
                    label="รหัสผ่าน"
                    labelPlacement="outside"
                    name="password"
                />
                <GradeSelected />

                <div className="flex gap-4">
                    <Link
                        href="/signin"
                        className="w-1/2 py-3 text-center text-white bg-yellow-500 hover:bg-yellow-600 rounded-md"
                    >
                        เข้าสู่ระบบ
                    </Link>
                    <button
                        type="submit"
                        className="w-1/2 py-3 text-white bg-green-500 hover:bg-green-600 rounded-md"
                    >
                        ยืนยัน
                    </button>
                </div>
            </form>
        </div>
    );
}
