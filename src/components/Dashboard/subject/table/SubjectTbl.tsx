"use client"
import React, { useEffect, useState } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
    Spinner,
    Input,
    Button,
} from "@nextui-org/react";
import { ApiGetSubjects, Daum } from "./interface";
import Swal from "sweetalert2";
import axios from "axios";
import { FaPencil, FaSpinner, FaTrash } from "react-icons/fa6";
import Link from "next/link";

export default function SubjectTbl() {
    const [page, setPage] = React.useState(1);
    const rowsPerPage = 4;
    const [subjects, setSubjects] = useState<Daum[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>(""); // เพิ่ม state สำหรับคำค้นหา

    const pages = Math.ceil(subjects.length / rowsPerPage);

    // กรองข้อมูลตามคำค้นหา
    const filteredSubjects = React.useMemo(() => {
        return subjects.filter((subject) =>
            subject.name.toLowerCase().includes(searchQuery.toLowerCase()) // กรองตามชื่อวิชา
        );
    }, [searchQuery, subjects]);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredSubjects.slice(start, end); // ใช้ filteredSubjects แทน subjects
    }, [page, filteredSubjects]);

    useEffect(() => {
        get_subjects();
    }, []);

    const get_subjects = async () => {
        try {
            const req = await axios.get("/api/data/subjects");
            const res: ApiGetSubjects = req.data;

            if (res.status !== 200) {
                Swal.close();
                Swal.fire({
                    icon: "warning",
                    title: "ระวัง",
                    text: res.message,
                    confirmButtonText: "ลองอีกครั้ง"
                });
                return;
            }

            setSubjects(res.data);
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "ผิดพลาด",
                text: "มีบางอย่างผิดพลาด",
                confirmButtonText: "ลองอีกครั้ง",
            });
        }
    };

    const confirm_ev = async (text: string) => {
        const alert = await Swal.fire({
            icon: "info",
            title: text,
            showCancelButton: true,
            confirmButtonText: "ยืนยัน",
            cancelButtonText: "ยกเลิก"
        })

        if (alert.isConfirmed) {
            return true;
        } else {
            return false;
        }
    }

    const remove_subject = async (ev: FormData) => {
        Swal.fire({
            title: "กำลังโหลดข้อมูล",
            didOpen: () => {
                Swal.showLoading();
            },
            allowOutsideClick: false
        })

        const id = ev.get("id");
        const check_subject = await axios.get("/api/data/subject/" + id)
        const check_subject_res = check_subject.data;

        if (check_subject_res.status !== 200) {
            Swal.close();
            Swal.fire({
                icon: "warning",
                title: "ระวัง",
                text: check_subject_res.message,
                confirmButtonText: "ลองอีกครั้ง"
            })
            return;
        }

        const confirm = await confirm_ev("ยืนยันการลบวิชาหรือไม่");

        if (confirm) {
            Swal.fire({
                title: "กำลังลบข้อมูล",
                didOpen: () => {
                    Swal.showLoading();
                },
                allowOutsideClick: false
            })


            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: '/api/data/subject/delete?id=' + id,
                headers: {}
            };

            const del_subject = await axios(config);
            const response = del_subject.data

            if (del_subject.status !== 200) {
                Swal.close();
                Swal.fire({
                    icon: "warning",
                    title: "ระวัง",
                    text: response.message,
                    confirmButtonText: "ลองอีกครั้ง"
                })
                return;
            }

            Swal.close();
            Swal.fire({
                icon: "success",
                title: "สำเร็จ",
                text: response.message,
                confirmButtonText: "ยืนยัน"
            }).then(r => {
                if (r.isConfirmed) {
                    setSubjects([]);
                    get_subjects();
                } else {
                    setSubjects([]);
                    get_subjects();
                }
            })
        }


    }

    return (
        <div>
            {/* ช่องกรอกคำค้นหา */}
            <div className="mb-4 flex gap-3 mt-5">
                <button disabled={subjects.length === 0} className="btn btn-warning tooltip tooltip-right" data-tip={"โหลดข้อมูลใหม่"} onClick={() => {
                    setSubjects([]);
                    get_subjects();
                }}>
                    {subjects.length === 0 ? (
                        <FaSpinner className="animate-spin text-white" />
                    ) : (
                        <FaSpinner className="text-white" />
                    )}
                </button>
                <Link href={"/dashboard/subject/new"} className="btn btn-success font-normal text-white">เพิ่มวิชา</Link>
                <input type="text" className="input input-bordered w-full" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="พิมพ์คำค้นหาที่นี่?" />
            </div>

            <Table
                aria-label="Example table with client side pagination"
                bottomContent={
                    <div className="flex w-full justify-center">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="secondary"
                            page={page}
                            total={pages}
                            onChange={(page) => setPage(page)}
                        />
                    </div>
                }
                classNames={{
                    wrapper: "min-h-[222px]",
                }}
            >
                <TableHeader>
                    <TableColumn>#</TableColumn>
                    <TableColumn>ชื่อวิชา</TableColumn>
                    <TableColumn>จำนวนหน่วยการเรียนรู้</TableColumn>
                    <TableColumn>สร้างเมื่อ</TableColumn>
                    <TableColumn>แก้ไขล่าสุด</TableColumn>
                    <TableColumn>Action</TableColumn>
                </TableHeader>
                <TableBody
                    items={items}
                    isLoading={subjects.length === 0} // แสดงโหลดเมื่อไม่มีข้อมูล
                    emptyContent={"ไม่พบข้อมูลที่ต้องการค้นหา"}
                    loadingContent={<Spinner />}
                >
                    {(item) => (
                        <TableRow key={item.id} className="hover:bg-gray-50">
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{String(item.Exercise.length)}</TableCell>
                            <TableCell>
                                {new Date(item.create_at).toLocaleString("th-TH", {
                                    year: "2-digit",
                                    month: "short",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                }).replace(/,/g, "")}
                            </TableCell>
                            <TableCell>
                                {new Date(item.update_at).toLocaleString("th-TH", {
                                    year: "2-digit",
                                    month: "short",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                }).replace(/,/g, "")}
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-3">
                                    <Link href={"/dashboard/subject/" + item.id}>
                                        <Button type="submit" color="warning" size="sm" isIconOnly className="text-white">
                                            <FaPencil />
                                        </Button>
                                    </Link>
                                    <form action={remove_subject}>
                                        <input type="hidden" name="id" id="id" value={item.id} />
                                        <Button type="submit" color="danger" size="sm" isIconOnly className="text-white">
                                            <FaTrash />
                                        </Button>
                                    </form>
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
