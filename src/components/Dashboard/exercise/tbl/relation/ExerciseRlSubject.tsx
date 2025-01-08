"use client";
import React from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
} from "@nextui-org/react";
import { Exercise } from "@/components/Dashboard/subject/table/interface";
import Swal from "sweetalert2";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Root {
    data?: Exercise[];
}

export default function ExerciseRlSubject({ data }: Root) {
    const [page, setPage] = React.useState(1);
    const [searchQuery, setSearchQuery] = React.useState("");
    const rowsPerPage = 5;
    const route = useRouter();

    // กรองข้อมูลจากคำค้นหา
    const filteredData = React.useMemo(() => {
        if (!searchQuery) return data ?? [];
        return (data ?? []).filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.Grade.grade.toLowerCase().includes(searchQuery.toLowerCase()) // ค้นหาจากชื่อหน่วยการเรียนรู้และระดับชั้น
        );
    }, [searchQuery, data]);

    const pages = Math.ceil(filteredData.length / rowsPerPage); // คำนวณจำนวนหน้าใหม่จากข้อมูลที่กรองแล้ว

    // ข้อมูลที่จะแสดงในแต่ละหน้า
    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return filteredData.slice(start, end); // ใช้ข้อมูลที่กรองแล้ว
    }, [page, filteredData]);


    return (
        <div className="mt-5">
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="ค้นหาหน่วยการเรียนรู้หรือระดับชั้น..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input input-bordered w-full"
                />
            </div>

            <Table
                aria-label="Example table with client side pagination and search"
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
                    <TableColumn>ชื่อหน่วยการเรียนรู้</TableColumn>
                    <TableColumn>ระดับชั้น</TableColumn>
                    <TableColumn>สร้างเมื่อ</TableColumn>
                    <TableColumn>แก้ไขล่าสุด</TableColumn>
                </TableHeader>
                <TableBody items={items}>
                    {(item) => (
                        <TableRow key={item.id} className="hover:bg-gray-50">
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.Grade.grade}</TableCell>
                            <TableCell>{new Date(item.create_at).toLocaleString("th-TH", {
                                year: "2-digit",
                                month: "short",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                            }).replace(/,/g, "")}</TableCell>
                            <TableCell>{new Date(item.update_at).toLocaleString("th-TH", {
                                year: "2-digit",
                                month: "short",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                            }).replace(/,/g, "")}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
