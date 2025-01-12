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
    Button,
    Input,
    Spinner,
} from "@nextui-org/react";
import { FaPencil, FaSpinner, FaTrash } from "react-icons/fa6";
import Link from "next/link";
import { ApiGetExamSet, ExamSet } from "../interface";
import Swal from "sweetalert2";
import axios from "axios";

export default function MainTable() {
    const [page, setPage] = React.useState(1);
    const rowsPerPage = 4;
    const [examSets, setExamSets] = useState<ExamSet[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        get_exam_set();
    }, [])

    const pages = Math.ceil(examSets.length / rowsPerPage);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const filteredItems = React.useMemo(() => {
        return examSets.filter((item) => {
            return (
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.Grade.grade.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.Subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.Exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                new Date(item.create_at).toLocaleString("th-TH").toLowerCase().includes(searchQuery.toLowerCase()) ||
                new Date(item.update_at).toLocaleString("th-TH").toLowerCase().includes(searchQuery.toLowerCase())
            );
        });
    }, [searchQuery, examSets]);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems]);

    const get_exam_set = async () => {
        try {
            setExamSets([]);
            setLoading(true);

            const req = await axios.get("/api/data/exam-set");
            const res: ApiGetExamSet = req.data;

            if (res.status !== 200) {
                Swal.fire({
                    icon: "warning",
                    title: "ระวัง",
                    text: res.message,
                    confirmButtonText: "ลองอีกครั้ง"
                }).then(r => {
                    if (r.isConfirmed) {
                        get_exam_set();
                    } else {
                        get_exam_set();
                    }
                })
            }

            setExamSets(res.data);
            setLoading(false);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "ผิดพลาด",
                text: "มีบางอย่างผิดพลาด",
                confirmButtonText: "ลองอีกครั้ง"
            }).then(e => {
                if (e.isConfirmed) {
                    get_exam_set();
                } else {
                    get_exam_set();
                }
            })
        }
    };

    return (
        <div>
            <div className="py-5 flex items-center gap-3">
                <button className="btn btn-info" onClick={get_exam_set} disabled={isLoading}>
                    {isLoading ? (
                        <FaSpinner className="animate-spin text-white" />
                    ) : (
                        <FaSpinner className="text-white" />
                    )}
                </button>
                <Link className="btn btn-success font-normal text-white" href={"/dashboard/exam/set/new"}>เพิ่มชุดข้อสอบ</Link>
                <input type="text" placeholder="ค้นหาชุดข้อสอบ..." value={searchQuery} onChange={handleSearch} className="input input-bordered w-full" />
            </div>
            {/* <Input
                aria-label="Search Exam Sets"
                placeholder="ค้นหาชุดข้อสอบ"
                value={searchQuery}
                onChange={handleSearch}
                clearable
                underlined
                fullWidth
                className="mb-4"
            /> */}
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
                    <TableColumn>ชื่อชุดข้อสอบ</TableColumn>
                    <TableColumn>ระดับชั้น</TableColumn>
                    <TableColumn>วิชา</TableColumn>
                    <TableColumn>หน่วยการเรียนรู้</TableColumn>
                    <TableColumn>สร้างเมื่อ</TableColumn>
                    <TableColumn>แก้ไขล่าสุด</TableColumn>
                    <TableColumn>Action</TableColumn>
                </TableHeader>
                <TableBody items={items} isLoading={isLoading} emptyContent={"ไม่พบข้อมูลที่ต้องการค้นหา"} loadingContent={<Spinner />}>
                    {(item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.Grade.grade}</TableCell>
                            <TableCell>{item.Subject.name}</TableCell>
                            <TableCell>{item.Exercise.name}</TableCell>
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
                                    <Link href={"/dashboard/exam/set/" + item.id}>
                                        <Button size="sm" isIconOnly color="warning" className="text-white">
                                            <FaPencil />
                                        </Button>
                                    </Link>
                                    <form>
                                        <Button
                                            type="submit"
                                            size="sm"
                                            isIconOnly
                                            color="danger"
                                            name="exercise_id"
                                            id="exercise_id"
                                            value={item.id}
                                            className="text-white"
                                        >
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
