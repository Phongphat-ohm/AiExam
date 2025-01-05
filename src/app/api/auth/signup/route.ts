import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import crypto from "crypto";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const first_name = body.first_name;
        const last_name = body.last_name;
        const email = body.email;
        const username = body.username;
        const password = body.password;
        const grade = body.grade;

        console.log(body)

        const url = req.url;
        const search = new URL(url).searchParams;
        const status = search.get("role");

        console.log("URL:", url);

        if (!first_name || !last_name || !email || !username || !password || !grade) {
            return Response.json({
                status: 400,
                message: "กรุณากรอกข้อมูลให้ครบ"
            })
        }

        const get_user_data = await prisma.user.findFirst({
            where: {
                OR: [
                    {
                        username
                    },
                    {
                        email
                    }
                ]
            }
        })

        if (get_user_data) {
            return Response.json({
                status: 400,
                message: "ชื่อผู้ใช้หรืออีเมลนี้ถูกใช้แล้ว"
            })
        }

        const hash_password = await bcrypt.hash(password, 12);
        const hash_email = crypto.createHash("sha256").update(email).digest("hex");
        const profile_url = `https://gravatar.com/avatar/${hash_email}`;
        const get_grade_id = await prisma.grade.findFirst({
            where: {
                grade
            }
        })

        if (!get_grade_id) {
            return Response.json({
                status: 400,
                message: "ไม่พบระดับชั้นนี้"
            })
        }

        if (status == "admin") {
            const create_user = await prisma.user.create({
                data: {
                    first_name,
                    last_name,
                    email,
                    username,
                    password: hash_password,
                    gravatar: profile_url,
                    point: 0,
                    gradeId: get_grade_id.id,
                    role: "admin",
                    rankId: 1
                }
            });

            if (!create_user) {
                return Response.json({
                    status: 400,
                    message: "สมัครสมาชิกไม่สำเร็จ"
                })
            }

            return Response.json({
                status: 200,
                message: "สมัครสมาชิกสำเร็จ",
            })
        }

        const create_user = await prisma.user.create({
            data: {
                first_name,
                last_name,
                email,
                username,
                password: hash_password,
                gravatar: profile_url,
                point: 0,
                gradeId: get_grade_id.id,
                rankId: 1
            }
        });

        if (!create_user) {
            return Response.json({
                status: 400,
                message: "สมัครสมาชิกไม่สำเร็จ"
            })
        }

        return Response.json({
            status: 200,
            message: "สมัครสมาชิกสำเร็จ",
        })

    } catch (error) {
        console.error(error);
        return Response.json({
            status: 400,
            message: "เซิร์ฟเวอร์ error",
            error
        });
    }
}