import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { text } = body;

        const new_grade = await prisma.grade.create({
            data: {
                grade: text
            }
        })

        if (!new_grade) {
            return Response.json({
                status: 400,
                message: "ไม่สามารถสร้างระดับชั้นนี้ได้"
            })
        }

        return Response.json({
            status: 200,
            message: "สร้างระดับชั้นสำเร็จ"
        })
    } catch (error) {
        console.log(error)
        return Response.json({
            status: 500,
            message: "เซิฟเวอร์ผิดพลาด"
        })
    }
}