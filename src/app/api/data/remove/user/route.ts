import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const query = new URL(req.url).searchParams;
        const uid = query.get("uid");
        const type = query.get("type");

        const check_user = await prisma.user.findFirst({
            where: {
                id: Number(uid)
            }
        })

        if (!check_user) {
            return Response.json({
                status: 400,
                message: "ไม่พบผู้ใช้นี้"
            })
        }

        if (type == "delete") {
            const create_delete_token = jwt.sign({ type: "delete", uid: uid }, process.env.SECRET?.toString() + "_delete_user", {
                expiresIn: "5m"
            })

            return Response.json({
                status: 200,
                message: "สร้างโทเคนยืนยันสำเร็จ",
                token: create_delete_token
            })
        }

        const body = await req.json();
        if (type == "confirm" && body.token) {
            const token = body.token;

            const vertify_token: any = jwt.verify(token, process.env.SECRET?.toString() + "_delete_user");

            if (uid !== vertify_token.uid) {
                return Response.json({
                    status: 400,
                    message: "ข้อมูลไม่ตรงกัน"
                })
            }

            if (!vertify_token) {
                return Response.json({
                    status: 400,
                    message: "ยืนยันโทเคนไม่สำเร็จ"
                })
            }

            if (vertify_token.type !== "delete" || !vertify_token.uid) {
                return Response.json({
                    status: 400,
                    message: "ยืนยันโทเคนไม่สำเร็จ."
                })
            }

            const delete_user = await prisma.user.delete({
                where: {
                    id: Number(vertify_token.uid)
                }
            })

            if (!delete_user) {
                return Response.json({
                    status: 400,
                    message: "ลบผู้ใช้ไม่สำเร็จ",
                })
            }

            return Response.json({
                status: 200,
                message: "ลบผู้ใช้สำเร็จ"
            })

        }

        return Response.json({
            status: 400,
            message: "method ไม่ตรงกับที่กำหนด"
        })

    } catch (error) {
        console.error(error);
        return Response.json({
            status: 400,
            message: "เซิร์ฟเวอร์ error",
            error
        });
    }
}