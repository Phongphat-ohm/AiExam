import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const params = req.url.split("/");
        const exam_set_id = params[params.length - 1];

        const get_exam_set = await prisma.examSet.findFirst({
            where: {
                id: Number(exam_set_id)
            },
            include: {
                Grade: true,
                Subject: true,
                Exercise: true,
                Exam: {
                    include: {
                        ExamData: true
                    }
                }
            }
        })

        if (!get_exam_set) {
            return Response.json({
                status: 400,
                message: "ไม่พบชุดข้อสอบนี้"
            })
        }

        return Response.json({
            status: 200,
            message: "ดึงข้อมูลสำเร็จ",
            data: get_exam_set
        })
    } catch (error) {
        console.log(error);
        return Response.json({
            status: 400,
            message: "มีบางอย่างผิดพลาด"
        })
    }
}