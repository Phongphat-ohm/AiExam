import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const query = new URL(req.url).searchParams;
        const set_id = query.get("set_id");

        if (!set_id) {
            return Response.json({
                status: 400,
                message: "กรุณากรอกข้อมูลให้ครบ"
            })
        }

        const delete_exam_set = await prisma.examSet.delete({
            where: {
                id: Number(set_id)
            }
        })

        if (!delete_exam_set) {
            return Response.json({
                status: 400,
                message: "ไม่สามารถลบชุดข้อสอบนี้ได้"
            })
        }

        return Response.json({
            status: 200,
            message: "ลบข้อมูลชุดข้อสอบสำเร็จ"
        })
    } catch (error) {
        console.log(error);
        return Response.json({
            status: 400,
            message: "มีบางอย่างผิดพลาด"
        })
    }
}