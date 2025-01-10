import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const params = req.url.split("/");
        const exercise_id = params[params.length - 1];

        const get_exercise = await prisma.exercise.findFirst({
            where: {
                id: Number(exercise_id)
            },
            include: {
                ExamSet: true,
                Grade: true,
                Subject: true
            }
        })

        if (!get_exercise) {
            return Response.json({
                status: 400,
                message: "ไม่พบหน่วยการเรียนรู้นี้"
            })
        }

        return Response.json({
            status: 200,
            message: "ดึงข้อมูลหน่วยการเรียนรู้สำเร็จ",
            data: get_exercise
        })
    } catch (error) {
        console.log(error);
        return Response.json({
            status: 400,
            message: "มีบางอย่างผิดพลาด",
            error
        })
    }
} 