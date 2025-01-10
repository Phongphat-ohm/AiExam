"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import MainExerciseEditCard from "./Card/MainEditCard";

export interface ApiGetExercise {
    status: number
    message: string
    data: Exercise
}

export interface Exercise {
    id: number
    name: string
    subject_id: number
    grade_id: number
    create_at: string
    update_at: string
    ExamSet: ExamSet[]
    Grade: Grade
    Subject: Subject
}

export interface ExamSet {
    id: number
    name: string
    grade_id: number
    subject_id: number
    exercise_id: number
    create_at: string
    update_at: string
}

export interface Grade {
    id: number
    grade: string
    create_at: string
    update_at: string
}

export interface Subject {
    id: number
    name: string
    create_at: string
    update_at: string
}



export default function EditExerciseMainContent() {
    const route = useRouter();
    const { id } = useParams();
    const [exercise, setExercise] = useState<Exercise>();
    const [exerciseName, setExerciseName] = useState("");


    useEffect(() => {
        get_exercise();
    }, [])

    const get_exercise = async () => {
        Swal.fire({
            title: "กำลังโหลดข้อมูล",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        })

        try {
            const req = await axios.get("/api/data/exercise/" + id);
            const res: ApiGetExercise = req.data;

            if (res.status !== 200) {
                Swal.close();
                Swal.fire({
                    icon: "warning",
                    title: "ระวัง",
                    text: res.message,
                    confirmButtonText: "ลองอีกครั้ง"
                }).then(r => {
                    if (r.isConfirmed) {
                        route.push("/dashboard/exercise");
                    } else {
                        route.push("/dashboard/exercise");
                    }
                })
                return;
            }

            setExercise(res.data);
            setExerciseName(res.data.name);
        } catch (error) {
            Swal.close();
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "มีบางอย่างผิดพลาด",
                confirmButtonText: "ลองอีกครั้ง"
            }).then(r => {
                if (r.isConfirmed) {
                    route.push("/dashboard/exercise");
                } else {
                    route.push("/dashboard/exercise");
                }
            })
        }
    }

    return (
        <>
            <MainExerciseEditCard exercise={exercise} exerciseName={exerciseName} setExerciseName={setExerciseName} />
        </>
    )
}