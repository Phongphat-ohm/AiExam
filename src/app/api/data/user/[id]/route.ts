import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const params = req.url.split("/");
        const uid = params[params.length - 1];

        const user_data = await prisma.user.findFirst({
            where: {
                id: Number(uid)
            },
            include: {
                Grade: true,
                Rank: true
            }
        })

        if (!user_data) {
            return Response.json({
                status: 400,
                message: "ไม่พบผุ้ใช้นี้"
            })
        }

        return Response.json({
            status: 200,
            message: "สำเร็จ",
            data: user_data
        })
    } catch (error) {
        console.log(error)
        return Response.json({
            status: 500,
            message: "เซิฟเวอร์ผิดพลาด"
        })
    }
}