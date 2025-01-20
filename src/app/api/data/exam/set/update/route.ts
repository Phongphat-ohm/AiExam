import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { id, name, grade, subject, exercise } = data;

        if (!id || !name || !grade || !subject || !exercise) {
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

        if (!get_grade) {
            return Response.json({
                status: 400,
                message: "ไม่พบระดับชั้นนี้"
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
                message: "ไม่พบวิชานี้"
            })
        }

        const get_exercise = await prisma.exercise.findFirst({
            where: {
                AND: [
                    {
                        grade_id: Number(get_grade.id)
                    },
                    {
                        subject_id: Number(get_subject?.id)
                    },
                    {
                        name: exercise
                    }
                ]
            }
        })

        if (!get_exercise) {
            return Response.json({
                status: 400,
                message: "ไม่พบหน่วยการเรียนรู้นี้"
            })
        }

        const update_exam_set = await prisma.examSet.update({
            where: {
                id: Number(id)
            },
            data: {
                name: name,
                Grade: {
                    connect: {
                        id: Number(get_grade.id)
                    }
                },
                Subject: {
                    connect: {
                        id: Number(get_subject.id)
                    }
                },
                Exercise: {
                    connect: {
                        id: Number(get_exercise.id)
                    }
                },
            }
        })

        if (!update_exam_set) {
            return Response.json({
                status: 400,
                message: "ไม่สามารถแก้ไขชุดข้อสอบได้"
            })
        }

        return Response.json({
            status: 200,
            message: "แก้ไขชุดข้อสอบสำเร็จ"
        })
    } catch (error) {
        console.log(error);
        return Response.json({
            status: 400,
            message: "มีบางอย่างผิดพลาด"
        })
    }
}