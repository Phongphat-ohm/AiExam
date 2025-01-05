import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const id = new URL(req.url).searchParams.get("id");

        const delete_grade = await prisma.grade.delete({
            where: {
                id: Number(id)
            }
        })

        if (!delete_grade) {
            return Response.json({
                status: 400,
                message: "ไม่สามารถลบระดับชั้นได้",
            })
        }

        return Response.json({
            status: 200,
            message: "ลบข้อมูลระดับชั้นสำเร็จ"
        })

    } catch (error) {
        console.log(error)
        return Response.json({
            status: 500,
            message: "เซิฟเวอร์ผิดพลาด"
        })
    }
}