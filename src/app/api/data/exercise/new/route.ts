import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { grade, subject, name } = body;

        if (!grade || !subject || !name) {
            return Response.json({
                status: 400,
                message: "กรุรากรอกข้อมูลให้ครบ"
            })
        }

        const select_grade = await prisma.grade.findFirst({
            where: {
                grade
            }
        })
        const select_subject = await prisma.subject.findFirst({
            where: {
                name: subject
            }
        })

        if (!select_grade) {
            return Response.json({
                status: 400,
                message: "ไม่พบระดับชั้นนี้"
            })
        }

        if (!select_subject) {
            return Response.json({
                status: 400,
                message: "ไม่พบวิชานี้"
            })
        }

        const new_exercise = await prisma.exercise.create({
            data: {
                name: name,
                grade_id: select_grade.id,
                subject_id: select_subject.id,
            }
        })

        if (!new_exercise) {
            return Response.json({
                status: 400,
                message: "ไม่สามารถสร้างหน่วยการเรียนรู้ได้"
            })
        }

        return Response.json({
            status: 200,
            message: "สร้างหน่วยการเรียนรู้สำเร็จ"
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