"use client";
import React, { useState, useMemo, useEffect } from "react";
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
} from "@nextui-org/react";
import { ApiExerciseResponse, Exercise } from "./interface";
import { FaPencil, FaSpinner, FaTrash } from "react-icons/fa6";
import Swal from "sweetalert2";
import axios from "axios";
import Link from "next/link";

export default function ExerciseTbl() {
    const [page, setPage] = React.useState(1);
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState<string>(""); // New state for search term
    const rowsPerPage = 10;

    useEffect(() => {
        get_exercise();
    }, [])

    // Filter exercises based on the search term
    const filteredExercises = useMemo(() => {
        return exercises.filter((item) => {
            return (
                item.id.toString().includes(searchTerm) ||
                item.Subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.Grade.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.ExamSet.length.toString().includes(searchTerm) ||
                new Date(item.create_at).toLocaleString("th-TH", { year: "2-digit", month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false }).includes(searchTerm) ||
                new Date(item.update_at).toLocaleString("th-TH", { year: "2-digit", month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false }).includes(searchTerm)
            );
        });
    }, [searchTerm, exercises]);

    const pages = Math.ceil(filteredExercises.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredExercises.slice(start, end);
    }, [page, filteredExercises]);

    const get_exercise = async () => {
        try {
            const request = await axios.get("/api/data/exercises");
            const response: ApiExerciseResponse = request.data;

            if (response.status !== 200) {
                Swal.fire({
                    icon: "warning",
                    title: "ระวัง",
                    text: response.message,
                    confirmButtonText: "ลองอีกครั้ง"
                })
            }

            setLoading(false);
            setExercises(response.data)
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: "error",
                title: "ผิดพลาด",
                text: "มีบางอย่างผิดพลาด",
                confirmButtonText: "ลองอีกครั้ง"
            })
        }
    }

    const reload_data = () => {
        setLoading(true);
        setExercises([]);
        get_exercise();
    }

    const delete_exercise = async (data: FormData) => {
        try {
            const alert = await Swal.fire({
                icon: "info",
                title: "ต้องการลบหรือไม่",
                showCancelButton: true,
                confirmButtonText: "ยืนยัน",
                cancelButtonText: "ยกเลิก"
            })

            if (alert.isConfirmed) {

                Swal.fire({
                    title: "กำลังลบข้อมูล",
                    didOpen: () => {
                        Swal.showLoading();
                    },
                    allowOutsideClick: true
                })

                const id = data.get("exercise_id");

                const req = await axios.get("/api/data/exercise/delete?id=" + id);
                const res = req.data;

                if (res.status !== 200) {
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
                    text: res.message,
                    confirmButtonText: "ยืนยัน"
                })

                get_exercise();
                setExercises([]);
                setLoading(true);
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "ผิดพลาด",
                text: "มีบางอย่างผิดพลาด",
                confirmButtonText: "ลองอีกครั้ง"
            })
            return;
        }
    }

    return (
        <div>
            <div className="mb-4 flex gap-3 items-center">
                <button onClick={reload_data} className="btn btn-info text-white font-normal tooltip tooltip-right" data-tip="กดเพื่อโหลดข้อมูลไหม่">
                    {isLoading ? (
                        <FaSpinner className="animate-spin" />
                    ) : (
                        <FaSpinner />
                    )}
                </button>
                <Link href={"/dashboard/exercise/new"} className="btn btn-success font-normal text-white">
                    เพิ่มสาระการเรียนรู้
                </Link>
                <input
                    type="text"
                    placeholder="ค้นหาข้อมูล..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input input-bordered w-full"
                />
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
                    <TableColumn>ระดับชั้น</TableColumn>
                    <TableColumn>ชื่อหน่วยการเรียนรู้</TableColumn>
                    <TableColumn>จำนวนชุดข้อสอบ</TableColumn>
                    <TableColumn>สร้างเมื่อ</TableColumn>
                    <TableColumn>แก้ไขล่าสุดเมื่อ</TableColumn>
                    <TableColumn>Action</TableColumn>
                </TableHeader>
                <TableBody items={items} emptyContent="ไม่พบข้อมูลที่ค้นหา" isLoading={isLoading} loadingContent={<Spinner />}>
                    {(item) => (
                        <TableRow key={item.id} className="hover:bg-gray-50">
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.Subject.name}</TableCell>
                            <TableCell>{item.Grade.grade}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.ExamSet.length.toString()}</TableCell>
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
                                    <Link href={"/dashboard/exercise/" + item.id}>
                                        <Button size="sm" isIconOnly color="warning" className="text-white">
                                            <FaPencil />
                                        </Button>
                                    </Link>
                                    <form action={delete_exercise}>
                                        <Button type="submit" size="sm" isIconOnly color="danger" name="exercise_id" id="exercise_id" value={item.id} className="text-white">
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
