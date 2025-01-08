import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { id, name } = body;

        const update_data = await prisma.subject.update({
            where: {
                id: Number(id)
            },
            data: {
                name
            }
        })

        if (!update_data) {
            return Response.json({
                status: 400,
                message: "ไม่สามารถแก้ไขข้อมูลได้"
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