"use client";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Subject } from "./subject";
import Swal from "sweetalert2";
import axios from "axios";

interface Root {
    subjectVal: string;
    setSubjectVal: any;
}

export default function UpdateSubjectCard({ subjectVal, setSubjectVal }: Root) {
    const { id } = useParams();
    const route = useRouter();

    const confirm_update = (data: FormData) => {
        Swal.fire({
            icon: "info",
            title: "คุณต้องการแก้ไขข้อมูลหรือไม่",
            showCancelButton: true,
            confirmButtonText: "ยืนยัน",
            cancelButtonText: "ยกเลิก"
        }).then(r => {
            if (r.isConfirmed) {
                update_data(data);
            }
        })
    }

    const update_data = async (form_data: FormData) => {
        try {
            Swal.fire({
                title: "กำลังแก้ไขข้อมูล",
                didOpen: () => {
                    Swal.showLoading();
                },
                allowOutsideClick: false
            })

            const name = form_data.get('subject_value');

            let data = JSON.stringify({
                "id": id,
                "name": name
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: '/api/data/subject/update',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const req_data = await axios(config);
            const res = req_data.data;

            if (res.status !== 200) {
                Swal.close();
                Swal.fire({
                    icon: "warning",
                    title: "ระวัง",
                    text: res.message,
                    confirmButtonText: "ลองอีกครั้ง"
                })
                return;
            }

            Swal.close();
            Swal.fire({
                icon: "success",
                title: "สำเร็จ",
                text: res.message,
                confirmButtonText: "ยืนยัน"
            }).then(e => {
                if (e.isConfirmed) {
                    route.push("/dashboard/subject");
                } else {
                    route.push("/dashboard/subject");
                }
            })
        } catch (error) {
            console.log(error);
            Swal.close();
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
            <div className="card shadow bg-white">
                <figure className="p-3 border-b">
                    แก้ไขข้อมูลวิชา
                </figure>
                <div className="card-body">
                    <form action={confirm_update} className="grid grid-cols-12 gap-3">
                        <Input type="text" disabled value={id?.toString()} label="รหัสวิชา" placeholder="รหัสวิชา" name="subject_id" id="subject_id" labelPlacement="outside" size="lg" className="col-span-2" />
                        <Input type="text" label="ชื่อวิชา" placeholder="ชื่อวิชา" name="subject_value" id="subject_value" labelPlacement="outside" size="lg" className="col-span-8" value={subjectVal} onChange={(e) => { setSubjectVal(e.target.value) }} />
                        <div className="flex items-end">
                            <Button type="submit" className="w-full text-white" color="success" size="lg">
                                ยืนยัน
                            </Button>
                        </div>
                        <Link href={"/dashboard/subject"} className="flex items-end">
                            <Button className="w-full text-white" color="warning" size="lg">
                                ยกเลิก
                            </Button>
                        </Link>
                    </form>
                </div>
            </div>
        </>
    )
}