import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const cookie = await cookies();
        const token = cookie.get("utk");

        if (!token) {
            return Response.json({
                status: 401,
                message: "กรุณาเข้าสู่ระบบ"
            })
        }

        const verify: any = jwt.verify(token.value, process.env.SECRET?.toString() + "_signin");

        if (!verify) {
            return Response.json({
                status: 401,
                message: "กรุณาเข้าสู่ระบบ",
                error: "vertify token error"
            })
        }

        const get_user_data = await prisma.user.findFirst({
            where: {
                id: verify.data.uid
            },
            select: {
                gravatar: true,
                first_name: true,
                last_name: true,
                username: true,
                email: true,
                role: true,
                create_at: true
            }
        })

        if (!get_user_data) {
            return Response.json({
                status: 400,
                message: "ไม่พบข้อมูลผู้ใช้"
            })
        }

        return Response.json({
            status: 200,
            message: "สำเร็จ",
            data: get_user_data
        })

    } catch (error) {
        console.log(error);

        return Response.json({
            status: 400,
            message: "เซิร์ฟเวอร์ error",
            error
        });
    }
}