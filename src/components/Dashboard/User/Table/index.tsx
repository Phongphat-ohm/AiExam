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
    Button,
    Spinner,
} from "@nextui-org/react";
import { FaPencil, FaTrash } from "react-icons/fa6";
import axios from "axios";
import Swal from "sweetalert2";
import { User } from "./interface";
import Link from "next/link";

export default function UserTable() {
    const [page, setPage] = useState(1);
    const [users, setUsers] = useState<User[]>([]);
    const [filter, setFilter] = useState("");
    const rowsPerPage = 10;

    const pages = Math.ceil(users.length / rowsPerPage);

    const filteredUsers = React.useMemo(() => {
        if (!filter) return users;
        return users.filter(
            (user) =>
                user.first_name.toLowerCase().includes(filter.toLowerCase()) ||
                user.last_name.toLowerCase().includes(filter.toLowerCase()) ||
                user.email.toLowerCase().includes(filter.toLowerCase())
        );
    }, [filter, users]);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return filteredUsers.slice(start, end);
    }, [page, filteredUsers]);

    const get_user = async () => {
        const request = await axios.get("/api/data/users");
        const data = request.data;

        if (data.status !== 200) {
            Swal.fire({
                icon: "error",
                title: "ผิดพลาด",
                text: "ไม่สามารถดึงข้อมูลได้",
                confirmButtonText: "ลองอีกครั้ง",
            }).then((r) => {
                if (r.isConfirmed) {
                    get_user();
                }
            });
        }

        setUsers(data.data);
    };

    useEffect(() => {
        get_user();
    }, []);

    const confirm_delete_user = async (token: string, uid: any) => {
        Swal.fire({
            title: "กำลังลบ",
            didOpen: () => {
                Swal.showLoading()
            },
            allowOutsideClick: false
        })

        try {
            let data = JSON.stringify({
                "token": token
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: '/api/data/remove/user?uid=' + uid + '&type=confirm',
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
                text: res.message,
                confirmButtonText: "ยืนยัน"
            }).then(r => {
                if (r.isConfirmed) {
                    window.location.reload();
                } else {
                    window.location.reload();
                }
            })
        } catch (error) {
            console.log(error)
            Swal.close();
            Swal.fire({
                icon: "error",
                title: "ผิดพลาด",
                text: "เซิฟเวอร์ผิดพลาด",
                confirmButtonText: "ลองอีกครั้ง"
            })

            return;
        }
    }

    const create_delete = async (form: FormData) => {
        Swal.fire({
            title: "รอสักครู่",
            didOpen: () => {
                Swal.showLoading()
            },
            allowOutsideClick: false
        })

        try {
            const uid = form.get("remove_id");
            let data = JSON.stringify({});

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: '/api/data/remove/user?uid=' + uid + '&type=delete',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const request = await axios(config);
            const res = request.data;

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
                icon: "info",
                title: "ยืนยัน",
                text: "คุณต้องการลบผู้ใช้ ใช่หรือไม่",
                confirmButtonText: "ยืนยัน",
                showCancelButton: true,
                cancelButtonText: "ยกเลิก"

            }).then(r => {
                if (r.isConfirmed) {
                    confirm_delete_user(res.token, uid);
                } else {
                    Swal.fire({
                        icon: "success",
                        title: "ยกเลิกแล้ว",
                        text: "ยกเลิกการลบผู้ใช้แล้ว"
                    })
                    return;
                }
            })
        } catch (error) {
            console.log(error)
            Swal.close();
            Swal.fire({
                icon: "error",
                title: "ผิดพลาด",
                text: "เซิฟเวอร์ผิดพลาด",
                confirmButtonText: "ลองอีกครั้ง"
            })

            return;
        }

    }

    const reload_data = () => {
        setUsers([]);
        get_user();
    }

    return (
        <div>
            <div className="mb-4 flex gap-2 items-center">
                <Link href={"/dashboard/user/new"} className="btn btn-success font-normal text-white">สมัครสมาชิก</Link>
                <button className="btn btn-primary" onClick={reload_data}>
                    โหลดข้อมูลผู้ใช้อีกครั้ง
                </button>
                <input
                    type="text"
                    placeholder="ค้นหา..."
                    className="input input-bordered w-full"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
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
                <TableBody emptyContent={"ไม่พบข้อมูลผู้ใช้ที่ค้นหา"} items={items} isLoading={users.length === 0} loadingContent={<Spinner />}>
                    {items.map((val, key) => (
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
                            <TableCell>{new Date(val.create_at).toLocaleString("th-TH", { year: "2-digit", month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false }).replace(/,/g, "")}</TableCell>
                            <TableCell>{new Date(val.update_at).toLocaleString("th-TH", { year: "2-digit", month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false }).replace(/,/g, "")}</TableCell>
                            <TableCell>
                                <div className="flex gap-2 items-center">
                                    <Link href={"/dashboard/user/update/" + val.id}>
                                        <Button isIconOnly color="warning" className="text-white" size="sm">
                                            <FaPencil />
                                        </Button>
                                    </Link>
                                    <form action={create_delete}>
                                        <Button type="submit" isIconOnly color="danger" size="sm" name="remove_id" value={val.id}>
                                            <FaTrash />
                                        </Button>
                                    </form>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
