"use client"
import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function NewSubjectCard() {
    const route = useRouter();

    const create_subject = async (ev: FormData) => {
        try {
            Swal.fire({
                title: "กำลังโหลด",
                didOpen: () => {
                    Swal.showLoading();
                },
                allowOutsideClick: false
            })
            const subject_name = ev.get("subject_name");

            let data = JSON.stringify({
                "sub_name": subject_name
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: '/api/data/subject/new',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const req = await axios(config);
            const res = req.data

            if (res.status !== 200) {
                Swal.close();
                Swal.fire({
                    icon: "warning",
                    title: "ระวัง",
                    text: res.message,
                    confirmButtonText: "ลองอีกครั้ง"
                })
                return;
            }

            Swal.close();
            Swal.fire({
                icon: "success",
                title: "สำเร็จ",
                text: res.message,
                confirmButtonText: "ยืนยัน"
            }).then(r => {
                if (r.isConfirmed) {
                    route.push("/dashboard/subject")
                } else {
                    route.push("/dashboard/subject")
                }
            })
        } catch (error) {
            Swal.close();
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "ผิดพลาด",
                text: "มีบางอย่างผิดพลาด",
                confirmButtonText: "ลองอีกครั้ง",
            });
        }
    }

    return (
        <>
            <div className="card bg-white shadow">
                <figure className="p-3 border-b">
                    เพิ่มวิชา
                </figure>
                <div className="card-body">
                    <form action={create_subject} className="grid grid-cols-12 gap-3">
                        {/* <Input type="text" label="รหัสวิชา" labelPlacement="outside" placeholder="รหัสวิชา" value={"1"} disabled className="col-span-2" size="lg" /> */}
                        <Input type="text" label="ชื่อวิชา" labelPlacement="outside" placeholder="ชื่อวิชา" className="col-span-8" size="lg" name="subject_name" autoComplete="off" />
                        <div className="flex items-end">
                            <Button type="submit" color="success" className="w-full text-white" size="lg">ยืนยัน</Button>
                        </div>
                        <div className="flex items-end">
                            <Link href={"/dashboard/subject"}>
                                <Button type="button" color="warning" className="w-full text-white" size="lg">ยกเลิก</Button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}