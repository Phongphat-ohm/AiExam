"use client"
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface GradeProps {
    id?: number;
    grade?: string;
}

export default function GradeSelected() {
    const [grades, setGrade] = useState<GradeProps[]>([]);

    useEffect(() => {
        axios.get("/api/data/grade").then((res) => {
            if (res.data.status == 200) {
                setGrade(res.data.data);
            } else {
                console.log(res.data.message);
            }
        }).catch((error) => {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "ผิดพลาด",
                text: "ดึงข้อมูลชั้นเรียนไม่สำเร็จ",
                confirmButtonText: "ลองอีกครั้ง"
            })
            return;
        })
    }, [])

    return (
        <Autocomplete name="grade" isRequired required className="col-span-2" size="lg" label="ระดับชั้น" labelPlacement="outside" placeholder="เลือกระดับชันของคุณ">
            {grades.map((grade) => (
                <AutocompleteItem key={grade.id} value={grade.id}>{grade.grade}</AutocompleteItem>
            ))}
        </Autocomplete>
    );
}
