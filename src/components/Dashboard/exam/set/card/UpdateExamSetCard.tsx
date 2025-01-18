"use client";

import { Input } from "@nextui-org/react";
import { ExamSet } from "../update/interface";
import { useEffect, useState } from "react";
import GradeSelect from "../../select/gradeSelected";
import SubjectSelect from "../../select/SubjectSelect";
import ExerciseSelect from "../../select/ExerciseSelect";
import Link from "next/link";

interface Root {
    examSet?: ExamSet
}

export default function UpdateExamSet({ examSet }: Root) {
    const [name, setName] = useState("");
    const [gradeId, setGradeId] = useState("");
    const [subjectId, setSubjectId] = useState("");

    useEffect(() => {
        setName(examSet?.name.toString() as string);
    }, [examSet])

    return (
        <>
            <div className="card bg-white shadow">
                <div className="card-body">
                    <form className="grid grid-cols-12 gap-3">
                        <Input required isRequired name="set_id" id="set_id" type="text" size="lg" className="col-span-2" value={examSet?.id.toString() as string} placeholder="รหัสชุดข้อสอบ" label="รหัสชุดข้อสอบ" labelPlacement="outside" />
                        <Input required isRequired name="set_name" id="set_name" type="text" size="lg" autoComplete="off" className="col-span-10" value={name} onChange={e => setName(e.target.value)} placeholder="ชื่อชุดข้อสอบ" label="ชื่อชุดข้อสอบ" labelPlacement="outside" />
                        <div className="col-span-4">
                            <GradeSelect tooltip default_value={examSet?.Grade.id.toString() as string} setGradeId={setGradeId} />
                        </div>
                        <div className="col-span-4">
                            <SubjectSelect tooltip default_value={examSet?.Subject.id.toString() as string} setSubjectId={setSubjectId} />
                        </div>
                        <div className="col-span-4">
                            <ExerciseSelect tooltip default_value={examSet?.Exercise.id.toString() as string} grade_id={gradeId.toString() as string} subject_id={subjectId.toString() as string} />
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