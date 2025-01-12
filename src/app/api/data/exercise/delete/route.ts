import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const id = new URL(req.url).searchParams.get("id");

        const delete_exercise = await prisma.exercise.delete({
            where: {
                id: Number(id)
            }
        })

        if (!delete_exercise) {
            return Response.json({
                status: 400,
                message: "ไม่สามารถลบหน่วยการเรียนรู้ได้",
            })
        }

        return Response.json({
            status: 200,
            message: "ลบข้อมูลหน่วยการเรียนรู้สำเร็จ"
        })

    } catch (error) {
        console.log(error)
        return Response.json({
            status: 500,
            message: "เซิฟเวอร์ผิดพลาด"
        })
    }
}