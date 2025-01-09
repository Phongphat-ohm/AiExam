"use client";

import axios from "axios";
import Swal from "sweetalert2";
import GradeSelect from "../select/gradeSelected";
import SubjectSelect from "../select/subjectSelect";
import { Input } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewExerciseCard() {

    const route = useRouter();

    const new_exercise = async (ev: FormData) => {
        Swal.fire({
            title: "กำลังสร้างหน่วยการเรียนรู้",
            didOpen: () => {
                Swal.showLoading();
            },
            allowOutsideClick: false
        })

        const grade = ev.get("grade");
        const subject = ev.get("subject");
        const name = ev.get("name");

        try {

            let data = JSON.stringify({
                "grade": grade,
                "subject": subject,
                "name": name
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: '/api/data/exercise/new',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const request = await axios(config);
            const response = request.data;

            if (response.status !== 200) {
                Swal.close();
                Swal.fire({
                    icon: "warning",
                    title: "ระวัง",
                    text: response.message,
                    confirmButtonText: "ลองอีกครั้ง"
                })
            }

            Swal.fire({
                icon: "success",
                title: "สำเร็จ",
                text: "สร้างหน่วยการเรียนรู้สำเร็จ",
                confirmButtonText: "ยืนยัน"
            }).then(r => {
                if (r.isConfirmed) {
                    route.push("/dashboard/exercise")
                } else {
                    route.push("/dashboard/exercise")
                }
            })
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
            <div className="card w-1/2 bg-white shadow">
                <figure className="p-3 border-b">
                    เพิ่มสาระการเรียนรู้
                </figure>
                <div className="card-body">
                    <form action={new_exercise} className="flex flex-col gap-3">
                        <div className="flex gap-3">
                            <GradeSelect />
                            <SubjectSelect />
                        </div>
                        <Input label="ชื่อหน่วยการเรียนรู้" placeholder="กรอกชื่อหน่วยการเรียนรู้" labelPlacement="outside" name="name" id="name" size="lg" required isRequired autoComplete="off" />
                        <div className="grid grid-cols-2 gap-3 w-full items-center mt-3">
                            <Link href={"/dashboard/exercise"} className="btn btn-warning text-white font-normal">
                                ยกเลิก
                            </Link>
                            <button className="btn btn-success text-white font-normal" type="submit">
                                ยืนยัน
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}