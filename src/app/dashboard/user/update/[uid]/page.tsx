// @ts-nocheck
"use client"
import Layout from "@/components/Dashboard/Layout";
import { Autocomplete, AutocompleteItem, Input, Radio, RadioGroup, Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation"
import Swal from "sweetalert2";
import { ApiResponseProps, Data, Grade, Rank } from "./interface";
import { useEffect, useState } from "react";
import GradeSelected from "@/components/Signup/GradeSelected";
import RankSelected from "@/components/Dashboard/User/RankSelected";

export default function UpdateUser() {
    const { uid } = useParams();
    const route = useRouter();
    const [user, setUser] = useState<Data>();
    const [grade, setGrade] = useState<Grade[]>([]);
    const [rank, setRank] = useState<Rank[]>([]);

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [role, setRole] = useState("user");
    const [point, setPoint] = useState();

    useEffect(() => {
        get_user();
    }, [])

    const get_user = async () => {
        try {
            const request = await axios.get("/api/data/user/" + uid);
            const data: ApiResponseProps = request.data;

            if (data.status !== 200) {
                Swal.fire({
                    icon: "warning",
                    title: "ระวัง",
                    text: data.message,
                    confirmButtonText: "ลองอีกครั้ง"
                }).then(r => {
                    if (r.isConfirmed) {
                        route.push("/dashboard/user")
                    } else {
                        route.push("/dashboard/user")
                    }
                })
                return;
            }

            setUser(data.data);
            setFirstName(data.data.first_name);
            setLastName(data.data.last_name);
            setEmail(data.data.email);
            setUsername(data.data.username);
            setPassword(data.data.password);
            setRole(data.data.role);
            setPoint(data.data.point);
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: "error",
                title: "ผิดพลาด",
                text: "ไม่สามารถดึงข้อมูลผู้ใช้ได้"
            })
        }
    }

    const confirm_edit = async (ev: FormData) => {
        Swal.fire({
            title: "กำลังแก้ไขข้อมูล",
            didOpen: () => {
                Swal.showLoading()
            },
            allowOutsideClick: false
        })

        try {

            const first_name = ev.get("first_name");
            const last_name = ev.get("last_name");
            const email = ev.get("email");
            const username = ev.get("username");
            const password = ev.get("password");
            const grade = ev.get("grade");
            const rank = ev.get("rank");
            const role = ev.get("role");
            const point = ev.get("point");

            let data = JSON.stringify({
                "id": Number(uid),
                "first_name": first_name,
                "last_name": last_name,
                "email": email,
                "username": username,
                "password": password,
                "rank": rank,
                "grade": grade,
                "role": role,
                "point": point
            });

            console.log(data);

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: '/api/data/user/update',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const response = await axios.request(config);

            if (response.status !== 200) {
                Swal.close();
                Swal.fire({
                    icon: "warning",
                    title: "ระวัง",
                    text: response.data.message,
                    confirmButtonText: "ลองอีกครั้ง"
                }).then(r => {
                    if (r.isConfirmed) {
                        route.push("/dashboard/user")
                    } else {
                        route.push("/dashboard/user")
                    }
                })
                return;
            }

            Swal.close();
            Swal.fire({
                icon: "success",
                title: "สำเร็จ",
                text: response.data.message,
                confirmButtonText: "ยืนยัน"
            }).then(r => {
                if (r.isConfirmed) {
                    route.push("/dashboard/user")
                } else {
                    route.push("/dashboard/user")
                }
            })
            return;
        } catch (error) {
            Swal.close();
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "ผิดพลาด",
                text: "เซิฟเวอร์ผิดพลาด",
                confirmButtonText: "ลองอีกครั้ง"
            })
        }
    }

    const edit_user = (data: FormData) => {
        Swal.fire({
            icon: "info",
            title: "ยืนยัน",
            text: "คุณต้องการแก้ไขข้อมูลผู้ใช้นี้หรือไม่",
            showCancelButton: true,
            confirmButtonText: "ยืนยัน",
            cancelButtonText: "ยกเลิก"
        }).then(r => {
            if (r.isConfirmed) {
                confirm_edit(data)
            }
        })
    }

    const copy_text = (text: string) => {
        console.log('text', text)
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                console.log('Text successfully copied to clipboard!');
            }).catch((error) => {
                console.error('Failed to copy text: ', error);
            });
        } else {
            var textField = document.createElement('textarea');
            textField.innerText = text;
            document.body.appendChild(textField);
            textField.select();
            document.execCommand('copy');
            textField.remove();
        }
    }


    return (
        <>
            <Layout>
                <div className="pt-20 px-5" >
                    <div className="card w-full shadow bg-white">
                        <figure className="p-3 border-b text-sm flex justify-start items-center">
                            แก้ไขข้อมูลส่วนตัวผู้ใช้
                        </figure>
                        <form action={edit_user} className="card-body">
                            <div className="grid grid-cols-12 gap-3">
                                <div className="col-span-12 flex flex-col items-center justify-center ">
                                    <button type="button" className="cursor-pointer tooltip" data-tip="กดเพื่อดู profile URL" onClick={() => { document.getElementById("profile_url_modal").showModal() }} >
                                        <img src={user?.gravatar} className="w-52 h-52 border-2 border-blue-500 rounded-full p-1" alt="user profile" />
                                    </button>
                                </div>
                                <Input type="text" label="รหัสสมาชิก" labelPlacement="outside" placeholder="รหัสสมาชิก" value={uid?.toString()} disabled className="col-span-2" size="lg" isRequired required />
                                <Input type="number" label="แต้ม" labelPlacement="outside" placeholder="แต้ม" value={point} onChange={(e) => { setPoint(e.target.value) }} className="col-span-1" size="lg" isRequired required name="point" />
                                <Input type="text" autoComplete="off" value={firstName} label="ชื่อ" labelPlacement="outside" placeholder="ชื่อ" className="col-span-4" size="lg" isRequired required name="first_name" onChange={(e) => {
                                    setFirstName(e.target.value)
                                }} />
                                <Input type="text" value={lastName} autoComplete="off" label="นามสกุล" labelPlacement="outside" placeholder="นามสกุล" className="col-span-5" size="lg" isRequired required name="last_name" onChange={(e) => {
                                    setLastName(e.target.value)
                                }} />
                                <Input type="text" value={email} label="อีเมล" autoComplete="off" labelPlacement="outside" placeholder="อีเมล" className="col-span-4" size="lg" name="email" onChange={(e) => {
                                    setEmail(e.target.value)
                                }} />
                                <Input type="text" value={username} label="ชื่อผู้ใช้" autoComplete="off" labelPlacement="outside" placeholder="ชื่อผู้ใช้" className="col-span-4" size="lg" isRequired required name="username" onChange={(e) => {
                                    setUsername(e.target.value)
                                }} />
                                <Input type="text" label="รหัสผ่าน" labelPlacement="outside" autoComplete="off" placeholder="รหัสผ่าน" className="col-span-4" size="lg" name="password" onChange={(e) => {
                                    setPassword(e.target.value)
                                }} />
                                <label className="col-span-4">ระดับชั้นของเขาคือ <label className="text-warning text-lg">{user?.Grade.grade}</label></label>
                                <label className="col-span-4">แรงค์ของเขาคือ <label className="text-info text-lg">{user?.Rank.rank}</label></label>
                                <label className="col-span-4">ฐานะของผู้ใช้คือ <label className="text-primary text-lg">{user?.role == "admin" ? "แอดมิน" : "ผู้ใช้"}</label></label>
                                <div className="col-span-4 grid grid-cols-2 tooltip" data-tip="หากไม่ต้องการแก้ไขให้เลือกตามข้อมูลด้านบน">
                                    <GradeSelected />
                                </div>
                                <div className="col-span-4 grid grid-cols-2 tooltip" data-tip="หากไม่ต้องการแก้ไขให้เลือกตามข้อมูลด้านบน">
                                    <RankSelected />
                                </div>
                                <div className="col-span-4 tooltip" data-tip="หากไม่ต้องการแก้ไขให้เลือกตามข้อมูลด้านบน">
                                    <Select size="lg" defaultSelectedKeys={user?.role} required isRequired className="w-full" label="ฐานะผู้ใช้" labelPlacement="outside" placeholder="ฐานะผู้ใช้" name="role">
                                        <SelectItem key={"user"} value={"user"}>ผู้ใช้</SelectItem>
                                        <SelectItem key={"admin"} value={"admin"}>แอดมิน</SelectItem>
                                    </Select>
                                </div>
                            </div>
                            <div className="mt-3 flex items-center justify-start gap-3">
                                <Link href={"/dashboard/user"} className="btn btn-warning font-normal">ยกเลิก</Link>
                                <button className="btn btn-success font-normal text-white">
                                    ยืนยัน
                                </button>
                            </div>
                        </form>
                    </div>
                </div >
                <dialog id="profile_url_modal" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <h1 className="text-center text-xl">
                            ข้อมูล Profile จาก Gravatar
                        </h1>
                        <div className="join w-full mt-5">
                            <input className="input input-bordered join-item w-full" placeholder="Email" readOnly defaultValue={"https://gravatar.com/avatar/69abd491a5fdcdcda25e1215230b50688d75603ab964afca2b333881a80ecd9f"} />
                            <button className="btn join-item" onClick={() => { copy_text("https://gravatar.com/avatar/69abd491a5fdcdcda25e1215230b50688d75603ab964afca2b333881a80ecd9f") }}>คัดลอก</button>
                        </div>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </Layout >
        </>
    )
}