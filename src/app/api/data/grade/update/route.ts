import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { id, text } = data;
        
        if (!id || !text) {
            return Response.json({
                status: 400,
                message: "กรุณากรอกข้อมูลให้ครบ"
            })
        }

        const check_grade = await prisma.grade.findFirst({
            where: {
                id: Number(id)
            }
        })

        if (!check_grade) {
            return Response.json({
                status: 400,
                message: "ไม่พบระดับชั้นนี้"
            })
        }

        const edit = await prisma.grade.update({
            where: {
                id: Number(id)
            },
            data: {
                grade: text
            }
        })

        if (!edit) {
            return Response.json({
                status: 400,
                message: "แก้ไขไม่สำเร็จ"
            })
        }

        return Response.json({
            status: 200,
            message: "แก้ไขข้อมูลระดับชั้นสำเร็จ"
        })

    } catch (error) {
        console.log(error)
        return Response.json({
            status: 500,
            message: "เซิฟเวอร์ผิดพลาด"
        })
    }
}