import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const id = new URL(req.url).searchParams.get("id");

        const delete_subject = await prisma.subject.delete({
            where: {
                id: Number(id)
            }
        })

        if (!delete_subject) {
            return Response.json({
                status: 400,
                message: "ไม่สามารถลบข้อมูลวิชาได้",
            })
        }

        return Response.json({
            status: 200,
            message: "ลบข้อมูลวิชาสำเร็จ"
        })
    } catch (error) {
        console.log(error)
        return Response.json({
            status: 500,
            message: "เซิฟเวอร์ผิดพลาด"
        })
    }
}