import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { exercise_id, exercise_name, grade, subject } = data;

        if (!exercise_id || !exercise_name || !grade || !subject) {
            return Response.json({
                status: 400,
                message: "กรุณากรอกข้อมูลให้ครบ"
            })
        }

        const get_grade = await prisma.grade.findFirst({
            where: {
                grade: grade
            }
        })
        const get_subject = await prisma.subject.findFirst({
            where: {
                name: subject
            }
        })

        if (!get_grade) {
            return Response.json({
                status: 400,
                message: "ไม่พบระดับชั้นนี้"
            })
        }

        if (!get_subject) {
            return Response.json({
                status: 400,
                message: "ไม่พบวิชานี้"
            })
        }

        const update_exerise = await prisma.exercise.update({
            where: {
                id: Number(exercise_id)
            },
            data: {
                name: exercise_name,
                Grade: {
                    connect: {
                        id: get_grade.id
                    }
                },
                Subject: {
                    connect: {
                        id: get_subject.id
                    }
                }
            }
        })

        if (!update_exerise) {
            return Response.json({
                status: 400,
                message: "แก้ไขหน่วยการเรียนรู้ไม่สำเร็จ"
            })
        }

        return Response.json({
            status: 200,
            message: "แก้ไขข้อมูลสำเร็จ"
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