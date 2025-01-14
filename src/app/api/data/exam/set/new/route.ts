import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { set_name, grade, subject, exercise } = body;

        if (!set_name || !grade || !subject || !exercise) {
            return Response.json({
                status: 400,
                message: "กรุรากรอกข้อมูลให้ครบ"
            })
        }

        const get_grade = await prisma.grade.findFirst({
            where: {
                grade
            }
        })

        if (!get_grade) {
            return Response.json({
                status: 400,
                message: "ไม่พบข้อมูลระดับชั้นนี้"
            })
        }

        const get_subject = await prisma.subject.findFirst({
            where: {
                name: subject
            }
        })

        if (!get_subject) {
            return Response.json({
                status: 400,
                message: "ไม่พบข้อมูลวิชานี้"
            })
        }

        const get_exercise = await prisma.exercise.findFirst({
            where: {
                name: exercise
            }
        })

        if (!get_exercise) {
            return Response.json({
                status: 400,
                message: "ไม่พบข้อมูลหน่วยการเรียนรู้นี้"
            })
        }

        const new_exam_set = await prisma.examSet.create({
            data: {
                name: set_name,
                grade_id: Number(get_grade.id),
                subject_id: Number(get_subject.id),
                exercise_id: Number(get_subject.id)
            }
        })

        if (!new_exam_set) {
            return Response.json({
                status: 400,
                message: "ไม่สามารถสร้างชุดข้อสอบไหม่ได้"
            })
        }

        return Response.json({
            status: 200,
            message: "สร้างชุดข้อสอบสำเร็จ"
        })
    } catch (error) {
        console.log(error);
        return Response.json({
            status: 400,
            message: "มีบางอย่างผิดพลาด"
        })
    }
}