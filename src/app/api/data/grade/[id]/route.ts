import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const params = req.url.split("/");
        const id = params[params.length - 1];

        const get_grade = await prisma.grade.findFirst({
            where: {
                id: Number(id)
            }
        })

        if (!get_grade) {
            return Response.json({
                status: 400,
                message: "ไม่พบระดับชั้นนี้"
            })
        }

        return Response.json({
            status: 200,
            message: "ดึงข้อมูลสำเร็จ",
            data: get_grade
        })
    } catch (error) {
        console.log(error)
        return Response.json({
            status: 500,
            message: "เซิฟเวอร์ผิดพลาด"
        })
    }
}