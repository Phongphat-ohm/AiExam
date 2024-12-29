import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const params = req.url.split("/");
        const table = params[params.length - 1];

        switch (table) {
            case "grade":
                const data = await prisma.grade.findMany({ select: { id: true, grade: true } });
                return Response.json({
                    status: 200,
                    message: "ดึงข้อมูลสำเร็จ",
                    data
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