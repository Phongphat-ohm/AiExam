"use client"
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Subject } from "@prisma/client";
import axios from "axios"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface Root {
    default_value?: string;
    tooltip?: boolean;
    setSubjectId: any;
}

export default function SubjectSelect({ default_value, tooltip, setSubjectId }: Root) {
    const route = useRouter();
    const [subjects, setSubjects] = useState<Subject[]>([])

    useEffect(() => {
        get_subject();
    }, [])

    const get_subject = async () => {
        const request = await axios.get("/api/data/subjects");
        const response = request.data;

        if (response.status !== 200) {
            Swal.fire({
                icon: "warning",
                title: "ระวัง",
                text: "response.message",
                confirmButtonText: "ลองอีกครั้ง"
            }).then(r => {
                if (r.isConfirmed) {
                    route.push("/dashboard/exercise");
                } else {
                    route.push("/dashboard/exercise");
                }
            })
        }

        setSubjects(response.data);
    }

    return (
        <>
            <div className={tooltip ? "tooltip tooltip-bottom w-full" : "w-full"} data-tip="หากไม่ต้องการเปลี่ยนแปลงใส่ข้อมูลตามตารางดานล่าง">
                <Autocomplete onSelectionChange={(id) => {
                    setSubjectId(id);
                }} className="w-full" isRequired required defaultItems={subjects} defaultSelectedKey={default_value !== null ? default_value : ""} size="lg" label="เลือกวิชา" placeholder="พิมพ์คำค้นหาเพื่อค้นหาวิชา..." labelPlacement="outside" name="subject" id="subject">
                    {(item) => (<AutocompleteItem key={item.id} value={item.id}>{item.name}</AutocompleteItem>)}
                </Autocomplete>
            </div>
        </>
    )
}