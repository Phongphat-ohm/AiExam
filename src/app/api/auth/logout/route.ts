import { cookies } from "next/headers";

export async function GET() {
    const cookie = await cookies();
    const del_cookie = cookie.delete("utk");
    return Response.json({
        status: 200,
        message: "ออกจากระบบสำเร็จ"
    })
}