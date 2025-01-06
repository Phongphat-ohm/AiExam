import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const params = req.url.split("/");
        const table = params[params.length - 1];

        switch (table) {
            case "grade":
                const grade_data = await prisma.grade.findMany({ orderBy: { id: "asc" } });
                return Response.json({
                    status: 200,
                    message: "ดึงข้อมูลสำเร็จ",
                    data: grade_data
                })
            case "users":
                const users_data = await prisma.user.findMany({ include: { Grade: true, Rank: true }, orderBy: { id: "asc" } });

                return Response.json({
                    status: 200,
                    message: "ดึงข้อมูลสำเร็จ",
                    data: users_data
                })
            case "ranks":
                const ranks_data = await prisma.rank.findMany();

                return Response.json({
                    status: 200,
                    message: "ดึงข้อมูลสำเร็จ",
                    data: ranks_data
                })
            case "exam-set":
                const exam_set = await prisma.examSet.findMany({ include: { Exercise: true, Grade: true, Subject: true } });

                return Response.json({
                    status: 200,
                    message: "ดึงข้อมูลสำเร็จ",
                    data: exam_set
                })
            case "subjects":
                const subjects = await prisma.subject.findMany({ include: { Exercise: true }, orderBy: { id: "asc" } });

                return Response.json({
                    status: 200,
                    message: "ดึงข้อมูลสำเร็จ",
                    data: subjects
                })
            default:
                return Response.json({
                    status: 400,
                    message: "ไม่พบตารางข้อมูลนี้"
                });
        }
    } catch (error) {
        console.error(error);
        return Response.json({
            status: 400,
            message: "เซิร์ฟเวอร์ error",
            error
        });
    }

}