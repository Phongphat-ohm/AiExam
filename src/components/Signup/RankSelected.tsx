"use client"
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface GradeProps {
    id: number;
    create_at: Date;
    update_at: Date;
    rank: string;
    require_point: number;
}

export default function RankSelected() {
    const [ranks, setRanks] = useState<GradeProps[]>([]);

    useEffect(() => {
        axios.get("/api/data/ranks").then((res) => {
            if (res.data.status == 200) {
                setRanks(res.data.data);
            } else {
                console.log(res.data.message);
            }
        }).catch((error) => {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "ผิดพลาด",
                text: "ดึงข้อมูลแรงค์ไม่สำเร็จ",
                confirmButtonText: "ลองอีกครั้ง"
            })
            return;
        })
    }, [])

    return (
        <Autocomplete name="rank" isRequired required className="col-span-2" size="lg" label="แรงค์" labelPlacement="outside" placeholder="เลือกแรงค์">
            {ranks.map((grade) => (
                <AutocompleteItem key={grade.id} value={grade.id}>{grade.rank}</AutocompleteItem>
            ))}
        </Autocomplete>
    );
}
