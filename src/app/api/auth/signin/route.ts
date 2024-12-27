import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

interface ReqBodyProps {
    username?: any;
    password?: any;
}

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const body: ReqBodyProps = await req.json();
        const { username, password } = body;
        const cookie = await cookies();

        if (!username || !password) {
            return Response.json({
                status: 400,
                message: "กรุณากรอกข้อมูลให้ครบ"
            })
        }

        const get_user_data = await prisma.user.findFirst({
            where: {
                username: username
            }
        })

        if (!get_user_data) {
            return Response.json({
                status: 400,
                message: "ไม่พบชื่อผู้ใช้นี้"
            })
        }

        const compare_pass = await bcrypt.compare(password, get_user_data.password)

        if (!compare_pass) {
            return Response.json({
                status: 400,
                message: "รหัสผ่านไม่ถูกต้อง"
            })
        }

        const create_token = jwt.sign({ data: { uid: get_user_data.id, } }, process.env.SECRET?.toString() + "_signin");

        if (!create_token) {
            return Response.json({
                status: 400,
                message: "ดำเนินการต่อไม่สำเร็จ"
            })
        }

        const set_cookie = cookie.set("utk", create_token.toString()).set("uro", get_user_data.role.toString());

        return Response.json({
            status: 200,
            message: "สำเร็จ",
            role: get_user_data.role
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
