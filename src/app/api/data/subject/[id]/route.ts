import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const params = req.url.split("/");
        const id = params[params.length - 1];

        console.log(id);

        const get_subject = await prisma.subject.findFirst({
            where: {
                id: Number(id)
            },
            include: {
                Exercise: {
                    include: {
                        Grade: true
                    }
                }
            }
        })

        if (!get_subject) {
            return Response.json({
                status: 400,
                message: "ไม่พบวิชานี้"
            })
        }

        return Response.json({
            status: 200,
            message: "ดึงข้อมูลสำเร็จ",
            data: get_subject
        })
    } catch (error) {
        console.log(error)
        return Response.json({
            status: 500,
            message: "เซิฟเวอร์ผิดพลาด"
        })
    }
}