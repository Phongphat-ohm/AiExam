import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { sub_name } = body;

        if (!sub_name) {
            return Response.json({
                status: 400,
                message: "กรุรากรอกข้อมูลให้ครบ"
            })
        }

        const create_subject = await prisma.subject.create({
            data: {
                name: sub_name
            }
        })

        if (!create_subject) {
            return Response.json({
                status: 400,
                message: "ไม่สามารถสร้างวิชาได้"
            })
        }

        return Response.json({
            status: 200,
            message: "สร้างวิชาสำเร็จ"
        })
    } catch (error) {
        console.log(error)
        return Response.json({
            status: 500,
            message: "เซิฟเวอร์ผิดพลาด"
        })
    }
}