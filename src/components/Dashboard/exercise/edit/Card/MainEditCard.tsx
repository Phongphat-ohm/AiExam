"use client";
import { Input } from "@nextui-org/react"
import { Exercise } from "../MainContent"
import GradeSelect from "../../select/gradeSelected"
import SubjectSelect from "../../select/subjectSelect"
import Link from "next/link"
import { useEffect, useState } from "react";

interface Root {
    exerciseName: any;
    setExerciseName: any
    exercise?: Exercise
}

export default function MainExerciseEditCard({ exerciseName, setExerciseName, exercise }: Root) {
    return (
        <>
            <div className="card bg-white shadow">
                <div className="card-body">
                    <form className="grid grid-cols-12 gap-3">
                        <Input disabled label="รหัสหน่วยการเรียนรู้" placeholder="รหัสหน่วยการเรียนรู้" labelPlacement="outside" name="id" id="id" value={exercise?.id.toString()} className="col-span-3" size="lg" />
                        <Input isRequired required label="ชื่อหน่วยการเรียนรู้" placeholder="ชื่อหน่วยการเรียนรู้" labelPlacement="outside" name="name" id="name" value={exerciseName} className="col-span-3" size="lg" onChange={(e) => {
                            setExerciseName(e.target.value)
                        }} />
                        <div className="col-span-3">
                            <GradeSelect tooltip default_value={exercise?.grade_id.toString()} />
                        </div>
                        <div className="col-span-3">
                            <SubjectSelect tooltip default_value={exercise?.subject_id.toString()} />
                        </div>
                        <div className="col-span-12 text-danger">
                            ** หากไม่ต้องการเปลี่ยนแปลงใส่ข้อมูลตามตารางดานล่าง **
                        </div>
                        <div className="col-span-12 flex h-auto items-end">
                            <table className="w-full">
                                <tbody>
                                    <tr>
                                        <td className="border p-3">ระดับชั้น: </td>
                                        <td className="border p-3">{exercise?.Grade.grade}</td>
                                    </tr>
                                    <tr>
                                        <td className="border p-3" >วิชา: </td>
                                        <td className="border p-3">{exercise?.Subject.name}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <button type="submit" className="btn btn-success font-normal text-white">
                            ยืนยัน
                        </button>
                        <Link href={"/dashboard/exercise"} className="btn btn-warning font-normal text-white">ยกเลิก</Link>
                    </form>
                </div>
            </div>
        </>
    )
}