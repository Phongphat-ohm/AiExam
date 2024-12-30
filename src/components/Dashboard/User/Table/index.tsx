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
    getKeyValue,
    Button,
    Spinner,
} from "@nextui-org/react";
import { FaPencil, FaTrash } from "react-icons/fa6";
import axios from "axios";
import Swal from "sweetalert2";
import { User } from "./interface";
import Link from "next/link";


export default function UserTable() {
    const [page, setPage] = React.useState(1);
    const [users, setUsers] = useState<User[]>([]);
    const rowsPerPage = 10;

    const pages = Math.ceil(users.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return users.slice(start, end);
    }, [page, users]);

    const get_user = async () => {
        const request = await axios.get("/api/data/users");
        const data = request.data;

        if (data.status !== 200) {
            Swal.fire({
                icon: "error",
                title: "ผิดพลาด",
                text: "ไม่สามารถดึงข้อมูลได้",
                confirmButtonText: "ลองอีกครั้ง"
            }).then(r => {
                if (r.isConfirmed) {
                    get_user()
                }
            })
        }

        setUsers(data.data);
    }

    useEffect(() => {
        get_user();
    }, [])

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
                <TableColumn key="id">#</TableColumn>
                <TableColumn key="first_name">ชื่อ</TableColumn>
                <TableColumn key="last_name">นามสกุล</TableColumn>
                <TableColumn key="email">อีเมล</TableColumn>
                <TableColumn key="username">ชื่อผู้ใช้</TableColumn>
                <TableColumn key="password">รหัสผ่าน</TableColumn>
                <TableColumn key="role">ฐานะ</TableColumn>
                <TableColumn key="grade">ระดับชั้นเรียน</TableColumn>
                <TableColumn key="point">คะแนน</TableColumn>
                <TableColumn key="rank">แรงค์</TableColumn>
                <TableColumn key="create_at">สร้างบัญชีเมื่อ</TableColumn>
                <TableColumn key="update_at">แก้ไขล่าสุดเมื่อ</TableColumn>
                <TableColumn key="action">Action</TableColumn>
            </TableHeader>
            <TableBody items={items} isLoading={users.length == 0 ? true : false} loadingContent={<Spinner />}>
                {users.map((val, key) => (
                    <TableRow key={key} className="hover:bg-gray-50">
                        <TableCell>{val.id}</TableCell>
                        <TableCell>{val.first_name}</TableCell>
                        <TableCell>{val.last_name}</TableCell>
                        <TableCell>{val.email}</TableCell>
                        <TableCell>{val.username}</TableCell>
                        <TableCell>********</TableCell>
                        <TableCell>{val.role}</TableCell>
                        <TableCell>{val.Grade?.grade}</TableCell>
                        <TableCell>{val.point}</TableCell>
                        <TableCell>{val.Rank?.rank}</TableCell>
                        <TableCell>{val.create_at}</TableCell>
                        <TableCell>{val.update_at}</TableCell>
                        <TableCell>
                            <div className="flex gap-2 items-center">
                                <Link href={"/dashboard/user/update/" + val.id}>
                                    <Button isIconOnly color="warning" className="text-white" size="sm">
                                        <FaPencil />
                                    </Button>
                                </Link>
                                <Button isIconOnly color="danger" size="sm" >
                                    <FaTrash />
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

