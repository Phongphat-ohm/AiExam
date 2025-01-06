"use client";
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
    Button,
    Input,
} from "@nextui-org/react";
import Swal from "sweetalert2";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaPencil, FaSpinner, FaTrash } from "react-icons/fa6";


interface GradeProp {
    grade: string;
    id: number;
    create_at: Date;
    update_at: Date;
}

export default function App() {
    const [page, setPage] = React.useState(1);
    const rowsPerPage = 6;
    const [grades, setGrades] = useState<GradeProp[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const route = useRouter();

    const pages = Math.ceil(grades.length / rowsPerPage);

    const items = React.useMemo(() => {
        const filteredGrades = grades.filter(grade =>
            grade.grade.toLowerCase().includes(searchQuery.toLowerCase())
        );

        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredGrades.slice(start, end);
    }, [page, grades, searchQuery]);

    useEffect(() => {
        get_grade();
    }, [])

    const get_grade = async () => {
        try {
            const req = await axios.get("/api/data/grade");
            const res = req.data;

            if (res.status !== 200) {
                Swal.fire({
                    icon: "warning",
                    title: "ระวัง",
                    text: res.message,
                    confirmButtonText: "ลองอีกครั้ง"
                }).then(r => {
                    if (r.isConfirmed) {
                        route.refresh()
                    } else {
                        route.refresh()
                    }
                })
                return;
            }

            setGrades(res.data);
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "ผิดพลาด",
                text: "มีบางอย่างผิดพลาด",
                confirmButtonText: "ลองอีกครั้ง"
            }).then(r => {
                if (r.isConfirmed) {
                    route.refresh()
                } else {
                    route.refresh()
                }
            })
            return;
        }
    }

    const action = async (action: string, id: string) => {
        if (action == "edit") {
            edit_grade(id);
            return;
        }

        if (action == "delete") {
            delete_grade(id);
            return;
        }

        Swal.fire({
            icon: "warning",
            title: "ระวัง",
            text: "ไม่มีการกระทำนี้",
            confirmButtonText: "ลองอีกครั้ง"
        })
    }

    const delete_grade = async (id: string) => {
        try {
            Swal.fire({
                title: "กำลังดึงข้อมูลระดับชั้น",
                didOpen: () => {
                    Swal.showLoading()
                },
                allowOutsideClick: false
            })

            const req_data = await axios.get("/api/data/grade/" + id)
            const res_data = req_data.data;

            if (res_data.status !== 200) {
                Swal.fire({
                    icon: "warning",
                    title: "ระวัง",
                    text: res_data.message,
                    confirmButtonText: "ลองอีกครั้ง"
                })
                return;
            }

            const alert = await Swal.fire({
                icon: "info",
                title: "คุณต้องการลบข้อมูลระดับชั้นหรือเปล่า",
                showCancelButton: true,
                confirmButtonText: "ยืนยัน",
                cancelButtonText: "ยกเลิก"
            })

            if (alert.isConfirmed) {
                Swal.fire({
                    title: "กำลังลบข้อมูลระดับชั้น",
                    didOpen: () => {
                        Swal.showLoading()
                    },
                    allowOutsideClick: false
                })

                const req_del = await axios.get("/api/data/grade/delete?id=" + id);
                const del_data = req_del.data;

                if (del_data.status !== 200) {
                    Swal.fire({
                        icon: "warning",
                        title: "ระวัง",
                        text: del_data.message,
                        confirmButtonText: "ลองอีกครั้ง"
                    })
                    return;
                }

                Swal.fire({
                    icon: "success",
                    title: "สำเร็จ",
                    text: del_data.message,
                    confirmButtonText: "ยืนยัน"
                })
                setGrades([]);
                get_grade()
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "ผิดพลาด",
                text: "มีบางอย่างผิดพลาด",
                confirmButtonText: "ลองอีกครั้ง"
            })
        }
    }

    const edit_grade = async (id: string) => {
        try {
            Swal.fire({
                title: "กำลังดึงข้อมูลระดับชั้น",
                didOpen: () => {
                    Swal.showLoading()
                },
                allowOutsideClick: false
            })

            const req_data = await axios.get("/api/data/grade/" + id)
            const res_data = req_data.data;

            if (res_data.status !== 200) {
                Swal.fire({
                    icon: "warning",
                    title: "ระวัง",
                    text: res_data.message
                })
                return;
            }

            const grade_data = res_data.data;

            Swal.fire({
                title: "แก้ไขระดับชั้น",
                input: "text",
                inputValue: grade_data.grade,
                showCancelButton: true,
                confirmButtonText: "ยืนยัน",
                cancelButtonText: "ยกเลิก",
                allowOutsideClick: false
            }).then(r => {
                if (r.isConfirmed) {
                    const val = r.value;
                    confirm_edit(id, val);
                }
            })

        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "ผิดพลาด",
                text: "มีบางอย่างผิดพลาด",
                confirmButtonText: "ลองอีกครั้ง"
            })
        }
    }

    const confirm_edit = async (id: string, value: string) => {
        try {
            Swal.fire({
                title: "กำลังแก้ไขข้อมูล",
                didOpen: () => {
                    Swal.showLoading()
                },
                allowOutsideClick: false
            })

            let data = JSON.stringify({
                "id": id,
                "text": value
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: '/api/data/grade/update',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const req = await axios(config);
            const res = req.data;

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

            Swal.fire({
                icon: "success",
                title: "สำเร็จ",
                text: res.message
            })
            get_grade();
            setGrades([]);  // Optionally, clear grades to reload fresh data
            return;
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "ผิดพลาด",
                text: "มีบางอย่างผิดพลาด",
                confirmButtonText: "ลองอีกครั้ง",
            })
        }
    }

    return (
        <div className="mt-5 card bg-white">
            <div className="card-body p-3">
                <div className="flex gap-2 items-center">
                    <button className="tooltip btn btn-info tooltip-right text-white" disabled={grades.length === 0} data-tip="โหลดข้อมูลอีกครั้ง" onClick={() => {
                        setGrades([]);
                        get_grade();
                    }}>
                        {grades.length === 0 ? (
                            <FaSpinner className="animate-spin" />
                        ) : (
                            <FaSpinner />
                        )}
                    </button>
                    <input type="text" className="input input-bordered w-full" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="ค้นหาระดับชั้นที่นี่?" />
                </div>
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
                    <TableColumn>ชื่อระดับ</TableColumn>
                    <TableColumn>สร้างเมื่อ</TableColumn>
                    <TableColumn>แก้ไขล่าสุด</TableColumn>
                    <TableColumn>Action</TableColumn>
                </TableHeader>
                <TableBody items={items} loadingContent={<Spinner />} isLoading={grades.length === 0} emptyContent={"ไม่พบข้อมูลที่ต้องการค้นหา"}>
                    {(item) => (
                        <TableRow key={item.id} className="hover:bg-gray-50">
                            <TableCell width={"5%"}>{item.id}</TableCell>
                            <TableCell width={"50%"}>{item.grade}</TableCell>
                            <TableCell>{new Date(item.create_at).toLocaleString("th-TH", { year: "2-digit", month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false }).replace(/,/g, "")} </TableCell>
                            <TableCell>{new Date(item.update_at).toLocaleString("th-TH", { year: "2-digit", month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false }).replace(/,/g, "")} </TableCell>
                            <TableCell className="flex gap-2">
                                <form action={() => action("edit", item.id.toString())}>
                                    <Button type="submit" value={"edit"} isIconOnly color="warning" size="sm" name="action" id="action">
                                        <FaPencil className="text-white" />
                                    </Button>
                                </form>
                                <form action={() => action("delete", item.id.toString())}>
                                    <Button type="submit" value={"delete"} isIconOnly color="danger" size="sm" name="action" id="action">
                                        <FaTrash />
                                    </Button>
                                </form>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
