import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const query = new URL(req.url).searchParams;
        const grade = query.get("grade");
        const subject = query.get("subject");

        const get_exercises = await prisma.exercise.findMany({
            where: {
                AND: [
                    {
                        Grade: {
                            id: Number(grade)
                        }
                    },
                    {
                        Subject: {
                            id: Number(subject)
                        }
                    }
                ]
            }
        })

        return Response.json({
            status: 200,
            message: "ดึงข้อมูลสำเร็จ",
            exercises: get_exercises
        })
    } catch (error) {
        console.log(error);
        return Response.json({
            status: 400,
            message: "มีบางอย่างผิดพลาด"
        })
    }
}