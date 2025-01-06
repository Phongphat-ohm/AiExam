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
    getKeyValue,
    Spinner,
} from "@nextui-org/react";
import { ApiGetSubjects, Daum } from "./interface";
import Swal from "sweetalert2";
import axios from "axios";

export default function SubjectTbl() {
    const [page, setPage] = React.useState(1);
    const rowsPerPage = 4;
    const [subjects, setSubjects] = useState<Daum[]>([]);

    const pages = Math.ceil(subjects.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return subjects.slice(start, end);
    }, [page, subjects]);

    useEffect(() => {
        get_subjects();
    }, [])

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
                })
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
            })
        }
    }

    return (
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
            <TableBody items={items} isLoading={subjects.length === 0} emptyContent={"ไม่พบข้อมูลที่ต้องการค้นหา"} loadingContent={<Spinner />}>
                {(item) => (
                    <TableRow key={item.id} className="hover:bg-gray-50">
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{String(item.Exercise.length)}</TableCell>
                        <TableCell>{new Date(item.create_at).toLocaleString("th-TH", { year: "2-digit", month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false }).replace(/,/g, "")}</TableCell>
                        <TableCell>{new Date(item.update_at).toLocaleString("th-TH", { year: "2-digit", month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false }).replace(/,/g, "")}</TableCell>
                        <TableCell>
                            <form action=""></form>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}

