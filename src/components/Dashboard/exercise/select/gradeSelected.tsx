"use client"
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Grade, Subject } from "@prisma/client";
import axios from "axios"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface Root {
    default_value?: string
}

export default function GradeSelect({ default_value }: Root) {
    const route = useRouter();
    const [subjects, setSubjects] = useState<Grade[]>([])

    useEffect(() => {
        get_subject();
    }, [])

    const get_subject = async () => {
        const request = await axios.get("/api/data/grade");
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
            <Autocomplete defaultItems={subjects} defaultSelectedKey={default_value !== null ? default_value : ""} size="lg" label="เลือกระดับชั้น" placeholder="พิมพ์คำค้นหาเพื่อค้นหาระดับชั้น..." labelPlacement="outside" name="grade" id="grade" required isRequired>
                {(item) => (<AutocompleteItem key={item.id} value={item.id}>{item.grade}</AutocompleteItem>)}
            </Autocomplete>
        </>
    )
}