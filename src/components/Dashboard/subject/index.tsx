"use client"
import { useParams } from "next/navigation";
import UpdateSubjectCard from "./card/updateSubjectCard";
import { GetSubjectApi, Subject } from "./card/subject";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import ExerciseRlSubject from "../exercise/tbl/relation/ExerciseRlSubject";

export default function Index() {
    const { id } = useParams();
    const [subject, setSubject] = useState<Subject>();
    const [subjectVal, setSubjectVal] = useState("");

    useEffect(() => {
        get_subject();
    }, [])

    const get_subject = async () => {
        try {
            Swal.fire({
                title: "กำลังโหลด",
                didOpen: () => {
                    Swal.showLoading();
                },
                allowOutsideClick: false
            })

            const req_data = await axios.get("/api/data/subject/" + id);
            const response: GetSubjectApi = req_data.data;

            if (response.status !== 200) {
                Swal.close();
                Swal.fire({
                    icon: "warning",
                    title: "ระวัง",
                    text: response.message,
                    confirmButtonText: "ลองอีกครั้ง"
                })
                return;
            }

            setSubjectVal(response.data.name);
            setSubject(response.data);
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
            <UpdateSubjectCard setSubjectVal={setSubjectVal} subjectVal={subjectVal} />
            <ExerciseRlSubject data={subject?.Exercise} />
        </>
    )
}