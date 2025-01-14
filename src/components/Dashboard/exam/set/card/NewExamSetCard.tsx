"use client"
import ExerciseSelect from "@/components/Dashboard/exam/select/ExerciseSelect";
import GradeSelect from "@/components/Dashboard/exam/select/gradeSelected";
import SubjectSelect from "@/components/Dashboard/exam/select/SubjectSelect";
import { Input } from "@nextui-org/react";
import { useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function NewExamSetCard() {
    const [subjectId, setSubjectId] = useState("");
    const [gradeId, setGradeId] = useState("");
    const route = useRouter();

    const new_exam_set = async (ev: FormData) => {
        try {
            Swal.fire({
                title: "กำลังสร้างชุดข้อสอบ",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            })

            const exam_set_name = ev.get("set_name");
            const grade = ev.get("grade");
            const subject = ev.get("subject");
            const exercise = ev.get("exercise");

            let data = JSON.stringify({
                "set_name": exam_set_name,
                "grade": grade,
                "subject": subject,
                "exercise": exercise
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: '/api/data/exam/set/new',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const req = await axios(config);
            const response = req.data;

            if (response.status !== 200) {
                Swal.close();
                Swal.fire({
                    icon: "warning",
                    title: "ระวัง",
                    text: response.message,
                    confirmButtonText: "ลองอีกครั้ง"
                })
            }

            Swal.close();
            Swal.fire({
                icon: "success",
                title: "สำเร็จ",
                text: response.message,
                confirmButtonText: "ยืนยัน"
            }).then(r => {
                if (r.isConfirmed) {
                    route.push('/dashboard/exam/set');
                } else {
                    route.push('/dashboard/exam/set');
                }
            })
        } catch (error) {
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
            <div className="pt-20 px-5">
                <div className="card bg-white shadow">
                    <figure className="p-3 border-b">
                        เพิ่มข้อมูลชุดข้อสอบ
                    </figure>
                    <form action={new_exam_set} className="card-body grid grid-cols-12 gap-3">
                        <Input autoComplete="off" type="text" size="lg" name="set_name" id="set_name" placeholder="ชื่อชุดข้อสอบ" label="ชื่อชุดข้อสอบ" labelPlacement="outside" className="col-span-12" />
                        <div className="col-span-4">
                            <GradeSelect setGradeId={setGradeId} />
                        </div>
                        <div className="col-span-4">
                            <SubjectSelect setSubjectId={setSubjectId} />
                        </div>
                        <div className="col-span-4">
                            <ExerciseSelect grade_id={gradeId} subject_id={subjectId} />
                        </div>
                        <div className="col-span-2">
                            <button className="btn btn-success font-normal text-white w-full">
                                ยืนยัน
                            </button>
                        </div>
                        <div className="col-span-2">
                            <Link href={"/dashboard/exam/set"} className="btn btn-warning font-normal text-white w-full">
                                ยกเลิก
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}