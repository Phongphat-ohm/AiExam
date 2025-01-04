import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import crypto from "crypto";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { id, first_name, last_name, email, username, password, grade, rank, role, point } = data;

        if (!id || !first_name || !last_name || !email || !username || !grade || !rank || !role || !point) {
            return Response.json({
                status: 400,
                message: "กรุณากรอกข้อมูลให้ครบ"
            })
        }
        const hash_email = crypto.createHash("sha256").update(email).digest("hex");
        const get_grad_id = await prisma.grade.findFirst({ where: { grade } });

        if (!get_grad_id) {
            return Response.json({
                status: 400,
                message: "ไม่พบชั้นเรียนนี้"
            })
        }

        const get_rank_id = await prisma.rank.findFirst({ where: { rank } });

        if (!get_rank_id) {
            return Response.json({
                status: 400,
                message: "ไม่พบแรงค์นี้"
            })
        }

        if (password !== "") {
            const hash_password = await bcrypt.hash(password, 12);

            const update = await prisma.user.update({
                where: {
                    id
                },
                data: {
                    gravatar: `https://gravatar.com/avatar/${hash_email}`,
                    first_name,
                    last_name,
                    email,
                    username,
                    password: hash_password,
                    gradeId: get_grad_id.id,
                    rankId: get_rank_id.id,
                    role,
                    point: Number(point)
                }
            })

            if (!update) {
                return Response.json({
                    status: 400,
                    message: "ไม่สามารถอัพเดทข้อมูลได้"
                })
            }

            return Response.json({
                status: 200,
                message: "สำเร็จ"
            })
        }

        const update = await prisma.user.update({
            where: {
                id
            },
            data: {
                gravatar: `https://gravatar.com/avatar/${hash_email}`,
                first_name,
                last_name,
                email,
                username,
                gradeId: get_grad_id.id,
                rankId: get_rank_id.id,
                role,
                point: Number(point)
            }
        })

        if (!update) {
            return Response.json({
                status: 400,
                message: "ไม่สามารถอัพเดทข้อมูลได้"
            })
        }

        return Response.json({
            status: 200,
            message: "สำเร็จ"
        })
    } catch (error) {
        console.log(error)
        return Response.json({
            status: 500,
            message: "เซิฟเวอร์ผิดพลาด"
        })
    }
}