"use client"
import { Input } from "@nextui-org/react";
import Link from "next/link";
import GradeSelected from "@/components/Signup/GradeSelected";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { RadioGroup, Radio } from "@nextui-org/react";

export default function SignupCard() {
    const route = useRouter();

    const handler_submit = async (data: FormData) => {
        Swal.fire({
            title: "กำลังสมัครสมาชิก",
            didOpen: () => {
                Swal.showLoading()
            },
            allowOutsideClick: false
        })
        try {

            const first_name = data.get("first_name");
            const last_name = data.get("last_name");
            const email = data.get("email");
            const username = data.get("username");
            const password = data.get("password");
            const grade = data.get("grade");
            const role = data.get("role")

            let req_data = JSON.stringify({
                "first_name": first_name?.toString(),
                "last_name": last_name?.toString(),
                "email": email?.toString(),
                "username": username?.toString(),
                "password": password?.toString(),
                "grade": grade?.toString()
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: '/api/auth/signup?role=' + role,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: req_data
            };

            const req = await axios(config);
            const response = req.data;

            console.log(response);

            if (response.status == 200) {
                Swal.close();
                Swal.fire({
                    icon: "success",
                    title: "สำเร็จ",
                    text: response.message,
                    confirmButtonText: "ตกลง"
                }).then(r => {
                    if (r.isConfirmed) {
                        route.push("/dashboard/user");
                    } else {
                        route.push("/dashboard/user");
                    }
                })
                return;
            }

            Swal.close();
            Swal.fire({
                icon: "warning",
                title: "ระวัง",
                text: response.message,
                confirmButtonText: "ลองอีกครั้ง"
            })
            return;
        } catch (error) {
            console.log(error);
            Swal.close();
            Swal.fire({
                icon: "error",
                title: "ผิดพลาด",
                text: "เซิร์ฟเวอร์ error",
                confirmButtonText: "ลองอีกครั้ง"
            })
            return;
        }
    }

    return (
        <>
            <div className="card bg-white shadow">
                <div className="card-body">
                    <form action={handler_submit} className="w-96 flex flex-col">
                        <h1 className="text-5xl">
                            สมัครสมาชิก
                        </h1>
                        <label className="mt-2">กรอกข้อมูลให้ครบเพื่อสมัครสมาชิกและใช้บริหารของเรา</label>
                        <div className="mt-5">
                            <div className="grid grid-cols-2 gap-2">
                                <Input isRequired autoComplete="off" required placeholder="ชื่อ" size="lg" label="ชื่อ" labelPlacement="outside" name="first_name" />
                                <Input isRequired autoComplete="off" required placeholder="นามสกุล" size="lg" label="นามสกุล" labelPlacement="outside" name="last_name" />
                                <Input isRequired autoComplete="off" required placeholder="อีเมล" size="lg" label="อีเมล" labelPlacement="outside" name="email" />
                                <Input isRequired autoComplete="off" required placeholder="ชื่อผู้ใช้" size="lg" label="ชื่อผู้ใช้" labelPlacement="outside" name="username" />
                                <Input isRequired autoComplete="off" required type="password" size="lg" placeholder="รหัสผ่าน" label="รหัสผ่าน" labelPlacement="outside" className="col-span-2" name="password" />
                                <GradeSelected />
                                <RadioGroup defaultValue={"user"} label="เลือกฐานะผู้ใช้" isRequired name="role" orientation="horizontal">
                                    <Radio value="user">ผู้ใช้</Radio>
                                    <Radio value="admin">แอดมิน</Radio>
                                </RadioGroup>
                            </div>
                        </div>
                        <br />
                        <div className="flex gap-2">
                            <Link href="/signin" className="btn btn-warning text-white font-normal w-1/2">เข้าสู่ระบบ</Link>
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