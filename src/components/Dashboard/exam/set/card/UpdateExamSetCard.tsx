"use client";

import { Input } from "@nextui-org/react";
import { ExamSet } from "../update/interface";
import { useEffect, useState } from "react";
import GradeSelect from "../../select/gradeSelected";
import SubjectSelect from "../../select/SubjectSelect";
import ExerciseSelect from "../../select/ExerciseSelect";
import Link from "next/link";
import Swal from "sweetalert2";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Root {
    examSet?: ExamSet
}

export default function UpdateExamSet({ examSet }: Root) {
    const [name, setName] = useState("");
    const [gradeId, setGradeId] = useState("");
    const [subjectId, setSubjectId] = useState("");
    const route = useRouter();

    useEffect(() => {
        setName(examSet?.name.toString() as string);
    }, [examSet])

    const update_exam_set = async (ev: FormData) => {
        try {
            const confirm_update = await Swal.fire({
                icon: "info",
                title: "ยืนยัน",
                text: "ต้องการแก้ไขหรือไม่",
                showCancelButton: true,
                confirmButtonText: "ยืนยัน",
                cancelButtonText: "ยกเลิก"
            })

            if (confirm_update.isConfirmed) {
                Swal.fire({
                    title: "กำลังแก้ไข",
                    didOpen: () => {
                        Swal.showLoading();
                    },
                    allowOutsideClick: false
                })

                const id = ev.get("set_id");
                const name = ev.get("set_name");
                const grade = ev.get("grade");
                const subject = ev.get("subject");
                const exercise = ev.get("exercise");

                let data = JSON.stringify({
                    "id": id,
                    "name": name,
                    "grade": grade,
                    "subject": subject,
                    "exercise": exercise
                });

                let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: '/api/data/exam/set/update',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: data
                };

                const update_req = await axios(config);
                const update_data = update_req.data;

                if (update_data.status !== 200) {
                    Swal.close();
                    Swal.fire({
                        icon: "warning",
                        title: "ระวัง",
                        text: update_data.message,
                        confirmButtonText: "ลองอีกครั้ง"
                    })
                    return;
                }
                Swal.close();

                Swal.fire({
                    icon: "success",
                    title: "สำเร็จ",
                    text: update_data.message,
                    confirmButtonText: "ยืนยัน"
                }).then(r => {
                    if (r.isConfirmed) {
                        route.push("/dashboard/exam/set");
                    } else {
                        route.push("/dashboard/exam/set");
                    }
                })

            }

            return;
        } catch (error) {
            Swal.close();
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "ผิดพลาด",
                text: "มีบางอย่างผิดพลาด"
            })
        }
    }

    return (
        <>
            <div className="card bg-white shadow">
                <div className="card-body">
                    <form action={update_exam_set} className="grid grid-cols-12 gap-3">
                        <Input required isRequired name="set_id" id="set_id" type="text" size="lg" className="col-span-2" value={examSet?.id.toString() as string} placeholder="รหัสชุดข้อสอบ" label="รหัสชุดข้อสอบ" labelPlacement="outside" />
                        <Input required isRequired name="set_name" id="set_name" type="text" size="lg" autoComplete="off" className="col-span-10" value={name} onChange={e => setName(e.target.value)} placeholder="ชื่อชุดข้อสอบ" label="ชื่อชุดข้อสอบ" labelPlacement="outside" />
                        <div className="col-span-4">
                            <GradeSelect tooltip default_value={examSet?.Grade.id.toString() as string} setGradeId={setGradeId} />
                        </div>
                        <div className="col-span-4">
                            <SubjectSelect tooltip default_value={examSet?.Subject.id.toString() as string} setSubjectId={setSubjectId} />
                        </div>
                        <div className="col-span-4">
                            <ExerciseSelect tooltip default_value={examSet?.Exercise.id.toString() as string} grade_id={gradeId as string} subject_id={subjectId as string} />
                        </div>
                        <div className="col-span-12">
                            <table className="w-full">
                                <tbody>
                                    <tr>
                                        <td className="p-3 border">ระดับชั้น</td>
                                        <td className="p-3 border">{examSet?.Grade.grade}</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3 border">วิชา</td>
                                        <td className="p-3 border">{examSet?.Subject.name}</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3 border">หน่วยการเรียนรู้</td>
                                        <td className="p-3 border">{examSet?.Exercise.name}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <button className="btn btn-success col-span-2 text-white font-normal">
                            ยินยันแก้ไข
                        </button>
                        <Link href={"/dashboard/exam/set"} className="btn btn-warning col-span-2 text-white font-normal">
                            ยกเลิก
                        </Link>
                    </form>
                </div>
            </div>
        </>
    )
}