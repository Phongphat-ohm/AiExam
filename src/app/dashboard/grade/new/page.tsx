"use client"
import Layout from "@/components/Dashboard/Layout";
import { Input } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function NewGradePage() {
    const [grade, setGrade] = useState([]);
    useEffect(() => {
        get_grade();
    }, [])
    const router = useRouter();

    const create_grade = async (ev: FormData) => {
        try {

            Swal.fire({
                title: "กำลังสร้างระดับชั้น",
                didOpen: () => {
                    Swal.showLoading();
                },
                allowOutsideClick: false
            })

            const text = ev.get("text");

            let data = JSON.stringify({
                "text": text?.toString()
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: '/api/data/grade/new',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const req = await axios(config);
            const res = req.data;

            if (req.status !== 200) {
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
                    router.push("/dashboard/grade")
                } else {
                    router.push("/dashboard/grade")
                }
            })
            return;
        } catch (error) {
            console.log(error);
            Swal.close();
            Swal.fire({
                icon: "error",
                title: "ผิดพลาด",
                text: "มีบางอย่างผิดพลาด",
                confirmButtonText: "ลองอีกครั้ง"
            })
        }
    }

    const get_grade = async () => {
        try {
            const req = await axios.get("/api/data/grade");
            const res = req.data;

            if (res.status !== 200) {
                Swal.fire({
                    icon: "warning",
                    title: "ระวัง",
                    text: res.message
                })
            }

            setGrade(res.data);

        } catch (error) {
            console.log(error);
            Swal.close();
            Swal.fire({
                icon: "error",
                title: "ผิดพลาด",
                text: "มีบางอย่างผิดพลาด",
                confirmButtonText: "ลองอีกครั้ง"
            })
        }
    }

    return (
        <>
            <Layout>
                <div className="pt-20 px-5">
                    <div className="card bg-white shadow">
                        <figure className="p-2 border-b">
                            เพิ่มระดับชั้น
                        </figure>
                        <div className="card-body">
                            <form action={create_grade} className="grid grid-cols-12 gap-3">
                                <Input type="text" label="รหัสระดับชั้น" placeholder="รหัสระดับชั้น" labelPlacement="outside" size="lg" className="col-span-3" name="id" required isRequired value={String(grade.length + 1)} />
                                <Input type="text" label="ชื่อระดับชั้น" placeholder="ชื่อระดับชั้น" labelPlacement="outside" size="lg" className="col-span-7" name="text" required isRequired />
                                <div className="flex items-end col-span-1">
                                    <button className="btn btn-success font-normal text-white w-full" type="submit">
                                        ยืนยัน
                                    </button>
                                </div>
                                <div className="flex items-end col-span-1">
                                    <Link href={"/dashboard/grade"} className="btn btn-warning font-normal text-white w-full">
                                        ยกเลิก
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Layout >
        </>
    )
}